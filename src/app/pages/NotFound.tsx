import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c7f2a4] via-[#bae6fd] to-[#e9d5ff] flex items-center justify-center px-4 md:px-8 py-10">
      <div className="text-center">
        <div className="text-[5rem] md:text-[8rem] mb-2 md:mb-4">🦕</div>
        <h1 className="font-['Fredoka_One',cursive] text-[3rem] md:text-[4rem] text-[#3B0764] mb-3 md:mb-4">
          404
        </h1>
        <p className="text-[1.2rem] md:text-[1.5rem] text-gray-700 font-bold mb-6 md:mb-8">
          ¡Ups! Esta página se perdió en la prehistoria...
        </p>
        <Link
          to="/"
          className="inline-block bg-[#6B21A8] hover:bg-[#7C3AED] text-white font-['Fredoka_One',cursive] text-[1rem] md:text-[1.2rem] px-6 md:px-8 py-3.5 md:py-4 rounded-[40px] shadow-[0_6px_20px_rgba(107,33,168,0.35)] transition-all no-underline"
        >
          🏠 Volver al inicio
        </Link>
      </div>
    </div>
  );
}
