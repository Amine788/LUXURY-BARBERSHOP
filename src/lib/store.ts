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

// ─── Supabase client ──────────────────────────────────────────────────────────

import { supabase, isSupabaseReady } from "./db";

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
  pricing:      "aviator_pricing",
  contact:      "aviator_contact",
  contactDisp:  "aviator_contact_display",
};

// ─── Contact ──────────────────────────────────────────────────────────────────

const DEFAULT_PHONE      = "212659659715";
const DEFAULT_DISP_PHONE = "05 28 32 63 64";

/** Récupère le numéro WhatsApp (Supabase puis localStorage) */
export async function getContactPhone(): Promise<string> {
  if (isSupabaseReady) {
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "whatsapp_phone")
      .single();
    if (data?.value) return data.value;
  }
  return localStorage.getItem(LS.contact) ?? DEFAULT_PHONE;
}

/** Récupère le numéro WhatsApp synchrone (localStorage uniquement, pour init rapide) */
export function getContactPhoneSync(): string {
  return localStorage.getItem(LS.contact) ?? DEFAULT_PHONE;
}

export async function saveContactPhone(phone: string): Promise<void> {
  localStorage.setItem(LS.contact, phone);
  if (isSupabaseReady) {
    await supabase
      .from("settings")
      .upsert({ key: "whatsapp_phone", value: phone });
  }
}

export async function getDisplayPhone(): Promise<string> {
  if (isSupabaseReady) {
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "display_phone")
      .single();
    if (data?.value) return data.value;
  }
  return localStorage.getItem(LS.contactDisp) ?? DEFAULT_DISP_PHONE;
}

export function getDisplayPhoneSync(): string {
  return localStorage.getItem(LS.contactDisp) ?? DEFAULT_DISP_PHONE;
}

export async function saveDisplayPhone(phone: string): Promise<void> {
  localStorage.setItem(LS.contactDisp, phone);
  if (isSupabaseReady) {
    await supabase
      .from("settings")
      .upsert({ key: "display_phone", value: phone });
  }
}

