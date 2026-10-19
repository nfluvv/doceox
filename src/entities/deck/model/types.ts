import type { Deck } from "@prisma/client"

export type DeckAuthor = {
  username: string | null
  name: string | null
}

export type DeckWithCount = Deck & {
  _count: {
    cards: number
  }
}

export type DeckWithAuthor = DeckWithCount & {
  author: DeckAuthor
}

export type DeckCardVariant = "owner" | "public"
