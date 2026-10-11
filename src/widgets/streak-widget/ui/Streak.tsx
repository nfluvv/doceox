import { getStreak } from "@/entities/study-session/api/queries"
import { getTranslations } from "next-intl/server"

export async function Streak() {
  const streak = await getStreak()
  const t = await getTranslations("profile")


  return (
      <li className="flex items-center justify-between px-4 ">
        <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground">
          {t("streak")}
        </p>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-semibold tracking-tight">
            {streak}
          </span>

          <span className="text-sm text-muted-foreground">
            {t("days")}
          </span>

          {streak > 0 && (
            <span className="ml-1 text-base" aria-hidden>
              🔥
            </span>
          )}
        </div>
      </li>
  )
}
