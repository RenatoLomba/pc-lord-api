-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "NUM_VIEWS" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "RATING" DOUBLE PRECISION NOT NULL DEFAULT 0;
