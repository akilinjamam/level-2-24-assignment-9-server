/*
  Warnings:

  - You are about to drop the column `ratings` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "ratings";

-- CreateTable
CREATE TABLE "Rating" (
    "rating" INTEGER NOT NULL,
    "productId" UUID NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Review" (
    "review" TEXT NOT NULL,
    "productId" UUID NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("productId")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
