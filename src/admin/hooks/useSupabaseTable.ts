import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * Hook genérico de CRUD para una tabla de Supabase.
 * Lo usa cada página del admin (Novedades, Búsquedas, Postulantes, etc.)
 * pasándole el nombre de tabla y el orden por defecto.
 */
export function useSupabaseTable<T extends { id: string }>(
  table: string,
  orderBy: string = "created_at",
  ascending = false,
) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending });
    if (error) setError(error.message);
    else setRows((data ?? []) as T[]);
    setLoading(false);
  }, [table, orderBy, ascending]);

  useEffect(() => {
    reload();
  }, [reload]);

  async function create(values: Partial<T>): Promise<string | null> {
    const { error } = await supabase.from(table).insert(values as never);
    if (error) return error.message;
    await reload();
    return null;
  }

  async function update(id: string, values: Partial<T>): Promise<string | null> {
    const { error } = await supabase.from(table).update(values as never).eq("id", id);
    if (error) return error.message;
    await reload();
    return null;
  }

  async function remove(id: string): Promise<string | null> {
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) return error.message;
    await reload();
    return null;
  }

  return { rows, loading, error, reload, create, update, remove };
}
