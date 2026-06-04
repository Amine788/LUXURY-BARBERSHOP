import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff, Scissors } from "lucide-react";
import { login } from "../../lib/store";

interface Props {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: Props) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      onLogin();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#060b07] flex items-center justify-center px-4"
      style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, #014421/20 0%, transparent 60%)" }}>
      
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 60px), repeating-linear-gradient(90deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 60px)",
        }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md relative"
        style={{ animation: shaking ? "shake 0.4s ease" : undefined }}
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-5">
            <Scissors size={26} className="text-[#D4AF37]" />
          </div>
          <div
            className="text-[#f0ebe0] text-2xl mb-1"
            style={{ fontFamily: "Playfair Display, serif", fontWeight: 700 }}
          >
            AVIATOR
          </div>
          <div
            className="text-[#D4AF37]/60 text-[10px] tracking-[0.45em] uppercase"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            Admin Panel
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#0a110a] border border-[#D4AF37]/12 p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-[#D4AF37]/15" />
            <span
              className="text-[#D4AF37]/50 text-[10px] tracking-[0.4em] uppercase"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Connexion sécurisée
            </span>
            <div className="h-px flex-1 bg-[#D4AF37]/15" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="text-[#D4AF37]/55 text-[10px] tracking-[0.3em] uppercase mb-2 block"
                style={{ fontFamily: "Raleway, sans-serif" }}
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 pointer-events-none" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="Entrez le mot de passe"
                  className={`w-full bg-[#040809] border pl-10 pr-12 py-4 text-[#f0ebe0] placeholder-[#f0ebe0]/20 outline-none transition-colors duration-300 text-sm ${
                    error ? "border-red-500/60" : "border-[#D4AF37]/14 focus:border-[#D4AF37]/45"
                  }`}
                  style={{ fontFamily: "Raleway, sans-serif" }}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/40 hover:text-[#D4AF37]/70 transition-colors"
                >
                  {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {error && (
                <p className="text-red-400/80 text-[10px] tracking-wider mt-2" style={{ fontFamily: "Raleway, sans-serif" }}>
                  Mot de passe incorrect
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-[#040809] py-4 text-[10px] tracking-[0.35em] uppercase hover:bg-[#c9a632] transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/20 mt-2"
              style={{ fontFamily: "Raleway, sans-serif", fontWeight: 700 }}
            >
              Accéder au tableau de bord
            </button>
          </form>
        </div>

        <p className="text-center text-[#f0ebe0]/20 text-[10px] tracking-wider mt-6" style={{ fontFamily: "Raleway, sans-serif" }}>
          © AVIATOR Barber Shop — Accès restreint
        </p>
      </motion.div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
