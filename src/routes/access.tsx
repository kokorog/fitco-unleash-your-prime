import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ACCESS_PASSWORD,
  isStealthUnlockedClient,
  lockStealth,
  unlockStealth,
} from "@/lib/site-mode";

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
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(isStealthUnlockedClient());
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === ACCESS_PASSWORD) {
      unlockStealth();
      setUnlocked(true);
      setError("");
      navigate({ to: "/" });
    } else {
      setError("Невалиден код за достъп.");
    }
  };

  const onLock = () => {
    lockStealth();
    setUnlocked(false);
    setPassword("");
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

          {unlocked ? (
            <div className="mt-6 space-y-3">
              <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                Достъпът е разрешен на това устройство.
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate({ to: "/" })}
                  className="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  Към сайта
                </button>
                <button
                  onClick={onLock}
                  className="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-white/80 transition hover:bg-white/5"
                >
                  Заключи
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Код за достъп"
                className="w-full rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
              />
              {error && (
                <p className="text-xs text-red-300">{error}</p>
              )}
              <button
                type="submit"
                className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Влез
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.3em] text-white/30">
          FITCO ⁄ Stealth gate
        </p>
      </div>
    </div>
  );
}