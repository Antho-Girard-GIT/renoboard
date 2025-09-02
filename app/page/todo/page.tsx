"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { useSession } from "../../../lib/auth-client";

type Tache = {
  id: string;
  nom: string;
  description: string;
  date: Date | string | null;
};
const TachesPage = () => {
  useSession();
  const [Taches, setTaches] = useState<Tache[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    setLoading(true);
    fetch("/api/todo")
      .then((res) => res.json())
      .then((data) => {
        setTaches(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur lors du chargement des tâches.");
        setLoading(false);
      });
  }, [isClient]);

  const handleDeleteTaches = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/todo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
      setTaches(Taches.filter((Tache) => Tache.id !== id));
    } catch {
      setError("Erreur lors de la suppression de la tâche.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTache = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newTache = {
      nom: String(formData.get("nom")),
      description: String(formData.get("description")),
      date: formData.get("date")
        ? new Date(String(formData.get("date")))
        : null,
    };
    if (!newTache.nom || !newTache.description || !newTache.date) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTache),
      });
      if (!res.ok) throw new Error("Erreur lors de la création");
      const created = await res.json();
      setTaches([...Taches, created]);
      form.reset();
    } catch {
      setError("Erreur lors de la création de la tâche.");
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
          Gestion des tâches
        </CardTitle>
        <CardContent>
          <form
            onSubmit={handleCreateTache}
            className="flex flex-col md:flex-row gap-2 w-full items-end mb-6"
          >
            <div className="flex flex-col gap-1 w-full md:w-1/4">
              <label
                htmlFor="nom"
                className="text-xs font-medium text-muted-foreground"
              >
                Nom
              </label>
              <Input
                type="text"
                name="nom"
                id="nom"
                placeholder="Nom"
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
            <div className="flex flex-col gap-1 w-full md:w-1/4">
              <label
                htmlFor="date"
                className="text-xs font-medium text-muted-foreground"
              >
                Date
              </label>
              <Input type="date" name="date" id="date" />
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
                    <th className="px-4 py-2 font-semibold text-left">Nom</th>
                    <th className="px-4 py-2 font-semibold text-left">
                      Description
                    </th>
                    <th className="px-4 py-2 font-semibold text-left">Date</th>
                    <th className="px-4 py-2 font-semibold text-left">Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {Taches.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-6 text-muted-foreground"
                      >
                        Aucune tâche
                      </td>
                    </tr>
                  ) : (
                    Taches.map((Tache) => (
                      <tr
                        key={Tache.id}
                        className="even:bg-gray-50 dark:even:bg-gray-800/40"
                      >
                        <td className="px-4 py-2">{Tache.nom}</td>
                        <td className="px-4 py-2">{Tache.description}</td>
                        <td className="px-4 py-2">
                          {Tache.date
                            ? new Date(Tache.date).toLocaleDateString("fr-FR", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              })
                            : ""}
                        </td>
                        <td className="px-4 py-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteTaches(Tache.id)}
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
export default TachesPage;
