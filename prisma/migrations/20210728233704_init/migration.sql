/*
  Warnings:

  - A unique constraint covering the columns `[NAME]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category.NAME_unique" ON "Category"("NAME");
