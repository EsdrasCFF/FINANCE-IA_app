/*
  Warnings:

  - Added the required column `user_id` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "user_id" TEXT NOT NULL;
