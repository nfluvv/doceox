import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getTranslations } from "next-intl/server"

import { getAllUsers } from "@/entities/user/api/queries"
import { getQueryClient } from "@/shared/server/lib/get-query-client"
import { AdminUsers } from "@/widgets/admin-users"
import { adminUsersQueryKey } from "@/widgets/admin-users/api/use-admin-users-query"
import { Container } from "@/shared/client/ui"

type AdminPageProps = {
  searchParams: Promise<{
    q?: string
    page?: string
  }>
}

export async function AdminPage({ searchParams }: AdminPageProps) {
  const { q = "", page } = await searchParams

  const pageNum = page ? Number(page) : 1

  const t = await getTranslations("adminUsers")
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: adminUsersQueryKey(q, pageNum),
    queryFn: () =>
      getAllUsers({
        query: q,
        page: pageNum,
      }),
  })

  return (
    <main className="mx-auto max-w-4xl space-y-6 py-10">
      <Container>
        <h1 className="text-2xl font-semibold">{t("title")}</h1>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <AdminUsers
            initialQuery={q}
            initialPage={pageNum}
          />
        </HydrationBoundary>
      </Container>
    </main>
  )
}
