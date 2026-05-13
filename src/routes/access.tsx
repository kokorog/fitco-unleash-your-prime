import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/access")({
  head: () => ({
    meta: [
      { title: "Access — FITCO" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: AccessPage,
});

function AccessPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/public/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "same-origin",
      });
      if (res.ok) {
        // Hard navigation so the SSR pass sees the new cookie.
        window.location.assign("/");
        return;
      }
      setError("Невалиден код за достъп.");
    } catch {
      setError("Грешка при свързване. Опитай отново.");
    } finally {
      setSubmitting(false);
    }
  };

  const onLock = async () => {
    try {
      await fetch("/api/public/access", {
        method: "DELETE",
        credentials: "same-origin",
      });
    } catch {}
    window.location.assign("/access");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#05070a] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.62 0.16 152 / 0.25), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 110%, oklch(0.46 0.13 158 / 0.18), transparent 60%)",
        }}
      />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6">
        <div className="mb-10 flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/5 backdrop-blur-md">
            <span
              className="block h-2.5 w-2.5 rounded-full"
              style={{
                background: "oklch(0.72 0.18 152)",
                boxShadow: "0 0 18px oklch(0.72 0.18 152 / 0.85)",
              }}
            />
          </div>
          <span className="font-display text-lg font-semibold tracking-[0.2em]">
            FITCO
          </span>
        </div>

        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-300/80">
            Private preview
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold">
            Restricted access
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Този сайт е в режим стелт. Въведи код за достъп, за да продължиш.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Код за достъп"
              className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
            />
            {error && <p className="text-xs text-red-300">{error}</p>}
            <button
              type="submit"
              disabled={submitting || password.length === 0}
              className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-50"
            >
              {submitting ? "Проверка…" : "Влез"}
            </button>
          </form>

          <button
            onClick={onLock}
            className="mt-4 w-full text-center text-[11px] uppercase tracking-[0.25em] text-white/40 transition hover:text-white/70"
          >
            Заключи това устройство
          </button>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-white/30">
          FITCO ⁄ Stealth gate
        </p>
      </div>
    </div>
  );
}