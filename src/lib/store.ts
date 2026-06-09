// ─── Types ────────────────────────────────────────────────────────────────────

export interface Barber {
  name: string;
  title: string;
  specialty: string;
  experience: string;
  photo: string;
  tag: string;
}

export interface PriceItem {
  name: string;
  price: string;
  desc: string;
  popular?: boolean;
  fromPrice?: boolean;
}

export interface PricingCategory {
  id: string;
  label: string;
  icon: string;
  items: PriceItem[];
}

export interface Reservation {
  id: string;
  submittedAt: string;
  name: string;
  phone: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  status: "En attente" | "Confirmé" | "Annulé" | "Servi";
}

// ─── URL de base de l'API PHP ────────────────────────────────────────────────
// En développement local (XAMPP), utilisez '/luxury-barbershop/api'
// En production (Hostinger), utilisez '/api'
const API_BASE = import.meta.env.VITE_API_BASE ?? 
  (window.location.hostname === 'localhost' ? 'http://localhost/luxury-barbershop/api' : '/api');

async function apiFetch(path: string, options?: RequestInit) {
  const token = localStorage.getItem(LS.token);
  const headers: Record<string, string> = {};

  // Ne pas mettre Content-Type si c'est du FormData (le navigateur s'en charge avec le boundary)
  if (!(options?.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...headers, ...options?.headers },
  });

  if (res.status === 401) {
    // Si l'API renvoie 401, on déconnecte l'utilisateur localement
    logout();
    if (!path.includes('/login.php')) {
      window.location.reload(); // Recharger pour rediriger vers login
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `API error ${res.status}: ${path}`);
  }

  return res.json();
}

export async function uploadPhoto(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('photo', file);
  
  const data = await apiFetch('/upload.php', {
    method: 'POST',
    body: formData,
  });
  
  return data.url;
}

/**
 * Retourne l'URL complète d'une image
 */
export function getImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith('http')) return path;
  
  // Si le chemin commence par 'api/uploads', on doit s'assurer que l'URL est correcte
  // On utilise l'URL de base moins le suffixe '/api' pour pointer vers la racine si besoin, 
  // ou on utilise simplement le chemin relatif si on est sur le même domaine.
  
  // Pour la robustesse, on reconstruit l'URL à partir de API_BASE
  const base = API_BASE.endsWith('/api') ? API_BASE.slice(0, -4) : API_BASE;
  return `${base}/${path}`;
}

// ─── Default barbers (fallback si API indisponible) ───────────────────────────

export const DEFAULT_BARBERS: Barber[] = [
  {
    name: "HICHAM DIRECTEUR",
    title: "Expert Barber",
    specialty: "Spécialiste Coupe & Style Masculin",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780490594/WhatsApp_Image_2026-06-03_at_13.32.04_1_hw1e5i.jpg",
    tag: "Expert Barber",
  },
  {
    name: "MOHAMED",
    title: "Expert Barber",
    specialty: "Spécialiste Fade & Dégradé Moderne",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484259/WhatsApp_Image_2026-06-03_at_11.46.33_6_-_Copie_rhecbz.jpg",
    tag: "Expert Barber",
  },
  {
    name: "LARBI",
    title: "Expert Barber",
    specialty: "Expert Coupe Classique & Barbe Traditionnelle",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484259/WhatsApp_Image_2026-06-03_at_11.46.33_rzk4hy.jpg",
    tag: "Expert Barber",
  },
  {
    name: "OTHMANE",
    title: "Expert Barber",
    specialty: "Spécialiste Soins Visage & Capillaires",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484259/WhatsApp_Image_2026-06-03_at_11.46.33_1_mahtow.jpg",
    tag: "Expert Barber",
  },
  {
    name: "AYMEN",
    title: "Expert Barber",
    specialty: "Expert Coloration & Transformation de Style",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484258/WhatsApp_Image_2026-06-03_at_11.46.33_2_g2zsr4.jpg",
    tag: "Expert Barber",
  },
  {
    name: "OUSSAMA",
    title: "Expert Barber",
    specialty: "Spécialiste Fade & Dégradé Moderne",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484258/WhatsApp_Image_2026-06-03_at_11.46.33_3_wfyxk1.jpg",
    tag: "Expert Barber",
  },
  {
    name: "ABDELLATIF",
    title: "Expert Barber",
    specialty: "Expert Coupe Classique & Barbe Traditionnelle",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484258/WhatsApp_Image_2026-06-03_at_11.46.33_4_ko6dp3.jpg",
    tag: "Expert Barber",
  },
];

// ─── Default pricing ──────────────────────────────────────────────────────────

