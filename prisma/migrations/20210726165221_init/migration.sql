/*
  Warnings:

  - Added the required column `PASSWORD` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "PASSWORD" TEXT NOT NULL;
