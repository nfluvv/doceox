"use client"

import { useState } from "react"
import { Crown } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { useTranslations } from "next-intl"

import { SettingsRow } from "@/shared/client/ui"

import { createStarsInvoice } from "../api/create-stars-invoice"

export function PremiumRow({ isPremium }: { isPremium: boolean }) {
  const t = useTranslations("profile")
  const router = useRouter()

  const handleClick = async () => {
    const tg = window.Telegram?.WebApp
    if (!tg) return toast.error(t("openInTelegram"))

    const res = await createStarsInvoice("premium_lifetime")
    if (!res.success) {
      return toast.error(res.error)
    }

    tg.openInvoice(res.url, (status) => {
      if (status === "paid") {
        toast.success(t("premiumActivated"))
        ;[500, 2000, 5000].forEach((ms) =>
          setTimeout(() => router.refresh(), ms)
        )
      } else if (status === "failed") {
        toast.error(t("paymentFailed"))
      }
    })
  }

  return (
    <SettingsRow
      icon={<Crown className="size-5" />}
      label={t("subscription")}
      value={
        isPremium ? (
          <span className="text-amber-500">{t("statusPremium")}</span>
        ) : (
          t("statusFree")
        )
      }
      showChevron={!isPremium}
      onClick={isPremium ? undefined : handleClick}
    />
  )
}
