/*
  Warnings:

  - You are about to drop the `Tache` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tache";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "tache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "etat" TEXT NOT NULL DEFAULT 'en cours',
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tache_nom_date_key" ON "tache"("nom", "date");
