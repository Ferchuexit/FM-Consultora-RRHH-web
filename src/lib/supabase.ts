import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // No tiramos el build, pero avisamos claro en consola: sin estas dos
  // variables de entorno el sitio funciona (contenido estático) pero el
  // admin y las secciones dinámicas no van a poder conectarse.
  console.warn(
    "[Supabase] Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY. " +
      "Configuralas en .env.local (desarrollo) o en Vercel → Settings → Environment Variables (producción).",
  );
}

export const supabase = createClient(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabaseAnonKey ?? "placeholder-anon-key",
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
