export interface ColumnConfig<T> {
  header: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  columns: ColumnConfig<T>[];
  rows: T[];
  loading: boolean;
  error: string | null;
  onEdit: (row: T) => void;
  onDelete: (row: T) => void;
  emptyLabel?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  loading,
  error,
  onEdit,
  onDelete,
  emptyLabel = "Todavía no hay registros cargados.",
}: DataTableProps<T>) {
  if (loading) {
    return <p className="p-6 text-sm text-[var(--gray-500)]">Cargando...</p>;
  }

  if (error) {
    return (
      <div className="m-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
        Error al conectar con la base de datos: {error}
        <br />
        Revisá que hayas configurado <code>VITE_SUPABASE_URL</code> y{" "}
        <code>VITE_SUPABASE_ANON_KEY</code>.
      </div>
    );
  }

  if (rows.length === 0) {
    return <p className="p-6 text-sm text-[var(--gray-500)]">{emptyLabel}</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--gray-200)]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--gray-200)] bg-[var(--gray-50)]">
            {columns.map((col) => (
              <th key={col.header} className="px-4 py-3 font-semibold text-[var(--gray-700)]">
                {col.header}
              </th>
            ))}
            <th className="px-4 py-3 text-right font-semibold text-[var(--gray-700)]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-[var(--gray-100)] last:border-0 hover:bg-[var(--gray-50)]">
              {columns.map((col) => (
                <td key={col.header} className="max-w-xs truncate px-4 py-3 text-[var(--gray-900)]">
                  {col.render(row)}
                </td>
              ))}
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <button
                  onClick={() => onEdit(row)}
                  className="mr-3 text-xs font-semibold text-[var(--sky-500)] hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    if (confirm("¿Seguro que querés eliminar este registro?")) onDelete(row);
                  }}
                  className="text-xs font-semibold text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