export function getWhatsAppUrl(message?: string): string {
  const phone = getContactPhoneSync();
  const defaultMsg = "Bonjour AVIATOR Barber Shop, je souhaite fixer un rendez-vous";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message ?? defaultMsg)}`;
}

// ─── Barbers ──────────────────────────────────────────────────────────────────

export async function getBarbers(): Promise<Barber[]> {
  if (isSupabaseReady) {
    const { data, error } = await supabase
      .from("barbers")
      .select("name, title, specialty, experience, photo, tag")
      .order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) return data as Barber[];
  }
  // Fallback localStorage
  try {
    const raw = localStorage.getItem(LS.barbers);
    if (raw) return JSON.parse(raw) as Barber[];
  } catch { /* ignore */ }
  return DEFAULT_BARBERS;
}

/** Version synchrone pour les initialisations rapides (localStorage uniquement) */
export function getBarbersSync(): Barber[] {
  try {
    const raw = localStorage.getItem(LS.barbers);
    if (raw) return JSON.parse(raw) as Barber[];
  } catch { /* ignore */ }
  return DEFAULT_BARBERS;
}

export async function saveBarbers(barbers: Barber[]): Promise<void> {
  // Toujours persister en localStorage comme cache rapide
  localStorage.setItem(LS.barbers, JSON.stringify(barbers));
  if (!isSupabaseReady) return;

  // Supprimer tous les barbiers existants et réinsérer
  await supabase.from("barbers").delete().neq("id", 0);
  const rows = barbers.map((b, i) => ({ ...b, sort_order: i }));
  await supabase.from("barbers").insert(rows);
}

// ─── Reservations ─────────────────────────────────────────────────────────────

export async function getReservations(): Promise<Reservation[]> {
  if (isSupabaseReady) {
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("submitted_at", { ascending: false });
    if (!error && data) {
      return data.map((r) => ({
        id:          r.id,
        submittedAt: r.submitted_at,
        name:        r.name,
        phone:       r.phone,
        service:     r.service,
        barber:      r.barber ?? "",
        date:        r.date,
        time:        r.time,
        status:      r.status,
      })) as Reservation[];
    }
  }
  // Fallback localStorage
  try {
    const raw = localStorage.getItem(LS.reservations);
    if (raw) return JSON.parse(raw) as Reservation[];
  } catch { /* ignore */ }
  return [];
}

export async function addReservation(
  data: Omit<Reservation, "id" | "submittedAt" | "status">
): Promise<void> {
  if (isSupabaseReady) {
    await supabase.from("reservations").insert({
      name:    data.name,
      phone:   data.phone,
      service: data.service,
      barber:  data.barber,
      date:    data.date,
      time:    data.time,
      status:  "En attente",
    });
    return;
  }
  // Fallback localStorage
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
  if (isSupabaseReady) {
    await supabase.from("reservations").update({ status }).eq("id", id);
    return;
  }
  // Fallback localStorage
  const reservations = await getReservations();
  const idx = reservations.findIndex((r) => r.id === id);
  if (idx !== -1) {
    reservations[idx].status = status;
    localStorage.setItem(LS.reservations, JSON.stringify(reservations));
  }
}

export async function deleteReservation(id: string): Promise<void> {
  if (isSupabaseReady) {
    await supabase.from("reservations").delete().eq("id", id);
    return;
  }
  const reservations = (await getReservations()).filter((r) => r.id !== id);
  localStorage.setItem(LS.reservations, JSON.stringify(reservations));
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export async function getPricing(): Promise<PricingCategory[]> {
  if (isSupabaseReady) {
    const { data: cats, error: catErr } = await supabase
      .from("pricing_categories")
      .select("id, label, icon")
      .order("sort_order", { ascending: true });

    const { data: items, error: itemErr } = await supabase
      .from("pricing_items")
      .select("category_id, name, price, description, popular, from_price")
      .order("sort_order", { ascending: true });

    if (!catErr && !itemErr && cats && items && cats.length > 0) {
      return cats.map((cat) => ({
        id:    cat.id,
        label: cat.label,
        icon:  cat.icon,
        items: items
          .filter((it) => it.category_id === cat.id)
          .map((it) => ({
            name:      it.name,
            price:     it.price,
            desc:      it.description,
            popular:   it.popular ?? false,
            fromPrice: it.from_price ?? false,
          })),
      })) as PricingCategory[];
    }
  }
  // Fallback localStorage
  try {
    const raw = localStorage.getItem(LS.pricing);
    if (raw) return JSON.parse(raw) as PricingCategory[];
  } catch { /* ignore */ }
  return DEFAULT_CATEGORIES;
}

export async function savePricing(categories: PricingCategory[]): Promise<void> {
  // Cache local
  localStorage.setItem(LS.pricing, JSON.stringify(categories));
  if (!isSupabaseReady) return;

  // Upsert categories
  await supabase.from("pricing_categories").upsert(
    categories.map((c, i) => ({ id: c.id, label: c.label, icon: c.icon, sort_order: i }))
  );

  // Supprimer tous les items et réinsérer
  await supabase.from("pricing_items").delete().neq("id", 0);
  const rows = categories.flatMap((cat, _ci) =>
    cat.items.map((item, ii) => ({
      category_id: cat.id,
      sort_order:  ii,
      name:        item.name,
      price:       item.price,
      description: item.desc,
      popular:     item.popular ?? false,
      from_price:  item.fromPrice ?? false,
    }))
  );
  if (rows.length > 0) {
    await supabase.from("pricing_items").insert(rows);
  }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function login(password: string): Promise<boolean> {
  if (isSupabaseReady) {
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "admin_password")
      .single();
    const ok = data?.value === password;
    if (ok) localStorage.setItem(LS.auth, "true");
    return ok;
  }
  // Fallback hardcodé
  const ok = password === "aviator2024";
  if (ok) localStorage.setItem(LS.auth, "true");
  return ok;
}

export function logout(): void {
  localStorage.removeItem(LS.auth);
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(LS.auth) === "true";
}
