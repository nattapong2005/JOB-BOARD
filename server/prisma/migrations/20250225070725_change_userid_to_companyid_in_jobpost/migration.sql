/*
  Warnings:

  - You are about to drop the column `userID` on the `jobpost` table. All the data in the column will be lost.
  - Added the required column `companyID` to the `jobpost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `jobpost` DROP FOREIGN KEY `jobpost_userID_fkey`;

-- AlterTable
ALTER TABLE `jobpost` DROP COLUMN `userID`,
    ADD COLUMN `companyID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `jobpost` ADD CONSTRAINT `jobpost_companyID_fkey` FOREIGN KEY (`companyID`) REFERENCES `company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
