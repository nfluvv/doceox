"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { Loader2, Plus } from "lucide-react"

import { Button, Input, Label } from "@/shared/client/ui"
import { createCardAction } from "../api/create-card"
import { createCardSchema, CreateCardInput } from "../model/schema"
import toast from "react-hot-toast"

type CardItem = { id: string; term: string; definition: string }

type AddCardFormProps = {
  deckId: string
  onCardAdded: (card: CardItem) => void
}

export function AddCardForm({ deckId, onCardAdded }: AddCardFormProps) {
  const t = useTranslations("deckCreation")
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCardInput>({
    resolver: zodResolver(createCardSchema),
    defaultValues: { deckId, term: "", definition: "" },
  })

  const onSubmit = async (values: CreateCardInput) => {
    setServerError(null)
    try {
      const res = await createCardAction({ ...values, deckId })

      if (!res.card) {
        toast.error(
          res.error === "cardsLimitReached"
            ? t("errors.cardsLimitReached")
            : t("errors.unauthorized")
        )
        return
      }

      onCardAdded(res?.card)
      reset({ deckId, term: "", definition: "" })
    } catch {
      setServerError(t("errors.addCardFailed"))
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg border border-border/60 bg-muted/30 p-4"
    >
      <h3 className="text-sm font-medium text-foreground/80">
        {t("newCardHeading")}
      </h3>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="term" className="sr-only">
            {t("termLabel")}
          </Label>
          <Input
            id="term"
            placeholder={t("termPlaceholder")}
            {...register("term")}
          />
          {errors.term && (
            <p className="text-xs text-destructive">{errors.term.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="definition" className="sr-only">
            {t("definitionLabel")}
          </Label>
          <Input
            id="definition"
            placeholder={t("definitionPlaceholder")}
            {...register("definition")}
          />
          {errors.definition && (
            <p className="text-xs text-destructive">
              {errors.definition.message}
            </p>
          )}
        </div>
      </div>

      {serverError && <p className="text-xs text-destructive">{serverError}</p>}

      <Button
        type="submit"
        variant="secondary"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {t("adding")}
          </>
        ) : (
          <>
            <Plus className="size-4" />
            {t("addCardButton")}
          </>
        )}
      </Button>
    </form>
  )
}
