/*
  Warnings:

  - Added the required column `locationDescription` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "locationDescription" TEXT NOT NULL;
