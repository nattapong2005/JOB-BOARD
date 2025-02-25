-- AlterTable
ALTER TABLE `application` MODIFY `application_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_jobpostID_fkey` FOREIGN KEY (`jobpostID`) REFERENCES `jobpost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobpost` ADD CONSTRAINT `jobpost_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobpost` ADD CONSTRAINT `jobpost_jobtypeID_fkey` FOREIGN KEY (`jobtypeID`) REFERENCES `jobtype`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
