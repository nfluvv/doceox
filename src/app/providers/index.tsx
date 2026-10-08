"use client"

import { Suspense, type PropsWithChildren } from "react"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

import { QueryProvider } from "./query-provider"
import { ThemeProvider } from "./theme-provider"
import { TwaGuard } from "./twa-guard"
import { TelegramAutoLogin } from "./telegram-auto-login"

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <QueryProvider>
          {/* <TwaGuard>{children}</TwaGuard> */}
          {children}
          <Suspense fallback={<div>Loading...</div>}>
            <TelegramAutoLogin />
          </Suspense>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid var(--border)",
              },
            }}
          />
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
