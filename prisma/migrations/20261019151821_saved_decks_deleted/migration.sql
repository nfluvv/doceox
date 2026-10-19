/*
  Warnings:

  - You are about to drop the `role_change_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `saved_decks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "saved_decks" DROP CONSTRAINT "saved_decks_deckId_fkey";

-- DropForeignKey
ALTER TABLE "saved_decks" DROP CONSTRAINT "saved_decks_userId_fkey";

-- DropTable
DROP TABLE "role_change_logs";

-- DropTable
DROP TABLE "saved_decks";
