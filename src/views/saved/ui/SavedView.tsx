import { getCurrentUser } from "@/entities/user/api/queries"

import { Container } from "@/shared/client/ui"

import { SavedDecks } from "@/widgets/saved-decks"
import { notFound } from "next/navigation"

interface DashboardProps {
  searchParams: Promise<{
    query?: string
    filter?: string
    savedQuery?: string
    savedPage?: string
  }>
}

export async function SavedView({ searchParams }: DashboardProps) {
  const { savedQuery = "", savedPage = "1" } = await searchParams

  const savedPageNum = Math.max(1, Number(savedPage) || 1)

  const [user] = await Promise.all([getCurrentUser()])

  if (!user) notFound()

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Container className="py-4">
        <SavedDecks savedQuery={savedQuery} savedPage={savedPageNum} />
      </Container>
    </main>
  )
}
