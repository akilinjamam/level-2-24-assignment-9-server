-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'VENDOR', 'ADMIN');

-- CreateTable
CREATE TABLE "vendors" (
    "vendorId" UUID NOT NULL,
    "vendorName" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "userId" TEXT NOT NULL DEFAULT '1234',
    "followedCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "vendors_pkey" PRIMARY KEY ("vendorId")
);

-- CreateTable
CREATE TABLE "products" (
    "productId" UUID NOT NULL,
    "productName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "stock" BOOLEAN NOT NULL DEFAULT true,
    "price" INTEGER NOT NULL,
    "flashSale" BOOLEAN NOT NULL DEFAULT false,
    "details" TEXT NOT NULL,
    "suspend" BOOLEAN NOT NULL DEFAULT false,
    "clicked" INTEGER NOT NULL,
    "images" TEXT[],
    "vendorId" UUID NOT NULL,
    "couponCode" TEXT NOT NULL DEFAULT 'not-added',
    "couponValue" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "users" (
    "userId" UUID NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '1234',
    "suspend" BOOLEAN NOT NULL DEFAULT false,
    "blacklist" BOOLEAN NOT NULL DEFAULT false,
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

-- CreateTable
CREATE TABLE "ratings" (
    "ratingId" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "productId" UUID NOT NULL,
    "purchasedProductId" UUID NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("ratingId")
);

-- CreateTable
CREATE TABLE "reviews" (
    "reviewId" UUID NOT NULL,
    "review" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" UUID NOT NULL,
    "purchasedProductId" UUID NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "replays" (
    "replayId" UUID NOT NULL,
    "userId" TEXT NOT NULL,
    "replay" TEXT NOT NULL,
    "reviewId" UUID NOT NULL,

    CONSTRAINT "replays_pkey" PRIMARY KEY ("replayId")
);

-- CreateTable
CREATE TABLE "purchaseProducts" (
    "purchasedProductId" UUID NOT NULL,
    "productName" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "suspend" BOOLEAN NOT NULL DEFAULT false,
    "purchased" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID NOT NULL,
    "productId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL DEFAULT '123',

    CONSTRAINT "purchaseProducts_pkey" PRIMARY KEY ("purchasedProductId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "follows_vendorId_userId_key" ON "follows"("vendorId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_productId_key" ON "ratings"("productId");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_purchasedProductId_fkey" FOREIGN KEY ("purchasedProductId") REFERENCES "purchaseProducts"("purchasedProductId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_purchasedProductId_fkey" FOREIGN KEY ("purchasedProductId") REFERENCES "purchaseProducts"("purchasedProductId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replays" ADD CONSTRAINT "replays_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchaseProducts" ADD CONSTRAINT "purchaseProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
