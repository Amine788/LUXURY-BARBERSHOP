import { motion } from "motion/react";
import { useI18n } from "../../lib/i18n/context";

const interiorImg = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483011/WhatsApp_Image_2026-06-03_at_10.44.34_8_hogotq.jpg";

export function About() {
  const { t, isRTL } = useI18n();

  const stats = [
    { number: "15K+", label: t("about.stats.clients") },
    { number: "6", label: t("about.stats.barbers") },
    { number: "4.9★", label: t("about.stats.rating") },
  ];

  return (
    <section id="about" className="py-36 bg-[#060b07]">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center gap-4 mb-24 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="h-px w-14 bg-[#D4AF37]/40" />
          <span
            className="text-[#D4AF37]/70 tracking-[0.45em] text-[10px] uppercase"
            style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
          >
            {t("about.title")}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src={interiorImg}
                alt="AVIATOR Barbershop interior — master barbers at work"
                className="w-full h-[580px] object-cover object-center"
              />
              <div className={`absolute top-5 ${isRTL ? 'right-5' : 'left-5'} w-14 h-14 border-t-2 ${isRTL ? 'border-r-2' : 'border-l-2'} border-[#D4AF37]/50`} />
              <div className={`absolute bottom-5 ${isRTL ? 'left-5' : 'right-5'} w-14 h-14 border-b-2 ${isRTL ? 'border-l-2' : 'border-r-2'} border-[#D4AF37]/50`} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className={isRTL ? 'lg:pr-4' : 'lg:pl-4'}
          >
            <h2
              className={`text-[#f0ebe0] mb-7 ${isRTL ? 'text-right' : 'text-left'}`}
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.75rem)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              {isRTL ? (
                <>الأناقة <br /> الرجالية في <em style={{ color: "#D4AF37", fontStyle: "italic" }}>أكادير</em></>
              ) : (
                <>{t("about.heading").split(" à ")[0]} <br /> {t("about.heading").includes(" à ") ? "à " : ""} <em style={{ color: "#D4AF37", fontStyle: "italic" }}>{t("about.heading").split(" à ")[1] || "Agadir"}</em></>
              )}
            </h2>

            <div className={`w-14 h-px bg-[#D4AF37]/50 mb-8 ${isRTL ? 'mr-0 ml-auto' : ''}`} />

            <p
              className={`text-[#f0ebe0]/55 mb-6 leading-relaxed text-[0.95rem] ${isRTL ? 'text-right' : 'text-left'}`}
              style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
            >
              {t("about.p1")}
            </p>

            <p
              className={`text-[#f0ebe0]/55 mb-14 leading-relaxed text-[0.95rem] ${isRTL ? 'text-right' : 'text-left'}`}
              style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
            >
              {t("about.p2")}
            </p>

            <div className={`grid grid-cols-3 gap-0 ${isRTL ? 'border-r pr-0' : 'border-l pl-0'} border-[#D4AF37]/15`}>
              {stats.map((stat) => (
                <div key={stat.label} className={`${isRTL ? 'border-l' : 'border-r'} border-[#D4AF37]/15 px-6`}>
                  <div
                    className="text-[#D4AF37]"
                    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.9rem", fontWeight: 700 }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-[#f0ebe0]/40 text-[10px] tracking-[0.25em] uppercase mt-1"
                    style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
