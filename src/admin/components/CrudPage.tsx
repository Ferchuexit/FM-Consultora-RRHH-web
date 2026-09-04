import { useState } from "react";
import { useSupabaseTable } from "@/admin/hooks/useSupabaseTable";
import { DataTable, type ColumnConfig } from "./DataTable";
import { FormModal, type FieldConfig } from "./FormModal";

interface CrudPageProps<T extends { id: string }> {
  title: string;
  description?: string;
  table: string;
  orderBy?: string;
  ascending?: boolean;
  columns: ColumnConfig<T>[];
  fields: FieldConfig[];
  defaultValues: Record<string, unknown>;
  emptyLabel?: string;
}

export function CrudPage<T extends { id: string }>({
  title,
  description,
  table,
  orderBy = "created_at",
  ascending = false,
  columns,
  fields,
  defaultValues,
  emptyLabel,
}: CrudPageProps<T>) {
  const { rows, loading, error, create, update, remove } = useSupabaseTable<T>(
    table,
    orderBy,
    ascending,
  );
  const [editing, setEditing] = useState<T | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--blue-900)" }}>
            {title}
          </h2>
          {description && <p className="text-sm text-[var(--gray-500)]">{description}</p>}
        </div>
        <button
          onClick={() => setCreating(true)}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ background: "var(--blue-700)" }}
        >
          + Nuevo
        </button>
      </div>

      <DataTable<T>
        columns={columns}
        rows={rows}
        loading={loading}
        error={error}
        onEdit={(row) => setEditing(row)}
        onDelete={(row) => remove(row.id)}
        emptyLabel={emptyLabel}
      />

      {creating && (
        <FormModal
          title={`Nuevo — ${title}`}
          fields={fields}
          initialValues={defaultValues}
          onClose={() => setCreating(false)}
          onSubmit={(values) => create(values as Partial<T>)}
        />
      )}

      {editing && (
        <FormModal
          title={`Editar — ${title}`}
          fields={fields}
          initialValues={editing as unknown as Record<string, unknown>}
          onClose={() => setEditing(null)}
          onSubmit={(values) => update(editing.id, values as Partial<T>)}
        />
      )}
    </div>
  );
}
