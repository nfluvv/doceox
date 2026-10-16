import { prisma } from "@/shared/server/db/prisma"
import { tgApi } from "@/shared/server/telegram/bot-api"
import { getLocalDateKey } from "@/shared/server/lib/timezone"

export const dynamic = "force-dynamic"
export const maxDuration = 60

const DAY = 86_400_000
const NUDGE_EVERY_DAYS = 3
const SEND_FROM_HOUR = 10
const SEND_TO_HOUR = 22
const CHUNK = 15

const TEXTS = {
  ru: {
    streak: "🔥 Ваша серия сгорит сегодня! Повторите слова, иначе потеряете её.",
    start: "📚 Начните серию: пара минут повторения в день, и слова запомнятся.",
    open: "Открыть",
  },
  en: {
    streak: "🔥 Your streak is about to burn! Review your words to keep it.",
    start: "📚 Start a streak: a few minutes a day makes the words stick.",
    open: "Open",
  },
} as const

const getLocalHour = (date: Date, timeZone: string) =>
  Number(
    new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", hourCycle: "h23" }).format(date)
  )

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

type Job = { id: string; chatId: number; text: string; button: string }

export async function GET(req: Request) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 })
  }

  const now = new Date()
  const since = new Date(now.getTime() - 3 * DAY)

  const users = await prisma.user.findMany({
    where: { notifyStreak: true },
    select: {
      id: true,
      telegramId: true,
      timezone: true,
      locale: true,
      lastNotifiedAt: true,
      studySessions: {
        where: { completedAt: { gte: since } },
        select: { completedAt: true },
      },
    },
  })

  const jobs: Job[] = []

  for (const u of users) {
    try {
      const hour = getLocalHour(now, u.timezone)
      if (hour < SEND_FROM_HOUR || hour >= SEND_TO_HOUR) continue

      const days = new Set(
        u.studySessions.map((s) => getLocalDateKey(s.completedAt, u.timezone))
      )

      const today = getLocalDateKey(now, u.timezone)
      if (days.has(today)) continue

      const yesterday = getLocalDateKey(new Date(now.getTime() - DAY), u.timezone)
      const hasStreak = days.has(yesterday)

      if (
        !hasStreak &&
        u.lastNotifiedAt &&
        now.getTime() - u.lastNotifiedAt.getTime() < NUDGE_EVERY_DAYS * DAY
      ) {
        continue
      }

      const t = TEXTS[u.locale === "en" ? "en" : "ru"]
      jobs.push({
        id: u.id,
        chatId: Number(u.telegramId),
        text: hasStreak ? t.streak : t.start,
        button: t.open,
      })
    } catch {
      continue
    }
  }

  let sent = 0
  let blocked = 0

  for (let i = 0; i < jobs.length; i += CHUNK) {
    await Promise.all(
      jobs.slice(i, i + CHUNK).map(async (job) => {
        try {
          await tgApi("sendMessage", {
            chat_id: job.chatId,
            text: job.text,
            reply_markup: {
              inline_keyboard: [[{ text: job.button, web_app: { url: process.env.APP_URL } }]],
            },
          })
          await prisma.user.update({ where: { id: job.id }, data: { lastNotifiedAt: now } })
          sent++
        } catch (e) {
          const msg = e instanceof Error ? e.message : ""
          if (msg.includes("Forbidden") || msg.includes("chat not found")) {
            blocked++
            await prisma.user.update({ where: { id: job.id }, data: { notifyStreak: false } })
          } else {
            console.error("[streak] send failed", job.id, msg)
          }
        }
      })
    )
    if (i + CHUNK < jobs.length) await sleep(1000)
  }

  return Response.json({ checked: users.length, queued: jobs.length, sent, blocked })
}
