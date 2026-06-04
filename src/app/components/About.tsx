import { motion } from "motion/react";
const interiorImg = "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780483011/WhatsApp_Image_2026-06-03_at_10.44.34_8_hogotq.jpg";

const stats = [
  { number: "15K+", label: "Clients Satisfaits" },
  { number: "6", label: "Barbiers Experts" },
  { number: "4.9★", label: "Note Moyenne" },
];

export function About() {
  return (
    <section id="about" className="py-36 bg-[#060b07]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-24">
          <div className="h-px w-14 bg-[#D4AF37]/40" />
          <span
            className="text-[#D4AF37]/70 tracking-[0.45em] text-[10px] uppercase"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            Our Story
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
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
              <div className="absolute top-5 left-5 w-14 h-14 border-t-2 border-l-2 border-[#D4AF37]/50" />
              <div className="absolute bottom-5 right-5 w-14 h-14 border-b-2 border-r-2 border-[#D4AF37]/50" />
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:pl-4"
          >
            <h2
              className="text-[#f0ebe0] mb-7"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.75rem)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              L'Élégance{" "}
              <br />
              Masculine à{" "}
              <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Agadir</em>
            </h2>

            <div className="w-14 h-px bg-[#D4AF37]/50 mb-8" />

            <p
              className="text-[#f0ebe0]/55 mb-6 leading-relaxed text-[0.95rem]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              AVIATOR BARBER SHOP est un salon de coiffure masculin moderne situé à Agadir,
              spécialisé dans le grooming haut de gamme. Nous avons conçu un environnement
              moderne et relaxant avec fauteuils massants, ambiance premium et service
              professionnel pour offrir bien plus qu'une simple visite chez le coiffeur.
            </p>

            <p
              className="text-[#f0ebe0]/55 mb-14 leading-relaxed text-[0.95rem]"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Notre objectif est de transformer la coiffure masculine en une véritable
              expérience de confort, de style et de confiance. Nous travaillons avec
              précision et passion pour offrir un résultat qui correspond parfaitement
              à chaque client — avec des produits capillaires haut de gamme et une
              hygiène irréprochable.
            </p>

            <div className="grid grid-cols-3 gap-0 border-l border-[#D4AF37]/15">
              {stats.map((stat) => (
                <div key={stat.label} className="border-r border-[#D4AF37]/15 px-6 first:pl-6">
                  <div
                    className="text-[#D4AF37]"
                    style={{ fontFamily: "Playfair Display, serif", fontSize: "1.9rem", fontWeight: 700 }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-[#f0ebe0]/40 text-[10px] tracking-[0.25em] uppercase mt-1"
                    style={{ fontFamily: "Raleway, sans-serif" }}
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
