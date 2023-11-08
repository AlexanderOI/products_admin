-- CreateTable
CREATE TABLE "Section" (
    "section" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Category" (
    "category" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "SectionCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "section_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    CONSTRAINT "SectionCategory_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Section" ("section") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SectionCategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sub_category" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "img" TEXT NOT NULL,
    CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("category") ON DELETE RESTRICT ON UPDATE CASCADE
);
