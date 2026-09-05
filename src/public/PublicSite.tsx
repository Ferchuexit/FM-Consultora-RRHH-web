import { useEffect, useState } from "react";
import logoImg from "@/imports/Logotipo_ampliado.png";
import { supabase } from "@/lib/supabase";
import { useConfiguracion } from "@/lib/useConfiguracion";
import { useContenidoWeb } from "@/lib/useContenidoWeb";

type Section =
  | "inicio"
  | "empresas"
  | "postulantes"
  | "ofertas"
  | "reclutadores"
  | "software"
  | "novedades"
  | "clientes"
  | "contacto";

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: "inicio", label: "Inicio" },
  { id: "empresas", label: "Empresas" },
  { id: "postulantes", label: "Postulantes" },
  { id: "ofertas", label: "Ofertas" },
  { id: "reclutadores", label: "Reclutadores" },
  { id: "software", label: "FM Software" },
  { id: "novedades", label: "Novedades" },
  { id: "clientes", label: "Clientes" },
  { id: "contacto", label: "Contacto" },
];

// ─── Icons (inline SVG) ───────────────────────────────────────────────────────

function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 2C8.268 2 2 8.268 2 16c0 2.442.659 4.73 1.808 6.702L2 30l7.54-1.766A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.4a11.37 11.37 0 01-5.815-1.598l-.417-.247-4.474 1.047 1.07-4.357-.27-.44A11.37 11.37 0 014.6 16c0-6.29 5.11-11.4 11.4-11.4S27.4 9.71 27.4 16 22.29 27.4 16 27.4zm6.245-8.53c-.342-.171-2.026-1-2.34-1.113-.314-.114-.542-.171-.77.171s-.884 1.113-1.083 1.342c-.2.228-.4.257-.742.086-.342-.171-1.445-.533-2.751-1.698-1.017-.907-1.703-2.027-1.903-2.37-.2-.342-.021-.527.15-.697.154-.153.342-.4.513-.599.171-.2.228-.342.342-.57.114-.228.057-.428-.028-.599-.086-.171-.77-1.855-1.055-2.54-.278-.667-.56-.577-.77-.588l-.656-.011c-.228 0-.6.086-.913.428-.314.342-1.198 1.17-1.198 2.854s1.227 3.311 1.398 3.54c.171.228 2.414 3.685 5.848 5.167.818.353 1.456.563 1.953.72.82.26 1.568.224 2.158.136.658-.098 2.026-.828 2.312-1.628.285-.8.285-1.484.2-1.628-.086-.143-.314-.228-.656-.4z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function IconPin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconSettings() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconUpload() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconTag() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="cursor-pointer select-none flex items-center">
      <div style={{
        background: light ? "white" : "transparent",
        borderRadius: light ? 10 : 0,
        padding: light ? "4px 10px" : 0,
        display: "flex",
        alignItems: "center",
      }}>
        <img
          src={logoImg}
          alt="FM Consultora RRHH"
          style={{ height: light ? 38 : 40, width: "auto", objectFit: "contain", display: "block" }}
        />
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ current, onNav }: { current: Section; onNav: (s: Section) => void }) {
  const [open, setOpen] = useState(false);
  const isLight = current === "inicio";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{
      background: isLight ? "transparent" : "rgba(255,255,255,0.97)",
      backdropFilter: "blur(12px)",
      borderBottom: isLight ? "1px solid rgba(255,255,255,0.12)" : "1px solid #eef1f6",
      transition: "all 0.3s ease",
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => onNav("inicio")}><Logo light={isLight} /></button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className="nav-link px-3 py-1.5 rounded-lg"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "0.82rem",
                color: isLight
                  ? current === item.id ? "white" : "rgba(255,255,255,0.8)"
                  : current === item.id ? "#1b3468" : "#64748b",
                background: current === item.id
                  ? isLight ? "rgba(255,255,255,0.15)" : "rgba(29,64,145,0.07)"
                  : "transparent",
                transition: "all 0.2s",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button className="btn-primary px-4 py-2 text-sm" onClick={() => onNav("contacto")} style={{ fontSize: "0.82rem" }}>
            Contactar
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden p-2 rounded-lg" onClick={() => setOpen(!open)} style={{ color: isLight ? "white" : "#0d1f4e" }}>
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden mobile-menu" style={{ background: "rgba(255,255,255,0.98)", borderTop: "1px solid #eef1f6", padding: "8px 0 16px" }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNav(item.id); setOpen(false); }}
              className="w-full text-left px-6 py-3"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: current === item.id ? 600 : 400,
                fontSize: "0.9rem",
                color: current === item.id ? "#1b3468" : "#334155",
                background: current === item.id ? "rgba(29,64,145,0.06)" : "transparent",
              }}
            >
              {item.label}
            </button>
          ))}
          <div className="px-6 pt-3">
            <button className="btn-primary w-full py-3 text-sm" onClick={() => { onNav("contacto"); setOpen(false); }}>
              Contactar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── SECTION: INICIO ─────────────────────────────────────────────────────────

