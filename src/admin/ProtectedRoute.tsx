import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function ProtectedRoute() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-[var(--gray-500)]">
        Cargando...
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;

  return <Outlet />;
}
