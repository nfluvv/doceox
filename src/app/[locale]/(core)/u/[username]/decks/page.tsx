import { notFound } from "next/navigation"
import { getCurrentUser, getUserByUsername } from "@/entities/user/api/queries"
import { getPublicUserDecks } from "@/entities/deck/api/queries"
import { UserDecks } from "@/views/user-decks"
import { AuthGate } from "@/features/telegram-auth"

type UserProfilePageProps = {
  params: Promise<{ username: string }>
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { username } = await params
  const profile = await getUserByUsername(username)

  if (!profile) return <AuthGate />

  const [currentUser, decks] = await Promise.all([
    getCurrentUser(),
    getPublicUserDecks(profile.id),
  ])

  if (!decks) notFound()

  return <UserDecks profile={profile} decks={decks} currentUser={currentUser} />
}
