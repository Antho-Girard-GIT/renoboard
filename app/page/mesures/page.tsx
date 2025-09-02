"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { useSession } from "../../../lib/auth-client";

type Mesure = {
  id: string;
  nom: string;
  unite: string;
};
const MesuresPage = () => {
  useSession();
  const [Mesures, setMesures] = useState<Mesure[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    setLoading(true);
    fetch("/api/mesure")
      .then((res) => res.json())
      .then((data) => {
        setMesures(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des mesures.");
        setLoading(false);
      });
  }, [isClient]);

  const handleDeleteMesures = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/mesure", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      setMesures(Mesures.filter((Mesure) => Mesure.id !== id));
    } catch {
      setError("Erreur lors de la suppression de la mesure.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMesure = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newMesure = {
      nom: String(formData.get("nom")),
      unite: String(formData.get("unite")),
    };
    if (!newMesure.nom || !newMesure.unite) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/mesure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMesure),
      });
      if (!res.ok) throw new Error("Erreur lors de la création");
      const created = await res.json();
      setMesures([...Mesures, created]);
      form.reset();
    } catch {
      setError("Erreur lors de la création de la mesure'.");
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
        <CardTitle className="text-center text-2xl font-bold p-4">
          Gestion des mesures
        </CardTitle>
        <CardContent>
          <form
            onSubmit={handleCreateMesure}
            className="flex flex-col md:flex-row gap-2 w-full items-end mb-6"
          >
            <div className="flex flex-col gap-1 w-full md:w-1/4">
              <label
                htmlFor="nom"
                className="text-xs font-medium text-muted-foreground"
              >
                Pièce
              </label>
              <Input
                type="text"
                name="nom"
                id="nom"
                placeholder="Pièce"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-1 w-full md:w-1/3">
              <label
                htmlFor="unite"
                className="text-xs font-medium text-muted-foreground"
              >
                Dimension
              </label>
              <Input
                type="text"
                name="unite"
                id="unite"
                placeholder="Dimension"
                autoComplete="off"
              />
            </div>
            <Button type="submit" className="w-full md:w-auto mt-2 md:mt-0">
              Ajouter
            </Button>
          </form>
          {error && (
            <div className="text-destructive text-center py-2">{error}</div>
          )}
          <Separator className="my-4" />
          {loading ? (
            <div className="text-center text-muted-foreground py-8">
              Chargement…
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border bg-background/60 dark:bg-gray-900/60">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 font-semibold text-left">Pièce</th>
                    <th className="px-4 py-2 font-semibold text-left">
                      Dimension</th>
                    <th className="px-4 py-2 font-semibold text-left">Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {Mesures.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-6 text-muted-foreground"
                      >
                        Aucune mesures trouvée.
                      </td>
                    </tr>
                  ) : (
                    Mesures.map((Mesure) => (
                      <tr
                        key={Mesure.id}
                        className="even:bg-gray-50 dark:even:bg-gray-800/40"
                      >
                        <td className="px-4 py-2">{Mesure.nom}</td>
                        <td className="px-4 py-2">{Mesure.unite}</td>
                        <td className="px-4 py-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteMesures(Mesure.id)}
                          >
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
export default MesuresPage;
