-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lastNotifiedAt" TIMESTAMP(3),
ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'ru',
ADD COLUMN     "notifyStreak" BOOLEAN NOT NULL DEFAULT true;
