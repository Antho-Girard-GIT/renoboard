"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from '../../../lib/auth-client';
import { Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';


type Depense = {
  id: string;
  nom: string;
  montant: number;
  categorie: string;
};
const DepensesPage = () => {
  useSession();
  const [depenses, setDepenses] = useState<Depense[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    setLoading(true);
    fetch('/api/expense')
      .then((res) => res.json())
      .then((data) => {
        setDepenses(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement des dépenses.');
        setLoading(false);
      });
  }, [isClient]);

  const handleDeleteDepense = (id: string) => {
    setDepenses(depenses.filter((depense) => depense.id !== id));
  };

  const handleCreateDepense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newDepense = {
      nom: String(formData.get('nom')),
      montant: Number(formData.get('montant')),
      categorie: String(formData.get('categorie')),
    };
    if (!newDepense.nom || !newDepense.montant || !newDepense.categorie) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDepense),
      });
      if (!res.ok) throw new Error('Erreur lors de la création');
      const created = await res.json();
      setDepenses([...depenses, created]);
      form.reset();
    } catch {
      setError('Erreur lors de la création de la dépense.');
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
  <div className="flex items-center justify-center bg-gradient-to-br from-background via-gray-100 to-gray-200 dark:from-background dark:via-gray-900 dark:to-gray-950 rounded-2xl mx-10 my-5">
        <Card className="w-full shadow-xl border-none bg-white/90 dark:bg-gray-900/80">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center tracking-tight">Dépenses<br></br>Total : {Math.round(depenses.reduce((sum, depense) => sum + Number(depense.montant), 0) * 100) / 100} $</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateDepense} className="flex flex-col md:flex-row gap-2 w-full items-end mb-6">
            <div className="flex flex-col gap-1 w-full md:w-1/3">
              <label htmlFor="nom" className="text-xs font-medium text-muted-foreground">Nom</label>
              <Input type="text" name="nom" id="nom" placeholder="Nom" autoComplete="off" />
            </div>
            <div className="flex flex-col gap-1 w-full md:w-1/4">
              <label htmlFor="montant" className="text-xs font-medium text-muted-foreground">Montant</label>
              <Input type="number" name="montant" id="montant" placeholder="Montant" min="0" step="0.01" autoComplete="off" />
            </div>
            <div className="flex flex-col gap-1 w-full md:w-1/3">
              <label htmlFor="categorie" className="text-xs font-medium text-muted-foreground">Description</label>
              <Input type="text" name="categorie" id="categorie" placeholder="Description" autoComplete="off" />
            </div>
            <Button type="submit" className="w-full md:w-auto mt-2 md:mt-0">Ajouter</Button>
          </form>
          {error && <div className="text-destructive text-center py-2">{error}</div>}
          <Separator className="my-4" />
          {loading ? (
            <div className="text-center text-muted-foreground py-8">Chargement…</div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border bg-background/60 dark:bg-gray-900/60">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 font-semibold text-left">Nom</th>
                    <th className="px-4 py-2 font-semibold text-left">Montant</th>
                    <th className="px-4 py-2 font-semibold text-left">Description</th>
                    <th className="px-4 py-2 font-semibold text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {depenses.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-muted-foreground">Aucune dépense</td>
                    </tr>
                  ) : (
                    depenses.map((depense) => (
                      <tr key={depense.id} className="even:bg-gray-50 dark:even:bg-gray-800/40">
                        <td className="px-4 py-2">{depense.nom}</td>
                        <td className="px-4 py-2">{depense.montant} $</td>
                        <td className="px-4 py-2">{depense.categorie}</td>
                        <td className="px-4 py-2">
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteDepense(depense.id)}>
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
        </Card>
    </div>
  );
};

export default DepensesPage;