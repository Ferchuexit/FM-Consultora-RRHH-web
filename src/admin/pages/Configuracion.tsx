import { CrudPage } from "@/admin/components/CrudPage";
import type { Configuracion } from "@/lib/types";

export default function ConfiguracionPage() {
  return (
    <CrudPage<Configuracion>
      title="⚙️ Configuración"
      description="Datos generales del sitio: WhatsApp, email de contacto, dirección, redes sociales, etc."
      table="configuracion"
      orderBy="clave"
      ascending
      columns={[
        { header: "Clave", render: (r) => r.clave },
        { header: "Valor", render: (r) => r.valor ?? "—" },
        { header: "Descripción", render: (r) => r.descripcion ?? "—" },
      ]}
      fields={[
        { name: "clave", label: "Clave (ej: whatsapp)", type: "text", required: true },
        { name: "valor", label: "Valor", type: "text" },
        { name: "descripcion", label: "Descripción", type: "text" },
      ]}
      defaultValues={{ clave: "", valor: "", descripcion: "" }}
      emptyLabel="Todavía no hay configuraciones cargadas."
    />
  );
}
