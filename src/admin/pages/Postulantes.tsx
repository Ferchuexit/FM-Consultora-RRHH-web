import { CrudPage } from "@/admin/components/CrudPage";
import type { Postulante } from "@/lib/types";

export default function PostulantesPage() {
  return (
    <CrudPage<Postulante>
      title="👤 Postulantes"
      description="Banco de talento: personas registradas o postuladas a una búsqueda."
      table="postulantes"
      orderBy="fecha_registro"
      columns={[
        { header: "Nombre", render: (r) => `${r.nombre} ${r.apellido}` },
        { header: "Email", render: (r) => r.email },
        { header: "Teléfono", render: (r) => r.telefono ?? "—" },
        { header: "Perfil", render: (r) => r.perfil ?? "—" },
        { header: "Registro", render: (r) => new Date(r.fecha_registro).toLocaleDateString("es-AR") },
        { header: "Estado", render: (r) => r.estado },
      ]}
      fields={[
        { name: "nombre", label: "Nombre", type: "text", required: true },
        { name: "apellido", label: "Apellido", type: "text", required: true },
        { name: "email", label: "Email", type: "text", required: true },
        { name: "telefono", label: "Teléfono", type: "text" },
        {
          name: "cv_url",
          label: "CV (PDF)",
          type: "file",
          storageBucket: "cv-postulantes",
          storageFolder: "cv",
        },
        { name: "perfil", label: "Perfil / área", type: "text" },
        {
          name: "estado",
          label: "Estado",
          type: "select",
          options: ["Nuevo", "En proceso", "Preseleccionado", "Descartado", "Contratado"],
        },
      ]}
      defaultValues={{
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        cv_url: "",
        perfil: "",
        estado: "Nuevo",
      }}
      emptyLabel="Todavía no hay postulantes cargados."
    />
  );
}
