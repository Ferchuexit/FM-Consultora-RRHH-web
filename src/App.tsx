import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import PublicSite from "@/public/PublicSite";
import Login from "@/admin/Login";
import ProtectedRoute from "@/admin/ProtectedRoute";
import AdminLayout from "@/admin/AdminLayout";
import AdminHome from "@/admin/AdminHome";
import NovedadesPage from "@/admin/pages/Novedades";
import BusquedasPage from "@/admin/pages/Busquedas";
import OfertasPage from "@/admin/pages/Ofertas";
import PostulantesPage from "@/admin/pages/Postulantes";
import EmpresasPage from "@/admin/pages/Empresas";
import ContenidoWebPage from "@/admin/pages/ContenidoWeb";
import ConsultasPage from "@/admin/pages/Consultas";
import ConfiguracionPage from "@/admin/pages/Configuracion";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Sitio público */}
          <Route path="/" element={<PublicSite />} />

          {/* Login del panel */}
          <Route path="/admin/login" element={<Login />} />

          {/* Panel de administración (protegido) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/novedades" element={<NovedadesPage />} />
              <Route path="/admin/busquedas" element={<BusquedasPage />} />
              <Route path="/admin/ofertas" element={<OfertasPage />} />
              <Route path="/admin/postulantes" element={<PostulantesPage />} />
              <Route path="/admin/empresas" element={<EmpresasPage />} />
              <Route path="/admin/contenido" element={<ContenidoWebPage />} />
              <Route path="/admin/consultas" element={<ConsultasPage />} />
              <Route path="/admin/configuracion" element={<ConfiguracionPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
