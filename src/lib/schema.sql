-- ============================================================
-- AVIATOR Barber Shop — Schéma Supabase (PostgreSQL)
-- Exécuter dans l'éditeur SQL de votre projet Supabase
-- ============================================================

-- ── Réservations ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reservations (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name         TEXT NOT NULL,
  phone        TEXT NOT NULL,
  service      TEXT NOT NULL,
  barber       TEXT NOT NULL DEFAULT '',
  date         TEXT NOT NULL,
  time         TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'En attente'
    CONSTRAINT reservations_status_check
    CHECK (status IN ('En attente', 'Confirmé', 'Annulé'))
);

-- ── Barbiers ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS barbers (
  id         SERIAL PRIMARY KEY,
  sort_order INT  NOT NULL DEFAULT 0,
  name       TEXT NOT NULL,
  title      TEXT NOT NULL DEFAULT 'Expert Barber',
  specialty  TEXT NOT NULL DEFAULT '',
  experience TEXT NOT NULL DEFAULT '5+ Ans',
  photo      TEXT NOT NULL DEFAULT '',
  tag        TEXT NOT NULL DEFAULT 'Expert Barber'
);

-- ── Catégories de tarifs ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS pricing_categories (
  id         TEXT PRIMARY KEY,
  label      TEXT NOT NULL,
  icon       TEXT NOT NULL DEFAULT '',
  sort_order INT  NOT NULL DEFAULT 0
);

-- ── Items de tarifs ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pricing_items (
  id          SERIAL PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES pricing_categories(id) ON DELETE CASCADE,
  sort_order  INT  NOT NULL DEFAULT 0,
  name        TEXT NOT NULL,
  price       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  popular     BOOLEAN NOT NULL DEFAULT false,
  from_price  BOOLEAN NOT NULL DEFAULT false
);

-- ── Paramètres ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Valeurs par défaut
INSERT INTO settings (key, value) VALUES
  ('whatsapp_phone',  '212659659715'),
  ('display_phone',   '05 28 32 63 64'),
  ('admin_password',  'aviator2024')
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- Row Level Security
-- ============================================================

-- Réservations : écriture publique (clients), lecture via service_role (admin)
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reservations_public_insert"
  ON reservations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "reservations_service_all"
  ON reservations FOR ALL TO service_role USING (true);

-- Barbiers : lecture publique, écriture via service_role
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "barbers_public_select"
  ON barbers FOR SELECT TO anon USING (true);
CREATE POLICY "barbers_service_all"
  ON barbers FOR ALL TO service_role USING (true);

-- Tarifs : lecture publique, écriture via service_role
ALTER TABLE pricing_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pricing_categories_public_select"
  ON pricing_categories FOR SELECT TO anon USING (true);
CREATE POLICY "pricing_categories_service_all"
  ON pricing_categories FOR ALL TO service_role USING (true);

ALTER TABLE pricing_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pricing_items_public_select"
  ON pricing_items FOR SELECT TO anon USING (true);
CREATE POLICY "pricing_items_service_all"
  ON pricing_items FOR ALL TO service_role USING (true);

-- Paramètres : lecture publique (téléphone), écriture via service_role
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_public_select"
  ON settings FOR SELECT TO anon USING (true);
CREATE POLICY "settings_service_all"
  ON settings FOR ALL TO service_role USING (true);

-- ============================================================
-- NOTES D'UTILISATION
-- ============================================================
-- Pour l'admin, utilisez la clé SERVICE_ROLE (dans les Edge Functions
-- ou une variable d'environnement côté serveur uniquement).
-- La clé ANON_KEY est utilisée côté client (lecture + réservations).
