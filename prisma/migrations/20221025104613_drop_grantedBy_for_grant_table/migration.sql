/*
  Warnings:

  - You are about to drop the column `grantedBy` on the `grants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "grants" DROP COLUMN "grantedBy",
ALTER COLUMN "attributes" SET DEFAULT '';
