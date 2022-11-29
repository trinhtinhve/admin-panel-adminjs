/*
  Warnings:

  - Added the required column `grantedBy` to the `grants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "grants" ADD COLUMN     "grantedBy" TEXT NOT NULL;
