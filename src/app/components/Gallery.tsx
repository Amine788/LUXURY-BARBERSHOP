import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn } from "lucide-react";
const galleryItems = [
  { src: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484259/WhatsApp_Image_2026-06-03_at_11.46.33_6_-_Copie_rhecbz.jpg", alt: "AVIATOR Barbershop ambiance", tall: true,  label: "Interior" },
  { src: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484259/WhatsApp_Image_2026-06-03_at_11.46.33_rzk4hy.jpg",           alt: "Luxury grooming experience",  tall: false, label: "The Craft" },
  { src: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484259/WhatsApp_Image_2026-06-03_at_11.46.33_1_mahtow.jpg",         alt: "Expert barber at work",       tall: false, label: "Precision" },
  { src: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484258/WhatsApp_Image_2026-06-03_at_11.46.33_2_g2zsr4.jpg",         alt: "AVIATOR signature service",   tall: true,  label: "Signature" },
  { src: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484258/WhatsApp_Image_2026-06-03_at_11.46.33_3_wfyxk1.jpg",         alt: "Premium barbershop detail",   tall: false, label: "Luxury" },
  { src: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484258/WhatsApp_Image_2026-06-03_at_11.46.33_4_ko6dp3.jpg",         alt: "AVIATOR artisan grooming",    tall: false, label: "Artisan" },
];

export function Gallery() {
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[0] | null>(null);

  return (
    <section id="gallery" className="py-36 bg-[#030706]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="h-px w-16 bg-[#D4AF37]/35" />
            <span
              className="text-[#D4AF37]/70 tracking-[0.45em] text-[10px] uppercase"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              The Craft
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
            Gallery of{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Excellence</em>
          </h2>
          <p
            className="text-[#f0ebe0]/35 mt-5 text-sm max-w-md mx-auto"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            A visual journey through the AVIATOR experience — from our luxury interior
            to the precise artistry of our master barbers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="flex flex-col gap-3">
            {[galleryItems[0], galleryItems[1]].map((item, i) => (
              <GalleryCard key={i} item={item} onClick={() => setLightbox(item)} index={i} />
            ))}
          </div>
          <div className="flex flex-col gap-3 md:mt-10">
            {[galleryItems[2], galleryItems[3]].map((item, i) => (
              <GalleryCard key={i} item={item} onClick={() => setLightbox(item)} index={i + 2} />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {[galleryItems[4], galleryItems[5]].map((item, i) => (
              <GalleryCard key={i} item={item} onClick={() => setLightbox(item)} index={i + 4} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/97 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-h-[85vh] max-w-[90vw] object-contain"
              />
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]/50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]/50" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <p
                  className="text-[#D4AF37]/80 text-[10px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  {lightbox.label} — {lightbox.alt}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 bg-[#030706] border border-[#D4AF37]/35 p-2 text-[#D4AF37] hover:bg-[#D4AF37]/12 transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCard({
  item,
  onClick,
  index,
}: {
  item: (typeof galleryItems)[0];
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onClick={onClick}
      className={`group relative overflow-hidden cursor-pointer bg-[#0a110a] ${
        item.tall ? "h-[340px]" : "h-[200px]"
      }`}
    >
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060b07]/85 via-[#060b07]/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <span
          className="text-[#D4AF37]/80 text-[9px] tracking-[0.25em] uppercase"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          {item.label}
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <div className="bg-[#D4AF37]/12 border border-[#D4AF37]/35 p-2.5">
          <ZoomIn size={16} className="text-[#D4AF37]" />
        </div>
      </div>
      <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/18 transition-all duration-500" />
    </motion.div>
  );
}
