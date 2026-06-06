import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Crown, ArrowRight, ArrowLeft } from "lucide-react";
import { getPricing, type PricingCategory, getWhatsAppUrl } from "../../lib/store";
import { useAsync } from "../../lib/hooks/useAsync";
import { useI18n } from "../../lib/i18n/context";

export function Pricing() {
  const { data: categories = [], loading } = useAsync(getPricing);
  const [active, setActive] = useState<string>("");
  const { t, isRTL, language } = useI18n();
  const whatsappUrl = getWhatsAppUrl();

  const scrollToBooking = (serviceName?: string) => {
    if (serviceName) localStorage.setItem("aviator_selected_service", serviceName);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (categories.length > 0 && !active) {
      setActive(categories[0].id);
    }
  }, [categories, active]);

  if (loading || categories.length === 0) {
    return null; // ou un spinner
  }

  const activeCategory = categories.find((c) => c.id === active) ?? categories[0];

  // Helper to translate common category labels
  const getCatLabel = (cat: PricingCategory) => {
    if (language === 'fr') return cat.label;
    const labels: Record<string, any> = {
      en: { "Coupes": "Haircuts", "Barbe": "Beard", "Soins": "Facial Care", "Packs": "Packages", "Enfants": "Kids", "VIP": "VIP Services" },
      ar: { "Coupes": "قصات الشعر", "Barbe": "اللحية", "Soins": "العناية", "Packs": "الباقات", "Enfants": "الأطفال", "VIP": "خدمات VIP" }
    };
    return labels[language]?.[cat.label] || cat.label;
  };

  return (
    <section id="pricing" className="py-36 bg-[#060b07]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="h-px w-16 bg-[#D4AF37]/35" />
            <span className="text-[#D4AF37]/70 tracking-[0.45em] text-[10px] uppercase" style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
              {t("pricing.title")}
            </span>
            <div className="h-px w-16 bg-[#D4AF37]/35" />
          </div>
          <h2 className="text-[#f0ebe0]" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 700 }}>
            AVIATOR <em style={{ color: "#D4AF37", fontStyle: "italic" }}>{t("pricing.title")}</em>
          </h2>
          <p className="text-[#f0ebe0]/35 mt-4 text-sm" style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Main layout: tabs left + content right */}
        <div className={`flex flex-col ${isRTL ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-0 border border-[#D4AF37]/12`}>

          {/* Left: Category tabs */}
          <div className={`lg:w-64 shrink-0 border-b lg:border-b-0 ${isRTL ? 'lg:border-l' : 'lg:border-r'} border-[#D4AF37]/12 bg-[#040908]`}>
            {categories.map((cat) => {
              const isActive = active === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`w-full flex items-center gap-4 px-6 py-5 text-left transition-all duration-300 border-b border-[#D4AF37]/8 last:border-b-0 relative group ${
                    isActive ? "bg-[#D4AF37]/8" : "hover:bg-[#D4AF37]/4"
                  } ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                >
                  {/* Active indicator */}
                  <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 w-0.5 bg-[#D4AF37] transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`} />

                  <span className={`text-base transition-colors duration-300 ${isActive ? "text-[#D4AF37]" : "text-[#D4AF37]/35 group-hover:text-[#D4AF37]/60"}`}>
                    {cat.icon}
                  </span>
                  <div>
                    <div
                      className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? "text-[#D4AF37]" : "text-[#f0ebe0]/45 group-hover:text-[#f0ebe0]/70"}`}
                      style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif", fontWeight: isActive ? 700 : 400 }}
                    >
                      {getCatLabel(cat)}
                    </div>
                    <div className="text-[#f0ebe0]/20 text-[9px] mt-0.5" style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
                      {cat.items.length} {isRTL ? 'خدمات' : 'services'}
                    </div>
                  </div>

                  {cat.id === "vip" && (
                    <Crown size={11} className={`${isRTL ? 'mr-auto' : 'ml-auto'} ${isActive ? "text-[#D4AF37]" : "text-[#D4AF37]/30"}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Service list */}
          <div className="flex-1 bg-[#060b07]">
            {/* Panel header */}
            <div className={`flex items-center justify-between px-8 py-5 border-b border-[#D4AF37]/10 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-[#D4AF37] text-lg">{activeCategory.icon}</span>
                <h3 className="text-[#f0ebe0]" style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem", fontWeight: 700 }}>
                  {getCatLabel(activeCategory)}
                </h3>
              </div>
              <span className="text-[#f0ebe0]/20 text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
                {isRTL ? 'الضريبة متضمنة' : 'TVA incluse'}
              </span>
            </div>

            {/* Items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: isRTL ? -12 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 8 : -8 }}
                transition={{ duration: 0.25 }}
              >
                {activeCategory.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.06 }}
                    className={`group flex items-center gap-6 px-8 py-6 border-b border-[#D4AF37]/8 last:border-b-0 hover:bg-[#D4AF37]/[0.03] transition-all duration-300 cursor-pointer ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                    onClick={() => scrollToBooking(item.name)}
                  >
                    {/* Index number */}
                    <div
                      className="w-7 h-7 shrink-0 border border-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]/30 group-hover:border-[#D4AF37]/35 group-hover:text-[#D4AF37]/60 transition-all duration-300"
                      style={{ fontFamily: "Playfair Display, serif", fontSize: "0.7rem" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Name + desc */}
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center gap-3 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span
                          className="text-[#f0ebe0] group-hover:text-[#f0ebe0] transition-colors duration-300"
                          style={{ fontFamily: "Playfair Display, serif", fontSize: "0.95rem", fontWeight: 600 }}
                        >
                          {item.name}
                        </span>
                        {item.popular && (
                          <span
                            className="text-[#060b07] bg-[#D4AF37] text-[7px] tracking-[0.2em] uppercase px-2 py-0.5 shrink-0"
                            style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif", fontWeight: 700 }}
                          >
                            {isRTL ? 'شائع' : 'Populaire'}
                          </span>
                        )}
                      </div>
                      <p className="text-[#f0ebe0]/30 text-[11px] leading-relaxed" style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
                        {item.desc}
                      </p>
                    </div>

                    {/* Dotted separator */}
                    <div className="hidden sm:block flex-1 border-t border-dotted border-[#D4AF37]/12 mx-2" />

                    {/* Price */}
                    <div className={`shrink-0 ${isRTL ? 'text-left' : 'text-right'}`}>
                      {item.fromPrice && (
                        <div className="text-[#f0ebe0]/25 text-[8px] tracking-wider uppercase mb-0.5" style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
                          {t("pricing.from")}
                        </div>
                      )}
                      <div
                        className="text-[#D4AF37] group-hover:text-[#D4AF37] transition-colors"
                        style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem", fontWeight: 700 }}
                      >
                        {item.price}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="shrink-0 w-6 h-6 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]/0 group-hover:text-[#D4AF37]/60 transition-all duration-300">
                      {isRTL ? <ArrowLeft size={10} /> : <ArrowRight size={10} />}
                    </div>
                  </motion.div>
                ))}

                {/* Reserve CTA at bottom of panel */}
                <div className={`px-8 py-6 border-t border-[#D4AF37]/10 bg-[#D4AF37]/[0.02] flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <p className="text-[#f0ebe0]/25 text-[10px]" style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
                    {isRTL ? 'انقر على الخدمة للحجز' : 'Cliquez sur un service pour réserver'}
                  </p>
                  <button
                    onClick={() => scrollToBooking()}
                    className="flex items-center gap-2 bg-[#D4AF37] text-[#060b07] px-6 py-2.5 text-[10px] tracking-[0.25em] uppercase hover:bg-[#c9a632] transition-colors duration-300"
                    style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif", fontWeight: 700 }}
                  >
                    {t("nav.book")}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            onClick={() => scrollToBooking()}
            className="bg-[#D4AF37] text-[#060b07] px-12 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#c9a632] transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/20"
            style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif", fontWeight: 700 }}
          >
            {t("hero.cta")}
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#25D366]/40 text-[#25D366]/80 px-12 py-4 text-xs tracking-[0.25em] uppercase hover:border-[#25D366]/70 hover:bg-[#25D366]/8 transition-all duration-300 flex items-center gap-3"
            style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
          >
            <WhatsAppIcon />
            {t("hero.whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
