import { User as PrismaUser } from "@prisma/client"

export const USER_ROLES = ["USER", "ADMIN"] as const
export type UserRole = (typeof USER_ROLES)[number]

export type User = Omit<PrismaUser, "updatedAt" | "timezone" | "telegramId">

export type Profile = Pick<PrismaUser, "id" | "name" | "image" | "username">
