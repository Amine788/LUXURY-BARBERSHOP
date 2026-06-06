import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar, Clock, User, Phone, Scissors,
  Trash2, CheckCircle, XCircle, AlertCircle, RefreshCw, Loader2,
  Search, Filter, X, ChevronDown
} from "lucide-react";
import {
  getReservations,
  updateReservationStatus,
  deleteReservation,
  getBarbers,
  getPricing,
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
  "Servi": {
    color: "text-[#D4AF37]",
    bg: "bg-[#D4AF37]/10 border-[#D4AF37]/30",
    icon: <CheckCircle size={12} />,
  },
};

type DateFilter = "Tous" | "Aujourd'hui" | "Cette semaine" | "Ce mois" | "Custom";

export function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Filter States
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Reservation["status"] | "Tous">("Tous");
  const [dateFilter, setDateFilter] = useState<DateFilter>("Tous");
  const [customDate, setCustomDate] = useState("");
  const [serviceFilter, setServiceFilter] = useState("Tous");
  const [barberFilter, setBarberFilter] = useState("Tous");

  // Options lists
  const [barbers, setBarbers] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getReservations();
      setReservations(data);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => { 
    refresh();
    // Fetch options
    Promise.all([getBarbers(), getPricing()]).then(([bData, pData]) => {
      setBarbers(bData.map(b => b.name).filter(Boolean));
      const sNames = pData.flatMap(cat => cat.items.map(i => i.name));
      setServices([...new Set(sNames)]);
    });
  }, [refresh]);

  // Polling
  useEffect(() => {
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  const handleStatus = async (id: string, status: Reservation["status"]) => {
    await updateReservationStatus(id, status);
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirm === id) {
      await deleteReservation(id);
      setDeleteConfirm(null);
      refresh();
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("Tous");
    setDateFilter("Tous");
    setCustomDate("");
    setServiceFilter("Tous");
    setBarberFilter("Tous");
  };

  // Filter Logic
  const filtered = useMemo(() => {
    return reservations.filter((res) => {
      // 1. Search (Name or Phone)
      const searchMatch = !search || 
        res.name.toLowerCase().includes(search.toLowerCase()) ||
        res.phone.includes(search);
      
      // 2. Status
      const statusMatch = statusFilter === "Tous" || res.status === statusFilter;

      // 3. Service
      const serviceMatch = serviceFilter === "Tous" || res.service === serviceFilter;

      // 4. Barber
      const barberMatch = barberFilter === "Tous" || res.barber === barberFilter;

      // 5. Date
      let dateMatch = true;
      if (dateFilter !== "Tous") {
        const resDate = new Date(res.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (dateFilter === "Aujourd'hui") {
          dateMatch = res.date === today.toISOString().split("T")[0];
        } else if (dateFilter === "Cette semaine") {
          const weekAgo = new Date(today);
          weekAgo.setDate(today.getDate() - 7);
          dateMatch = resDate >= weekAgo;
        } else if (dateFilter === "Ce mois") {
          dateMatch = resDate.getMonth() === today.getMonth() && resDate.getFullYear() === today.getFullYear();
        } else if (dateFilter === "Custom" && customDate) {
          dateMatch = res.date === customDate;
        }
      }

      return searchMatch && statusMatch && serviceMatch && barberMatch && dateMatch;
    });
  }, [reservations, search, statusFilter, dateFilter, customDate, serviceFilter, barberFilter]);

  const counts = {
    Tous:         reservations.length,
    "En attente": reservations.filter((r) => r.status === "En attente").length,
    "Confirmé":   reservations.filter((r) => r.status === "Confirmé").length,
    "Annulé":     reservations.filter((r) => r.status === "Annulé").length,
    "Servi":      reservations.filter((r) => r.status === "Servi").length,
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2
            className="text-[#f0ebe0] text-xl"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
          >
            Gestion des Réservations
          </h2>
          <p className="text-[#f0ebe0]/40 text-xs tracking-wider mt-1 uppercase">
            {filtered.length} résultat{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
            <span className="mx-2">/</span>
            {reservations.length} au total
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 border border-[#f0ebe0]/10 text-[#f0ebe0]/40 hover:text-[#f0ebe0] px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all"
          >
            <X size={12} /> Reset
          </button>
          <button
            onClick={refresh}
            disabled={loading}
            className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/20 px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition-all disabled:opacity-40"
          >
            {loading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
            Actualiser
          </button>
        </div>
      </div>

      {/* Stats Quick Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {(["Tous", "En attente", "Confirmé", "Annulé", "Servi"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`p-4 border text-left transition-all relative overflow-hidden group ${
              statusFilter === s
                ? "border-[#D4AF37]/40 bg-[#D4AF37]/5"
                : "border-[#D4AF37]/10 bg-[#0a110a] hover:border-[#D4AF37]/25"
            }`}
          >
            <div
              className="text-[#D4AF37] text-2xl"
              style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
            >
              {counts[s]}
            </div>
            <div className="text-[#f0ebe0]/40 text-[9px] tracking-[0.2em] uppercase mt-1">
              {s}
            </div>
            {statusFilter === s && (
              <motion.div layoutId="stat-active" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]" />
            )}
          </button>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-[#0a110a] border border-[#D4AF37]/10 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/40" size={14} />
            <input
              type="text"
              placeholder="Nom ou téléphone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#050805] border border-[#D4AF37]/10 text-[#f0ebe0] pl-10 pr-4 py-2.5 text-xs focus:border-[#D4AF37]/40 outline-none transition-all placeholder:text-[#f0ebe0]/20"
            />
          </div>

          {/* Date Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/40" size={14} />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as DateFilter)}
              className="w-full bg-[#050805] border border-[#D4AF37]/10 text-[#f0ebe0] pl-10 pr-4 py-2.5 text-xs focus:border-[#D4AF37]/40 outline-none appearance-none cursor-pointer"
            >
              <option value="Tous">Toutes les dates</option>
              <option value="Aujourd'hui">Aujourd'hui</option>
              <option value="Cette semaine">7 derniers jours</option>
              <option value="Ce mois">Ce mois-ci</option>
              <option value="Custom">Date précise...</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" size={12} />
          </div>

          {/* Custom Date Input */}
          {dateFilter === "Custom" && (
            <div className="relative">
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full bg-[#050805] border border-[#D4AF37]/10 text-[#f0ebe0] px-4 py-2.5 text-xs focus:border-[#D4AF37]/40 outline-none transition-all [color-scheme:dark]"
              />
            </div>
          )}

          {/* Service Filter */}
          <div className="relative">
            <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/40" size={14} />
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full bg-[#050805] border border-[#D4AF37]/10 text-[#f0ebe0] pl-10 pr-4 py-2.5 text-xs focus:border-[#D4AF37]/40 outline-none appearance-none cursor-pointer"
            >
              <option value="Tous">Tous les services</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" size={12} />
          </div>

          {/* Barber Filter */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/40" size={14} />
            <select
              value={barberFilter}
              onChange={(e) => setBarberFilter(e.target.value)}
              className="w-full bg-[#050805] border border-[#D4AF37]/10 text-[#f0ebe0] pl-10 pr-4 py-2.5 text-xs focus:border-[#D4AF37]/40 outline-none appearance-none cursor-pointer"
            >
              <option value="Tous">Tous les barbiers</option>
              {barbers.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" size={12} />
          </div>
        </div>
      </div>

      {/* List */}
      {loading && filtered.length === 0 ? (
        <div className="border border-[#D4AF37]/10 bg-[#0a110a] p-16 text-center">
          <Loader2 size={32} className="text-[#D4AF37]/30 mx-auto mb-4 animate-spin" />
          <p className="text-[#f0ebe0]/30 text-sm tracking-wider uppercase">Chargement...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="border border-[#D4AF37]/10 bg-[#0a110a] p-16 text-center">
          <Filter size={32} className="text-[#D4AF37]/20 mx-auto mb-4" />
          <p className="text-[#f0ebe0]/30 text-sm tracking-wider uppercase">
            Aucune réservation ne correspond à vos filtres
          </p>
          <button onClick={resetFilters} className="mt-4 text-[#D4AF37] text-[10px] tracking-widest uppercase hover:underline">
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((res) => {
              const cfg = STATUS_CONFIG[res.status];
              return (
                <motion.div
                  key={res.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#0a110a] border border-[#D4AF37]/10 p-5 hover:border-[#D4AF37]/30 transition-all duration-300 relative group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Client Info */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-1.5">
                        <span className="text-[#D4AF37]/40 text-[9px] uppercase tracking-[0.2em] block">Client</span>
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-[#D4AF37]" />
                          <span className="text-[#f0ebe0] font-medium text-sm">{res.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#f0ebe0]/40">
                          <Phone size={11} />
                          <span className="text-[11px] tracking-wider">{res.phone}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[#D4AF37]/40 text-[9px] uppercase tracking-[0.2em] block">Prestation</span>
                        <div className="flex items-center gap-2">
                          <Scissors size={14} className="text-[#D4AF37]" />
                          <span className="text-[#f0ebe0]/90 text-sm">{res.service}</span>
                        </div>
                        <div className="text-[11px] text-[#f0ebe0]/40 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#D4AF37]/40" />
                          Barbier: {res.barber || "Non spécifié"}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[#D4AF37]/40 text-[9px] uppercase tracking-[0.2em] block">Rendez-vous</span>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-[#D4AF37]" />
                          <span className="text-[#f0ebe0]/90 text-sm">{res.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#f0ebe0]/40">
                          <Clock size={12} />
                          <span className="text-[11px] tracking-wider">{res.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Area */}
                    <div className="flex flex-wrap items-center gap-2 lg:border-l lg:border-[#D4AF37]/10 lg:pl-6">
                      <div className={`flex items-center gap-2 border px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase ${cfg.color} ${cfg.bg}`}>
                        {cfg.icon}
                        {res.status}
                      </div>

                      <div className="flex gap-1">
                        {res.status === "Confirmé" && (
                          <button
                            onClick={() => handleStatus(res.id, "Servi")}
                            title="Marquer comme servi (Terminé)"
                            className="flex items-center gap-2 px-3 py-1.5 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-[9px] font-bold tracking-widest uppercase"
                          >
                            <CheckCircle size={12} /> Terminer
                          </button>
                        )}
                        {res.status !== "Confirmé" && res.status !== "Servi" && (
                          <button
                            onClick={() => handleStatus(res.id, "Confirmé")}
                            title="Confirmer la réservation"
                            className="p-2 border border-emerald-500/20 text-emerald-500/60 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all"
                          >
                            <CheckCircle size={14} />
                          </button>
                        )}
                        {res.status !== "Annulé" && res.status !== "Servi" && (
                          <button
                            onClick={() => handleStatus(res.id, "Annulé")}
                            title="Annuler la réservation"
                            className="p-2 border border-red-500/20 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all"
                          >
                            <XCircle size={14} />
                          </button>
                        )}
                        {res.status !== "En attente" && (
                          <button
                            onClick={() => handleStatus(res.id, "En attente")}
                            title="Remettre en attente"
                            className="p-2 border border-amber-500/20 text-amber-500/60 hover:text-amber-500 hover:bg-amber-500/10 transition-all"
                          >
                            <AlertCircle size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(res.id)}
                          title="Supprimer définitivement"
                          className={`p-2 border transition-all ${
                            deleteConfirm === res.id
                              ? "bg-red-500 border-red-500 text-white"
                              : "border-white/5 text-white/20 hover:text-red-500 hover:bg-red-500/5 hover:border-red-500/20"
                          }`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submission Info */}
                  <div className="mt-4 pt-3 border-t border-[#D4AF37]/5 flex justify-between items-center">
                    <span className="text-[#f0ebe0]/10 text-[9px] uppercase tracking-widest">
                      ID: {res.id}
                    </span>
                    <span className="text-[#f0ebe0]/20 text-[9px] uppercase tracking-widest">
                      Reçue le {new Date(res.submittedAt).toLocaleString("fr-FR")}
                    </span>
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
