import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Youssef B.",
    role: "Client fidèle, Agadir",
    rating: 5,
    text: "Service impeccable et résultat très professionnel. Je ne vais plus nulle part ailleurs depuis que j'ai découvert AVIATOR. L'ambiance, les barbiers, tout est au top niveau.",
    initials: "YB",
  },
  {
    name: "Karim M.",
    role: "Client, Agadir",
    rating: 5,
    text: "Meilleur barber shop à Agadir, je recommande fortement. Les fauteuils massants font vraiment la différence — on se sent vraiment chouchouté. Résultat impeccable à chaque visite.",
    initials: "KM",
  },
  {
    name: "Hamza R.",
    role: "Client fidèle, Agadir",
    rating: 5,
    text: "Ambiance premium et équipe très compétente. Le soin visage global est exceptionnel — Hydrafacial + massage, c'est une vraie expérience de luxe. Je recommande les yeux fermés.",
    initials: "HR",
  },
  {
    name: "Saad L.",
    role: "Client, Agadir",
    rating: 5,
    text: "AVIATOR, c'est plus qu'un coiffeur — c'est une expérience complète. Du premier contact jusqu'à la fin du service, tout est pensé dans les moindres détails. Vraiment premium.",
    initials: "SL",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section id="testimonials" className="py-36 bg-[#060b07] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#D4AF37]/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-[#014421]/[0.08] blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="h-px w-16 bg-[#D4AF37]/35" />
            <span
              className="text-[#D4AF37]/70 tracking-[0.45em] text-[10px] uppercase"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Avis Clients
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
            Ce que disent nos{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Clients</em>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45 }}
            className="bg-[#090f0a] border border-[#D4AF37]/12 p-12 relative"
          >
            <div
              className="absolute top-4 left-8 text-[#D4AF37]/12 select-none pointer-events-none"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "7rem",
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              "
            </div>

            <div className="flex gap-1 mb-8">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={14} fill="#D4AF37" className="text-[#D4AF37]" />
              ))}
            </div>

            <blockquote
              className="text-[#f0ebe0]/75 leading-relaxed mb-10 relative z-10"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
              }}
            >
              {testimonials[current].text}
            </blockquote>

            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#014421] border border-[#D4AF37]/35 flex items-center justify-center shrink-0">
                <span
                  className="text-[#D4AF37] text-sm"
                  style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
                >
                  {testimonials[current].initials}
                </span>
              </div>
              <div>
                <div
                  className="text-[#f0ebe0]"
                  style={{ fontFamily: "Playfair Display, serif", fontWeight: 600 }}
                >
                  {testimonials[current].name}
                </div>
                <div
                  className="text-[#D4AF37]/55 text-xs tracking-wider mt-0.5"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  {testimonials[current].role}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 h-px ${
                  i === current
                    ? "w-10 bg-[#D4AF37]"
                    : "w-3 bg-[#D4AF37]/25 hover:bg-[#D4AF37]/50"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={prev}
              className="border border-[#D4AF37]/25 p-3 text-[#D4AF37]/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/8 transition-all"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              onClick={next}
              className="border border-[#D4AF37]/25 p-3 text-[#D4AF37]/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/8 transition-all"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
