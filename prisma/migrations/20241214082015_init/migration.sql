/*
  Warnings:

  - You are about to drop the `PurchasedProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PurchasedProduct" DROP CONSTRAINT "PurchasedProduct_userId_fkey";

-- DropTable
DROP TABLE "PurchasedProduct";

-- CreateTable
CREATE TABLE "purchaseProducts" (
    "purchasedProductId" UUID NOT NULL,
    "productName" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "purchased" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID NOT NULL,

    CONSTRAINT "purchaseProducts_pkey" PRIMARY KEY ("purchasedProductId")
);

-- AddForeignKey
ALTER TABLE "purchaseProducts" ADD CONSTRAINT "purchaseProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
