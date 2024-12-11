-- CreateTable
CREATE TABLE "vendors" (
    "vendorId" UUID NOT NULL,
    "vendorName" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "follow" INTEGER NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("vendorId")
);

-- CreateTable
CREATE TABLE "products" (
    "productId" UUID NOT NULL,
    "productName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "ratings" INTEGER NOT NULL,
    "details" TEXT NOT NULL,
    "clicked" INTEGER NOT NULL,
    "images" TEXT[],
    "vendorId" UUID NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_vendorId_key" ON "products"("vendorId");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;
