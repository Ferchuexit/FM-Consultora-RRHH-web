import { CrudPage } from "@/admin/components/CrudPage";
import type { BusquedaLaboral } from "@/lib/types";

export default function BusquedasPage() {
  return (
    <CrudPage<BusquedaLaboral>
      title="🔎 Búsquedas laborales"
      description='Cargá acá cada búsqueda. Las que tengan estado "Publicada" aparecen automáticamente en la sección Ofertas de la web.'
      table="busquedas_laborales"
      orderBy="fecha_publicacion"
      columns={[
        { header: "Empresa", render: (r) => r.empresa_nombre ?? "—" },
        { header: "Puesto", render: (r) => r.puesto },
        { header: "Ubicación", render: (r) => r.ubicacion ?? "—" },
        { header: "Modalidad", render: (r) => r.modalidad ?? "—" },
        { header: "Publicación", render: (r) => r.fecha_publicacion },
        { header: "Cierre", render: (r) => r.fecha_cierre ?? "—" },
        { header: "Estado", render: (r) => r.estado },
      ]}
      fields={[
        { name: "empresa_nombre", label: "Empresa", type: "text", required: true },
        { name: "puesto", label: "Puesto", type: "text", required: true },
        { name: "descripcion", label: "Descripción", type: "textarea" },
        { name: "requisitos", label: "Requisitos", type: "textarea" },
        { name: "ubicacion", label: "Ubicación", type: "text" },
        {
          name: "modalidad",
          label: "Modalidad",
          type: "select",
          options: ["Presencial", "Remoto", "Híbrido"],
        },
        { name: "fecha_publicacion", label: "Fecha de publicación", type: "date", required: true },
        { name: "fecha_cierre", label: "Fecha de cierre", type: "date" },
        {
          name: "estado",
          label: "Estado",
          type: "select",
          options: ["Borrador", "Publicada", "Pausada", "Cerrada"],
          required: true,
        },
      ]}
      defaultValues={{
        empresa_nombre: "",
        puesto: "",
        descripcion: "",
        requisitos: "",
        ubicacion: "",
        modalidad: "",
        fecha_publicacion: new Date().toISOString().slice(0, 10),
        fecha_cierre: "",
        estado: "Borrador",
      }}
      emptyLabel="Todavía no cargaste ninguna búsqueda laboral."
    />
  );
}
