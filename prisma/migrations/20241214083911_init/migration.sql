/*
  Warnings:

  - You are about to drop the column `detail` on the `purchaseProducts` table. All the data in the column will be lost.
  - Added the required column `details` to the `purchaseProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchaseProducts" DROP COLUMN "detail",
ADD COLUMN     "details" TEXT NOT NULL;
