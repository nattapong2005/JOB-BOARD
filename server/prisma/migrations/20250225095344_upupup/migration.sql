/*
  Warnings:

  - Added the required column `address` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `jobpost` ADD COLUMN `posted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
