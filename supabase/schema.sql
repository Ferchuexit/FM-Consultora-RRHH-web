-- ═══════════════════════════════════════════════════════════════════════════
-- FM Consultora RRHH — Esquema de base de datos (Supabase / PostgreSQL)
-- ═══════════════════════════════════════════════════════════════════════════
-- Cómo usar este archivo:
-- 1. Entrá a tu proyecto en https://supabase.com/dashboard
-- 2. Andá a "SQL Editor" → "New query"
-- 3. Pegá TODO este archivo y ejecutalo (botón "Run")
-- Esto crea las tablas, la seguridad (RLS) y los buckets de almacenamiento.
-- ═══════════════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────────────────
-- 1) EMPRESAS
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists empresas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  cuit text,
  rubro text,
  contacto_nombre text,
  contacto_email text,
  contacto_telefono text,
  direccion text,
  logo_url text,
  notas text,
  estado text not null default 'Activa' check (estado in ('Activa', 'Inactiva')),
  fecha_alta timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- 2) BÚSQUEDAS LABORALES (= "Ofertas" cuando estado = 'Publicada')
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists busquedas_laborales (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid references empresas(id) on delete set null,
  empresa_nombre text, -- copia del nombre por si la empresa no está cargada como registro propio
  puesto text not null,
  descripcion text,
  requisitos text,
  ubicacion text,
  modalidad text check (modalidad in ('Presencial', 'Remoto', 'Híbrido')),
  fecha_publicacion date not null default current_date,
  fecha_cierre date,
  estado text not null default 'Borrador' check (estado in ('Borrador', 'Publicada', 'Pausada', 'Cerrada')),
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- 3) POSTULANTES (banco de talento; opcionalmente ligados a una búsqueda)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists postulantes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  apellido text not null,
  email text not null,
  telefono text,
  cv_url text,
  perfil text, -- área/perfil profesional (ej: "Administración", "Logística")
  busqueda_id uuid references busquedas_laborales(id) on delete set null,
  fecha_registro timestamptz not null default now(),
  estado text not null default 'Nuevo' check (estado in ('Nuevo', 'En proceso', 'Preseleccionado', 'Descartado', 'Contratado'))
);

-- ─────────────────────────────────────────────────────────────────────────
-- 4) NOVEDADES (blog / noticias)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists novedades (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descripcion text,
  imagen_url text,
  video_url text,
  categoria text,
  autor text,
  fecha date not null default current_date,
  estado text not null default 'Borrador' check (estado in ('Borrador', 'Publicado')),
  publicado boolean not null default false,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- 5) CONSULTAS (mensajes del formulario de contacto público)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists consultas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null,
  telefono text,
  mensaje text not null,
  origen text default 'Formulario web',
  estado text not null default 'Nueva' check (estado in ('Nueva', 'Atendida', 'Descartada')),
  fecha timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────────────────
-- 6) CONTENIDO WEB (editor simple de textos/secciones del sitio público)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists contenido_web (
  id uuid primary key default gen_random_uuid(),
  seccion text not null,       -- ej: "hero", "empresas", "footer"
  clave text not null,         -- ej: "titulo_principal"
  valor text,
  tipo text not null default 'texto' check (tipo in ('texto', 'html', 'imagen')),
  updated_at timestamptz not null default now(),
  unique (seccion, clave)
);