export const DEFAULT_CATEGORIES: PricingCategory[] = [
  {
    id: "coupe",
    label: "Coupe & Barbe",
    icon: "✂",
    items: [
      { name: "Coupe Homme",         price: "50 DH",  desc: "Coupe moderne adaptée à votre style et morphologie", popular: true },
      { name: "Coupe + Barbe",       price: "100 DH", desc: "Service complet pour un look propre et harmonieux" },
      { name: "Traçage de Barbe",    price: "50 DH",  desc: "Définition précise des contours pour une barbe nette" },
      { name: "Rasage Traditionnel", price: "70 DH",  desc: "Rasage classique au hot towel avec soin de la peau" },
      { name: "Coupe Enfant",        price: "50 DH",  desc: "Coupe douce et précise pour les moins de 12 ans" },
    ],
  },
  {
    id: "visage",
    label: "Soins Visage",
    icon: "◉",
    items: [
      { name: "Soin Visage Simple",    price: "100 DH", desc: "Nettoyage et rafraîchissement de la peau" },
      { name: "Soin Visage Global",    price: "400 DH", desc: "Fauteuil Massage · Produits Spéciaux · Hydrafacial", popular: true },
      { name: "Soin Botox Capillaire", price: "50 DH",  desc: "Traitement lissant et revitalisant" },
      { name: "Soin Vapeur",           price: "50 DH",  desc: "Ouverture des pores et nettoyage en profondeur" },
    ],
  },
  {
    id: "coloration",
    label: "Colorations",
    icon: "◇",
    items: [
      { name: "Coloration Cheveux", price: "150 DH", desc: "Transformation avec produits professionnels", fromPrice: true, popular: true },
      { name: "Mèches",             price: "200 DH", desc: "Éclaircissement et style moderne personnalisé", fromPrice: true },
      { name: "Coloration Barbe",   price: "50 DH",  desc: "Uniformisation et style de barbe soigné", fromPrice: true },
    ],
  },
  {
    id: "cheveux",
    label: "Soins Cheveux",
    icon: "◎",
    items: [
      { name: "Shampooing & Brushing", price: "50 DH",  desc: "Nettoyage et coiffage rapide" },
      { name: "Soin Protéine",         price: "300 DH", desc: "Renforcement et réparation des cheveux", fromPrice: true, popular: true },
      { name: "Soin Vapeur Cheveux",   price: "100 DH", desc: "Hydratation profonde et traitement capillaire" },
    ],
  },
  {
    id: "esthetique",
    label: "Esthétique",
    icon: "◈",
    items: [
      { name: "Manucure", price: "100 DH", desc: "Soins des mains et finition propre" },
      { name: "Pédicure", price: "150 DH", desc: "Soins des pieds et hygiène complète", popular: true },
    ],
  },
  {
    id: "vip",
    label: "Pack VIP",
    icon: "♛",
    items: [
      {
        name: "Full Experience AVIATOR",
        price: "700 DH",
        desc: "Coupe · Barbe · Shampooing · Manucure · Pédicure · Soin Visage · Épilation de Précision",
        popular: true,
      },
    ],
  },
];

// ─── localStorage keys (fallback) ────────────────────────────────────────────

const LS = {
  barbers:      "aviator_barbers",
  reservations: "aviator_reservations",
  auth:         "aviator_admin_auth",
  token:        "aviator_admin_token",
  tokenExp:     "aviator_admin_token_exp",
  pricing:      "aviator_pricing",
  contact:      "aviator_contact",
  contactDisp:  "aviator_contact_display",
};

// ─── Contact ──────────────────────────────────────────────────────────────────

const DEFAULT_PHONE      = "212659659715";
const DEFAULT_DISP_PHONE = "05 28 32 63 64";

export async function getContactPhone(): Promise<string> {
  try {
    const data = await apiFetch('/settings.php?key=whatsapp_phone');
    if (data?.value) return data.value;
  } catch { /* fallback */ }
  return localStorage.getItem(LS.contact) ?? DEFAULT_PHONE;
}

export function getContactPhoneSync(): string {
  return localStorage.getItem(LS.contact) ?? DEFAULT_PHONE;
}

export async function saveContactPhone(phone: string): Promise<void> {
  localStorage.setItem(LS.contact, phone);
  await apiFetch('/settings.php', {
    method: 'PUT',
    body: JSON.stringify({ key: 'whatsapp_phone', value: phone }),
  });
}

export async function getDisplayPhone(): Promise<string> {
  try {
    const data = await apiFetch('/settings.php?key=display_phone');
    if (data?.value) return data.value;
  } catch { /* fallback */ }
  return localStorage.getItem(LS.contactDisp) ?? DEFAULT_DISP_PHONE;
}

