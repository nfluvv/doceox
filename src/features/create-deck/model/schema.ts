import { z } from "zod"

export const createDeckSchema = z.object({
  title: z
    .string()
    .min(3, "The name must be at least 3 characters")
    .max(50, "The title must be no more than 50 characters")
    .trim(),
  description: z
    .string()
    .max(300, "The description is too long")
    .optional()
    .or(z.literal("")),
})

export type CreateDeckInput = z.infer<typeof createDeckSchema>