-- ─────────────────────────────────────────────────────────────────────────
-- 7) CONFIGURACIÓN (clave/valor general: whatsapp, redes, etc.)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists configuracion (
  id uuid primary key default gen_random_uuid(),
  clave text not null unique,
  valor text,
  descripcion text,
  updated_at timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- SEGURIDAD (Row Level Security)
-- Regla general: el público puede LEER lo publicado y ENVIAR postulaciones/
-- consultas. Solo un usuario autenticado (vos, el admin) puede escribir/editar.
-- ═══════════════════════════════════════════════════════════════════════════

alter table empresas enable row level security;
alter table busquedas_laborales enable row level security;
alter table postulantes enable row level security;
alter table novedades enable row level security;
alter table consultas enable row level security;
alter table contenido_web enable row level security;
alter table configuracion enable row level security;

-- Lectura pública de lo publicado
create policy "publico_lee_novedades_publicadas" on novedades
  for select using (publicado = true);
create policy "publico_lee_busquedas_publicadas" on busquedas_laborales
  for select using (estado = 'Publicada');
create policy "publico_lee_contenido" on contenido_web
  for select using (true);
create policy "publico_lee_configuracion" on configuracion
  for select using (true);

-- Envío público de formularios (alta, no lectura)
create policy "publico_crea_consultas" on consultas
  for insert with check (true);
create policy "publico_crea_postulantes" on postulantes
  for insert with check (true);

-- Acceso total para usuarios autenticados (el/los admin)
create policy "admin_todo_empresas" on empresas for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_todo_busquedas" on busquedas_laborales for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_todo_postulantes" on postulantes for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_todo_novedades" on novedades for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_todo_consultas" on consultas for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_todo_contenido" on contenido_web for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin_todo_configuracion" on configuracion for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════════════════════════════════
-- STORAGE (archivos: imágenes de novedades, logos, CVs)
-- ═══════════════════════════════════════════════════════════════════════════

insert into storage.buckets (id, name, public)
values ('sitio-publico', 'sitio-publico', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('cv-postulantes', 'cv-postulantes', false)
on conflict (id) do nothing;

-- Cualquiera puede ver archivos públicos (imágenes/logos)
create policy "publico_lee_bucket_publico" on storage.objects
  for select using (bucket_id = 'sitio-publico');

-- Solo admin autenticado sube/edita/borra en el bucket público
create policy "admin_escribe_bucket_publico" on storage.objects
  for insert with check (bucket_id = 'sitio-publico' and auth.role() = 'authenticated');
create policy "admin_actualiza_bucket_publico" on storage.objects
  for update using (bucket_id = 'sitio-publico' and auth.role() = 'authenticated');
create policy "admin_borra_bucket_publico" on storage.objects
  for delete using (bucket_id = 'sitio-publico' and auth.role() = 'authenticated');

-- CVs: cualquiera puede subir el propio (postulación pública), solo admin lee/gestiona
create policy "publico_sube_cv" on storage.objects
  for insert with check (bucket_id = 'cv-postulantes');
create policy "admin_lee_cv" on storage.objects
  for select using (bucket_id = 'cv-postulantes' and auth.role() = 'authenticated');
create policy "admin_borra_cv" on storage.objects
  for delete using (bucket_id = 'cv-postulantes' and auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════════════════════════════════
-- Configuración inicial de ejemplo (podés editarla luego desde el admin)
-- ═══════════════════════════════════════════════════════════════════════════
insert into configuracion (clave, valor, descripcion) values
  ('whatsapp', '5491130544678', 'Número de WhatsApp de contacto (con código de país, sin +)'),
  ('email_contacto', 'fm_consultora_rrhh@icloud.com', 'Email de contacto general'),
  ('direccion', 'La Rioja 916, Benavídez, Tigre', 'Dirección física')
on conflict (clave) do nothing;

-- Textos editables del hero (inicio) — ya están conectados a la web pública.
-- Si no cargás nada acá, se muestra el texto de diseño original por defecto.
insert into contenido_web (seccion, clave, valor, tipo) values
  ('hero', 'eyebrow', 'Consultoría Especializada en RRHH', 'texto'),
  ('hero', 'titulo', 'Soluciones integrales de Recursos Humanos para PyMEs', 'texto'),
  ('hero', 'subtitulo', 'Potenciamos el capital humano de tu empresa con servicios profesionales de gestión, liquidación y asesoramiento laboral. Más eficiencia, menos burocracia.', 'texto')
on conflict (seccion, clave) do nothing;

-- ═══════════════════════════════════════════════════════════════════════════
-- CÓMO CREAR TU USUARIO ADMIN
-- ═══════════════════════════════════════════════════════════════════════════
-- No lo hagas por SQL. Andá a: Authentication → Users → "Add user" en el
-- dashboard de Supabase, cargá tu email y una contraseña. Con eso ya podés
-- entrar en fmconsultorarrhh.com.ar/admin.
