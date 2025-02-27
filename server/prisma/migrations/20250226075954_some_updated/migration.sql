/*
  Warnings:

  - You are about to alter the column `status` on the `application` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(1))`.
  - You are about to alter the column `status` on the `jobpost` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `application` MODIFY `status` ENUM('NEW', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE `jobpost` MODIFY `status` ENUM('NEW', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'NEW';
