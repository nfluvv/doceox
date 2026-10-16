"use client"

import { Home, User, Sparkles, PlusCircle, Loader2 } from "lucide-react"
import { Link, usePathname } from "@/shared/i18n/navigation"
import { siteConfig } from "@/shared/client/config/site"
import { cn } from "@/shared/client/lib/utils"
import { useTranslations } from "next-intl"
import { useCreateDeck } from "@/features/create-deck/model/useCreateDeck"

function haptic() {
  window.Telegram?.WebApp?.HapticFeedback?.selectionChanged()
}

export function BottomNavItems({ isAuthed }: { isAuthed: boolean }) {
  const pathname = usePathname()
  const t = useTranslations("navigation")

  const { loading, handleStart } = useCreateDeck()

  const items = [
    {
      type: "link" as const,
      href: siteConfig.routes.home,
      label: t("home"),
      icon: Home,
    },
    {
      type: "link" as const,
      href: "/saved",
      label: t("saved"),
      icon: Sparkles,
    },
    {
      type: "action" as const,
      label: t("newDeck"),
      icon: PlusCircle,
      onClick: handleStart,
    },
    {
      type: "link" as const,
      href: "/profile",
      label: t("profile"),
      icon: User,
    },
  ]

  const visible = isAuthed
    ? items
    : items.filter((i) => i.href === siteConfig.routes.home)

  if (visible.length < 2) return null

  const isActive = (href: string) =>
    href === siteConfig.routes.home
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`)

  const activeIndex = visible.findIndex(
    (item) => item.type === "link" && isActive(item.href)
  )
  const count = visible.length

  return (
    <ul className="relative mx-auto grid h-16 max-w-md auto-cols-fr grid-flow-col overflow-x-hidden px-0">
      <li
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-2 left-0 flex justify-center",
          "transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)] motion-reduce:transition-none",
          activeIndex === -1 ? "opacity-0" : "opacity-100"
        )}
        style={{
          width: `${100 / count}%`,
          transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
        }}
      >
        <span className="h-8 w-14 rounded-full bg-primary/15" />
      </li>

      {visible.map((item) => {
        const { label, icon: Icon } = item

        const active =
          item.type === "link" &&
          (item.href === siteConfig.routes.home
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`))

        const content = (
          <>
            <span className="flex h-8 w-14 items-center justify-center">
              {item.type === "action" && loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Icon
                  className="size-5.5 transition-transform duration-150 group-active:scale-90"
                  strokeWidth={active ? 2.4 : 1.8}
                />
              )}
            </span>

            <span
              className={cn(
                "max-w-full truncate px-1 text-[11px] leading-none",
                active ? "font-semibold" : "font-medium"
              )}
            >
              {label}
            </span>
          </>
        )

        const className = cn(
          "group relative flex h-full touch-manipulation flex-col items-center gap-0.5 pt-2 select-none",
          "transition-colors duration-200 [-webkit-tap-highlight-color:transparent]",
          active ? "text-primary" : "text-muted-foreground"
        )

        return (
          <li key={label} className="min-w-0">
            {item.type === "link" ? (
              <Link
                href={item.href}
                onClick={haptic}
                aria-current={active ? "page" : undefined}
                className={className}
              >
                {content}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  haptic()
                  item.onClick()
                }}
                disabled={loading}
                className={cn(className, "w-full disabled:opacity-60")}
              >
                {content}
              </button>
            )}
          </li>
        )
      })}
    </ul>
  )
}
