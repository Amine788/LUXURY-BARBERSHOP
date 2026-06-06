import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useI18n } from "../../lib/i18n/context";

const beardGroom = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483011/WhatsApp_Image_2026-06-03_at_10.44.34_8_hogotq.jpg";
const interior = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483010/WhatsApp_Image_2026-06-03_at_10.44.35_2_smhigf.jpg";
const massage1 = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483010/WhatsApp_Image_2026-06-03_at_10.44.35_3_pqklv1.jpg";
const massage2 = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483010/WhatsApp_Image_2026-06-03_at_10.44.34_5_owxm0g.jpg";
const facial1 = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483010/WhatsApp_Image_2026-06-03_at_10.44.34_2_gbj4oz.jpg";
const facial2 = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483011/WhatsApp_Image_2026-06-03_at_10.44.35_mtopww.jpg";

export function Services() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { t, isRTL, language } = useI18n();

  const services = [
    {
      id: "haircuts",
      name: t("services.list.haircuts.name"),
      category: t("services.list.haircuts.category"),
      description: t("services.list.haircuts.desc"),
      fromPrice: "50 DH",
      images: [interior],
    },
    {
      id: "beard",
      name: t("services.list.beard.name"),
      category: t("services.list.beard.category"),
      description: t("services.list.beard.desc"),
      fromPrice: "50 DH",
      images: [beardGroom],
    },
    {
      id: "massage",
      name: t("services.list.massage.name"),
      category: t("services.list.massage.category"),
      description: t("services.list.massage.desc"),
      fromPrice: language === 'fr' ? "Inclus" : language === 'ar' ? "مضمن" : "Included",
      images: [massage1, massage2],
    },
    {
      id: "facial",
      name: t("services.list.facial.name"),
      category: t("services.list.facial.category"),
      description: t("services.list.facial.desc"),
      fromPrice: "100 DH",
      images: [facial1, facial2],
    },
    {
      id: "pack",
      name: t("services.list.pack.name"),
      category: t("services.list.pack.category"),
      description: t("services.list.pack.desc"),
      fromPrice: "700 DH",
      images: [massage2, massage1],
    },
  ];

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
              style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
            >
              {t("services.title")}
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
            {isRTL ? (
              <>تجربة <em style={{ color: "#D4AF37", fontStyle: "italic" }}>أفياتور</em></>
            ) : (
              <>L'Expérience <em style={{ color: "#D4AF37", fontStyle: "italic" }}>AVIATOR</em></>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {services.slice(0, 4).map((service, i) => (
            <ServiceCard
              key={service.id}
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
  service: any;
  index: number;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  onViewPricing: () => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const { t, isRTL } = useI18n();

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
      onMouseEnter={() => setHovered(service.id)}
      onMouseLeave={() => setHovered(null)}
      className="group relative overflow-hidden cursor-pointer h-[380px]"
    >
      {service.images.map((src: string, i: number) => (
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
          hovered === service.id ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className={`absolute top-5 ${isRTL ? 'right-5' : 'left-5'}`}>
        <span
          className={`text-[#D4AF37]/70 text-[9px] tracking-[0.3em] uppercase ${isRTL ? 'border-r pr-3' : 'border-l pl-3'} border-[#D4AF37]/40`}
          style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
        >
          {service.category}
        </span>
      </div>

      <div className={`absolute top-5 ${isRTL ? 'left-5 text-left' : 'right-5 text-right'}`}>
        <div className="text-[#D4AF37]/50 text-[8px] tracking-wider uppercase" style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
          {t("services.from")}
        </div>
        <div className="text-[#D4AF37]" style={{ fontFamily: "Playfair Display, serif", fontSize: "1rem", fontWeight: 700 }}>{service.fromPrice}</div>
      </div>

      {service.images.length > 1 && (
        <div className={`absolute bottom-20 ${isRTL ? 'left-5' : 'right-5'} flex gap-1.5`}>
          {service.images.map((_: any, i: number) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full transition-all duration-500"
              style={{ background: i === imgIndex ? "#D4AF37" : "rgba(212,175,55,0.3)" }}
            />
          ))}
        </div>
      )}

      <div className={`absolute bottom-0 left-0 right-0 p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h3 className="text-[#f0ebe0] mb-2" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", fontWeight: 700 }}>
          {service.name}
        </h3>
        <div className={`overflow-hidden transition-all duration-500 ${hovered === service.id ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <p className="text-[#f0ebe0]/60 text-xs leading-relaxed mb-4" style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
            {service.description}
          </p>
          <button
            onClick={onViewPricing}
            className={`flex items-center gap-2 text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase hover:gap-3 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
          >
            {t("services.viewPricing")} {isRTL ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
          </button>
        </div>
      </div>

      <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/20 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
