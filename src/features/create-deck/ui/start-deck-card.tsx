"use client"

import { useCreateDeck } from "../model/useCreateDeck"

export function StartDeckCard() {
  const { loading, handleStart, t } = useCreateDeck()

  return (
    <button
      type="button"
      onClick={handleStart}
      disabled={loading}
      className="group relative flex h-71.25 w-full cursor-pointer flex-col overflow-hidden rounded-[20px] border border-dashed border-border bg-card p-6 text-left text-card-foreground transition-[background-color,border-color,box-shadow] duration-300 ease-out hover:border-foreground/25 hover:bg-muted/30 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:outline-none disabled:cursor-wait"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-28 size-72 rounded-full border border-foreground/[0.035]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full border border-foreground/[0.035]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full border border-foreground/4.5"
      />

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[9px] font-medium tracking-[0.18em] text-muted-foreground/60 uppercase">
          NEW DECK
        </span>
      </div>

      <div className="relative z-10 mt-auto">
        <div
          aria-hidden
          className="mb-5 text-[72px] leading-[0.7] font-light tracking-[-0.08em] text-foreground/6"
        >
          +
        </div>

        <h2 className="text-xl font-semibold tracking-tight">
          {loading ? t("starting") : t("startTitle")}
        </h2>

        <p className="mt-2 max-w-70 text-xs leading-relaxed text-muted-foreground">
          {t("startDescription")}
        </p>
      </div>

      <div className="relative z-10 mt-5 flex items-center">
        <span className="text-xs font-medium">
          {loading ? t("starting") : t("startButton")}
        </span>

        {!loading && (
          <span
            aria-hidden
            className="ml-2 text-muted-foreground/50 transition-transform duration-300 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </div>
    </button>
  )
}
