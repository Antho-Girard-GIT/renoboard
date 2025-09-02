/*
  Warnings:

  - You are about to drop the column `date` on the `depense` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Mesure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tache` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mesure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "valeur" DECIMAL NOT NULL,
    "unite" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_Mesure" ("id", "nom", "unite", "valeur") SELECT "id", "nom", "unite", "valeur" FROM "Mesure";
DROP TABLE "Mesure";
ALTER TABLE "new_Mesure" RENAME TO "Mesure";
CREATE UNIQUE INDEX "Mesure_nom_key" ON "Mesure"("nom");
CREATE TABLE "new_Tache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "etat" TEXT NOT NULL DEFAULT 'en cours',
    "userId" TEXT NOT NULL
);
INSERT INTO "new_Tache" ("date", "description", "etat", "id", "nom") SELECT "date", "description", "etat", "id", "nom" FROM "Tache";
DROP TABLE "Tache";
ALTER TABLE "new_Tache" RENAME TO "Tache";
CREATE UNIQUE INDEX "Tache_nom_date_key" ON "Tache"("nom", "date");
CREATE TABLE "new_depense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "montant" DECIMAL NOT NULL,
    "categorie" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_depense" ("categorie", "id", "montant", "nom", "userId") SELECT "categorie", "id", "montant", "nom", "userId" FROM "depense";
DROP TABLE "depense";
ALTER TABLE "new_depense" RENAME TO "depense";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
