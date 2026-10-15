import type { NextAuthConfig } from "next-auth"

const PUBLIC_ROUTES = ["/", "/forbidden", "/about", "/pricing", "/u"]

type CheckAuthorizationParams = {
  isLoggedIn: boolean
  role?: "USER" | "ADMIN"
  pathname: string
  locale: string
  origin: string
}

const isProd = process.env.NODE_ENV === "production"

export function checkAuthorization({
  isLoggedIn,
  role,
  pathname,
  locale,
  origin,
}: CheckAuthorizationParams): true | Response {
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return Response.redirect(new URL("/", origin))
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (!isLoggedIn && !isPublicRoute) {
    const url = new URL("/", origin)
    url.searchParams.set("next", pathname)
    return Response.redirect(url)
  }

  return true
}

export const authConfig = {
  pages: {
    signIn: "/",
    error: "/",
  },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: { authorized: () => true },
  cookies: {
    sessionToken: {
      name: isProd ? `__Secure-authjs.session-token` : `authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: isProd ? "none" : "lax",
        path: "/",
        secure: isProd,
      },
    },
  },
} satisfies NextAuthConfig
