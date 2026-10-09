import { getTranslations } from "next-intl/server"
import { getDecksLimit } from "@/shared/config/decks"

interface DashboardSidebarProps {
  currentDecksCount: number
  isPremium: boolean
}

export const DashboardSidebar = async ({
  currentDecksCount,
  isPremium,
}: DashboardSidebarProps) => {
  const t = await getTranslations("dashboard")
  const limit = getDecksLimit(isPremium)

  return (
    <aside className="col-span-12 self-start">
      <div>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-all"
            style={{ width: `${Math.min((currentDecksCount / limit) * 100, 100)}%` }}
          />
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          {t("decksCount", { count: currentDecksCount, total: limit })}
        </p>
      </div>
    </aside>
  )
}