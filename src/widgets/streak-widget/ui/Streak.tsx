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
        <span className="text-medium font-semibold tracking-tight">
          {streak}
        </span>
      </SettingsRow>
      {/* <h3 className="px-4 tracking-wide text-foreground flex-1 text-base font-medium">
          {t("streak")}
        </h3>

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
        </div> */}
    </div>
  )
}
