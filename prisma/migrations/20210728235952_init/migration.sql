-- CreateTable
CREATE TABLE "Brand" (
    "ID" TEXT NOT NULL,
    "NAME" TEXT NOT NULL,
    "CREATED_AT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand.NAME_unique" ON "Brand"("NAME");
