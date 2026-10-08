"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Button,
} from "@/shared/client/ui"
import {
  Check,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "@/shared/client/lib/utils"

interface ClientFiltersProps {
  currentFilter: string
  placeholder: string
}

export function ClientFilters({
  currentFilter,
  placeholder,
}: ClientFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations("dashboard")

  const [, startTransition] = useTransition()

  const [search, setSearch] = useState(
    searchParams.get("query") ?? "",
  )
  const [open, setOpen] = useState(false)

  const searchTimer = useRef<NodeJS.Timeout | null>(null)

  const filterLabels: Record<string, string> = {
    all: t("filters.all"),
    draft: t("filters.draft"),
    private: t("filters.private"),
    public: t("filters.public"),
  }

  const activeFilterLabel =
    filterLabels[currentFilter] ?? filterLabels.all

  useEffect(() => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }

    searchTimer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      const value = search.trim()

      if (value) {
        params.set("query", value)
      } else {
        params.delete("query")
      }

      if (params.get("query") === searchParams.get("query")) {
        return
      }

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        })
      })
    }, 400)

    return () => {
      if (searchTimer.current) {
        clearTimeout(searchTimer.current)
      }
    }
  }, [search, pathname, router, searchParams, startTransition])

  const handleFilterChange = (value: string) => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }

    const params = new URLSearchParams(searchParams.toString())

    params.set("filter", value)

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      })
    })

    setOpen(false)
  }

  const clearSearch = () => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current)
    }

    setSearch("")

    const params = new URLSearchParams(searchParams.toString())
    params.delete("query")

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      })
    })
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="relative w-full">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />

        <Input
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-full rounded-xl border-border/50 bg-muted/30 pr-10 pl-10 shadow-none transition-colors placeholder:text-muted-foreground/50 hover:bg-muted/50 focus-visible:border-primary/30 focus-visible:bg-background focus-visible:ring-4 focus-visible:ring-primary/10"
        />

        {search && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-10 w-full justify-between gap-3 rounded-xl border-border/50 bg-muted/30 px-3.5 font-medium shadow-none transition-colors hover:bg-muted/60 sm:w-auto sm:min-w-40"
          >
            <span className="flex min-w-0 items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />

              <span className="truncate">
                {activeFilterLabel}
              </span>
            </span>

            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[calc(100%-2rem)] max-w-sm rounded-2xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <DialogHeader>
            <DialogTitle>{t("filters.title")}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-1.5">
            {[
              {
                value: "all",
                label: filterLabels.all,
              },
              {
                value: "draft",
                label: filterLabels.draft,
              },
              {
                value: "private",
                label: filterLabels.private,
              },
              {
                value: "public",
                label: filterLabels.public,
              },
            ].map((item) => {
              const active = currentFilter === item.value

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleFilterChange(item.value)}
                  className={cn(
                    "flex min-h-12 w-full items-center justify-between rounded-xl px-4 text-left text-base transition-colors active:bg-muted",
                    active
                      ? "bg-muted font-medium"
                      : "bg-transparent",
                  )}
                >
                  <span>{item.label}</span>

                  {active && (
                    <Check className="size-4 text-primary" />
                  )}
                </button>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
