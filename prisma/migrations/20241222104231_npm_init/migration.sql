/*
  Warnings:

  - Added the required column `purchasedProductId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "purchasedProductId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_purchasedProductId_fkey" FOREIGN KEY ("purchasedProductId") REFERENCES "purchaseProducts"("purchasedProductId") ON DELETE RESTRICT ON UPDATE CASCADE;
