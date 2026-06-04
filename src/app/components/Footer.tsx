import { ChevronUp, Instagram, Facebook } from "lucide-react";
import { getWhatsAppUrl, getDisplayPhone } from "../../lib/store";

const navSections = [
  {
    title: "Explorer",
    items: [
      { label: "À Propos", id: "about" },
      { label: "Notre Équipe", id: "team" },
      { label: "Services", id: "services" },
      { label: "Avis Clients", id: "testimonials" },
    ],
  },
  {
    title: "Réserver",
    items: [
      { label: "Carte des Prix", id: "pricing" },
      { label: "Prendre Rendez-vous", id: "booking" },
      { label: "Nous Contacter", id: "contact" },
    ],
  },
];

export function Footer() {
  const whatsappUrl = getWhatsAppUrl();
  const displayPhone = getDisplayPhone();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#020504] border-t border-[#D4AF37]/8">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mb-16">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <p
                className="text-[#D4AF37] tracking-[0.4em] uppercase"
                style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", fontWeight: 700 }}
              >
                AVIATOR
              </p>
              <p
                className="text-[#f0ebe0]/40 tracking-[0.5em] text-[9px] uppercase mt-1"
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                Barber Shop
              </p>
            </div>

            <p
              className="text-[#f0ebe0]/28 text-sm leading-relaxed max-w-64 mb-8"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Salon de coiffure homme premium à Agadir — plus qu'une coupe, une signature de style.
            </p>

            {/* Social */}
            <div className="flex gap-3 mb-6">
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
                  className="w-11 h-11 border border-[#D4AF37]/18 flex items-center justify-center text-[#D4AF37]/40 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-[#25D366]/30 text-[#25D366]/70 text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-[#25D366]/8 hover:border-[#25D366]/55 transition-all duration-300"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              <WhatsAppIcon />
              {displayPhone}
            </a>
          </div>

          {/* Nav columns */}
          {navSections.map((section) => (
            <div key={section.title}>
              <h4
                className="text-[#D4AF37]/50 text-[10px] tracking-[0.35em] uppercase mb-7"
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.items.map(({ label, id }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className="text-[#f0ebe0]/30 text-sm hover:text-[#D4AF37]/70 transition-colors duration-300 text-left"
                      style={{ fontFamily: "Raleway, sans-serif" }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <p
              className="text-[#f0ebe0]/18 text-xs tracking-wider"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              © 2026 AVIATOR Barber Shop. Tous droits réservés.
            </p>
            <p
              className="text-[#f0ebe0]/18 text-xs tracking-wider hidden sm:block"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              EL HOUDA, Agadir
            </p>
          </div>
          <button
            onClick={scrollTop}
            className="border border-[#D4AF37]/18 p-2.5 text-[#D4AF37]/35 hover:border-[#D4AF37]/45 hover:text-[#D4AF37]/70 transition-all"
          >
            <ChevronUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

function TikTokIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
