-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "listingDate" DATETIME,
    "logoUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "previousClose" REAL NOT NULL,
    "change" REAL NOT NULL,
    "changePercent" REAL NOT NULL,
    "dayHigh" REAL,
    "dayLow" REAL,
    "volume" INTEGER,
    "marketCap" REAL,
    "asOf" DATETIME NOT NULL,
    "source" TEXT NOT NULL,
    "isPlaceholder" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Quote_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fundamentals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "periodLabel" TEXT NOT NULL,
    "periodType" TEXT NOT NULL,
    "fiscalYearEnd" DATETIME NOT NULL,
    "revenue" REAL,
    "profit" REAL,
    "operatingCashFlow" REAL,
    "totalDebt" REAL,
    "eps" REAL,
    "dividendPerShare" REAL,
    "dividendYield" REAL,
    "roe" REAL,
    "peRatio" REAL,
    "pbRatio" REAL,
    "sharesOutstanding" REAL,
    "asOf" DATETIME NOT NULL,
    "source" TEXT NOT NULL,
    "isPlaceholder" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Fundamentals_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "open" REAL NOT NULL,
    "high" REAL NOT NULL,
    "low" REAL NOT NULL,
    "close" REAL NOT NULL,
    "volume" INTEGER,
    "source" TEXT NOT NULL,
    "isPlaceholder" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "PriceHistory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DividendHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "declaredYear" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "exDate" DATETIME,
    "paymentDate" DATETIME,
    "source" TEXT NOT NULL,
    "isPlaceholder" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "DividendHistory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_symbol_key" ON "Company"("symbol");

-- CreateIndex
CREATE INDEX "Company_sector_idx" ON "Company"("sector");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_companyId_key" ON "Quote"("companyId");

-- CreateIndex
CREATE INDEX "Fundamentals_companyId_idx" ON "Fundamentals"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Fundamentals_companyId_periodLabel_key" ON "Fundamentals"("companyId", "periodLabel");

-- CreateIndex
CREATE INDEX "PriceHistory_companyId_date_idx" ON "PriceHistory"("companyId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "PriceHistory_companyId_date_key" ON "PriceHistory"("companyId", "date");

-- CreateIndex
CREATE INDEX "DividendHistory_companyId_declaredYear_idx" ON "DividendHistory"("companyId", "declaredYear");
