/*
  Warnings:

  - You are about to drop the column `userId` on the `company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userID]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userID` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `company` DROP FOREIGN KEY `company_userId_fkey`;

-- DropIndex
DROP INDEX `company_userId_key` ON `company`;

-- AlterTable
ALTER TABLE `company` DROP COLUMN `userId`,
    ADD COLUMN `userID` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `company_userID_key` ON `company`(`userID`);

-- AddForeignKey
ALTER TABLE `company` ADD CONSTRAINT `company_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
