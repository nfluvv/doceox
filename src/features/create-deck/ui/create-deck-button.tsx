"use client"

import { Loader2, Plus } from "lucide-react"
import { useCreateDeck } from "../model/useCreateDeck"

export function CreateDeckButton() {
  const { loading, handleStart } = useCreateDeck()

  return (
  <button
    className="
      fixed bottom-22 right-6 z-50
      flex items-center justify-center
      bg-background shadow-lg
      transition-all duration-300 ease-out
      hover:border-foreground/25 hover:bg-muted/30 hover:shadow-xl
      focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-foreground/30
      disabled:cursor-wait
    "
    type="button"
    onClick={handleStart}
    disabled={loading}
  >
    <span className="flex size-9 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 ease-out hover:scale-105">
      {loading ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Plus className="size-4" strokeWidth={1.5} />
      )}
    </span>
  </button>
  )
}
