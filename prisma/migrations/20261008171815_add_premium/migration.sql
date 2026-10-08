/*
  Warnings:

  - You are about to drop the column `premiumUntil` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "premiumUntil",
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false;
