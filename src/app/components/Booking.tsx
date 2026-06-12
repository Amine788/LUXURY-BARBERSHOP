import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Phone, Calendar, Clock, Check, Loader2, X, ChevronDown } from "lucide-react";
import { addReservation, getBarbers, getImageUrl, getPricing, getWhatsAppUrl, type ServiceItem } from "../../lib/store";
import { useAsync } from "../../lib/hooks/useAsync";
import { useI18n } from "../../lib/i18n/context";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
];

const fieldLabel = "text-[#D4AF37]/55 text-[10px] tracking-[0.3em] uppercase mb-2 block";
const inputCls =
  "w-full bg-[#040809] border border-[#D4AF37]/14 pl-10 pr-4 py-4 text-[#f0ebe0] placeholder-[#f0ebe0]/20 focus:border-[#D4AF37]/45 outline-none transition-colors duration-300 text-sm";
const selectCls =
  "w-full bg-[#040809] border border-[#D4AF37]/14 pl-10 pr-9 py-4 text-[#f0ebe0]/80 focus:border-[#D4AF37]/45 outline-none transition-colors duration-300 appearance-none text-sm";

export function Booking() {
  const { data: barbers = [], refetch: refetchBarbers } = useAsync(getBarbers);
  const { data: categories = [] } = useAsync(getPricing);
  const { t, isRTL, language } = useI18n();

  useEffect(() => {
    const onUpdate = () => refetchBarbers();
    const onStorage = (event: StorageEvent) => {
      if (event.key === "aviator_barbers") refetchBarbers();
    };
    window.addEventListener("aviator:barbers-updated", onUpdate);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("aviator:barbers-updated", onUpdate);
      window.removeEventListener("storage", onStorage);
    };
  }, [refetchBarbers]);

  const staff = barbers.map((b) => ({
    name: b.name,
    photo: b.photo,
    photoPosition: b.photoPosition,
  }));

  const [form, setForm] = useState({
    name: "",
    phone: "",
    barber: "",
    date: "",
    time: "",
  });
  const [cart, setCart] = useState<ServiceItem[]>([]);
  const [cartError, setCartError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Preselected service from localStorage (e.g. from Pricing section)
  useEffect(() => {
    if (categories.length === 0) return;
    const preselected = localStorage.getItem("aviator_selected_service");
    if (!preselected) return;

    for (const cat of categories) {
      for (let idx = 0; idx < cat.items.length; idx++) {
        const item = cat.items[idx];
        if (
          item.name.toLowerCase().includes(preselected.toLowerCase()) ||
          preselected.toLowerCase().includes(item.name.toLowerCase().split(" ")[0])
        ) {
          const price = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
          setCart([{ id: `${cat.id}_${idx}`, name: item.name, price }]);
          break;
        }
      }
    }
    localStorage.removeItem("aviator_selected_service");
  }, [categories]);

  const toggleService = (item: ServiceItem) => {
    setCartError(false);
    setCart((prev) =>
      prev.some((s) => s.id === item.id)
        ? prev.filter((s) => s.id !== item.id)
        : [...prev, item]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((s) => s.id !== id));
  };

  const totalPrice = cart.reduce((sum, s) => sum + s.price, 0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setCartError(true);
      setTimeout(() => setCartError(false), 3000);
      return;
    }
    setLoading(true);
    try {
      await addReservation({
        name: form.name,
        phone: form.phone,
        services: cart,
        barber: form.barber,
        date: form.date,
        time: form.time,
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const buildWhatsAppUrl = () => {
    const servicesList = cart.map((s) => s.name).join(", ") || "À discuter";
    const total = totalPrice;
    let msg = "";
    if (language === "ar") {
      msg = `مرحباً أفياتور باربر شوب، أود حجز موعد :\n• الخدمات : ${servicesList}\n• الإجمالي : ${total} درهم\n• الحلاق : ${form.barber || "بدون تفضيل"}\n• التاريخ : ${form.date || "للنقاش"}\n• الوقت : ${form.time || "للنقاش"}\nاسمي هو ${form.name} ورقمي هو ${form.phone}.`;
    } else if (language === "en") {
      msg = `Hello AVIATOR Barbershop, I would like to book :\n• Services: ${servicesList}\n• Total: ${total} DH\n• Barber: ${form.barber || "No preference"}\n• Date: ${form.date || "To discuss"}\n• Time: ${form.time || "To discuss"}\nMy name is ${form.name} and my number is ${form.phone}.`;
    } else {
      msg = `Bonjour AVIATOR Barbershop, je souhaite réserver :\n• Services : ${servicesList}\n• Total : ${total} DH\n• Barbier : ${form.barber || "Pas de préférence"}\n• Date : ${form.date || "À discuter"}\n• Heure : ${form.time || "À discuter"}\nMon nom est ${form.name} et mon numéro est ${form.phone}.`;
    }
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
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-5 mb-6">
            <div className="h-px w-16 bg-[#D4AF37]/35" />
            <span
              className="text-[#D4AF37]/70 tracking-[0.45em] text-[10px] uppercase"
              style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
            >
              {language === "ar" ? "حجز" : "Réservation"}
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
              <>احجز <em style={{ color: "#D4AF37", fontStyle: "italic" }}>موعدك</em></>
            ) : (
              <>
                {language === "en" ? "Book Your " : "Prenez "}
                <em style={{ color: "#D4AF37", fontStyle: "italic" }}>
                  {language === "en" ? "Appointment" : "Rendez-vous"}
                </em>
              </>
            )}
          </h2>
          <p
            className="text-[#f0ebe0]/35 mt-5 text-xs tracking-wider"
            style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
          >
            {t("booking.subtitle")}
          </p>
        </div>

        {/* Success screen */}
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
              {language === "ar" ? "تم إرسال الطلب" : language === "en" ? "Request Sent" : "Demande Envoyée"}
            </h3>
            <p
              className="text-[#f0ebe0]/50 mb-8 text-sm leading-relaxed max-w-sm mx-auto"
              style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
            >
              {t("booking.form.success")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-[#22c35e] transition-colors"
                style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif", fontWeight: 700 }}
              >
                <WhatsAppIcon />
                {language === "ar" ? "التأكيد عبر واتساب" : language === "en" ? "Confirm via WhatsApp" : "Confirmer via WhatsApp"}
              </a>
              <button
                onClick={() => { setSubmitted(false); setCart([]); }}
                className="border border-[#D4AF37]/35 text-[#D4AF37] px-8 py-3.5 text-xs tracking-[0.25em] uppercase hover:bg-[#D4AF37]/8 transition-colors"
                style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
              >
                {language === "ar" ? "حجز جديد" : language === "en" ? "New Booking" : "Nouvelle Réservation"}
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
              <label className={fieldLabel} style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
                {t("booking.form.name")}
              </label>
              <div className="relative">
                <User size={14} className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none`} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder={t("booking.form.name")}
                  className={`${inputCls} ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"}`}
                  style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className={fieldLabel} style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
                {t("booking.form.phone")}
              </label>
              <div className="relative">
                <Phone size={14} className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none`} />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="06 XX XX XX XX"
                  className={`${inputCls} ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"}`}
                  style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
                />
              </div>
            </div>

            {/* ── Services Multi-Selection ─────────────────────────────────── */}
            <div className="md:col-span-2">
              <label
                className={`${fieldLabel} flex items-center gap-2`}
                style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
              >
                {language === "ar" ? "الخدمات" : language === "en" ? "Services" : "Services"}
                {cart.length > 0 && (
                  <span className="bg-[#D4AF37] text-[#040809] text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {cart.length}
                  </span>
                )}
              </label>

              <div
                className={`border p-4 transition-colors duration-300 space-y-5 ${
                  cartError
                    ? "border-red-500/40 bg-red-500/5"
                    : "border-[#D4AF37]/10 bg-[#040809]"
                }`}
              >
                {categories.map((cat) => (
                  <div key={cat.id}>
                    {/* Category header */}
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[#D4AF37]/50 text-sm">{cat.icon}</span>
                      <span className="text-[#D4AF37]/40 text-[9px] tracking-[0.3em] uppercase">
                        {cat.label}
                      </span>
                      <div className="flex-1 h-px bg-[#D4AF37]/8" />
                    </div>

                    {/* Service cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {cat.items.map((item, idx) => {
                        const svcId = `${cat.id}_${idx}`;
                        const price = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
                        const isSelected = cart.some((s) => s.id === svcId);
                        return (
                          <button
                            key={svcId}
                            type="button"
                            onClick={() => toggleService({ id: svcId, name: item.name, price })}
                            className={`flex flex-col items-start gap-1 p-3 border text-left transition-all duration-200 relative group ${
                              isSelected
                                ? "border-[#D4AF37] bg-[#D4AF37]/8"
                                : "border-[#D4AF37]/12 bg-[#090f0a] hover:border-[#D4AF37]/35"
                            }`}
                          >
                            <span
                              className={`text-[11px] font-medium leading-tight ${
                                isSelected ? "text-[#D4AF37]" : "text-[#f0ebe0]/80"
                              }`}
                              style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
                            >
                              {item.name}
                            </span>
                            <div className="flex items-center justify-between w-full mt-0.5">
                              <span
                                className={`text-[10px] ${
                                  isSelected ? "text-[#D4AF37]/60" : "text-[#f0ebe0]/30"
                                }`}
                              >
                                {item.price}
                              </span>
                              {isSelected ? (
                                <div className="w-4 h-4 bg-[#D4AF37] flex items-center justify-center shrink-0">
                                  <Check size={9} className="text-[#040809]" />
                                </div>
                              ) : (
                                <div className="w-4 h-4 border border-[#D4AF37]/20 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="text-[#D4AF37]/40 text-[10px] leading-none">+</span>
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart error message */}
              <AnimatePresence>
                {cartError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-400 text-[10px] tracking-wider mt-2"
                    style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
                  >
                    {language === "ar"
                      ? "⚠ الرجاء اختيار خدمة واحدة على الأقل"
                      : language === "en"
                      ? "⚠ Please select at least one service"
                      : "⚠ Veuillez sélectionner au moins un service"}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Date */}
            <div>
              <label className={fieldLabel} style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
                {t("booking.form.date")}
              </label>
              <div className="relative">
                <Calendar size={14} className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none`} />
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  min={today}
                  className={`${inputCls} ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"} [color-scheme:dark]`}
                  style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className={fieldLabel} style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
                {t("booking.form.time")}
              </label>
              <div className="relative">
                <Clock size={14} className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none`} />
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className={`${selectCls} ${isRTL ? "pr-10 pl-9" : "pl-10 pr-9"}`}
                  style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
                >
                  <option value="" disabled className="bg-[#040809]">{t("booking.form.time")}</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot} className="bg-[#040809]">{slot}</option>
                  ))}
                </select>
                <ChevronDown size={14} className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none`} />
              </div>
            </div>

            {/* Staff selector */}
            <div className="md:col-span-2">
              <label className={fieldLabel} style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}>
                {t("booking.form.barber")}
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
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      form.barber === "" ? "border-[#D4AF37] bg-[#D4AF37]/15" : "border-[#D4AF37]/20 bg-[#D4AF37]/5"
                    }`}
                  >
                    {form.barber === "" ? (
                      <Check size={16} className="text-[#D4AF37]" />
                    ) : (
                      <span className="text-[#D4AF37]/40 text-lg">?</span>
                    )}
                  </div>
                  <span
                    className={`text-[8px] tracking-wider text-center leading-tight ${form.barber === "" ? "text-[#D4AF37]" : "text-[#f0ebe0]/35"}`}
                    style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
                  >
                    {t("booking.form.noPreference")}
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
                          src={getImageUrl(member.photo)}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover"
                          style={{ objectPosition: member.photoPosition ?? "center" }}
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
                        style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
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
                disabled={loading}
                className="w-full bg-[#D4AF37] text-[#040809] py-5 text-xs tracking-[0.3em] uppercase hover:bg-[#c9a632] transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif", fontWeight: 700 }}
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    {t("booking.form.loading")}
                  </>
                ) : (
                  t("booking.form.submit")
                )}
              </button>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full border border-[#25D366]/35 text-[#25D366]/80 py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#25D366]/8 hover:border-[#25D366]/60 transition-all duration-300"
                style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
              >
                <WhatsAppIcon />
                {language === "ar"
                  ? "الحجز مباشرة عبر واتساب"
                  : language === "en"
                  ? "Book directly via WhatsApp"
                  : "Réserver directement via WhatsApp"}
              </a>

              <p
                className="text-center text-[#f0ebe0]/22 text-[10px] tracking-wider pt-1"
                style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
              >
                {language === "ar"
                  ? "يقوم فريقنا بتأكيد الحجوزات عبر الهاتف أو واتساب في غضون ساعتين"
                  : language === "en"
                  ? "Our team confirms bookings by phone or WhatsApp within 2h"
                  : "Notre équipe confirme les réservations par téléphone ou WhatsApp sous 2h"}
              </p>
            </div>

            {/* Spacer to prevent floating cart from overlapping submit button */}
            {cart.length > 0 && <div className="md:col-span-2 h-20" aria-hidden="true" />}

            {/* ── Floating Cart Banner ─────────────────────────────────────── */}
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.div
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 80, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#D4AF37]/25 bg-[#040809]/96"
                  style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
                >
                  <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
                    {/* Selected services as tags */}
                    <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                      {cart.map((s) => (
                        <span
                          key={s.id}
                          className="inline-flex items-center gap-1 bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-[#D4AF37] text-[9px] tracking-[0.1em] uppercase px-2 py-1"
                        >
                          <span className="truncate max-w-[100px]">{s.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFromCart(s.id)}
                            className="shrink-0 text-[#D4AF37]/50 hover:text-[#D4AF37] transition-colors ml-0.5"
                          >
                            <X size={9} />
                          </button>
                        </span>
                      ))}
                    </div>

                    {/* Total price */}
                    <div className="text-right hidden sm:block shrink-0">
                      <div
                        className="text-[#D4AF37] font-bold text-base leading-tight"
                        style={{ fontFamily: "Playfair Display, serif" }}
                      >
                        {totalPrice} DH
                      </div>
                      <div className="text-[#f0ebe0]/30 text-[8px] tracking-widest uppercase">
                        {cart.length} service{cart.length > 1 ? "s" : ""}
                      </div>
                    </div>

                    {/* Book button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#D4AF37] text-[#040809] py-2.5 px-5 text-[10px] tracking-[0.2em] uppercase hover:bg-[#c9a632] transition-all font-bold flex items-center gap-2 disabled:opacity-60 shrink-0"
                      style={{ fontFamily: isRTL ? "inherit" : "Raleway, sans-serif" }}
                    >
                      {loading ? (
                        <Loader2 size={11} className="animate-spin" />
                      ) : (
                        <Check size={11} />
                      )}
                      {language === "ar" ? "أكد الحجز" : language === "en" ? "Book Now" : "Réserver"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
