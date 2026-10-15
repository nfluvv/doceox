"use server"

import { revalidatePath } from "next/cache"

import { prisma } from "@/shared/server/db/prisma"
import { getCurrentUser } from "@/entities/user/api/queries"
import { getDecksLimit } from "@/shared/config/decks"

export async function createDraftDeckAction() {
  const user = await getCurrentUser()
  if (!user) return { success: false as const, error: "unauthorized" }

  const count = await prisma.deck.count({ where: { userId: user.id } })
  if (count >= getDecksLimit(user.isPremium)) {
    return { success: false as const, error: "decksLimitReached" }
  }

  const deck = await prisma.deck.create({
    data: { title: "Untitled", userId: user.id },
    select: { id: true },
  })

  revalidatePath("/")
  return { success: true as const, deck }
}
