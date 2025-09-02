-- CreateTable
CREATE TABLE "Achat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prix" DECIMAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "depense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "montant" DECIMAL NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categorie" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mesure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "valeur" DECIMAL NOT NULL,
    "unite" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "etat" TEXT NOT NULL DEFAULT 'en cours'
);

-- CreateIndex
CREATE UNIQUE INDEX "Achat_nom_date_key" ON "Achat"("nom", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Mesure_nom_key" ON "Mesure"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Tache_nom_date_key" ON "Tache"("nom", "date");
