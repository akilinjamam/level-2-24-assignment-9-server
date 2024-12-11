-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'VENDOR');

-- CreateTable
CREATE TABLE "users" (
    "userId" UUID NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
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
CREATE UNIQUE INDEX "follows_vendorId_userId_key" ON "follows"("vendorId", "userId");

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
