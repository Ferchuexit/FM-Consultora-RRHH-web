import { CrudPage } from "@/admin/components/CrudPage";
import type { ContenidoWeb } from "@/lib/types";

export default function ContenidoWebPage() {
  return (
    <CrudPage<ContenidoWeb>
      title="📄 Contenido web"
      description='Textos editables del sitio público. Por ahora está conectada la sección "hero" (inicio) con las claves "eyebrow", "titulo" y "subtitulo". Las demás secciones se van a ir sumando.'
      table="contenido_web"
      orderBy="seccion"
      ascending
      columns={[
        { header: "Sección", render: (r) => r.seccion },
        { header: "Clave", render: (r) => r.clave },
        { header: "Valor", render: (r) => r.valor ?? "—" },
        { header: "Tipo", render: (r) => r.tipo },
      ]}
      fields={[
        { name: "seccion", label: "Sección (ej: hero, empresas, footer)", type: "text", required: true },
        { name: "clave", label: "Clave (ej: titulo_principal)", type: "text", required: true },
        { name: "valor", label: "Valor", type: "textarea" },
        { name: "tipo", label: "Tipo", type: "select", options: ["texto", "html", "imagen"] },
      ]}
      defaultValues={{ seccion: "", clave: "", valor: "", tipo: "texto" }}
      emptyLabel="Todavía no cargaste contenido editable."
    />
  );
}
