/*
  Warnings:

  - You are about to drop the `Achat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Achat";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "achat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);
