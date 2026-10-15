import type { Order, Prisma } from "@prisma/client"

type Fulfill = (tx: Prisma.TransactionClient, order: Order) => Promise<void>

const setPremium =
  (value: boolean): Fulfill =>
  async (tx, order) => {
    await tx.user.update({
      where: { id: order.userId },
      data: { isPremium: value },
    })
  }

export const PRODUCTS = {
  premium_lifetime: {
    title: "Lifetime Premium",
    description: "Lifetime access to Premium",
    stars: 149,
    fulfill: setPremium(true),
    revoke: setPremium(false),
  },
} satisfies Record<
  string,
  {
    title: string
    description: string
    stars: number
    fulfill: Fulfill
    revoke: Fulfill
  }
>

export type ProductId = keyof typeof PRODUCTS
