-- CreateTable
CREATE TABLE "PurchasedProduct" (
    "purchasedProductId" UUID NOT NULL,
    "productName" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "purchased" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID NOT NULL,

    CONSTRAINT "PurchasedProduct_pkey" PRIMARY KEY ("purchasedProductId")
);

-- AddForeignKey
ALTER TABLE "PurchasedProduct" ADD CONSTRAINT "PurchasedProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
