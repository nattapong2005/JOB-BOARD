/*
  Warnings:

  - You are about to drop the column `companyId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_companyId_fkey`;

-- AlterTable
ALTER TABLE `company` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `companyId`;

-- CreateIndex
CREATE UNIQUE INDEX `company_userId_key` ON `company`(`userId`);

-- AddForeignKey
ALTER TABLE `company` ADD CONSTRAINT `company_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
