import Image from 'next/image'
import LogoRB from '@/public/LogoRb2.png'


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 mx-4 md:mx-10 pb-10 rounded-2xl border-4 border-gray-950/40 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 shadow-2xl">
      {/* Header avec logo */}
      <Image src={LogoRB} alt="Logo renoboard"
        className="w-32 md:w-48 border rounded-full border-2 border-blue-200 mt-10 shadow-2xl shadow-blue-900/40 bg-black" />
      <h1 className="text-4xl md:text-6xl uppercase font-black mb-3 text-white drop-shadow-lg text-center">Bienvenue sur Renoboard</h1>
      {/* À propos */}
      <p className="text-xl md:text-2xl text-center px-4 md:px-32 font-bold text-gray-200 mb-6">
        Simplifiez la gestion de vos projets de rénovation ou de construction grâce à une plateforme tout-en-un : suivez votre budget, vos tâches, vos achats et les mesures de vos pièces en toute simplicité.
      </p>
      {/* Section fonctionnalités */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 overflow-hidden rounded-2xl px-5">
        {/* Dashboard */}
        <div className="bg-blue-950/80 rounded-xl p-6 shadow-lg border-2 border-blue-800 flex flex-col items-center transition-colors duration-200 hover:bg-blue-900/90">
          <h2 className="text-2xl font-bold text-blue-200 mb-2">Dashboard</h2>
          <p className="text-gray-100 text-center">Visualisez en un coup d&apos;œil l&apos;avancement de votre projet, vos dépenses, tâches et achats à venir.</p>
        </div>
        {/* Suivi des dépenses/budget */}
        <div className="bg-blue-950/80 rounded-xl p-6 shadow-lg border-2 border-blue-900 flex flex-col items-center transition-colors duration-200 hover:bg-blue-900/90">
          <h2 className="text-2xl font-bold text-blue-200 mb-2">Suivi des dépenses & budget</h2>
          <p className="text-gray-100 text-center">Gérez votre budget, enregistrez vos dépenses et gardez le contrôle sur vos finances tout au long du projet.</p>
        </div>
        {/* To-do & achats */}
        <div className="bg-blue-950/80 rounded-xl p-6 shadow-lg border-2 border-blue-800 flex flex-col items-center transition-colors duration-200 hover:bg-blue-900/90">
          <h2 className="text-2xl font-bold text-blue-200 mb-2">Liste des tâches & achats</h2>
          <p className="text-gray-100 text-center">Créez et suivez vos listes de choses à faire et à acheter pour ne rien oublier.</p>
        </div>
        {/* Mesures des pièces */}
        <div className="bg-blue-950/80 rounded-xl p-6 shadow-lg border-2 border-blue-900 flex flex-col items-center transition-colors duration-200 hover:bg-blue-900/90">
          <h2 className="text-2xl font-bold text-blue-200 mb-2">Gestion des mesures</h2>
          <p className="text-gray-100 text-center">Enregistrez facilement les dimensions de chaque pièce pour planifier vos travaux et achats.</p>
        </div>
      </div>
      {/* Call to action */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <a href="/auth/signup" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-lg text-xl transition-colors">Créer un compte</a>
        <span className="text-blue-200 font-semibold">ou</span>
        <a href="/auth/signin" className="underline text-blue-200 hover:text-white font-bold">Se connecter</a>
      </div>
    </div>
  )
}
