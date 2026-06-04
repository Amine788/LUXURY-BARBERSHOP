import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { User, Phone, ChevronDown, Calendar, Clock, Check } from "lucide-react";
import { addReservation, getBarbers, getWhatsAppUrl } from "../../lib/store";

const staff = getBarbers().map((b) => ({ name: b.name, photo: b.photo }));

const services = [
  "Coupe",
  "Coupe + Barbe",
  "Traçage de Barbe",
  "Rasage à l'Ancienne",
  "Coupe Enfant",
  "Soins Visage Simple",
  "Soins Visage Global (Hydrafacial)",
  "Soin Botox Capillaire",
  "Soin Vapeur",
  "Coloration Cheveux",
  "Mèches",
  "Coloration Barbe",
  "Shampooing & Brushing",
  "Soins Protéine",
  "Manucure",
  "Pédicure",
  "Pack Full Experience (700 DH)",
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
];

const WHATSAPP_BASE = getWhatsAppUrl();

const fieldLabel = "text-[#D4AF37]/55 text-[10px] tracking-[0.3em] uppercase mb-2 block";
const inputCls =
  "w-full bg-[#040809] border border-[#D4AF37]/14 pl-10 pr-4 py-4 text-[#f0ebe0] placeholder-[#f0ebe0]/20 focus:border-[#D4AF37]/45 outline-none transition-colors duration-300 text-sm";
const selectCls =
  "w-full bg-[#040809] border border-[#D4AF37]/14 pl-10 pr-9 py-4 text-[#f0ebe0]/80 focus:border-[#D4AF37]/45 outline-none transition-colors duration-300 appearance-none text-sm";

