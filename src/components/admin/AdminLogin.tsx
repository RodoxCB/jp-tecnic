"use client";

import { useState } from "react";

type AdminLoginProps = {
  siteName: string;
  onLogin: () => void;
};

export function AdminLogin({ siteName, onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    if (response.ok) {
      onLogin();
    } else {
      setError("Senha incorreta");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-white">Painel {siteName}</h1>
        <p className="mt-2 text-sm text-zinc-400">Acesso restrito para administração do site.</p>

        <label className="mt-6 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-300">Senha</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-sm text-white outline-none focus:border-[#25D366]"
            required
          />
        </label>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-black transition hover:bg-[#20bd5a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
