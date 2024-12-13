/*
  Warnings:

  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_productId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- DropTable
DROP TABLE "Rating";

-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "ratings" (
    "ratingId" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "productId" UUID NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("ratingId")
);

-- CreateTable
CREATE TABLE "reviews" (
    "reviewId" UUID NOT NULL,
    "review" TEXT NOT NULL,
    "productId" UUID NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "replays" (
    "replayId" UUID NOT NULL,
    "replay" TEXT NOT NULL,
    "reviewId" UUID NOT NULL,

    CONSTRAINT "replays_pkey" PRIMARY KEY ("replayId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ratings_productId_key" ON "ratings"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_productId_key" ON "reviews"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "replays_reviewId_key" ON "replays"("reviewId");

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replays" ADD CONSTRAINT "replays_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("reviewId") ON DELETE RESTRICT ON UPDATE CASCADE;
