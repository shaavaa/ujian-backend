/*
  Warnings:

  - You are about to alter the column `lamaSewa` on the `rent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `rent` MODIFY `lamaSewa` INTEGER NOT NULL DEFAULT 0;
