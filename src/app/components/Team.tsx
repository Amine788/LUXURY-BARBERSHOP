import { motion } from "motion/react";
import { getBarbers, type Barber } from "../../lib/store";
import { useAsync } from "../../lib/hooks/useAsync";
import { useI18n } from "../../lib/i18n/context";

export function Team() {
  const { data: barbers = [] } = useAsync(getBarbers);
  const { t, isRTL } = useI18n();

  return (
    <section id="team" className="py-36 bg-[#030706]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="h-px w-16 bg-[#D4AF37]/35" />
            <span
              className="text-[#D4AF37]/70 tracking-[0.45em] text-[10px] uppercase"
              style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
            >
              {t("team.title")}
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
              <>فريقنا من <em style={{ color: "#D4AF37", fontStyle: "italic" }}>الخبراء</em></>
            ) : (
              <>Notre Équipe d' <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Experts</em></>
            )}
          </h2>
          <p
            className="text-[#f0ebe0]/40 mt-5 text-sm max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
          >
            {t("team.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {barbers.map((barber, i) => (
            <BarberCard key={barber.name} barber={barber} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BarberCard({
  barber,
  index,
}: {
  barber: Barber;
  index: number;
}) {
  const { isRTL, language } = useI18n();

  // Simple mapping for titles/specialties if needed
  const displayTitle = language === 'fr' ? barber.title : 
    language === 'ar' ? "حلاق خبير" : "Expert Barber";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      className="group relative overflow-hidden cursor-pointer"
    >
      <div className="relative h-[420px] overflow-hidden">
        <img
          src={barber.photo}
          alt={barber.name}
          className="w-full h-full object-cover object-top transition-transform duration-700"
          style={{ transform: "scale(1)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.07)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030706]/95 via-[#030706]/30 to-transparent" />

        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
          <span
            className="bg-[#D4AF37]/15 backdrop-blur-sm border border-[#D4AF37]/30 text-[#D4AF37] px-3 py-1 text-[9px] tracking-[0.25em] uppercase"
            style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
          >
            {language === 'ar' ? 'خبير' : barber.tag}
          </span>
        </div>


        <div className={`absolute bottom-0 left-0 right-0 p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h3
            className="text-[#f0ebe0] mb-1"
            style={{ fontFamily: "Playfair Display, serif", fontSize: "1.2rem", fontWeight: 700 }}
          >
            {barber.name}
          </h3>
          <p
            className="text-[#D4AF37]/70 text-[10px] tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
          >
            {displayTitle}
          </p>

          <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500">
            <p
              className="text-[#f0ebe0]/55 text-xs mb-4 leading-relaxed"
              style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
            >
              {barber.specialty}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} bottom-0 w-px bg-[#D4AF37] opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
    </motion.div>
  );
}