function SectionInicio({ onNav }: { onNav: (s: Section) => void }) {
  const { get } = useContenidoWeb("hero");

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient" style={{ paddingTop: 64, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 480, height: 480, borderRadius: "50%", background: "rgba(63,174,222,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-15%", left: "-8%", width: 600, height: 600, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", left: "55%", width: 200, height: 200, borderRadius: "50%", background: "rgba(94,195,237,0.1)", pointerEvents: "none" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#29c3f5" }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{get("eyebrow", "Consultoría Especializada en RRHH")}</span>
              </div>

              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "white", lineHeight: 1.1, marginBottom: 20 }}>
                {get("titulo", "Soluciones integrales de Recursos Humanos para PyMEs")}
              </h1>

              <p style={{ fontFamily: "var(--font-body)", fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 40, maxWidth: 520 }}>
                {get("subtitulo", "Potenciamos el capital humano de tu empresa con servicios profesionales de gestión, liquidación y asesoramiento laboral. Más eficiencia, menos burocracia.")}
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="btn-outline px-7 py-3.5 text-sm" onClick={() => onNav("empresas")}>
                  Soy Empresa
                </button>
                <button className="btn-outline px-7 py-3.5 text-sm" onClick={() => onNav("postulantes")}>
                  Soy Postulante
                </button>
                <button className="btn-sky px-7 py-3.5 text-sm" onClick={() => onNav("software")}>
                  Conocer FM Software
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-12">
                {[["+200", "Empresas"], ["+5000", "Liquidaciones/mes"], ["15+", "Años de experiencia"]].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.8rem", color: "white", lineHeight: 1 }}>{num}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-up delay-300 hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=640&h=480&fit=crop&auto=format"
                  alt="Equipo de profesionales en reunión"
                  className="rounded-2xl"
                  style={{ width: "100%", objectFit: "cover", boxShadow: "0 40px 80px rgba(0,0,0,0.3)", height: 380 }}
                />
                {/* Floating KPI card */}
                <div className="kpi-card" style={{ position: "absolute", bottom: -24, left: -24, minWidth: 200 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Indicadores en tiempo real</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "white", marginTop: 4 }}>+98% satisfacción</div>
                  <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
                    {[1,2,3,4,5].map(i => <span key={i} style={{ color: "#fbbf24" }}><IconStar /></span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <svg viewBox="0 0 1440 60" style={{ display: "block", marginTop: "auto" }} preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="white" />
        </svg>
      </section>

      {/* Services quick overview */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-eyebrow mb-3">¿Qué hacemos?</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#0d1f4e" }}>Todo lo que necesitás en RRHH, en un solo lugar</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <IconShield />, title: "Auditoría Laboral", desc: "Revisión integral del cumplimiento normativo y convencional.", section: "empresas" as Section },
              { icon: <IconChart />, title: "Liquidación de Sueldos", desc: "Multiconvenio, precisa y en tiempo, con todos los aportes.", section: "empresas" as Section },
              { icon: <IconUsers />, title: "Selección de Personal", desc: "Procesos efectivos para encontrar el talento que tu empresa necesita.", section: "postulantes" as Section },
              { icon: <IconSettings />, title: "FM Software", desc: "Sistema integral de gestión de RRHH pensado para PyMEs.", section: "software" as Section },
            ].map((item) => (
              <button
                key={item.title}
                className="card-hover text-left p-6 rounded-2xl"
                style={{ border: "1px solid #eef1f6", background: "#f8f9fc", cursor: "pointer" }}
                onClick={() => onNav(item.section)}
              >
                <div className="icon-circle mb-4" style={{ background: "linear-gradient(135deg,#eef1f6,#dde3ed)" }}>
                  <span style={{ color: "#1b3468" }}>{item.icon}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", color: "#0d1f4e", marginBottom: 6 }}>{item.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#64748b", lineHeight: 1.6 }}>{item.desc}</p>
                <div className="flex items-center gap-1.5 mt-4" style={{ color: "#1b3468", fontSize: "0.8rem", fontWeight: 600, fontFamily: "var(--font-display)" }}>
                  Ver más <IconArrow />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section style={{ background: "linear-gradient(135deg,#0d1f4e,#1b3468)", padding: "64px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.5rem,3vw,2.2rem)", color: "white", marginBottom: 16 }}>¿Listo para optimizar tu gestión de RRHH?</h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", marginBottom: 32 }}>Hablemos. Sin compromiso, con soluciones concretas para tu empresa.</p>
          <button className="btn-sky px-8 py-4 text-base" onClick={() => onNav("contacto")}>Solicitar una consulta gratuita</button>
        </div>
      </section>
    </div>
  );
}

// ─── SECTION: EMPRESAS ───────────────────────────────────────────────────────

const SERVICIOS = [
  { icon: <IconShield />, title: "Auditoría Laboral", desc: "Revisión exhaustiva del cumplimiento de obligaciones laborales, sindicales y previsionales. Identificamos riesgos y brechas antes de que se conviertan en contingencias." },
  { icon: <IconUsers />, title: "Administración de Personal", desc: "Gestión integral del ciclo de vida del empleado: altas, bajas, modificaciones, legajos digitales y control documental permanente." },
  { icon: <IconChart />, title: "Liquidación de Sueldos Multiconvenio", desc: "Liquidaciones precisas bajo cualquier convenio colectivo vigente, con cálculo de horas extras, descuentos, beneficios y deducciones. Incluye F.931 y LSD." },
  { icon: <IconSettings />, title: "Control de Novedades", desc: "Registro y procesamiento sistemático de ausencias, vacaciones, licencias, horas adicionales y cualquier novedad que impacte en la liquidación." },
  { icon: <IconBriefcase />, title: "Relaciones Laborales", desc: "Asesoramiento en negociaciones sindicales, resolución de conflictos, sanciones y procedimientos disciplinarios conforme a la normativa vigente." },
  { icon: <IconChart />, title: "Indicadores de RRHH", desc: "Diseño e implementación de KPIs estratégicos: rotación, ausentismo, costo laboral, productividad. Dashboard actualizado para la toma de decisiones." },
  { icon: <IconSettings />, title: "Optimización de Procesos", desc: "Relevamiento, diagnóstico y rediseño de los procesos de RRHH para ganar eficiencia operativa y reducir costos administrativos." },
  { icon: <IconUsers />, title: "Selección y Asesoramiento", desc: "Búsqueda y selección de candidatos con match cultural y técnico. Entrevistas por competencias, evaluaciones y acompañamiento hasta la incorporación." },
];

