import { useState } from "react";
import { Link, useLocation } from "react-router";

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/productos", label: "Productos" },
    { to: "/quienes-somos", label: "Quiénes Somos" },
    { to: "/faq", label: "FAQ" },
    { to: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_12px_rgba(107,33,168,0.10)] px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[60px] md:h-[70px]">
        <Link to="/" className="flex items-center gap-1 md:gap-1.5 no-underline shrink-0">
          <span className="text-[1.5rem] md:text-[2rem] inline-block animate-[wiggle_2.5s_infinite]">🦕</span>
          <span className="font-['Fredoka_One',cursive] text-[1.2rem] md:text-[1.7rem] text-[#6B21A8] tracking-wide">
            LETRA<span className="text-[#16A34A]">SAURIO</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={[
                  "font-bold text-[0.93rem] no-underline px-3 py-1.5 rounded-[20px] transition-all",
                  isActive
                    ? "bg-[#6B21A8] text-white"
                    : "text-gray-800 hover:bg-[#6B21A8] hover:text-white",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 shrink-0 ml-auto md:ml-0">
          <Link to="/login" className="flex items-center gap-1 md:gap-1.5 bg-white border-2 border-[#6B21A8] text-[#6B21A8] font-extrabold text-[0.75rem] md:text-[0.9rem] px-3 md:px-[18px] py-1.5 md:py-2 rounded-[30px] transition-all no-underline hover:bg-[#6B21A8] hover:text-white whitespace-nowrap">
            👤 Iniciar sesión
          </Link>
          
          <button 
            className="md:hidden text-[#6B21A8] text-2xl p-1 bg-transparent border-none cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[60px] md:top-[70px] left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col py-4 px-6 gap-2 z-50">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={[
                  "font-bold text-[1rem] no-underline px-4 py-3 rounded-xl transition-all",
                  isActive
                    ? "bg-[#6B21A8] text-white"
                    : "text-gray-800 hover:bg-[#f3e8ff] hover:text-[#6B21A8]",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
      `}</style>
    </header>
  );
}