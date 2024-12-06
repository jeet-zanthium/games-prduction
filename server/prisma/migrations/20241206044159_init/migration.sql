-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('ACTIVE', 'IN_ACTIVE');

-- CreateEnum
CREATE TYPE "BlockStatus" AS ENUM ('BLOCKED', 'UN_BLOCKED');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "referral_code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(10) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "referred_by" INTEGER,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "activatedAt" TIMESTAMP(3),
    "active_status" "ActiveStatus" NOT NULL DEFAULT 'IN_ACTIVE',
    "block_status" "BlockStatus" NOT NULL DEFAULT 'UN_BLOCKED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "recharge_wallet" DECIMAL(12,4) NOT NULL,
    "winning_wallet" DECIMAL(12,4) NOT NULL,
    "bonus_wallet" DECIMAL(12,4) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserChildren" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "child_id" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "UserChildren_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_referral_code_key" ON "User"("referral_code");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_user_id_key" ON "Wallet"("user_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referred_by_fkey" FOREIGN KEY ("referred_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChildren" ADD CONSTRAINT "UserChildren_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserChildren" ADD CONSTRAINT "UserChildren_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