export function getDisplayPhoneSync(): string {
  return localStorage.getItem(LS.contactDisp) ?? DEFAULT_DISP_PHONE;
}

export async function saveDisplayPhone(phone: string): Promise<void> {
  localStorage.setItem(LS.contactDisp, phone);
  await apiFetch('/settings.php', {
    method: 'PUT',
    body: JSON.stringify({ key: 'display_phone', value: phone }),
  });
}

export function getWhatsAppUrl(message?: string): string {
  const phone = getContactPhoneSync();
  const defaultMsg = "Bonjour AVIATOR Barber Shop, je souhaite fixer un rendez-vous";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message ?? defaultMsg)}`;
}

// ─── Barbers ──────────────────────────────────────────────────────────────────

export async function getBarbers(): Promise<Barber[]> {
  try {
    const data = await apiFetch('/barbers.php');
    if (Array.isArray(data) && data.length > 0) return data as Barber[];
  } catch { /* fallback */ }
  try {
    const raw = localStorage.getItem(LS.barbers);
    if (raw) return JSON.parse(raw) as Barber[];
  } catch { /* ignore */ }
  return DEFAULT_BARBERS;
}

export function getBarbersSync(): Barber[] {
  try {
    const raw = localStorage.getItem(LS.barbers);
    if (raw) return JSON.parse(raw) as Barber[];
  } catch { /* ignore */ }
  return DEFAULT_BARBERS;
}

export async function saveBarbers(barbers: Barber[]): Promise<void> {
  localStorage.setItem(LS.barbers, JSON.stringify(barbers));
  await apiFetch('/barbers.php', {
    method: 'POST',
    body: JSON.stringify(barbers),
  });
}

// ─── Reservations ─────────────────────────────────────────────────────────────

export async function getReservations(): Promise<Reservation[]> {
  try {
    const data = await apiFetch('/reservations.php');
    if (Array.isArray(data)) return data as Reservation[];
  } catch { /* fallback */ }
  try {
    const raw = localStorage.getItem(LS.reservations);
    if (raw) return JSON.parse(raw) as Reservation[];
  } catch { /* ignore */ }
  return [];
}

export async function addReservation(
  data: Omit<Reservation, "id" | "submittedAt" | "status">
): Promise<void> {
  try {
    await apiFetch('/reservations.php', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return;
  } catch { /* fallback localStorage */ }
  const reservations = await getReservations();
  const newRes: Reservation = {
    ...data,
    id:          `res_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    submittedAt: new Date().toISOString(),
    status:      "En attente",
  };
  reservations.unshift(newRes);
  localStorage.setItem(LS.reservations, JSON.stringify(reservations));
}

export async function updateReservationStatus(
  id: string,
  status: Reservation["status"]
): Promise<void> {
  try {
    await apiFetch('/reservations.php', {
      method: 'PUT',
      body: JSON.stringify({ id, status }),
    });
    return;
  } catch { /* fallback */ }
  const reservations = await getReservations();
  const idx = reservations.findIndex((r) => r.id === id);
  if (idx !== -1) {
    reservations[idx].status = status;
    localStorage.setItem(LS.reservations, JSON.stringify(reservations));
  }
}

