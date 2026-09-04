import { CrudPage } from "@/admin/components/CrudPage";
import type { Novedad } from "@/lib/types";

export default function NovedadesPage() {
  return (
    <CrudPage<Novedad>
      title="📰 Novedades"
      description="Noticias y novedades que aparecen en la web pública."
      table="novedades"
      orderBy="fecha"
      columns={[
        { header: "Título", render: (r) => r.titulo },
        { header: "Categoría", render: (r) => r.categoria ?? "—" },
        { header: "Autor", render: (r) => r.autor ?? "—" },
        { header: "Fecha", render: (r) => r.fecha },
        { header: "Estado", render: (r) => r.estado },
        { header: "Publicado", render: (r) => (r.publicado ? "Sí" : "No") },
      ]}
      fields={[
        { name: "titulo", label: "Título", type: "text", required: true },
        { name: "descripcion", label: "Descripción", type: "textarea" },
        {
          name: "imagen_url",
          label: "Imagen",
          type: "image",
          storageBucket: "sitio-publico",
          storageFolder: "novedades",
        },
        { name: "video_url", label: "URL de video (YouTube, etc.)", type: "text" },
        { name: "categoria", label: "Categoría", type: "text" },
        { name: "autor", label: "Autor", type: "text" },
        { name: "fecha", label: "Fecha", type: "date", required: true },
        { name: "estado", label: "Estado", type: "select", options: ["Borrador", "Publicado"] },
        { name: "publicado", label: "Mostrar en la web pública", type: "checkbox" },
      ]}
      defaultValues={{
        titulo: "",
        descripcion: "",
        imagen_url: "",
        video_url: "",
        categoria: "",
        autor: "",
        fecha: new Date().toISOString().slice(0, 10),
        estado: "Borrador",
        publicado: false,
      }}
      emptyLabel="Todavía no cargaste ninguna novedad."
    />
  );
}
