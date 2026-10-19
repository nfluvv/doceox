import "server-only"
import { cache } from "react"
import { auth } from "@/auth"
import { prisma } from "@/shared/server/db/prisma"

const authorSelect = {
  select: { username: true, name: true },
} as const

export const getUserDecks = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return null

  return prisma.deck.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { cards: true } } },
  })
})

export const getDeckSummaryById = cache(async (deckId: string) => {
  const session = await auth()
  const viewerId = session?.user?.id
  if (!session?.user?.id) return null

  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    include: {
      _count: { select: { cards: true } },
      user: authorSelect,
    },
  })

  if (!deck) return null

  const isOwner = viewerId === deck.userId
  if (!isOwner && deck.status !== "PUBLIC") return null

  const { user, ...rest } = deck as typeof deck

  return {
    ...rest,
    author: user
  }
})

export const getDeckById = cache(async (deckId: string) => {
  const session = await auth()
  if (!session?.user?.id) return null

  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    include: { cards: true },
  })

  if (!deck) return null

  const isOwner = session?.user?.id === deck.userId
  if (isOwner) return deck

  if (deck.status !== "PUBLIC") return null

  return deck
})

export const getOwnedDeckById = cache(async (deckId: string) => {
  const session = await auth()
  if (!session?.user?.id) return null

  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    include: { cards: true },
  })

  if (!deck) return null
  if (deck.userId !== session.user.id) return null

  return deck
})

export const getPublicUserDecks = cache(async (userId: string) => {
  const session = await auth()
  if (!session?.user?.id) return null

  const decks = await prisma.deck.findMany({
    where: {
      userId,
      status: "PUBLIC",
    },
    include: {
      _count: {
        select: {
          cards: true,
        },
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  })

  return decks
})
