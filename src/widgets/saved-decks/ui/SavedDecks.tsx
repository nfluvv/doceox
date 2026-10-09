import { SavedDecksGrid } from "./SavedDecksGrid"
import { SavedDecksSearch } from "./SavedDecksSearch"
import { getTranslations } from "next-intl/server"

interface SavedDecksProps {
  savedQuery?: string
  savedPage?: number
}

export const SavedDecks = async ({
  savedQuery,
  savedPage,
}: SavedDecksProps) => {
  const t = await getTranslations("dashboard")

  return (
    <section className="pb-12">
      <div className="mb-5 flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {t("saved.title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("saved.desc")}
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <SavedDecksSearch />
        </div>
      </div>

      <SavedDecksGrid savedQuery={savedQuery} savedPage={savedPage} />
    </section>
  )
}
