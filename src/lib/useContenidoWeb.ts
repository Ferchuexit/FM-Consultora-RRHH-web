import { useEffect, useState } from "react";
import { supabase } from "./supabase";

/**
 * Trae los textos editables de una sección del sitio (tabla contenido_web,
 * editable desde /admin/contenido). Devolvé siempre un valor por defecto
 * (el texto original de diseño) para que la web nunca se vea vacía si
 * todavía no cargaste nada para esa clave.
 */
export function useContenidoWeb(seccion: string) {
  const [valores, setValores] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from("contenido_web")
      .select("clave, valor")
      .eq("seccion", seccion)
      .then(({ data }) => {
        if (!active) return;
        const map: Record<string, string> = {};
        for (const row of (data ?? []) as { clave: string; valor: string | null }[]) {
          if (row.valor) map[row.clave] = row.valor;
        }
        setValores(map);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [seccion]);

  function get(clave: string, fallback: string) {
    return valores[clave] ?? fallback;
  }

  return { get, loading };
}
