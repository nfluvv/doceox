"use client"

import { Share2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "react-hot-toast"

import { Button } from "@/shared/client/ui"

interface ShareDeckButtonProps {
  deckId: string
  title: string
}

export function ShareDeckButton({ deckId, title }: ShareDeckButtonProps) {
  const t = useTranslations("study")

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    const link = `https://t.me/${process.env.NEXT_PUBLIC_BOT_USERNAME}/${process.env.NEXT_PUBLIC_MINI_APP_NAME}?startapp=deck_${deckId}`
    const tg = window.Telegram?.WebApp

    if (tg?.openTelegramLink) {
      const text = t("shareText", { title })
      tg.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`
      )
      return
    }

    try {
      await navigator.clipboard.writeText(link)
      toast.success(t("linkCopied"))
    } catch (err) {
      console.error("Failed to copy link: ", err)
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-8 w-8 rounded-full border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4" />
      <span className="sr-only">{t("shareAria")}</span>
    </Button>
  )
}
