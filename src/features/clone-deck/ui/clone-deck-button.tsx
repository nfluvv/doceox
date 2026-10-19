"use client"

import { useRef, useState } from "react"
import { useRouter } from "@/shared/i18n/navigation"
import { Clipboard } from "lucide-react"
import { cloneDeck } from "../api/clone-deck"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

type SaveDeckButtonProps = {
  deckId: string
}

export function CloneDeckButton({ deckId }: SaveDeckButtonProps) {
  const [isPending, setIsPending] = useState(false)
  const isProcessing = useRef(false)
  const router = useRouter()
  const t = useTranslations("cloneButton")

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isProcessing.current) return

    isProcessing.current = true
    setIsPending(true)

    try {
      const res = await cloneDeck(deckId)

      if (!res.success) {
        toast.error(t(`errors.${res.error}`))
        return
      }

      const successMessage = t("addSuccess")
      toast.success(successMessage)
      router.push(`/decks/${res.deck.id}/edit`)
    } finally {
      isProcessing.current = false
      setIsPending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="cursor-pointer rounded-full border border-border/60 p-2 transition-colors hover:bg-muted disabled:opacity-50"
    >
      <Clipboard className="size-4 text-muted-foreground" />
    </button>
  )
}