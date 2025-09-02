"use client"
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";


export default function DashboardPage() {
  const [totalDepenses, setTotalDepenses] = useState(0);
  const [mesuresCount, setMesuresCount] = useState(0);
  const [tachesCount, setTachesCount] = useState(0);
  const [achatsCount, setAchatsCount] = useState(0);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetch("/api/expense");
        const data = await response.json();
        const total = data.reduce((sum: number, expense: { montant: number }) => sum + Number(expense.montant), 0);
        setTotalDepenses(total);
      } catch (error) {
        console.error("Erreur lors de la récupération des dépenses:", error);
      }
    };

    const getMesures = async () => {
      try {
        const response = await fetch("/api/mesure");
        const data = await response.json();
        setMesuresCount(data.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des mesures:", error);
      }
    };

    const getTaches = async () => {
      try {
        const response = await fetch("/api/todo");
        const data = await response.json();
        setTachesCount(data.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches:", error);
      }
    };

    const getAchats = async () => {
      try {
        const response = await fetch("/api/buy");
        const data = await response.json();
        setAchatsCount(data.length);
      } catch (error) {
        console.error("Erreur lors de la récupération des achats:", error);
      }
    };
    getExpenses();
    getMesures();
    getTaches();
    getAchats();
  }, []);

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-background via-gray-100 to-gray-200 dark:from-background dark:via-gray-900 dark:to-gray-950 rounded-2xl mx-10 my-5">
      <Card className="w-full shadow-xl border-none bg-white/90 dark:bg-gray-900/80">
        <Card className="text-center text-2xl font-luckiest-guy p-4 mx-auto mt-4 mb-2 w-fit">
          <CardTitle>
          Tableau de bord
          </CardTitle>
        </Card>
<CardContent>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <Card>
      <CardTitle className="flex justify-center font-luckiest-guy">Dépenses</CardTitle>
      <CardContent className="flex flex-col items-center">
        <p>Total des dépenses : {Number(totalDepenses)} $</p>
      </CardContent>
    </Card>
    <Card>
      <CardTitle className="flex justify-center">Mesures</CardTitle>
      <CardContent>
        <p>Nombre de mesures : {mesuresCount}</p>
      </CardContent>
    </Card>
    <Card>
      <CardTitle className="flex justify-center">Tâches</CardTitle>
      <CardContent>
        <p>Nombre de tâches : {tachesCount}</p>
      </CardContent>
    </Card>
    <Card>
      <CardTitle className="flex justify-center">Liste d&apos;achat</CardTitle>
      <CardContent>
        <p>Nombre d&apos;achats : {achatsCount}</p>
      </CardContent>
    </Card>
  </div>
</CardContent>
      </Card>
    </div>
  )
}
