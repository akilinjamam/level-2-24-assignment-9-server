/*
  Warnings:

  - Added the required column `purchasedProductId` to the `ratings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ratings" ADD COLUMN     "purchasedProductId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_purchasedProductId_fkey" FOREIGN KEY ("purchasedProductId") REFERENCES "purchaseProducts"("purchasedProductId") ON DELETE RESTRICT ON UPDATE CASCADE;
