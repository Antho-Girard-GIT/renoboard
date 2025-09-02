/*
  Warnings:

  - You are about to drop the `Mesure` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Mesure";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "mesure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "unite" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "mesure_nom_key" ON "mesure"("nom");
