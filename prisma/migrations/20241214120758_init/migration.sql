/*
  Warnings:

  - Added the required column `productId` to the `purchaseProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchaseProducts" ADD COLUMN     "productId" TEXT NOT NULL;