function SectionEmpresas({ onNav }: { onNav: (s: Section) => void }) {
  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero band */}
      <section style={{ background: "linear-gradient(135deg,#0d1f4e,#1b3468)", padding: "72px 0 80px" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-eyebrow mb-3" style={{ color: "#7ddcfa" }}>Para Empresas</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,3rem)", color: "white", marginBottom: 16 }}>Servicios profesionales de RRHH para PyMEs</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 32px" }}>
            Nos convertimos en el área de RRHH de tu empresa, con la experiencia y las herramientas de un equipo especializado.
          </p>
          <button className="btn-sky px-7 py-3.5 text-sm" onClick={() => onNav("contacto")}>Solicitar propuesta</button>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ background: "#f8f9fc", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-eyebrow mb-3">Servicios</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#0d1f4e" }}>Todo lo que tu empresa necesita</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICIOS.map((s) => (
              <div key={s.title} className="card-hover p-6 rounded-2xl bg-white" style={{ border: "1px solid #eef1f6" }}>
                <div className="icon-circle mb-4">
                  <span style={{ color: "#1b3468" }}>{s.icon}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "#0d1f4e", marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#64748b", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-eyebrow mb-3">¿Por qué elegirnos?</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#0d1f4e", marginBottom: 20 }}>Experiencia, confianza y resultados concretos</h2>
              <p style={{ color: "#64748b", lineHeight: 1.7, marginBottom: 24 }}>
                Trabajamos como un área interna de RRHH, con la ventaja de la especialización y el conocimiento de más de 200 convenios colectivos de trabajo.
              </p>
              {[
                "Actualización permanente en legislación laboral",
                "Tecnología propia: FM Software para gestión integral",
                "Atención personalizada y cercana",
                "Confidencialidad y seguridad de la información",
                "Equipo multidisciplinario con más de 15 años de trayectoria",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 mb-3">
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#1b3468,#00aeef)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ color: "white" }}><IconCheck /></span>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "#334155", lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=640&h=480&fit=crop&auto=format"
                alt="Profesionales trabajando en equipo"
                className="rounded-2xl"
                style={{ width: "100%", objectFit: "cover", height: 400, boxShadow: "0 20px 60px rgba(15,35,82,0.15)" }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── SECTION: POSTULANTES ────────────────────────────────────────────────────

function SectionPostulantes({ onNav }: { onNav: (s: Section) => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nombre: "", apellido: "", email: "", telefono: "", dni: "", ciudad: "", puesto: "", experiencia: "", formacion: "", sobre: "", cv: "" });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ background: "linear-gradient(135deg,#0d1f4e,#1b3468)", padding: "64px 0" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-eyebrow mb-3" style={{ color: "#7ddcfa" }}>Para Postulantes</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "white", marginBottom: 12 }}>Tu próxima oportunidad empieza aquí</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem" }}>Registrate, cargá tu CV y accedé a las mejores búsquedas laborales de nuestros clientes.</p>
        </div>
      </section>

      <section style={{ background: "#f8f9fc", padding: "64px 0" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <button
                  onClick={() => s < step ? setStep(s) : undefined}
                  style={{
                    width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    background: s <= step ? "linear-gradient(135deg,#1b3468,#00aeef)" : "#dde3ed",
                    color: s <= step ? "white" : "#94a3b8",
                    fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.88rem",
                    transition: "all 0.2s",
                    border: "none", cursor: s < step ? "pointer" : "default",
                  }}
                >{s <= step - 1 ? <IconCheck /> : s}</button>
                {s < 3 && <div style={{ width: 48, height: 2, background: s < step ? "#1b3468" : "#dde3ed", borderRadius: 1 }} />}
              </div>
            ))}
          </div>
          <div className="text-center mb-8">
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.78rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {step === 1 ? "Datos personales" : step === 2 ? "Experiencia y formación" : "Finalizar registro"}
            </div>
          </div>

          <div style={{ background: "white", borderRadius: 20, padding: 32, boxShadow: "0 8px 40px rgba(15,35,82,0.1)", border: "1px solid #eef1f6" }}>
            {step === 1 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Nombre *</label>
                  <input className="form-input" value={form.nombre} onChange={e => update("nombre", e.target.value)} placeholder="Tu nombre" />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Apellido *</label>
                  <input className="form-input" value={form.apellido} onChange={e => update("apellido", e.target.value)} placeholder="Tu apellido" />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Email *</label>
                  <input className="form-input" type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="tu@email.com" />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Teléfono</label>
                  <input className="form-input" value={form.telefono} onChange={e => update("telefono", e.target.value)} placeholder="+54 11 ..." />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>DNI</label>
                  <input className="form-input" value={form.dni} onChange={e => update("dni", e.target.value)} placeholder="00.000.000" />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Ciudad</label>
                  <input className="form-input" value={form.ciudad} onChange={e => update("ciudad", e.target.value)} placeholder="Buenos Aires, GBA..." />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-4">
                <div>
                  <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Puesto al que te postulás</label>
                  <input className="form-input" value={form.puesto} onChange={e => update("puesto", e.target.value)} placeholder="Ej: Analista de RRHH, Liquidador..." />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Experiencia laboral</label>
                  <textarea className="form-input" rows={3} value={form.experiencia} onChange={e => update("experiencia", e.target.value)} placeholder="Descripción de tu experiencia laboral relevante..." style={{ resize: "vertical" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Formación académica</label>
                  <textarea className="form-input" rows={2} value={form.formacion} onChange={e => update("formacion", e.target.value)} placeholder="Carrera, institución, año de egreso..." style={{ resize: "vertical" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Sobre vos</label>
                  <textarea className="form-input" rows={2} value={form.sobre} onChange={e => update("sobre", e.target.value)} placeholder="Motivaciones, habilidades destacadas..." style={{ resize: "vertical" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Adjuntar CV</label>
                  <div style={{ border: "2px dashed #dde3ed", borderRadius: 10, padding: "28px 20px", textAlign: "center", cursor: "pointer" }}
                    onClick={() => alert("Funcionalidad de carga de CV disponible en producción")}>
                    <span style={{ color: "#1b3468" }}><IconUpload /></span>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", color: "#64748b", marginTop: 8 }}>Arrastrá tu CV o <span style={{ color: "#1b3468", fontWeight: 600 }}>hacé clic para subir</span></div>
                    <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginTop: 4 }}>PDF, DOC hasta 5MB</div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#1b3468,#00aeef)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", color: "#0d1f4e", marginBottom: 10 }}>¡Registro completado!</h3>
                <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 28 }}>Tu perfil fue registrado exitosamente. Vamos a contactarte cuando tengamos una búsqueda que se ajuste a tu perfil.</p>
                <button className="btn-primary px-6 py-3 text-sm" onClick={() => onNav("ofertas")}>Ver ofertas laborales</button>
              </div>
            )}

            {step < 3 && (
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <button onClick={() => setStep(s => s - 1)} style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 600, color: "#64748b", background: "none", border: "1.5px solid #dde3ed", borderRadius: 8, padding: "10px 20px", cursor: "pointer" }}>
                    Anterior
                  </button>
                ) : <div />}
                <button className="btn-primary px-6 py-2.5 text-sm" onClick={() => setStep(s => s + 1)}>
                  {step === 2 ? "Registrarme" : "Continuar"}
                </button>
              </div>
            )}
          </div>

          <div className="text-center mt-8">
            <button onClick={() => onNav("ofertas")} style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 600, color: "#1b3468", background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
              Ver ofertas laborales activas <IconArrow />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── SECTION: OFERTAS ────────────────────────────────────────────────────────
// Las ofertas ahora se cargan en vivo desde Supabase (tabla busquedas_laborales,
// solo las que tengan estado = "Publicada"). Se editan desde el panel /admin.

function useOfertasPublicadas() {
  const [ofertas, setOfertas] = useState<import("@/lib/types").BusquedaLaboral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from("busquedas_laborales")
      .select("*")
      .eq("estado", "Publicada")
      .order("fecha_publicacion", { ascending: false })
      .then(({ data }) => {
        if (active) {
          setOfertas((data as import("@/lib/types").BusquedaLaboral[]) ?? []);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { ofertas, loading };
}

function SectionOfertas({ onNav }: { onNav: (s: Section) => void }) {
  const { ofertas, loading } = useOfertasPublicadas();
  const [filtroModalidad, setFiltroModalidad] = useState("Todos");
  const [selected, setSelected] = useState<string | null>(null);

  const modalidades = ["Todos", "Presencial", "Remoto", "Híbrido"];

  const filtered = ofertas.filter(
    (o) => filtroModalidad === "Todos" || o.modalidad === filtroModalidad,
  );

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ background: "linear-gradient(135deg,#0d1f4e,#1b3468)", padding: "64px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-eyebrow mb-3" style={{ color: "#7ddcfa" }}>Búsquedas Activas</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "white", marginBottom: 12 }}>Ofertas laborales</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem" }}>Encontrá tu próxima oportunidad entre las búsquedas activas de nuestros clientes.</p>
        </div>
      </section>

      <section style={{ background: "#f8f9fc", padding: "48px 0 72px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex flex-wrap gap-2">
              {modalidades.map(m => (
                <button key={m} onClick={() => setFiltroModalidad(m)} style={{
                  fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.8rem",
                  padding: "7px 16px", borderRadius: 20, border: "1.5px solid",
                  borderColor: filtroModalidad === m ? "#1b3468" : "#dde3ed",
                  background: filtroModalidad === m ? "#1b3468" : "white",
                  color: filtroModalidad === m ? "white" : "#64748b",
                  cursor: "pointer", transition: "all 0.2s",
                }}>{m}</button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="text-center py-16" style={{ color: "#94a3b8" }}>Cargando búsquedas...</div>
          )}

          {!loading && (
            <div className="grid lg:grid-cols-2 gap-5">
              {filtered.map(job => (
                <div key={job.id} className="card-hover bg-white rounded-2xl p-6" style={{ border: selected === job.id ? "2px solid #1b3468" : "1px solid #eef1f6", cursor: "pointer" }} onClick={() => setSelected(job.id)}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.02rem", color: "#0d1f4e" }}>{job.puesto}</h3>
                      <div style={{ color: "#64748b", fontSize: "0.82rem", marginTop: 3 }}>{job.empresa_nombre ?? "Empresa confidencial"}</div>
                    </div>
                    {job.modalidad && (
                      <span className="tag px-3 py-1 rounded-full" style={{ background: "rgba(29,64,145,0.08)", color: "#1b3468" }}>{job.modalidad}</span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4 text-sm" style={{ color: "#94a3b8" }}>
                    {job.ubicacion && <div className="flex items-center gap-1.5"><IconPin />{job.ubicacion}</div>}
                    <div className="flex items-center gap-1.5"><IconClock />{job.fecha_publicacion}</div>
                  </div>

                  {job.descripcion && (
                    <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: 12 }}>{job.descripcion}</p>
                  )}

                  {job.requisitos && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {job.requisitos.split(/\n|,/).map(r => r.trim()).filter(Boolean).map(r => (
                        <span key={r} className="soft-pill" style={{ fontSize: "0.72rem" }}>{r}</span>
                      ))}
                    </div>
                  )}

                  <button className="btn-primary w-full py-2.5 text-sm" onClick={(e) => { e.stopPropagation(); onNav("postulantes"); }}>
                    Postularme
                  </button>
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-16" style={{ color: "#94a3b8", fontFamily: "var(--font-display)" }}>
              No hay búsquedas activas con los filtros seleccionados.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── SECTION: RECLUTADORES ──────────────────────────────────────────────────

function SectionReclutadores({ onNav }: { onNav: (s: Section) => void }) {
  const [tab, setTab] = useState<"publicar" | "candidatos" | "procesos">("publicar");

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ background: "linear-gradient(135deg,#0d1f4e,#1b3468)", padding: "64px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-eyebrow mb-3" style={{ color: "#7ddcfa" }}>Para Reclutadores</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "white", marginBottom: 12 }}>Espacio de gestión para reclutadores</h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }}>Publicá búsquedas, consultá candidatos y gestioná todos tus procesos desde un solo lugar.</p>
        </div>
      </section>

      <section style={{ background: "#f8f9fc", padding: "48px 0 72px" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 p-1 rounded-xl mb-8" style={{ background: "#eef1f6", display: "inline-flex" }}>
            {(["publicar", "candidatos", "procesos"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.85rem",
                padding: "9px 22px", borderRadius: 10, border: "none", cursor: "pointer",
                background: tab === t ? "white" : "transparent",
                color: tab === t ? "#1b3468" : "#64748b",
                boxShadow: tab === t ? "0 2px 8px rgba(15,35,82,0.1)" : "none",
                transition: "all 0.2s",
              }}>
                {t === "publicar" ? "Publicar búsqueda" : t === "candidatos" ? "Candidatos" : "Mis procesos"}
              </button>
            ))}
          </div>

          {tab === "publicar" && (
            <div style={{ background: "white", borderRadius: 20, padding: 32, border: "1px solid #eef1f6", boxShadow: "0 8px 40px rgba(15,35,82,0.08)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#0d1f4e", marginBottom: 20 }}>Nueva búsqueda</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[["Título del puesto", "Ej: Analista de RRHH"], ["Empresa", "Nombre de la empresa"], ["Ubicación", "CABA, GBA, Remoto..."], ["Modalidad", "Full-time / Part-time"], ["Rango salarial", "$ mínimo – $ máximo"], ["Área", "RRHH, Liquidación..."]].map(([label, ph]) => (
                  <div key={label}>
                    <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>{label}</label>
                    <input className="form-input" placeholder={ph} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Descripción y requisitos</label>
                <textarea className="form-input" rows={4} placeholder="Describí el puesto, responsabilidades y requisitos..." style={{ resize: "vertical" }} />
              </div>
              <div className="flex justify-end mt-6">
                <button className="btn-primary px-7 py-3 text-sm">Publicar búsqueda</button>
              </div>
            </div>
          )}

          {tab === "candidatos" && (
            <div style={{ background: "white", borderRadius: 20, padding: 32, border: "1px solid #eef1f6", boxShadow: "0 8px 40px rgba(15,35,82,0.08)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#0d1f4e", marginBottom: 20 }}>Base de candidatos</h3>
              {[
                { nombre: "Valentina Rodríguez", puesto: "Analista de RRHH", exp: "6 años", ciudad: "CABA" },
                { nombre: "Martín Herrera", puesto: "Liquidador de Sueldos", exp: "4 años", ciudad: "GBA Norte" },
                { nombre: "Luciana Fernández", puesto: "Responsable de Selección", exp: "8 años", ciudad: "Remoto" },
                { nombre: "Santiago Méndez", puesto: "Asistente de RRHH", exp: "2 años", ciudad: "GBA Sur" },
              ].map(c => (
                <div key={c.nombre} className="flex items-center justify-between py-4" style={{ borderBottom: "1px solid #eef1f6" }}>
                  <div className="flex items-center gap-4">
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#1b3468,#00aeef)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem" }}>
                      {c.nombre.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9rem", color: "#0d1f4e" }}>{c.nombre}</div>
                      <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{c.puesto} · {c.exp} · {c.ciudad}</div>
                    </div>
                  </div>
                  <button style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.78rem", color: "#1b3468", background: "rgba(46,106,214,0.07)", border: "none", borderRadius: 8, padding: "6px 14px", cursor: "pointer" }}>Ver perfil</button>
                </div>
              ))}
            </div>
          )}

          {tab === "procesos" && (
            <div style={{ background: "white", borderRadius: 20, padding: 32, border: "1px solid #eef1f6", boxShadow: "0 8px 40px rgba(15,35,82,0.08)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#0d1f4e", marginBottom: 20 }}>Procesos activos</h3>
              {[
                { titulo: "Analista de RRHH Senior", estado: "En evaluación", candidatos: 12, dias: 8 },
                { titulo: "Liquidador de Sueldos", estado: "Entrevistas", candidatos: 6, dias: 15 },
                { titulo: "Asistente de RRHH", estado: "Publicado", candidatos: 28, dias: 3 },
              ].map(p => (
                <div key={p.titulo} className="p-4 rounded-xl mb-3" style={{ background: "#f8f9fc", border: "1px solid #eef1f6" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9rem", color: "#0d1f4e" }}>{p.titulo}</div>
                      <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 3 }}>{p.candidatos} candidatos · Día {p.dias}</div>
                    </div>
                    <span className="tag px-3 py-1.5 rounded-full" style={{
                      background: p.estado === "Publicado" ? "rgba(63,174,222,0.1)" : p.estado === "Entrevistas" ? "rgba(29,64,145,0.08)" : "rgba(251,191,36,0.12)",
                      color: p.estado === "Publicado" ? "#2e7d9e" : p.estado === "Entrevistas" ? "#1b3468" : "#92400e",
                    }}>{p.estado}</span>
                  </div>
                  <div className="mt-3" style={{ height: 4, background: "#dde3ed", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min(p.dias * 5, 80)}%`, background: "linear-gradient(90deg,#1b3468,#00aeef)", borderRadius: 2 }} />
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <button className="btn-primary px-7 py-3 text-sm" onClick={() => setTab("publicar")}>+ Nueva búsqueda</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── SECTION: FM SOFTWARE ────────────────────────────────────────────────────

const SW_FEATURES = [
  "Liquidación de Sueldos", "Recibos Digitales", "LSD / F.931", "KPIs de RRHH",
  "Dashboard Ejecutivo", "Informes a Medida", "Control de Novedades", "Asistencia",
  "Biométricos", "Depósitos Bancarios", "Proyecciones de Costos", "Gestión de Vacaciones",
  "Legajos Digitales", "Multiconvenio",
];

function SectionSoftware({ onNav }: { onNav: (s: Section) => void }) {
  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#0d1f4e 0%,#1b3468 55%,#1e4a8a 100%)", padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full" style={{ background: "rgba(63,174,222,0.15)", border: "1px solid rgba(63,174,222,0.25)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", fontWeight: 700, color: "#29c3f5", letterSpacing: "0.1em", textTransform: "uppercase" }}>FM Software · Gestión Integral</span>
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem,4vw,3rem)", color: "white", marginBottom: 16, lineHeight: 1.1 }}>
                El sistema de RRHH diseñado para PyMEs argentinas
              </h1>
              <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 32, fontSize: "1rem" }}>
                FM Software centraliza toda la gestión de recursos humanos en una única plataforma: liquidaciones, legajos, asistencia, biométricos, informes y mucho más.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="btn-sky px-7 py-3.5 text-sm" onClick={() => onNav("contacto")}>Solicitar demo gratuita</button>
                <button className="btn-outline px-7 py-3.5 text-sm" onClick={() => onNav("contacto")}>Hablar con un asesor</button>
              </div>
            </div>
            <div>
              {/* Mock dashboard */}
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 24, backdropFilter: "blur(8px)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fbbf24" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginLeft: 8 }}>FM Software · Dashboard</div>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[["$2.4M", "Masa salarial"], ["147", "Empleados activos"], ["98.2%", "Liquidados"]].map(([v, l]) => (
                    <div key={l} className="kpi-card">
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "white" }}>{v}</div>
                      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>Ausentismo últimos 6 meses</div>
                  <div className="flex items-end gap-2" style={{ height: 60 }}>
                    {[35, 48, 28, 62, 40, 55].map((h, i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 3 ? "#00aeef" : "rgba(46,106,214,0.45)", borderRadius: "4px 4px 0 0", transition: "height 0.3s" }} />
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {["Ene", "Feb", "Mar", "Abr", "May", "Jun"].map(m => (
                      <div key={m} style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-display)", fontSize: "0.6rem", color: "rgba(255,255,255,0.35)" }}>{m}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features pills */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-eyebrow mb-3">Módulos incluidos</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#0d1f4e" }}>Todo lo que necesitás en una sola plataforma</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {SW_FEATURES.map(f => <span key={f} className="soft-pill">{f}</span>)}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Liquidación Multiconvenio", desc: "Soporte para todos los convenios colectivos vigentes en Argentina. Cálculo automático, preciso y auditado.", icon: "💳" },
              { title: "Dashboard Ejecutivo", desc: "KPIs en tiempo real para la toma de decisiones: rotación, ausentismo, costo laboral y más.", icon: "📊" },
              { title: "Legajos Digitales", desc: "Gestión documental completa de cada empleado, con firma digital y control de vencimientos.", icon: "🗂️" },
              { title: "Control de Asistencia", desc: "Integración con biométricos y acceso desde móvil para el control horario en tiempo real.", icon: "⏱️" },
              { title: "Recibos de Sueldo", desc: "Generación y distribución electrónica de recibos. Firma digital conforme a la normativa.", icon: "📄" },
              { title: "Proyecciones de Costos", desc: "Simulaciones salariales y proyecciones de costo laboral para la planificación estratégica.", icon: "📈" },
            ].map(f => (
              <div key={f.title} className="card-hover p-6 rounded-2xl" style={{ border: "1px solid #eef1f6", background: "#f8f9fc" }}>
                <div style={{ fontSize: "2rem", marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: "#0d1f4e", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#64748b", lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#1b3468,#00aeef)", padding: "72px 0" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem,3vw,2.4rem)", color: "white", marginBottom: 16 }}>Probá FM Software sin costo</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: 32, fontSize: "1rem" }}>Demo guiada de 30 minutos con un especialista. Sin tarjeta de crédito.</p>
          <button className="btn-outline px-9 py-4 text-base" onClick={() => onNav("contacto")}>Solicitar demo gratuita</button>
        </div>
      </section>
    </div>
  );
}

// ─── SECTION: NOVEDADES ──────────────────────────────────────────────────────
// Las novedades se cargan en vivo desde Supabase (tabla novedades, solo las
// que tengan publicado = true). Se editan desde el panel /admin.

const TIPO_COLOR: Record<string, { bg: string; color: string }> = {
  "Artículo": { bg: "rgba(29,64,145,0.08)", color: "#1b3468" },
  "Consejo": { bg: "rgba(63,174,222,0.12)", color: "#1a7aa0" },
  "Novedad": { bg: "rgba(251,191,36,0.14)", color: "#92400e" },
  "Video": { bg: "rgba(239,68,68,0.1)", color: "#991b1b" },
};

function useNovedadesPublicadas() {
  const [novedades, setNovedades] = useState<import("@/lib/types").Novedad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from("novedades")
      .select("*")
      .eq("publicado", true)
      .order("fecha", { ascending: false })
      .then(({ data }) => {
        if (active) {
          setNovedades((data as import("@/lib/types").Novedad[]) ?? []);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return { novedades, loading };
}

function SectionNovedades() {
  const { novedades, loading } = useNovedadesPublicadas();

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ background: "linear-gradient(135deg,#0d1f4e,#1b3468)", padding: "64px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-eyebrow mb-3" style={{ color: "#7ddcfa" }}>Novedades</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "white", marginBottom: 12 }}>Actualidad en RRHH</h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }}>Artículos, consejos, novedades legales y recursos para profesionales de recursos humanos.</p>
        </div>
      </section>

      <section style={{ background: "#f8f9fc", padding: "64px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading && (
            <div className="text-center py-16" style={{ color: "#94a3b8" }}>Cargando novedades...</div>
          )}

          {!loading && novedades.length === 0 && (
            <div className="text-center py-16" style={{ color: "#94a3b8", fontFamily: "var(--font-display)" }}>
              Todavía no hay novedades publicadas.
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {novedades.map(n => (
              <div key={n.id} className="card-hover bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #eef1f6" }}>
                <div style={{ position: "relative", height: 180, background: "#dde3ed" }}>
                  {n.imagen_url && (
                    <img src={n.imagen_url} alt={n.titulo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                  {n.video_url && (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d1f4e"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ padding: 20 }}>
                  {n.categoria && (
                    <span className="tag px-2.5 py-1 rounded-full" style={{ background: TIPO_COLOR[n.categoria]?.bg ?? "rgba(29,64,145,0.08)", color: TIPO_COLOR[n.categoria]?.color ?? "#1b3468" }}>{n.categoria}</span>
                  )}
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.92rem", color: "#0d1f4e", margin: "10px 0 8px", lineHeight: 1.4 }}>{n.titulo}</h3>
                  {n.descripcion && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "#64748b", lineHeight: 1.6, marginBottom: 12 }}>{n.descripcion}</p>
                  )}
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.72rem", color: "#94a3b8" }}>{n.fecha}{n.autor ? ` · ${n.autor}` : ""}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── SECTION: CLIENTES ───────────────────────────────────────────────────────

const TESTIMONIOS = [
  { nombre: "Gabriela Torres", cargo: "Gerente de RRHH", empresa: "Metalúrgica del Sur", texto: "Desde que trabajamos con FM Consultora, la liquidación de nuestros 120 empleados bajo el convenio metalúrgico nunca más tuvo errores. El soporte es excelente.", foto: "G" },
  { nombre: "Ricardo Méndez", cargo: "Dueño", empresa: "Distribuidora Norte SA", texto: "Tercerizar el área de RRHH con FM fue la mejor decisión. Nos ahorró tiempo, dinero y dolores de cabeza. El equipo es muy profesional y siempre disponible.", foto: "R" },
  { nombre: "Luciana Páez", cargo: "Directora Ejecutiva", empresa: "Grupo Gastronómico Páez", texto: "FM Software nos cambió la vida. Ahora tenemos todo en tiempo real: asistencias, vacaciones, legajos. Y la liquidación es perfecta mes a mes.", foto: "L" },
];

const SECTORES = ["Metalurgia", "Gastronomía", "Comercio", "Logística", "Tecnología", "Salud", "Construcción", "Textil", "Agro", "Servicios"];

function SectionClientes({ onNav }: { onNav: (s: Section) => void }) {
  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ background: "linear-gradient(135deg,#0d1f4e,#1b3468)", padding: "64px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-eyebrow mb-3" style={{ color: "#7ddcfa" }}>Nuestros Clientes</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "white", marginBottom: 12 }}>Empresas que confían en FM</h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }}>Más de 200 PyMEs de distintos sectores ya optimizaron su gestión de RRHH con nosotros.</p>
        </div>
      </section>

      {/* Sectores */}
      <section style={{ background: "white", padding: "56px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="section-eyebrow mb-2">Sectores</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem", color: "#0d1f4e" }}>Experiencia en +10 sectores</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {SECTORES.map(s => (
              <div key={s} className="soft-pill" style={{ padding: "10px 20px", fontSize: "0.85rem", fontWeight: 600 }}>{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background: "#f8f9fc", padding: "64px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-eyebrow mb-3">Testimonios</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.4rem,3vw,2rem)", color: "#0d1f4e" }}>Lo que dicen nuestros clientes</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIOS.map(t => (
              <div key={t.nombre} className="testimonial-card">
                <div className="flex gap-1 mb-4" style={{ color: "#fbbf24" }}>
                  {[1,2,3,4,5].map(i => <IconStar key={i} />)}
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "#334155", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.texto}"</p>
                <div className="flex items-center gap-3">
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#1b3468,#00aeef)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "var(--font-display)", fontWeight: 700 }}>
                    {t.foto}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.88rem", color: "#0d1f4e" }}>{t.nombre}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#64748b" }}>{t.cargo} · {t.empresa}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Próximos casos */}
          <div className="mt-12 p-8 rounded-2xl text-center" style={{ background: "linear-gradient(135deg,#eef1f6,#dde3ed)", border: "1px solid #c2ccda" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#0d1f4e", marginBottom: 8 }}>¿Tu empresa podría ser el próximo caso de éxito?</div>
            <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: 20 }}>Sumate a las más de 200 PyMEs que ya mejoraron su gestión de RRHH.</p>
            <button className="btn-primary px-7 py-3 text-sm" onClick={() => onNav("contacto")}>Quiero ser cliente</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── SECTION: CONTACTO ───────────────────────────────────────────────────────

function SectionContacto() {
  const { config, whatsappLink, whatsappDisplay } = useConfiguracion();
  const [form, setForm] = useState({ nombre: "", empresa: "", email: "", telefono: "", motivo: "", mensaje: "", sent: false });
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const upd = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    setErrorEnvio(null);
    const mensajeCompleto = [
      form.empresa ? `Empresa: ${form.empresa}` : null,
      form.motivo ? `Motivo: ${form.motivo}` : null,
      form.mensaje,
    ].filter(Boolean).join("\n");

    const { error } = await supabase.from("consultas").insert({
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono || null,
      mensaje: mensajeCompleto,
      origen: "Formulario web",
    });

    setEnviando(false);
    if (error) setErrorEnvio("No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.");
    else setForm(f => ({ ...f, sent: true }));
  };

  return (
    <div style={{ paddingTop: 64 }}>
      <section style={{ background: "linear-gradient(135deg,#0d1f4e,#1b3468)", padding: "64px 0" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="section-eyebrow mb-3" style={{ color: "#7ddcfa" }}>Contacto</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "white", marginBottom: 12 }}>Hablemos</h1>
          <p style={{ color: "rgba(255,255,255,0.8)" }}>Respondemos todas las consultas en menos de 24 horas hábiles.</p>
        </div>
      </section>

      <section style={{ background: "#f8f9fc", padding: "64px 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info */}
            <div className="lg:col-span-2">
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: "#0d1f4e", marginBottom: 24 }}>Medios de contacto</h2>

              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="card-hover flex items-center gap-4 p-4 rounded-xl mb-4 bg-white" style={{ border: "1px solid #eef1f6", textDecoration: "none" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#16a34a" }}><IconWhatsApp /></span>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: "#0d1f4e" }}>WhatsApp</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "#1b3468", fontWeight: 600 }}>{whatsappDisplay()}</div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Lun-Vie 9 a 18 hs</div>
                </div>
              </a>

              <a href={`mailto:${config.email_contacto}`} className="card-hover flex items-center gap-4 p-4 rounded-xl mb-4 bg-white" style={{ border: "1px solid #eef1f6", textDecoration: "none" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(46,106,214,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#1b3468" }}><IconMail /></span>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: "#0d1f4e" }}>Email</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "#1b3468", fontWeight: 600 }}>{config.email_contacto}</div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Respondemos en 24 hs</div>
                </div>
              </a>

              <div className="p-5 rounded-xl mt-6" style={{ background: "linear-gradient(135deg,#0d1f4e,#1b3468)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "white", marginBottom: 8 }}>¿Querés conocer FM Software?</div>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", marginBottom: 16, lineHeight: 1.6 }}>Solicitá una demo gratuita y personalizamos la presentación a las necesidades de tu empresa.</p>
                <a href={whatsappLink("Hola, quisiera solicitar una demo de FM Software")} target="_blank" rel="noopener noreferrer"
                  className="btn-sky inline-flex items-center gap-2 px-5 py-2.5 text-sm" style={{ textDecoration: "none" }}>
                  <IconWhatsApp /> Solicitar demo
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div style={{ background: "white", borderRadius: 20, padding: 32, border: "1px solid #eef1f6", boxShadow: "0 8px 40px rgba(15,35,82,0.08)" }}>
                {form.sent ? (
                  <div className="text-center py-12">
                    <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#1b3468,#00aeef)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", color: "#0d1f4e", marginBottom: 10 }}>¡Mensaje enviado!</h3>
                    <p style={{ color: "#64748b", fontSize: "0.9rem" }}>Nos comunicaremos con vos a la brevedad. También podés escribirnos por WhatsApp si preferís una respuesta más rápida.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#0d1f4e", marginBottom: 20 }}>Envianos tu consulta</h3>
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Nombre y apellido *</label>
                        <input className="form-input" required value={form.nombre} onChange={e => upd("nombre", e.target.value)} placeholder="Tu nombre completo" />
                      </div>
                      <div>
                        <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Empresa</label>
                        <input className="form-input" value={form.empresa} onChange={e => upd("empresa", e.target.value)} placeholder="Nombre de tu empresa" />
                      </div>
                      <div>
                        <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Email *</label>
                        <input className="form-input" type="email" required value={form.email} onChange={e => upd("email", e.target.value)} placeholder="tu@email.com" />
                      </div>
                      <div>
                        <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Teléfono</label>
                        <input className="form-input" value={form.telefono} onChange={e => upd("telefono", e.target.value)} placeholder="+54 11 ..." />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Motivo de consulta</label>
                      <select className="form-input" value={form.motivo} onChange={e => upd("motivo", e.target.value)}>
                        <option value="">Seleccioná una opción</option>
                        <option>Servicios para mi empresa</option>
                        <option>FM Software – Demo</option>
                        <option>Búsqueda laboral</option>
                        <option>Quiero publicar una búsqueda</option>
                        <option>Otro</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Mensaje *</label>
                      <textarea className="form-input" rows={4} required value={form.mensaje} onChange={e => upd("mensaje", e.target.value)} placeholder="Contanos en qué podemos ayudarte..." style={{ resize: "vertical" }} />
                    </div>
                    {errorEnvio && <p style={{ color: "#dc2626", fontSize: "0.82rem", marginBottom: 12 }}>{errorEnvio}</p>}
                    <button type="submit" disabled={enviando} className="btn-primary w-full py-3.5 text-sm" style={{ opacity: enviando ? 0.6 : 1 }}>
                      {enviando ? "Enviando..." : "Enviar consulta"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer({ onNav }: { onNav: (s: Section) => void }) {
  const { config, whatsappLink, whatsappDisplay } = useConfiguracion();

  return (
    <footer style={{ background: "#0d1f4e", padding: "56px 0 24px" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Logo light />
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginTop: 14, maxWidth: 240 }}>
              Soluciones integrales de Recursos Humanos para PyMEs.
            </p>
            <div className="flex gap-3 mt-5">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", transition: "all 0.2s" }}>
                <IconWhatsApp />
              </a>
              <a href={`mailto:${config.email_contacto}`} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", transition: "all 0.2s" }}>
                <IconMail />
              </a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.8rem", color: "white", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Servicios</div>
            {["Empresas", "Postulantes", "Ofertas", "Reclutadores"].map(item => (
              <button key={item} onClick={() => onNav(item.toLowerCase() as Section)} style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "rgba(255,255,255,0.55)", background: "none", border: "none", cursor: "pointer", padding: "4px 0", transition: "color 0.2s" }}>
                {item}
              </button>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.8rem", color: "white", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Empresa</div>
            {["Software", "Novedades", "Clientes", "Contacto"].map(item => (
              <button key={item} onClick={() => onNav(item.toLowerCase() as Section)} style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "rgba(255,255,255,0.55)", background: "none", border: "none", cursor: "pointer", padding: "4px 0", transition: "color 0.2s" }}>
                {item === "Software" ? "FM Software" : item}
              </button>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.8rem", color: "white", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Contacto</div>
            <div className="flex flex-col gap-3">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                <IconWhatsApp /> {whatsappDisplay()}
              </a>
              <a href={`mailto:${config.email_contacto}`} className="flex items-start gap-2" style={{ fontFamily: "var(--font-body)", fontSize: "0.83rem", color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>
                <span style={{ marginTop: 2 }}><IconMail /></span> {config.email_contacto}
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 8, alignItems: "center", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
            © 2026 FM CONSULTORA RRHH · Todos los derechos reservados
            {" · "}
            <a href="/admin" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "underline" }}>
              Administrador
            </a>          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function PublicSite() {
  const [section, setSection] = useState<Section>("inicio");

  const navigate = (s: Section) => {
    setSection(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <Navbar current={section} onNav={navigate} />
      <main style={{ flex: 1 }}>
        {section === "inicio" && <SectionInicio onNav={navigate} />}
        {section === "empresas" && <SectionEmpresas onNav={navigate} />}
        {section === "postulantes" && <SectionPostulantes onNav={navigate} />}
        {section === "ofertas" && <SectionOfertas onNav={navigate} />}
        {section === "reclutadores" && <SectionReclutadores onNav={navigate} />}
        {section === "software" && <SectionSoftware onNav={navigate} />}
        {section === "novedades" && <SectionNovedades />}
        {section === "clientes" && <SectionClientes onNav={navigate} />}
        {section === "contacto" && <SectionContacto />}
      </main>
      <Footer onNav={navigate} />
    </div>
  );
}
