import { motion } from "motion/react";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";
import { getWhatsAppUrl, getDisplayPhone } from "../../lib/store";

export function Contact() {
  const WHATSAPP_URL = getWhatsAppUrl();
  const displayPhone = getDisplayPhone();

  const contactInfo = [
    {
      icon: MapPin,
      label: "Adresse",
      value: "Boulevard Al Mahdi Ben Abboud",
      sub: "EL HOUDA, Agadir",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: displayPhone,
      sub: "Lun–Sam 9h–22h · Dim 10h–20h",
    },
    {
      icon: Clock,
      label: "Horaires",
      value: "Lun – Sam : 9h00 – 22h00",
      sub: "Dimanche : 10h00 – 20h00",
    },
  ];

  return (
    <section id="contact" className="py-36 bg-[#060b07]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="h-px w-16 bg-[#D4AF37]/35" />
            <span
              className="text-[#D4AF37]/70 tracking-[0.45em] text-[10px] uppercase"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Nous Trouver
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
            Visiter{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>AVIATOR</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Contact info + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactInfo.map((item) => (
              <div key={item.label} className="flex gap-5">
                <div className="w-12 h-12 border border-[#D4AF37]/22 flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <div>
                  <div
                    className="text-[#D4AF37]/55 text-[10px] tracking-[0.3em] uppercase mb-1.5"
                    style={{ fontFamily: "Raleway, sans-serif" }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-[#f0ebe0] text-sm mb-0.5"
                    style={{ fontFamily: "Raleway, sans-serif", fontWeight: 500 }}
                  >
                    {item.value}
                  </div>
                  <div
                    className="text-[#f0ebe0]/35 text-xs"
                    style={{ fontFamily: "Raleway, sans-serif" }}
                  >
                    {item.sub}
                  </div>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 border border-[#25D366]/35 bg-[#25D366]/5 px-6 py-5 hover:bg-[#25D366]/10 hover:border-[#25D366]/55 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center shrink-0">
                <WhatsAppIcon className="text-[#25D366]" size={18} />
              </div>
              <div>
                <div
                  className="text-[#25D366] text-sm mb-0.5"
                  style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
                >
                  Discuter sur WhatsApp
                </div>
                <div
                  className="text-[#f0ebe0]/35 text-xs"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  Réponses instantanées · Réservez via WhatsApp
                </div>
              </div>
              <svg
                className="ml-auto text-[#25D366]/40 group-hover:text-[#25D366]/70 group-hover:translate-x-1 transition-all duration-300"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Social links */}
            <div className="pt-6 border-t border-[#D4AF37]/10">
              <div
                className="text-[#D4AF37]/50 text-[10px] tracking-[0.3em] uppercase mb-5"
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                Suivez AVIATOR
              </div>
              <div className="flex gap-3">
                {[
                  { label: "Instagram", href: "https://www.instagram.com/aviator_b.r/", icon: <Instagram size={20} strokeWidth={1.5} /> },
                  { label: "TikTok", href: "https://www.tiktok.com/@aviator_b.r?_r=1&_t=ZS-96tnjQwsnOH", icon: <TikTokIcon size={20} /> },
                  { label: "Facebook", href: "https://www.facebook.com/share/1ArA6uzrHS/?mibextid=wwXIfr", icon: <Facebook size={20} strokeWidth={1.5} /> },
                ].map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-12 h-12 border border-[#D4AF37]/18 flex items-center justify-center text-[#D4AF37]/45 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Map visual */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[580px] border border-[#D4AF37]/12 overflow-hidden"
          >
            <img
              src="https://res.cloudinary.com/dfltnm8qu/image/upload/v1780485925/WhatsApp_Image_2026-06-03_at_11.21.30_y3gq5l.jpg"
              alt="AVIATOR Barbershop"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-55"
              style={{ objectPosition: "center 30%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060b07]/90 via-[#060b07]/50 to-[#060b07]/30" />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8">
              <div className="w-14 h-14 bg-[#D4AF37] flex items-center justify-center shadow-2xl shadow-[#D4AF37]/30">
                <MapPin size={22} className="text-[#060b07]" />
              </div>

              <div className="text-center">
                <p
                  className="text-[#f0ebe0] mb-1"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                  }}
                >
                  AVIATOR Barbershop
                </p>
                <p
                  className="text-[#D4AF37]/65 text-xs tracking-wider mb-1"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  Boulevard Al Mahdi Ben Abboud
                </p>
                <p
                  className="text-[#f0ebe0]/40 text-xs"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  EL HOUDA, Agadir
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <a
                  href="https://share.google/RUry4e3opSI1lWo0G"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#D4AF37]/35 text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/60 transition-colors text-center"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  Ouvrir dans Maps
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#25D366]/35 text-[#25D366]/80 text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-[#25D366]/10 transition-colors text-center flex items-center justify-center gap-2"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  <WhatsAppIcon size={12} />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="absolute top-4 left-4 w-7 h-7 border-t border-l border-[#D4AF37]/30" />
            <div className="absolute bottom-4 right-4 w-7 h-7 border-b border-r border-[#D4AF37]/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TikTokIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "", size = 18 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
