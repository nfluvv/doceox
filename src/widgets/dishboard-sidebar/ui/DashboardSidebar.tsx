import { getTranslations } from "next-intl/server"
import { DECKS_LIMIT } from "@/shared/config/decks"

interface DashboardSidebarProps {
  streak: number
  currentDecksCount: number
}

export const DashboardSidebar = async ({
  streak,
  currentDecksCount,
}: DashboardSidebarProps) => {
  const t = await getTranslations("dashboard")

  return (
    <aside className="col-span-12 self-start">
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-foreground transition-all"
          style={{
            width: `${Math.min(
              (currentDecksCount / DECKS_LIMIT) * 100,
              100
            )}%`,
          }}
        />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {t("decksCount", { count: currentDecksCount, total: DECKS_LIMIT })}
      </p>
    </aside>
  )
}
