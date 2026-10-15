import { getCurrentUser } from "@/entities/user/api/queries"
import { UserProfile } from "@/widgets/user-profile-card"
import { LanguageSwitcher } from "@/features/switch-locale"
import { getTranslations } from "next-intl/server"
import { Container, SettingsGroup, SettingsRow } from "@/shared/client/ui"
import { PremiumRow } from "@/features/buy-premium"
import { Streak } from "@/widgets/streak-widget"
import { User } from "lucide-react"
import { AuthGate } from "@/features/telegram-auth"

export async function UserProfileView() {
  const profile = await getCurrentUser()
  const t = await getTranslations("profile")

  if (!profile) return <AuthGate />

  return (
    <main>
      <Container>
        <UserProfile profile={profile} />

        <div className="mt-8 flex flex-col gap-8">
          <SettingsGroup title={t("subscription")}>
            <PremiumRow isPremium={profile.isPremium} />
          </SettingsGroup>

          <SettingsGroup title={t("stats")}>
            <Streak />
          </SettingsGroup>

          <SettingsGroup title={t("settings")}>
            <LanguageSwitcher />
          </SettingsGroup>

          {profile.role === "ADMIN" && (
            <SettingsGroup title={t("admin")}>
              <SettingsRow
                icon={<User className="size-5" />}
                label={t("adminSub")}
                href="/admin"
              />
            </SettingsGroup>
          )}
        </div>
      </Container>
    </main>
  )
}
