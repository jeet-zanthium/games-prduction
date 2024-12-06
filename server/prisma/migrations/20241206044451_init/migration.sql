/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserChildren` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "active_statuses" AS ENUM ('ACTIVE', 'IN_ACTIVE');

-- CreateEnum
CREATE TYPE "block_statuses" AS ENUM ('BLOCKED', 'UN_BLOCKED');

-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_referred_by_fkey";

-- DropForeignKey
ALTER TABLE "UserChildren" DROP CONSTRAINT "UserChildren_child_id_fkey";

-- DropForeignKey
ALTER TABLE "UserChildren" DROP CONSTRAINT "UserChildren_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_user_id_fkey";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserChildren";

-- DropTable
DROP TABLE "Wallet";

-- DropEnum
DROP TYPE "ActiveStatus";

-- DropEnum
DROP TYPE "BlockStatus";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "referral_code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(10) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "referred_by" INTEGER,
    "role" "roles" NOT NULL DEFAULT 'USER',
    "activated_at" TIMESTAMP(3),
    "active_status" "active_statuses" NOT NULL DEFAULT 'IN_ACTIVE',
    "block_status" "block_statuses" NOT NULL DEFAULT 'UN_BLOCKED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallets" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "recharge_wallet" DECIMAL(12,4) NOT NULL,
    "winning_wallet" DECIMAL(12,4) NOT NULL,
    "bonus_wallet" DECIMAL(12,4) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_children" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "child_id" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "user_children_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_referral_code_key" ON "users"("referral_code");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_user_id_key" ON "wallets"("user_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_referred_by_fkey" FOREIGN KEY ("referred_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_children" ADD CONSTRAINT "user_children_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_children" ADD CONSTRAINT "user_children_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
