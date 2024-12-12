-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'VENDOR');

-- CreateTable
CREATE TABLE "vendors" (
    "vendorId" UUID NOT NULL,
    "vendorName" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "followedCount" INTEGER NOT NULL DEFAULT 0,

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

-- CreateTable
CREATE TABLE "users" (
    "userId" UUID NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "userType" "UserType" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "follows" (
    "followId" UUID NOT NULL,
    "vendorId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("followId")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_vendorId_key" ON "products"("vendorId");

-- CreateIndex
CREATE UNIQUE INDEX "follows_vendorId_userId_key" ON "follows"("vendorId", "userId");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
