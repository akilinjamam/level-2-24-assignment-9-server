-- AlterTable
ALTER TABLE "users" ADD COLUMN     "blacklist" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "suspend" BOOLEAN NOT NULL DEFAULT false;
