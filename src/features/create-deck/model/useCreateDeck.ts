"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { createDraftDeckAction } from "../api/create-draft-deck"

export function useCreateDeck() {
  const t = useTranslations("deckCreation")
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    if (loading) return

    setLoading(true)

    try {
      const res = await createDraftDeckAction()

      if (!res.success) {
        toast.error(
          res.error === "decksLimitReached"
            ? t("errors.decksLimitReached")
            : t("errors.unauthorized")
        )
        return
      }

      router.push(`/decks/${res.deck.id}/edit`)
    } catch {
      toast.error(t("errors.unknown"))
    } finally {
      setLoading(false)
    }
  }

  return { loading, handleStart, t }
}