export function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    barber: "",
    date: "",
    time: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const preselected = localStorage.getItem("aviator_selected_service");
    if (preselected) {
      const match = services.find((s) =>
        s.toLowerCase().includes(preselected.toLowerCase()) ||
        preselected.toLowerCase().includes(s.toLowerCase().split(" ")[0])
      );
      setForm((prev) => ({ ...prev, service: match || preselected }));
      localStorage.removeItem("aviator_selected_service");
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReservation({
      name: form.name,
      phone: form.phone,
      service: form.service,
      barber: form.barber,
      date: form.date,
      time: form.time,
    });
    setSubmitted(true);
  };

  const today = new Date().toISOString().split("T")[0];

  const buildWhatsAppUrl = () => {
    const msg = `Bonjour AVIATOR Barbershop, je souhaite réserver :\n• Service : ${form.service || "À discuter"}\n• Barbier : ${form.barber || "Pas de préférence"}\n• Date : ${form.date || "À discuter"}\n• Heure : ${form.time || "À discuter"}\nMon nom est ${form.name} et mon numéro est ${form.phone}.`;
    return getWhatsAppUrl(msg);
  };

  return (
    <section id="booking" className="py-36 bg-[#040809] relative overflow-hidden">
      <div
        className="absolute inset-y-0 right-0 w-1/2 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="h-px w-16 bg-[#D4AF37]/35" />
            <span
              className="text-[#D4AF37]/70 tracking-[0.45em] text-[10px] uppercase"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Réservation
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
            Prenez{" "}
            <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Rendez-vous</em>
          </h2>
          <p
            className="text-[#f0ebe0]/35 mt-5 text-xs tracking-wider"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            Remplissez le formulaire ou contactez-nous directement via WhatsApp
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 border border-[#D4AF37]/14 bg-[#060b07]"
          >
            <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-7">
              <span className="text-[#D4AF37] text-xl">✓</span>
            </div>
            <h3
              className="text-[#f0ebe0] mb-4"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "1.7rem", fontWeight: 700 }}
            >
              Demande Envoyée
            </h3>
            <p
              className="text-[#f0ebe0]/50 mb-8 text-sm leading-relaxed max-w-sm mx-auto"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Merci, {form.name}. Notre équipe confirmera votre rendez-vous{" "}
              <span className="text-[#D4AF37]/80">{form.service}</span>
              {form.barber ? <> avec <span className="text-[#D4AF37]/80">{form.barber}</span></> : ""} par téléphone sous 2h.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-[#22c35e] transition-colors"
                style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700 }}
              >
                <WhatsAppIcon />
                Confirmer via WhatsApp
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="border border-[#D4AF37]/35 text-[#D4AF37] px-8 py-3.5 text-xs tracking-[0.25em] uppercase hover:bg-[#D4AF37]/8 transition-colors"
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                Nouvelle Réservation
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Name */}
            <div>
              <label className={fieldLabel} style={{ fontFamily: "Raleway, sans-serif" }}>
                Nom Complet
              </label>
              <div className="relative">
                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom complet"
                  className={inputCls}
                  style={{ fontFamily: "Raleway, sans-serif" }}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className={fieldLabel} style={{ fontFamily: "Raleway, sans-serif" }}>
                Numéro de Téléphone
              </label>
              <div className="relative">
                <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="05 XX XX XX XX"
                  className={inputCls}
                  style={{ fontFamily: "Raleway, sans-serif" }}
                />
              </div>
            </div>

            {/* Service */}
            <div>
              <label className={fieldLabel} style={{ fontFamily: "Raleway, sans-serif" }}>
                Service
              </label>
              <div className="relative">
                <ChevronDown size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" />
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className={selectCls}
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  <option value="" disabled className="bg-[#040809]">Choisir un service</option>
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-[#040809]">{s}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className={fieldLabel} style={{ fontFamily: "Raleway, sans-serif" }}>
                Date Souhaitée
              </label>
              <div className="relative">
                <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  min={today}
                  className={`${inputCls} [color-scheme:dark]`}
                  style={{ fontFamily: "Raleway, sans-serif" }}
                />
              </div>
            </div>

            {/* Time */}
            <div className="md:col-span-2">
              <label className={fieldLabel} style={{ fontFamily: "Raleway, sans-serif" }}>
                Heure Souhaitée
              </label>
              <div className="relative">
                <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" />
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className={selectCls}
                  style={{ fontFamily: "Raleway, sans-serif" }}
                >
                  <option value="" disabled className="bg-[#040809]">Choisir un créneau</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t} className="bg-[#040809]">{t}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" />
              </div>
            </div>

            {/* Staff selector */}
            <div className="md:col-span-2">
              <label className={fieldLabel} style={{ fontFamily: "Raleway, sans-serif" }}>
                Choisir votre Barbier <span className="text-[#f0ebe0]/25 normal-case tracking-normal">(optionnel)</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                {/* No preference card */}
                <button
                  type="button"
                  onClick={() => setForm({ ...form, barber: "" })}
                  className={`flex flex-col items-center gap-2 p-3 border transition-all duration-300 ${
                    form.barber === ""
                      ? "border-[#D4AF37] bg-[#D4AF37]/8"
                      : "border-[#D4AF37]/12 bg-[#090f0a] hover:border-[#D4AF37]/35"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    form.barber === "" ? "border-[#D4AF37] bg-[#D4AF37]/15" : "border-[#D4AF37]/20 bg-[#D4AF37]/5"
                  }`}>
                    {form.barber === "" ? (
                      <Check size={16} className="text-[#D4AF37]" />
                    ) : (
                      <span className="text-[#D4AF37]/40 text-lg">?</span>
                    )}
                  </div>
                  <span
                    className={`text-[8px] tracking-wider text-center leading-tight ${form.barber === "" ? "text-[#D4AF37]" : "text-[#f0ebe0]/35"}`}
                    style={{ fontFamily: "Raleway, sans-serif" }}
                  >
                    Sans préf.
                  </span>
                </button>

                {/* Staff cards */}
                {staff.map((member) => {
                  const isSelected = form.barber === member.name;
                  return (
                    <button
                      key={member.name}
                      type="button"
                      onClick={() => setForm({ ...form, barber: isSelected ? "" : member.name })}
                      className={`flex flex-col items-center gap-2 p-3 border transition-all duration-300 ${
                        isSelected
                          ? "border-[#D4AF37] bg-[#D4AF37]/8"
                          : "border-[#D4AF37]/12 bg-[#090f0a] hover:border-[#D4AF37]/35"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover object-top"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37] flex items-end justify-end">
                            <div className="w-4 h-4 bg-[#D4AF37] rounded-full flex items-center justify-center -mb-0.5 -mr-0.5">
                              <Check size={9} className="text-[#060b07]" />
                            </div>
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-[8px] tracking-wider text-center leading-tight ${isSelected ? "text-[#D4AF37]" : "text-[#f0ebe0]/35"}`}
                        style={{ fontFamily: "Raleway, sans-serif" }}
                      >
                        {member.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 pt-3 space-y-3">
              <button
                type="submit"
                className="w-full bg-[#D4AF37] text-[#040809] py-5 text-xs tracking-[0.3em] uppercase hover:bg-[#c9a632] transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/20"
                style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700 }}
              >
                Confirmer la Réservation
              </button>

              <a
                href={WHATSAPP_BASE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full border border-[#25D366]/35 text-[#25D366]/80 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#25D366]/8 hover:border-[#25D366]/60 transition-all duration-300"
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                <WhatsAppIcon />
                Réserver directement via WhatsApp
              </a>

              <p
                className="text-center text-[#f0ebe0]/22 text-[10px] tracking-wider pt-1"
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                Notre équipe confirme les réservations par téléphone ou WhatsApp sous 2h
              </p>
            </div>
          </motion.form>
        )}
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
