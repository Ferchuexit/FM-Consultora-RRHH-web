import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import logoImg from "@/imports/Logotipo_ampliado.png";

const NAV = [
  { to: "/admin/novedades", label: "Novedades", icon: "📰" },
  { to: "/admin/busquedas", label: "Búsquedas laborales", icon: "🔎" },
  { to: "/admin/ofertas", label: "Ofertas", icon: "💼" },
  { to: "/admin/postulantes", label: "Postulantes", icon: "👤" },
  { to: "/admin/empresas", label: "Empresas", icon: "🏢" },
  { to: "/admin/contenido", label: "Contenido web", icon: "📄" },
  { to: "/admin/consultas", label: "Consultas", icon: "📩" },
  { to: "/admin/configuracion", label: "Configuración", icon: "⚙️" },
];

export default function AdminLayout() {
  const { signOut, session } = useAuth();

  return (
    <div className="flex min-h-screen bg-[var(--gray-50)]">
      <aside className="flex w-64 shrink-0 flex-col border-r border-[var(--gray-200)] bg-white">
        <div className="flex items-center gap-2 border-b border-[var(--gray-200)] px-5 py-4">
          <img src={logoImg} alt="FM Consultora RRHH" className="h-8 w-auto" />
          <span className="text-sm font-semibold text-[var(--blue-900)]" style={{ fontFamily: "var(--font-display)" }}>
            Panel de Administración
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--sky-500)]/10 text-[var(--sky-500)]"
                    : "text-[var(--gray-700)] hover:bg-[var(--gray-100)]"
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[var(--gray-200)] p-3">
          <p className="truncate px-3 pb-2 text-xs text-[var(--gray-500)]">{session?.user.email}</p>
          <button
            onClick={signOut}
            className="w-full rounded-lg border border-[var(--gray-300)] px-3 py-2 text-sm font-medium text-[var(--gray-700)] hover:bg-[var(--gray-100)]"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}
