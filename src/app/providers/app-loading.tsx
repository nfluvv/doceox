import { Container, Loader } from "@/shared/client/ui"

export function AppLoading() {
  return (
    <main>
      <Container className="flex items-center justify-center">
        <Loader />
      </Container>
    </main>
  )
}