export async function deleteReservation(id: string): Promise<void> {
  try {
    await apiFetch(`/reservations.php?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    return;
  } catch { /* fallback */ }
  const reservations = (await getReservations()).filter((r) => r.id !== id);
  localStorage.setItem(LS.reservations, JSON.stringify(reservations));
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export async function getPricing(): Promise<PricingCategory[]> {
  try {
    const data = await apiFetch('/pricing.php');
    if (Array.isArray(data) && data.length > 0) return data as PricingCategory[];
  } catch { /* fallback */ }
  try {
    const raw = localStorage.getItem(LS.pricing);
    if (raw) return JSON.parse(raw) as PricingCategory[];
  } catch { /* ignore */ }
  return DEFAULT_CATEGORIES;
}

export async function savePricing(categories: PricingCategory[]): Promise<void> {
  localStorage.setItem(LS.pricing, JSON.stringify(categories));
  await apiFetch('/pricing.php', {
    method: 'POST',
    body: JSON.stringify(categories),
  });
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginResult {
  success: boolean;
  error?: string;
  attemptsLeft?: number;
  locked?: boolean;
  retryAfter?: number;  // secondes
  requireOTP?: boolean; // vrai si le mdp est ok mais OTP requis
  maskedEmail?: string; // ex: av***@gmail.com
  expiresIn?: number;   // secondes avant expiration OTP
  expired?: boolean;    // vrai si le code OTP a expiré
}

const SS_LAST_ACTIVITY = "aviator_admin_last_activity";
const INACTIVITY_TIMEOUT = 1800; // 30 minutes (en secondes)

function decodeJWTPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

function saveToken(token: string): void {
  const payload = decodeJWTPayload(token);
  const exp = typeof payload?.exp === 'number' ? payload.exp : null;
  localStorage.setItem(LS.auth,  'true');
  localStorage.setItem(LS.token, token);
  if (exp) {
    localStorage.setItem(LS.tokenExp, String(exp));
  } else {
    // Si pas d'exp dans le token, on met un défaut (2h)
    localStorage.setItem(LS.tokenExp, String(Math.floor(Date.now() / 1000) + 7200));
  }
  sessionStorage.setItem(SS_LAST_ACTIVITY, String(Date.now()));
}

export async function login(password: string): Promise<LoginResult> {
  try {
    const res = await fetch(`${API_BASE}/login.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json().catch(() => ({}));

    // Étape 1 : mot de passe ok → OTP envoyé par email
    if (res.ok && data?.requireOTP) {
      return {
        success:     true,
        requireOTP:  true,
        maskedEmail: data.maskedEmail,
        expiresIn:   data.expiresIn,
      };
    }

    // Cas ancien ou direct (sans OTP, ne devrait plus arriver sauf config locale spécifique)
    if (res.ok && data?.token) {
      saveToken(data.token);
      return { success: true };
    }

    return {
      success:      false,
      error:        data?.error ?? 'Erreur de connexion',
      attemptsLeft: data?.attemptsLeft,
      locked:       data?.locked ?? false,
      retryAfter:   data?.retryAfter,
    };

  } catch (err) {
    console.error('API login inaccessible:', err);
    return { success: false, error: 'Serveur inaccessible. Vérifiez votre connexion.' };
  }
}

export async function verifyOTP(otp: string): Promise<LoginResult> {
  try {
    const res = await fetch(`${API_BASE}/verify_otp.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otp }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data?.token) {
      saveToken(data.token);
      return { success: true };
    }

    return {
      success: false,
      error:   data?.error ?? 'Code incorrect',
      locked:  data?.locked ?? false,
      expired: data?.expired ?? false,
    };

  } catch (err) {
    console.error('API verify_otp inaccessible:', err);
    return { success: false, error: 'Serveur inaccessible. Vérifiez votre connexion.' };
  }
}

export function logout(): void {
  localStorage.removeItem(LS.auth);
  localStorage.removeItem(LS.token);
  localStorage.removeItem(LS.tokenExp);
  sessionStorage.removeItem(SS_LAST_ACTIVITY);
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(LS.auth) === "true" && !!localStorage.getItem(LS.token);
}

export interface SessionInfo {
  tokenSecondsLeft: number;
  inactiveSecondsLeft: number;
}

export function getSessionInfo(): SessionInfo {
  const tokenExp = localStorage.getItem(LS.tokenExp);
  const lastAct = sessionStorage.getItem(SS_LAST_ACTIVITY);

  let tokenSecondsLeft = 0;
  if (tokenExp) {
    const expTime = parseInt(tokenExp, 10);
    if (!isNaN(expTime)) {
      tokenSecondsLeft = Math.max(0, expTime - Math.floor(Date.now() / 1000));
    }
  }

  let inactiveSecondsLeft = 0;
  if (lastAct) {
    const lastTime = parseInt(lastAct, 10);
    if (!isNaN(lastTime)) {
      const elapsed = Math.floor((Date.now() - lastTime) / 1000);
      inactiveSecondsLeft = Math.max(0, INACTIVITY_TIMEOUT - elapsed);
    }
  }

  return { tokenSecondsLeft, inactiveSecondsLeft };
}

export function refreshActivity(): void {
  if (localStorage.getItem(LS.auth) === "true") {
    sessionStorage.setItem(SS_LAST_ACTIVITY, String(Date.now()));
  }
}

export function checkInactivityTimeout(): boolean {
  if (localStorage.getItem(LS.auth) !== "true") return false;
  const lastAct = sessionStorage.getItem(SS_LAST_ACTIVITY);
  if (!lastAct) return false;
  
  const lastTime = parseInt(lastAct, 10);
  if (isNaN(lastTime)) return false;

  const elapsed = Math.floor((Date.now() - lastTime) / 1000);
  if (elapsed >= INACTIVITY_TIMEOUT) {
    logout();
    return true;
  }
  return false;
}
