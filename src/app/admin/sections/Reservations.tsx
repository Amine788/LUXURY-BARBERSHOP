import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar, Clock, User, Phone, Scissors,
  Trash2, CheckCircle, XCircle, AlertCircle, RefreshCw,
} from "lucide-react";
import {
  getReservations,
  updateReservationStatus,
  deleteReservation,
  type Reservation,
} from "../../../lib/store";

const STATUS_CONFIG = {
  "En attente": {
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-400/30",
    icon: <AlertCircle size={12} />,
  },
  "Confirmé": {
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/30",
    icon: <CheckCircle size={12} />,
  },
  "Annulé": {
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
    icon: <XCircle size={12} />,
  },
};

export function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>(getReservations);
  const [filter, setFilter] = useState<Reservation["status"] | "Tous">("Tous");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const refresh = useCallback(() => setReservations(getReservations()), []);

  const handleStatus = (id: string, status: Reservation["status"]) => {
    updateReservationStatus(id, status);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteReservation(id);
      setDeleteConfirm(null);
      refresh();
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const filtered = filter === "Tous"
    ? reservations
    : reservations.filter((r) => r.status === filter);

  const counts = {
    Tous: reservations.length,
    "En attente": reservations.filter((r) => r.status === "En attente").length,
    "Confirmé": reservations.filter((r) => r.status === "Confirmé").length,
    "Annulé": reservations.filter((r) => r.status === "Annulé").length,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2
            className="text-[#f0ebe0] text-xl"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
          >
            Réservations
          </h2>
          <p className="text-[#f0ebe0]/40 text-xs tracking-wider mt-1">
            {reservations.length} réservation{reservations.length !== 1 ? "s" : ""} au total
          </p>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-2 border border-[#D4AF37]/20 text-[#D4AF37]/60 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 px-4 py-2 text-[10px] tracking-[0.25em] uppercase transition-all duration-200"
        >
          <RefreshCw size={12} />
          Actualiser
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["Tous", "En attente", "Confirmé", "Annulé"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`p-4 border text-left transition-all duration-200 ${
              filter === s
                ? "border-[#D4AF37]/40 bg-[#D4AF37]/8"
                : "border-[#D4AF37]/10 bg-[#0a110a] hover:border-[#D4AF37]/25"
            }`}
          >
            <div
              className="text-[#D4AF37] text-2xl"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
            >
              {counts[s]}
            </div>
            <div className="text-[#f0ebe0]/40 text-[10px] tracking-wider uppercase mt-1">
              {s}
            </div>
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="border border-[#D4AF37]/10 bg-[#0a110a] p-16 text-center">
          <Calendar size={32} className="text-[#D4AF37]/20 mx-auto mb-4" />
          <p className="text-[#f0ebe0]/30 text-sm tracking-wider">
            Aucune réservation {filter !== "Tous" ? `— ${filter}` : ""}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((res) => {
              const cfg = STATUS_CONFIG[res.status];
              return (
                <motion.div
                  key={res.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#0a110a] border border-[#D4AF37]/10 p-5 hover:border-[#D4AF37]/20 transition-all duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Info */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {/* Client */}
                      <div className="flex items-center gap-2">
                        <User size={13} className="text-[#D4AF37]/50 shrink-0" />
                        <div>
                          <div className="text-[#f0ebe0] text-sm font-medium">{res.name}</div>
                          <div className="text-[#f0ebe0]/40 text-[10px] tracking-wider">{res.phone}</div>
                        </div>
                      </div>

                      {/* Service */}
                      <div className="flex items-center gap-2">
                        <Scissors size={13} className="text-[#D4AF37]/50 shrink-0" />
                        <div>
                          <div className="text-[#f0ebe0]/80 text-xs">{res.service}</div>
                          <div className="text-[#f0ebe0]/40 text-[10px] tracking-wider">
                            {res.barber || "Sans préférence"}
                          </div>
                        </div>
                      </div>

                      {/* Date/Time */}
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-[#D4AF37]/50 shrink-0" />
                        <div>
                          <div className="text-[#f0ebe0]/80 text-xs">{res.date}</div>
                          <div className="flex items-center gap-1 text-[#f0ebe0]/40 text-[10px]">
                            <Clock size={10} />
                            {res.time}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Status badge */}
                      <span className={`flex items-center gap-1.5 border px-2.5 py-1 text-[9px] tracking-wider uppercase ${cfg.color} ${cfg.bg}`}>
                        {cfg.icon}
                        {res.status}
                      </span>

                      {/* Change status */}
                      {res.status !== "Confirmé" && (
                        <button
                          onClick={() => handleStatus(res.id, "Confirmé")}
                          className="flex items-center gap-1 border border-emerald-400/30 text-emerald-400/70 hover:text-emerald-400 hover:bg-emerald-400/10 px-3 py-1.5 text-[9px] tracking-wider uppercase transition-all duration-200"
                        >
                          <CheckCircle size={11} /> Confirmer
                        </button>
                      )}
                      {res.status !== "Annulé" && (
                        <button
                          onClick={() => handleStatus(res.id, "Annulé")}
                          className="flex items-center gap-1 border border-red-400/30 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 px-3 py-1.5 text-[9px] tracking-wider uppercase transition-all duration-200"
                        >
                          <XCircle size={11} /> Annuler
                        </button>
                      )}
                      {res.status !== "En attente" && (
                        <button
                          onClick={() => handleStatus(res.id, "En attente")}
                          className="flex items-center gap-1 border border-amber-400/30 text-amber-400/70 hover:text-amber-400 hover:bg-amber-400/10 px-3 py-1.5 text-[9px] tracking-wider uppercase transition-all duration-200"
                        >
                          <AlertCircle size={11} /> En attente
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(res.id)}
                        className={`flex items-center gap-1 border px-3 py-1.5 text-[9px] tracking-wider uppercase transition-all duration-200 ${
                          deleteConfirm === res.id
                            ? "border-red-500 text-red-400 bg-red-500/15"
                            : "border-[#D4AF37]/10 text-[#f0ebe0]/30 hover:border-red-400/30 hover:text-red-400/60"
                        }`}
                      >
                        <Trash2 size={11} />
                        {deleteConfirm === res.id ? "Confirmer ?" : "Supprimer"}
                      </button>
                    </div>
                  </div>

                  {/* Submitted at */}
                  <div className="mt-3 pt-3 border-t border-[#D4AF37]/8 text-[#f0ebe0]/20 text-[9px] tracking-wider">
                    Reçue le {new Date(res.submittedAt).toLocaleString("fr-FR")}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
