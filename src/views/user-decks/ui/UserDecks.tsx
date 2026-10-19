import { getTranslations } from "next-intl/server"
import { Layers } from "lucide-react"
import { DeckCard } from "@/entities/deck"
import { CloneDeckButton } from "@/features/clone-deck"
import { Container } from "@/shared/client/ui"
import type { DeckWithCount } from "@/entities/deck"
import type { Profile } from "@/entities/user"

interface UserDecksProps {
  profile: Profile
  decks: DeckWithCount[]
}

export const UserDecks = async ({
  profile,
  decks,
}: UserDecksProps) => {
  const t = await getTranslations("profileDecks")
  const profileName = profile.name?.trim() || profile.username || "User"

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Container className="py-8">
        <header className="mb-8 border-b border-border/60 pb-6">
          <div className="flex items-end justify-between gap-6">
            <div className="min-w-0">
              <h1 className="truncate text-3xl font-semibold tracking-[-0.035em]">
                {t("decksTitle", { name: profileName })}
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                {t("heading")}
              </p>
            </div>

            {decks.length > 0 && (
              <span className="shrink-0 font-mono text-[10px] tracking-[0.12em] text-muted-foreground/60 uppercase">
                {decks.length}
              </span>
            )}
          </div>
        </header>

        {decks.length === 0 ? (
          <section className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 px-6 text-center">
            <div className="flex size-11 items-center justify-center rounded-full border border-border/60 bg-card">
              <Layers className="size-5 text-muted-foreground/60" />
            </div>

            <div className="mt-4 space-y-1">
              <p className="text-sm font-medium">{t("emptyTitle")}</p>

              <p className="mx-auto max-w-sm text-xs leading-relaxed text-muted-foreground">
                {t("emptyDescription")}
              </p>
            </div>
          </section>
        ) : (
          <section>
            <div className="grid grid-cols-1 gap-5">
              {decks.map((deck) => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  variant="public"
                  actions={<CloneDeckButton deckId={deck.id}/>}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  )
}
