export default function Footer() {
  return (
    <footer className="m-5 lg:mx-15 h-[80px] flex items-center justify-center rounded-2xl px-5 border-4 border-gray-950/40 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 shadow-2xl">
      <p className="text-center text-sm">
        &copy; {new Date().getFullYear()} RenoBoard. Tous droits réservés.
      </p>
    </footer>
  );
}