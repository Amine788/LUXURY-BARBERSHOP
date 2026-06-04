import { useState } from "react";
import {
  Scissors, Calendar, Users, LogOut, Menu, X, BarChart3, Tag,
} from "lucide-react";
import { logout } from "../../lib/store";
import { Reservations } from "./sections/Reservations";
import { TeamManager } from "./sections/TeamManager";
import { PricingManager } from "./sections/PricingManager";

type Tab = "reservations" | "team" | "pricing";

interface Props {
  onLogout: () => void;
}

export function AdminPage({ onLogout }: Props) {
  const [tab, setTab] = useState<Tab>("reservations");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "reservations", label: "Réservations", icon: <Calendar size={16} /> },
    { id: "team", label: "Équipe", icon: <Users size={16} /> },
    { id: "pricing", label: "Tarifs", icon: <Tag size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#060b07] flex" style={{ fontFamily: "Raleway, sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#040809] border-r border-[#D4AF37]/10 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:flex`}
      >
        {/* Logo */}
        <div className="p-7 border-b border-[#D4AF37]/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
              <Scissors size={16} className="text-[#D4AF37]" />
            </div>
            <div>
              <div className="text-[#f0ebe0] text-sm" style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}>
                AVIATOR
              </div>
              <div className="text-[#D4AF37]/50 text-[9px] tracking-[0.3em] uppercase">Admin</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-[#f0ebe0]/25 text-[9px] tracking-[0.4em] uppercase px-3 pb-3 pt-2">
            Navigation
          </p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-3 text-xs tracking-wider transition-all duration-200 ${
                tab === item.id
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] border-l-2 border-[#D4AF37]"
                  : "text-[#f0ebe0]/50 hover:text-[#f0ebe0]/80 hover:bg-[#D4AF37]/5 border-l-2 border-transparent"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#D4AF37]/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 text-xs tracking-wider text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
          >
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-[#040809] border-b border-[#D4AF37]/10 px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-[#D4AF37]/60" />
            <h1
              className="text-[#f0ebe0]/80 text-sm tracking-[0.2em] uppercase"
              style={{ fontFamily: "Raleway, sans-serif", fontWeight: 600 }}
            >
              {navItems.find((n) => n.id === tab)?.label}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#f0ebe0]/30 text-[10px] tracking-wider">En ligne</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {tab === "reservations" && <Reservations />}
          {tab === "team" && <TeamManager />}
          {tab === "pricing" && <PricingManager />}
        </main>
      </div>
    </div>
  );
}
