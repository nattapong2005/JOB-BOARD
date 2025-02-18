/*
  Warnings:

  - You are about to drop the column `usertypeID` on the `users` table. All the data in the column will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `usertypeID`,
    ADD COLUMN `role` VARCHAR(191) NOT NULL;
