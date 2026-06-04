import { useState } from "react";
import { motion } from "motion/react";
import { Save, Edit2, X, Check, ImageIcon, User } from "lucide-react";
import { getBarbers, saveBarbers, type Barber } from "../../../lib/store";

export function TeamManager() {
  const [barbers, setBarbers] = useState<Barber[]>(getBarbers);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Barber | null>(null);
  const [saved, setSaved] = useState(false);

  const startEdit = (index: number) => {
    setEditingId(index);
    setDraft({ ...barbers[index] });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const saveEdit = () => {
    if (draft === null || editingId === null) return;
    const updated = barbers.map((b, i) => (i === editingId ? draft : b));
    setBarbers(updated);
    saveBarbers(updated);
    setEditingId(null);
    setDraft(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-[#f0ebe0] text-xl"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
          >
            Gestion de l'Équipe
          </h2>
          <p className="text-[#f0ebe0]/40 text-xs tracking-wider mt-1">
            Modifiez le nom et la photo de chaque barbier
          </p>
        </div>
        {saved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 px-4 py-2 text-[10px] tracking-wider"
          >
            <Check size={12} /> Sauvegardé avec succès
          </motion.div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {barbers.map((barber, index) => {
          const isEditing = editingId === index;
          const current = isEditing && draft ? draft : barber;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className={`bg-[#0a110a] border transition-all duration-300 overflow-hidden ${
                isEditing ? "border-[#D4AF37]/40" : "border-[#D4AF37]/10 hover:border-[#D4AF37]/25"
              }`}
            >
              {/* Photo */}
              <div className="relative h-52 overflow-hidden bg-[#040809]">
                {current.photo ? (
                  <img
                    src={current.photo}
                    alt={current.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={40} className="text-[#D4AF37]/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a110a] to-transparent" />

                {/* Edit button */}
                {!isEditing && (
                  <button
                    onClick={() => startEdit(index)}
                    className="absolute top-3 right-3 bg-[#040809]/80 backdrop-blur-sm border border-[#D4AF37]/30 text-[#D4AF37] p-2 hover:bg-[#D4AF37]/15 transition-all duration-200"
                  >
                    <Edit2 size={13} />
                  </button>
                )}

                {/* Name overlay */}
                <div className="absolute bottom-3 left-3">
                  <div
                    className="text-[#f0ebe0] text-base"
                    style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
                  >
                    {current.name}
                  </div>
                  <div className="text-[#D4AF37]/60 text-[9px] tracking-[0.25em] uppercase mt-0.5">
                    {current.title}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                {isEditing && draft ? (
                  <div className="space-y-3">
                    {/* Name field */}
                    <div>
                      <label className="text-[#D4AF37]/55 text-[9px] tracking-[0.3em] uppercase block mb-1.5">
                        Nom du barbier
                      </label>
                      <div className="relative">
                        <User size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" />
                        <input
                          type="text"
                          value={draft.name}
                          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                          className="w-full bg-[#040809] border border-[#D4AF37]/20 pl-8 pr-3 py-2.5 text-[#f0ebe0] text-xs focus:border-[#D4AF37]/50 outline-none transition-colors"
                          placeholder="Nom du barbier"
                        />
                      </div>
                    </div>

                    {/* Photo URL field */}
                    <div>
                      <label className="text-[#D4AF37]/55 text-[9px] tracking-[0.3em] uppercase block mb-1.5">
                        URL de la photo
                      </label>
                      <div className="relative">
                        <ImageIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" />
                        <input
                          type="url"
                          value={draft.photo}
                          onChange={(e) => setDraft({ ...draft, photo: e.target.value })}
                          className="w-full bg-[#040809] border border-[#D4AF37]/20 pl-8 pr-3 py-2.5 text-[#f0ebe0] text-xs focus:border-[#D4AF37]/50 outline-none transition-colors"
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    {/* Specialty field */}
                    <div>
                      <label className="text-[#D4AF37]/55 text-[9px] tracking-[0.3em] uppercase block mb-1.5">
                        Spécialité
                      </label>
                      <input
                        type="text"
                        value={draft.specialty}
                        onChange={(e) => setDraft({ ...draft, specialty: e.target.value })}
                        className="w-full bg-[#040809] border border-[#D4AF37]/20 px-3 py-2.5 text-[#f0ebe0] text-xs focus:border-[#D4AF37]/50 outline-none transition-colors"
                        placeholder="Spécialité"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={saveEdit}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#D4AF37] text-[#040809] py-2.5 text-[9px] tracking-[0.25em] uppercase hover:bg-[#c9a632] transition-colors font-bold"
                      >
                        <Save size={11} /> Sauvegarder
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex items-center justify-center gap-1.5 border border-[#D4AF37]/20 text-[#f0ebe0]/40 hover:text-[#f0ebe0]/70 px-3 py-2.5 text-[9px] tracking-wider uppercase transition-colors"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[#f0ebe0]/45 text-[10px] leading-relaxed">
                      {barber.specialty}
                    </p>
                    <button
                      onClick={() => startEdit(index)}
                      className="mt-3 w-full flex items-center justify-center gap-2 border border-[#D4AF37]/20 text-[#D4AF37]/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 py-2.5 text-[9px] tracking-[0.25em] uppercase transition-all duration-200"
                    >
                      <Edit2 size={11} /> Modifier
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-[#f0ebe0]/20 text-[10px] tracking-wider text-center pt-2">
        Les modifications sont appliquées immédiatement sur le site et dans la page de réservation.
      </p>
    </div>
  );
}
