import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import logoImg from "@/imports/Logotipo_ampliado.png";

export default function Login() {
  const { session, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to="/admin" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const err = await signIn(email, password);
    setLoading(false);
    if (err) setError("Email o contraseña incorrectos.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--gray-50)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-[var(--gray-200)] bg-white p-8 shadow-sm"
      >
        <div className="mb-6 flex flex-col items-center">
          <img src={logoImg} alt="FM Consultora RRHH" className="mb-3 h-12 w-auto" />
          <h1 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)", color: "var(--blue-900)" }}>
            Panel de Administración
          </h1>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-[var(--gray-700)]">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-[var(--gray-300)] px-3 py-2 text-sm outline-none focus:border-[var(--sky-500)]"
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-[var(--gray-700)]">Contraseña</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-[var(--gray-300)] px-3 py-2 text-sm outline-none focus:border-[var(--sky-500)]"
          />
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          style={{ background: "var(--blue-700)" }}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
