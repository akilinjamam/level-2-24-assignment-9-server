-- AlterTable
ALTER TABLE "products" ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stock" BOOLEAN NOT NULL DEFAULT true;
