import { CrudPage } from "@/admin/components/CrudPage";
import type { Empresa } from "@/lib/types";

export default function EmpresasPage() {
  return (
    <CrudPage<Empresa>
      title="🏢 Empresas"
      description="Empresas clientes que publican búsquedas o contratan tus servicios."
      table="empresas"
      orderBy="fecha_alta"
      columns={[
        { header: "Nombre", render: (r) => r.nombre },
        { header: "Rubro", render: (r) => r.rubro ?? "—" },
        { header: "Contacto", render: (r) => r.contacto_nombre ?? "—" },
        { header: "Email", render: (r) => r.contacto_email ?? "—" },
        { header: "Estado", render: (r) => r.estado },
      ]}
      fields={[
        { name: "nombre", label: "Nombre de la empresa", type: "text", required: true },
        { name: "cuit", label: "CUIT", type: "text" },
        { name: "rubro", label: "Rubro", type: "text" },
        {
          name: "logo_url",
          label: "Logo",
          type: "image",
          storageBucket: "sitio-publico",
          storageFolder: "empresas",
        },
        { name: "contacto_nombre", label: "Nombre de contacto", type: "text" },
        { name: "contacto_email", label: "Email de contacto", type: "text" },
        { name: "contacto_telefono", label: "Teléfono de contacto", type: "text" },
        { name: "direccion", label: "Dirección", type: "text" },
        { name: "notas", label: "Notas internas", type: "textarea" },
        { name: "estado", label: "Estado", type: "select", options: ["Activa", "Inactiva"] },
      ]}
      defaultValues={{
        nombre: "",
        cuit: "",
        rubro: "",
        logo_url: "",
        contacto_nombre: "",
        contacto_email: "",
        contacto_telefono: "",
        direccion: "",
        notas: "",
        estado: "Activa",
      }}
      emptyLabel="Todavía no cargaste ninguna empresa."
    />
  );
}
