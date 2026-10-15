import { getStreak } from "@/entities/study-session/api/queries"
import { getTranslations } from "next-intl/server"
import { SettingsRow } from "@/shared/client/ui"
import { Flame } from "lucide-react"

export async function Streak() {
  const streak = await getStreak()
  const t = await getTranslations("profile")

  return (
    <div className="flex items-center justify-between">
      <SettingsRow
        icon={<Flame className="size-5" />}
        label={t("streak")}
        showChevron={false}
      >
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold tracking-tight">
          {streak}
        </span>
          {streak > 0 && (
            <span className="ml-1" aria-hidden>
              🔥
            </span>
          )}
      </p>
      </SettingsRow>
    </div>
  )
}
