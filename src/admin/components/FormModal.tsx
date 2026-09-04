import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type FieldType =
  | "text"
  | "textarea"
  | "select"
  | "date"
  | "checkbox"
  | "image"
  | "file";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: string[]; // para "select"
  required?: boolean;
  storageBucket?: string; // para "image" / "file": bucket de Supabase Storage
  storageFolder?: string;
}

interface FormModalProps {
  title: string;
  fields: FieldConfig[];
  initialValues: Record<string, unknown>;
  onClose: () => void;
  onSubmit: (values: Record<string, unknown>) => Promise<string | null>;
}

export function FormModal({ title, fields, initialValues, onClose, onSubmit }: FormModalProps) {
  const [values, setValues] = useState<Record<string, unknown>>(initialValues);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function setField(name: string, value: unknown) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function handleFileUpload(field: FieldConfig, file: File) {
    setUploadingField(field.name);
    setError(null);
    const bucket = field.storageBucket ?? "sitio-publico";
    const folder = field.storageFolder ?? field.name;
    const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file);
    if (uploadError) {
      setError(`No se pudo subir el archivo: ${uploadError.message}`);
      setUploadingField(null);
      return;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    setField(field.name, data.publicUrl);
    setUploadingField(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await onSubmit(values);
    setSaving(false);
    if (result) setError(result);
    else onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        <h3 className="mb-4 text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--blue-900)" }}>
          {title}
        </h3>

        <div className="flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="mb-1 block text-sm font-medium text-[var(--gray-700)]">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              {field.type === "text" && (
                <input
                  type="text"
                  required={field.required}
                  value={(values[field.name] as string) ?? ""}
                  onChange={(e) => setField(field.name, e.target.value)}
                  className="w-full rounded-lg border border-[var(--gray-300)] px-3 py-2 text-sm outline-none focus:border-[var(--sky-500)]"
                />
              )}

              {field.type === "textarea" && (
                <textarea
                  required={field.required}
                  rows={4}
                  value={(values[field.name] as string) ?? ""}
                  onChange={(e) => setField(field.name, e.target.value)}
                  className="w-full rounded-lg border border-[var(--gray-300)] px-3 py-2 text-sm outline-none focus:border-[var(--sky-500)]"
                />
              )}

              {field.type === "date" && (
                <input
                  type="date"
                  required={field.required}
                  value={(values[field.name] as string) ?? ""}
                  onChange={(e) => setField(field.name, e.target.value)}
                  className="w-full rounded-lg border border-[var(--gray-300)] px-3 py-2 text-sm outline-none focus:border-[var(--sky-500)]"
                />
              )}

              {field.type === "select" && (
                <select
                  required={field.required}
                  value={(values[field.name] as string) ?? ""}
                  onChange={(e) => setField(field.name, e.target.value)}
                  className="w-full rounded-lg border border-[var(--gray-300)] px-3 py-2 text-sm outline-none focus:border-[var(--sky-500)]"
                >
                  <option value="">Seleccionar...</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "checkbox" && (
                <input
                  type="checkbox"
                  checked={Boolean(values[field.name])}
                  onChange={(e) => setField(field.name, e.target.checked)}
                  className="h-4 w-4"
                />
              )}

              {(field.type === "image" || field.type === "file") && (
                <div>
                  <input
                    type="file"
                    accept={field.type === "image" ? "image/*" : undefined}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(field, file);
                    }}
                    className="w-full text-sm"
                  />
                  {uploadingField === field.name && (
                    <p className="mt-1 text-xs text-[var(--sky-500)]">Subiendo...</p>
                  )}
                  {typeof values[field.name] === "string" && values[field.name] ? (
                    <p className="mt-1 truncate text-xs text-[var(--gray-500)]">
                      Archivo cargado: {String(values[field.name]).split("/").pop()}
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          ))}
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[var(--gray-300)] px-4 py-2 text-sm font-medium text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving || uploadingField !== null}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: "var(--sky-500)" }}
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
