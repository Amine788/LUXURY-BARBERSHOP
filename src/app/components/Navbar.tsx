import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { useI18n } from "../../lib/i18n/context";

const logoImg = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780490163/IMG_7660.JPG__2_-removebg-preview_vyoxd3.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t, isRTL } = useI18n();

  const navLinks = [
    { label: t("nav.about"), href: "about" },
    { label: t("nav.team"), href: "team" },
    { label: t("nav.services"), href: "services" },
    { label: t("nav.pricing"), href: "pricing" },
    { label: t("nav.contact"), href: "contact" },
  ];

  const languages = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
    { code: "ar", label: "AR" },
  ];

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
        <button onClick={() => scrollTo("hero")} className={`flex items-center gap-3 ${isRTL ? 'order-last' : ''}`}>
          <AviatorLogo />
        </button>

        <div className="hidden lg:flex items-center gap-7">
          <div className="flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-[#f0ebe0]/55 hover:text-[#D4AF37] transition-colors duration-300 text-[10px] uppercase tracking-[0.18em]"
                style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-[#D4AF37]/20 mx-2" />

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-[#f0ebe0]/55 hover:text-[#D4AF37] transition-colors text-[10px] uppercase tracking-[0.15em]"
            >
              <Globe size={14} className="text-[#D4AF37]/60" />
              <span>{language.toUpperCase()}</span>
              <ChevronDown size={10} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full mt-4 right-0 bg-[#0a110a] border border-[#D4AF37]/10 py-2 min-w-[80px] shadow-2xl"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code as any); setLangOpen(false); }}
                      className={`w-full px-4 py-2 text-left text-[10px] tracking-widest hover:bg-[#D4AF37]/10 transition-colors ${
                        language === l.code ? 'text-[#D4AF37]' : 'text-[#f0ebe0]/50'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => scrollTo("booking")}
            className="bg-[#D4AF37] text-[#060b07] px-7 py-2.5 text-[10px] tracking-[0.25em] uppercase hover:bg-[#c9a632] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/20"
            style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif", fontWeight: 700 }}
          >
            {t("nav.book")}
          </button>
        </div>

        <div className="flex lg:hidden items-center gap-4">
          {/* Mobile Lang */}
          <div className="flex gap-3 text-[10px] font-bold text-[#D4AF37]/60">
             {['fr', 'en', 'ar'].map(l => (
               <button 
                key={l} 
                onClick={() => setLanguage(l as any)}
                className={language === l ? 'text-[#D4AF37]' : ''}
               >
                 {l.toUpperCase()}
               </button>
             ))}
          </div>
          <button
            className="text-[#D4AF37] p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#060b07]/98 backdrop-blur-lg border-t border-[#D4AF37]/10 px-6 py-8 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-[#f0ebe0]/65 hover:text-[#D4AF37] transition-colors text-[10px] tracking-[0.25em] uppercase text-left"
              style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("booking")}
            className="bg-[#D4AF37] text-[#060b07] px-6 py-3.5 text-[10px] tracking-[0.25em] uppercase mt-2"
            style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif", fontWeight: 700 }}
          >
            {t("nav.book")}
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
