import { useEffect, useState } from "react";
import { supabase } from "./supabase";

/** Valores por defecto por si todavía no cargaste nada en /admin/configuracion. */
const DEFAULTS: Record<string, string> = {
  whatsapp: "5491130544678",
  email_contacto: "fm_consultora_rrhh@icloud.com",
  direccion: "La Rioja 916, Benavídez, Tigre",
};

export function useConfiguracion() {
  const [config, setConfig] = useState<Record<string, string>>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from("configuracion")
      .select("clave, valor")
      .then(({ data }) => {
        if (!active) return;
        if (data && data.length > 0) {
          const map: Record<string, string> = { ...DEFAULTS };
          for (const row of data as { clave: string; valor: string | null }[]) {
            // Normalizamos la clave ("Instagram ", "INSTAGRAM" -> "instagram") para que no dependa de cómo se tipeó.
            if (row.valor && row.clave) map[row.clave.trim().toLowerCase()] = row.valor.trim();
          }
          setConfig(map);
        }
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  /** Link de WhatsApp listo para usar, con mensaje opcional. */
  function whatsappLink(mensaje?: string) {
    const numero = (config.whatsapp ?? DEFAULTS.whatsapp).replace(/\D/g, "");
    return mensaje ? `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}` : `https://wa.me/${numero}`;
  }

  /** Formatea "5491130544678" como "11 3054-4678" para mostrar en pantalla. */
  function whatsappDisplay() {
    const digits = (config.whatsapp ?? DEFAULTS.whatsapp).replace(/\D/g, "");
    const match = digits.match(/^549(\d{2,4})(\d{4})(\d{4})$/);
    if (match) return `${match[1]} ${match[2]}-${match[3]}`;
    return config.whatsapp ?? DEFAULTS.whatsapp;
  }

  /** Usuario de Instagram sin "@" ni URL. Acepta "@usuario", "usuario" o el link completo. Vacío si no está cargado. */
  function instagramUser() {
    const raw = (config.instagram ?? config.instagram_url ?? config.ig ?? "").trim();
    if (!raw) return "";
    const fromUrl = raw.match(/instagram\.com\/([^/?#\s]+)/i);
    return (fromUrl ? fromUrl[1] : raw).replace(/^@/, "").replace(/\/+$/, "");
  }

  /** Link al perfil de Instagram, o "" si no está cargado. */
  function instagramLink() {
    const user = instagramUser();
    return user ? `https://www.instagram.com/${user}/` : "";
  }

  /** "@usuario" para mostrar en pantalla, o "" si no está cargado. */
  function instagramDisplay() {
    const user = instagramUser();
    return user ? `@${user}` : "";
  }

  return { config, loading, whatsappLink, whatsappDisplay, instagramLink, instagramDisplay };
}
