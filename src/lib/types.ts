export interface Empresa {
  id: string;
  nombre: string;
  cuit: string | null;
  rubro: string | null;
  contacto_nombre: string | null;
  contacto_email: string | null;
  contacto_telefono: string | null;
  direccion: string | null;
  logo_url: string | null;
  notas: string | null;
  estado: "Activa" | "Inactiva";
  fecha_alta: string;
  created_at: string;
}

export interface BusquedaLaboral {
  id: string;
  empresa_id: string | null;
  empresa_nombre: string | null;
  puesto: string;
  descripcion: string | null;
  requisitos: string | null;
  ubicacion: string | null;
  modalidad: "Presencial" | "Remoto" | "Híbrido" | null;
  fecha_publicacion: string;
  fecha_cierre: string | null;
  estado: "Borrador" | "Publicada" | "Pausada" | "Cerrada";
  created_at: string;
}

export interface Postulante {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string | null;
  cv_url: string | null;
  perfil: string | null;
  busqueda_id: string | null;
  fecha_registro: string;
  estado:
    | "Nuevo"
    | "En proceso"
    | "Preseleccionado"
    | "Descartado"
    | "Contratado";
}

export interface Novedad {
  id: string;
  titulo: string;
  descripcion: string | null;
  imagen_url: string | null;
  video_url: string | null;
  categoria: string | null;
  autor: string | null;
  fecha: string;
  estado: "Borrador" | "Publicado";
  publicado: boolean;
  created_at: string;
}

export interface Consulta {
  id: string;
  nombre: string;
  email: string;
  telefono: string | null;
  mensaje: string;
  origen: string | null;
  estado: "Nueva" | "Atendida" | "Descartada";
  fecha: string;
}

export interface ContenidoWeb {
  id: string;
  seccion: string;
  clave: string;
  valor: string | null;
  tipo: "texto" | "html" | "imagen";
  updated_at: string;
}

export interface Configuracion {
  id: string;
  clave: string;
  valor: string | null;
  descripcion: string | null;
  updated_at: string;
}
