import { CrudPage } from "@/admin/components/CrudPage";
import type { Consulta } from "@/lib/types";

export default function ConsultasPage() {
  return (
    <CrudPage<Consulta>
      title="📩 Consultas"
      description="Mensajes recibidos desde el formulario de contacto de la web."
      table="consultas"
      orderBy="fecha"
      columns={[
        { header: "Nombre", render: (r) => r.nombre },
        { header: "Email", render: (r) => r.email },
        { header: "Teléfono", render: (r) => r.telefono ?? "—" },
        { header: "Mensaje", render: (r) => r.mensaje },
        { header: "Fecha", render: (r) => new Date(r.fecha).toLocaleDateString("es-AR") },
        { header: "Estado", render: (r) => r.estado },
      ]}
      fields={[
        { name: "nombre", label: "Nombre", type: "text", required: true },
        { name: "email", label: "Email", type: "text", required: true },
        { name: "telefono", label: "Teléfono", type: "text" },
        { name: "mensaje", label: "Mensaje", type: "textarea", required: true },
        {
          name: "estado",
          label: "Estado",
          type: "select",
          options: ["Nueva", "Atendida", "Descartada"],
        },
      ]}
      defaultValues={{
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
        estado: "Nueva",
      }}
      emptyLabel="Todavía no llegaron consultas por el formulario web."
    />
  );
}
