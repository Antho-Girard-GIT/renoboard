"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { useSession } from "../../../lib/auth-client";

type Achat = {
  id: string;
  nom: string;
  description: string;
};
const AchatsPage = () => {
  useSession();
  const [Achats, setAchats] = useState<Achat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    setLoading(true);
    fetch("/api/buy")
      .then((res) => res.json())
      .then((data) => {
        setAchats(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des achats.");
        setLoading(false);
      });
  }, [isClient]);

  const handleDeleteAchats = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/buy", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      setAchats(Achats.filter((Achat) => Achat.id !== id));
    } catch {
      setError("Erreur lors de la suppression de l'achat.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAchat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newAchat = {
      nom: String(formData.get("nom")),
      description: String(formData.get("description")),
    };
    if (!newAchat.nom || !newAchat.description) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAchat),
      });
      if (!res.ok) throw new Error("Erreur lors de la création");
      const created = await res.json();
      setAchats([...Achats, created]);
      form.reset();
    } catch {
      setError("Erreur lors de la création de l'achat'.");
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
        <CardTitle className="text-center text-2xl p-4">
          Gestion des achats
        </CardTitle>
        <CardContent>
          <form
            onSubmit={handleCreateAchat}
            className="flex flex-col md:flex-row gap-2 w-full items-end mb-6"
          >
            <div className="flex flex-col gap-1 w-full md:w-1/4">
              <label
                htmlFor="nom"
                className="text-xs font-medium text-muted-foreground"
              >
                Achat
              </label>
              <Input
                type="text"
                name="nom"
                id="nom"
                placeholder="Achat"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-1 w-full md:w-1/3">
              <label
                htmlFor="description"
                className="text-xs font-medium text-muted-foreground"
              >
                Description
              </label>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
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
                    <th className="px-4 py-2 font-semibold text-left">Achats</th>
                    <th className="px-4 py-2 font-semibold text-left">
                      Description</th>
                    <th className="px-4 py-2 font-semibold text-left">Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {Achats.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-6 text-muted-foreground"
                      >
                        Aucune achat trouvée.
                      </td>
                    </tr>
                  ) : (
                    Achats.map((Achat) => (
                      <tr
                        key={Achat.id}
                        className="even:bg-gray-50 dark:even:bg-gray-800/40"
                      >
                        <td className="px-4 py-2">{Achat.nom}</td>
                        <td className="px-4 py-2">{Achat.description}</td>
                        <td className="px-4 py-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteAchats(Achat.id)}
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
export default AchatsPage;
