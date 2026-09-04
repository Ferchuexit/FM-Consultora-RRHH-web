import { useSupabaseTable } from "@/admin/hooks/useSupabaseTable";
import type { BusquedaLaboral } from "@/lib/types";

/**
 * "Ofertas" no es una tabla aparte: son las búsquedas laborales con
 * estado = "Publicada", que es lo que ve el público en la web.
 * Esta pantalla es de solo lectura; para editar/cerrar una oferta andá
 * a "Búsquedas laborales".
 */
export default function OfertasPage() {
  const { rows, loading, error } = useSupabaseTable<BusquedaLaboral>(
    "busquedas_laborales",
    "fecha_publicacion",
  );
  const publicadas = rows.filter((r) => r.estado === "Publicada");

  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--blue-900)" }}>
        💼 Ofertas
      </h2>
      <p className="mb-5 text-sm text-[var(--gray-500)]">
        Estas son las búsquedas que hoy están visibles públicamente en la web (estado "Publicada").
        Para crear, cerrar o editar una oferta, hacelo desde{" "}
        <span className="font-semibold">🔎 Búsquedas laborales</span>.
      </p>

      {loading && <p className="text-sm text-[var(--gray-500)]">Cargando...</p>}
      {error && <p className="text-sm text-red-600">Error: {error}</p>}
      {!loading && !error && publicadas.length === 0 && (
        <p className="text-sm text-[var(--gray-500)]">No hay ofertas publicadas en este momento.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {publicadas.map((oferta) => (
          <div key={oferta.id} className="rounded-xl border border-[var(--gray-200)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sky-500)]">
              {oferta.empresa_nombre ?? "Empresa confidencial"}
            </p>
            <h3 className="font-semibold text-[var(--blue-900)]">{oferta.puesto}</h3>
            <p className="mt-1 text-xs text-[var(--gray-500)]">
              {oferta.ubicacion ?? "Ubicación a definir"} · {oferta.modalidad ?? "—"}
            </p>
            <p className="mt-2 text-xs text-[var(--gray-400)]">
              Publicada: {oferta.fecha_publicacion}
              {oferta.fecha_cierre ? ` · Cierra: ${oferta.fecha_cierre}` : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
