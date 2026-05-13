import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { STEALTH_MODE, isStealthUnlockedClient } from "@/lib/site-mode";
import { ComingSoon } from "./ComingSoon";

// Routes that remain reachable in stealth mode (so admins can unlock).
const ALLOWED_PATHS = ["/access"];

export function StealthGate({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [unlocked, setUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setUnlocked(isStealthUnlockedClient());
    const onStorage = () => setUnlocked(isStealthUnlockedClient());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!STEALTH_MODE) return <>{children}</>;
  if (ALLOWED_PATHS.includes(pathname)) return <>{children}</>;
  // Until hydration, render Coming Soon to avoid leaking content via SSR.
  if (!hydrated || !unlocked) return <ComingSoon />;
  return <>{children}</>;
}