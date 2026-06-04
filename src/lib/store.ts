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
  status: "En attente" | "Confirmé" | "Annulé";
}

// ─── Default barbers ──────────────────────────────────────────────────────────

export const DEFAULT_BARBERS: Barber[] = [
  {
    name: "Barbier",
    title: "Expert Barber",
    specialty: "Spécialiste Coupe & Style Masculin",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780490594/WhatsApp_Image_2026-06-03_at_13.32.04_1_hw1e5i.jpg",
    tag: "Expert Barber",
  },
  {
    name: "Ayman",
    title: "Expert Barber",
    specialty: "Spécialiste Fade & Dégradé Moderne",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484259/WhatsApp_Image_2026-06-03_at_11.46.33_6_-_Copie_rhecbz.jpg",
    tag: "Expert Barber",
  },
  {
    name: "Zakaria",
    title: "Expert Barber",
    specialty: "Expert Coupe Classique & Barbe Traditionnelle",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484259/WhatsApp_Image_2026-06-03_at_11.46.33_rzk4hy.jpg",
    tag: "Expert Barber",
  },
  {
    name: "Laarbi",
    title: "Expert Barber",
    specialty: "Spécialiste Soins Visage & Capillaires",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484259/WhatsApp_Image_2026-06-03_at_11.46.33_1_mahtow.jpg",
    tag: "Expert Barber",
  },
  {
    name: "Oussama",
    title: "Expert Barber",
    specialty: "Expert Coloration & Transformation de Style",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484258/WhatsApp_Image_2026-06-03_at_11.46.33_2_g2zsr4.jpg",
    tag: "Expert Barber",
  },
  {
    name: "Othmane",
    title: "Expert Barber",
    specialty: "Spécialiste Fade & Dégradé Moderne",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484258/WhatsApp_Image_2026-06-03_at_11.46.33_3_wfyxk1.jpg",
    tag: "Expert Barber",
  },
  {
    name: "Abdellatif",
    title: "Expert Barber",
    specialty: "Expert Coupe Classique & Barbe Traditionnelle",
    experience: "5+ Ans",
    photo: "https://res.cloudinary.com/dfltnm8qu/image/upload/v1780484258/WhatsApp_Image_2026-06-03_at_11.46.33_4_ko6dp3.jpg",
    tag: "Expert Barber",
  },
];

// ─── Keys ─────────────────────────────────────────────────────────────────────

const KEYS = {
  barbers: "aviator_barbers",
  reservations: "aviator_reservations",
  auth: "aviator_admin_auth",
  pricing: "aviator_pricing",
};

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

// ─── Barbers ──────────────────────────────────────────────────────────────────

export function getBarbers(): Barber[] {
  try {
    const raw = localStorage.getItem(KEYS.barbers);
    if (raw) return JSON.parse(raw) as Barber[];
  } catch {}
  return DEFAULT_BARBERS;
}

export function saveBarbers(barbers: Barber[]): void {
  localStorage.setItem(KEYS.barbers, JSON.stringify(barbers));
}

// ─── Reservations ─────────────────────────────────────────────────────────────

export function getReservations(): Reservation[] {
  try {
    const raw = localStorage.getItem(KEYS.reservations);
    if (raw) return JSON.parse(raw) as Reservation[];
  } catch {}
  return [];
}

export function addReservation(data: Omit<Reservation, "id" | "submittedAt" | "status">): void {
  const reservations = getReservations();
  const newReservation: Reservation = {
    ...data,
    id: `res_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    submittedAt: new Date().toISOString(),
    status: "En attente",
  };
  reservations.unshift(newReservation);
  localStorage.setItem(KEYS.reservations, JSON.stringify(reservations));
}

export function updateReservationStatus(id: string, status: Reservation["status"]): void {
  const reservations = getReservations();
  const idx = reservations.findIndex((r) => r.id === id);
  if (idx !== -1) {
    reservations[idx].status = status;
    localStorage.setItem(KEYS.reservations, JSON.stringify(reservations));
  }
}

export function deleteReservation(id: string): void {
  const reservations = getReservations().filter((r) => r.id !== id);
  localStorage.setItem(KEYS.reservations, JSON.stringify(reservations));
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export function getPricing(): PricingCategory[] {
  try {
    const raw = localStorage.getItem(KEYS.pricing);
    if (raw) return JSON.parse(raw) as PricingCategory[];
  } catch {}
  return DEFAULT_CATEGORIES;
}

export function savePricing(categories: PricingCategory[]): void {
  localStorage.setItem(KEYS.pricing, JSON.stringify(categories));
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = "aviator2024";

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(KEYS.auth, "true");
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(KEYS.auth);
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(KEYS.auth) === "true";
}
