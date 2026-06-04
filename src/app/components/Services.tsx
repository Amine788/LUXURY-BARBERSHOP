import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
const beardGroom = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483011/WhatsApp_Image_2026-06-03_at_10.44.34_8_hogotq.jpg";
const hotTowelSteam = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483010/WhatsApp_Image_2026-06-03_at_10.44.34_ho0lqp.jpg";
const interior = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483010/WhatsApp_Image_2026-06-03_at_10.44.35_2_smhigf.jpg";
const massage1 = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483010/WhatsApp_Image_2026-06-03_at_10.44.35_3_pqklv1.jpg";
const massage2 = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483010/WhatsApp_Image_2026-06-03_at_10.44.34_5_owxm0g.jpg";
const facial1 = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483010/WhatsApp_Image_2026-06-03_at_10.44.34_2_gbj4oz.jpg";
const facial2 = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483011/WhatsApp_Image_2026-06-03_at_10.44.35_mtopww.jpg";

const services = [
  {
    name: "Haircuts",
    category: "The Foundation",
    description:
      "Precision cuts tailored to your face shape, lifestyle and personal aesthetic. From classic to contemporary, every cut is a masterpiece.",
    fromPrice: "50 DH",
    images: [interior],
  },
  {
    name: "Coupe & Barbe",
    category: "The Signature",
    description:
      "Traçage précis, rasage à l'ancienne au hot towel et sculpting de barbe avec des produits premium. Une précision architecturale au rasoir droit.",
    fromPrice: "50 DH",
    images: [beardGroom],
  },
  {
    name: "Massage Intégré",
    category: "The Ritual",
    description:
      "Nos fauteuils de coupe sont dotés d'un système de massages intégré — une exclusivité pensée pour transformer chaque service en un moment de détente.",
    fromPrice: "Inclus",
    images: [massage1, massage2],
  },
  {
    name: "Soins Visage",
    category: "Soin de Visage",
    description:
      "Du soin visage simple au global (Hydrafacial · Produits Spéciaux · Fauteuil Massage). Soin botox capillaire et vapeur pour une peau parfaite.",
    fromPrice: "100 DH",
    images: [facial1, facial2],
  },
  {
    name: "Pack Full Experience",
    category: "The Experience",
    description:
      "Coupe + Barbe + Shampooing & Brushing + Manucure + Pédicure + Soin de Visage + Épilation de Précision. L'expérience AVIATOR complète.",
    fromPrice: "700 DH",
    images: [massage2, massage1],
  },
];

export function Services() {
  const [hovered, setHovered] = useState<string | null>(null);

  const scrollToPricing = () =>
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="services" className="py-36 bg-[#030706]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="h-px w-16 bg-[#D4AF37]/35" />
            <span
              className="text-[#D4AF37]/70 tracking-[0.45em] text-[10px] uppercase"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Nos Services
            </span>
            <div className="h-px w-16 bg-[#D4AF37]/35" />
          </div>
          <h2
            className="text-[#f0ebe0]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 700,
            }}
          >
            L'Expérience{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>AVIATOR</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {services.slice(0, 4).map((service, i) => (
            <ServiceCard
              key={service.name}
              service={service}
              index={i}
              hovered={hovered}
              setHovered={setHovered}
              onViewPricing={scrollToPricing}
            />
          ))}
        </div>

        <div className="mt-4 lg:max-w-[50%] mx-auto">
          <ServiceCard
            service={services[4]}
            index={4}
            hovered={hovered}
            setHovered={setHovered}
            onViewPricing={scrollToPricing}
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  hovered,
  setHovered,
  onViewPricing,
}: {
  service: (typeof services)[0];
  index: number;
  hovered: string | null;
  setHovered: (name: string | null) => void;
  onViewPricing: () => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (service.images.length < 2) return;
    const id = setInterval(() => {
      setImgIndex((i) => (i + 1) % service.images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [service.images]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(service.name)}
      onMouseLeave={() => setHovered(null)}
      className="group relative overflow-hidden cursor-pointer h-[380px]"
    >
      {service.images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={service.name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-110"
          style={{ opacity: i === imgIndex ? 1 : 0 }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-[#030706]/98 via-[#030706]/50 to-[#030706]/10" />
      <div
        className={`absolute inset-0 bg-[#014421]/20 transition-opacity duration-500 ${
          hovered === service.name ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute top-5 left-5">
        <span
          className="text-[#D4AF37]/70 text-[9px] tracking-[0.3em] uppercase border-l border-[#D4AF37]/40 pl-3"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          {service.category}
        </span>
      </div>

      <div className="absolute top-5 right-5 text-right">
        <div className="text-[#D4AF37]/50 text-[8px] tracking-wider uppercase" style={{ fontFamily: "Raleway, sans-serif" }}>From</div>
        <div className="text-[#D4AF37]" style={{ fontFamily: "Playfair Display, serif", fontSize: "1rem", fontWeight: 700 }}>{service.fromPrice}</div>
      </div>

      {service.images.length > 1 && (
        <div className="absolute bottom-20 right-5 flex gap-1.5">
          {service.images.map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full transition-all duration-500"
              style={{ background: i === imgIndex ? "#D4AF37" : "rgba(212,175,55,0.3)" }}
            />
          ))}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-[#f0ebe0] mb-2" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", fontWeight: 700 }}>
          {service.name}
        </h3>
        <div className={`overflow-hidden transition-all duration-500 ${hovered === service.name ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <p className="text-[#f0ebe0]/60 text-xs leading-relaxed mb-4" style={{ fontFamily: "Raleway, sans-serif" }}>
            {service.description}
          </p>
          <button
            onClick={onViewPricing}
            className="flex items-center gap-2 text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase hover:gap-3 transition-all duration-300"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            View Pricing <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/20 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
