-- CreateTable
CREATE TABLE "Product" (
    "ID" TEXT NOT NULL,
    "NAME" TEXT NOT NULL,
    "DESCRIPTION" TEXT NOT NULL,
    "PRICE" DOUBLE PRECISION NOT NULL,
    "QT_STOCK" INTEGER NOT NULL,
    "CATEGORY_ID" TEXT,
    "BRAND_ID" TEXT,
    "CREATED_AT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("CATEGORY_ID") REFERENCES "Category"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("BRAND_ID") REFERENCES "Brand"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
