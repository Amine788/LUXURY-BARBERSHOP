import { useState } from "react";
import { Phone, Save, Check } from "lucide-react";
import { getContactPhone, saveContactPhone, getDisplayPhone, saveDisplayPhone } from "../../../lib/store";

export function Settings() {
  const [whatsappPhone, setWhatsappPhone] = useState(getContactPhone());
  const [displayPhone, setDisplayPhone] = useState(getDisplayPhone());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveContactPhone(whatsappPhone);
    saveDisplayPhone(displayPhone);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#040809] border border-[#D4AF37]/10 p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
            <Phone size={20} className="text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-[#f0ebe0] text-lg font-bold" style={{ fontFamily: "Playfair Display, serif" }}>
              Coordonnées de Contact
            </h2>
            <p className="text-[#f0ebe0]/30 text-xs tracking-wider uppercase mt-1">
              Gérez les numéros affichés sur le site
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp API Phone */}
          <div className="space-y-3">
            <label className="text-[#D4AF37]/60 text-[10px] tracking-[0.3em] uppercase block">
              Numéro WhatsApp (Format: 212xxxxxxxxx)
            </label>
            <input
              type="text"
              value={whatsappPhone}
              onChange={(e) => setWhatsappPhone(e.target.value)}
              placeholder="212659659715"
              className="w-full bg-[#060b07] border border-[#D4AF37]/20 p-4 text-[#f0ebe0] focus:border-[#D4AF37]/50 outline-none transition-all"
            />
            <p className="text-[#f0ebe0]/20 text-[10px] leading-relaxed italic">
              * Ce numéro est utilisé pour les liens WhatsApp. Ne mettez pas de "+" ou d'espaces.
            </p>
          </div>

          {/* Display Phone */}
          <div className="space-y-3">
            <label className="text-[#D4AF37]/60 text-[10px] tracking-[0.3em] uppercase block">
              Numéro Affiché sur le site
            </label>
            <input
              type="text"
              value={displayPhone}
              onChange={(e) => setDisplayPhone(e.target.value)}
              placeholder="05 28 32 63 64"
              className="w-full bg-[#060b07] border border-[#D4AF37]/20 p-4 text-[#f0ebe0] focus:border-[#D4AF37]/50 outline-none transition-all"
            />
            <p className="text-[#f0ebe0]/20 text-[10px] leading-relaxed italic">
              * Ce numéro sera affiché dans la section contact et le pied de page.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[#D4AF37]/10 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saved}
            className={`flex items-center gap-3 px-10 py-4 text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
              saved
                ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/50"
                : "bg-[#D4AF37] text-[#040809] hover:bg-[#c9a632] hover:shadow-xl hover:shadow-[#D4AF37]/10"
            }`}
          >
            {saved ? (
              <>
                <Check size={14} />
                <span>Enregistré !</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>Enregistrer les modifications</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/10 p-6">
        <p className="text-[#D4AF37]/70 text-[11px] leading-relaxed">
          <span className="font-bold mr-2">Note :</span>
          Les modifications seront appliquées instantanément sur le site. Si vous ne voyez pas les changements, rafraîchissez la page du site public.
        </p>
      </div>
    </div>
  );
}
