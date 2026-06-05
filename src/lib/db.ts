import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[db] Variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY manquantes — " +
    "les données seront lues/écrites dans localStorage en mode dégradé."
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

/** Vrai si Supabase est correctement configuré */
export const isSupabaseReady =
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey);
