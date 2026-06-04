import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const heroBg = "https://res.cloudinary.com/dfltnm8qu/image/upload/q_100,f_auto,w_1920/v1780483010/WhatsApp_Image_2026-06-03_at_10.44.35_2_smhigf.jpg";

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[720px] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="AVIATOR Barbershop luxury interior"
          className="w-full h-full object-cover object-center"
          style={{ imageRendering: "auto" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b07]/75 via-[#060b07]/55 to-[#060b07]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#014421]/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[#060b07]/30" />
      </div>

      {/* Top gold rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full flex flex-col items-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <h1
            className="text-[#D4AF37] tracking-[0.5em] uppercase"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2.8rem, 8vw, 7rem)",
              fontWeight: 700,
              lineHeight: 1,
              filter: "drop-shadow(0 0 40px rgba(212,175,55,0.3))",
            }}
          >
            AVIATOR
          </h1>
          <p
            className="text-[#f0ebe0]/60 tracking-[0.7em] text-[11px] uppercase mt-3"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            Barber Shop
          </p>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="text-[#f0ebe0]/45 tracking-[0.5em] text-[10px] uppercase mb-14"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          Plus qu'une coupe, une signature de style — Agadir
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("booking")}
            className="bg-[#D4AF37] text-[#060b07] px-12 py-4 tracking-[0.3em] uppercase text-xs hover:bg-[#c9a632] transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/25 min-w-[240px]"
            style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700 }}
          >
            Réserver Maintenant
          </button>
          <a
            href={whatsappUrl}
            target="_blank"

            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 border border-[#25D366]/45 text-[#25D366]/80 px-12 py-4 tracking-[0.2em] uppercase text-xs hover:border-[#25D366]/80 hover:bg-[#25D366]/8 transition-all duration-300 min-w-[240px]"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            <WhatsAppIcon />
            WhatsApp Us
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.7, duration: 1 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-[#D4AF37]/45" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#060b07] to-transparent" />
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
