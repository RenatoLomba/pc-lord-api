-- CreateTable
CREATE TABLE "Address" (
    "ID" TEXT NOT NULL,
    "USER_ID" TEXT,
    "STREET" TEXT NOT NULL,
    "NUMBER" TEXT NOT NULL,
    "DISTRICT" TEXT NOT NULL,
    "CITY" TEXT NOT NULL,
    "STATE" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "CREATED_AT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Address" ADD FOREIGN KEY ("USER_ID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
