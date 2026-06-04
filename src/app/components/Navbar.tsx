import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
const logoImg = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780490163/IMG_7660.JPG__2_-removebg-preview_vyoxd3.png";

const navLinks = [
  { label: "À Propos", href: "about" },
  { label: "Équipe", href: "team" },
  { label: "Services", href: "services" },
  { label: "Tarifs", href: "pricing" },
  { label: "Contact", href: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#060b07]/93 backdrop-blur-lg border-b border-[#D4AF37]/10 shadow-xl shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
          <AviatorLogo />
        </button>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-[#f0ebe0]/55 hover:text-[#D4AF37] transition-colors duration-300 text-[10px] uppercase tracking-[0.18em]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("booking")}
            className="bg-[#D4AF37] text-[#060b07] px-7 py-2.5 text-[10px] tracking-[0.25em] uppercase hover:bg-[#c9a632] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/20"
            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700 }}
          >
            Réserver
          </button>
        </div>

        <button
          className="lg:hidden text-[#D4AF37] p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#060b07]/98 backdrop-blur-lg border-t border-[#D4AF37]/10 px-6 py-8 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-[#f0ebe0]/65 hover:text-[#D4AF37] transition-colors text-[10px] tracking-[0.25em] uppercase text-left"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("booking")}
            className="bg-[#D4AF37] text-[#060b07] px-6 py-3.5 text-[10px] tracking-[0.25em] uppercase mt-2"
            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700 }}
          >
            Réserver
          </button>
        </motion.div>
      )}
    </header>
  );
}

function AviatorLogo() {
  return (
    <img
      src={logoImg}
      alt="AVIATOR Barber Shop"
      style={{
        height: "90px",
        width: "auto",
        objectFit: "contain",
        transform: "scale(2.2)",
        transformOrigin: "left center",
      }}
    />
  );
}
