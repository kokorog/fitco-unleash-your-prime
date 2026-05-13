// FITCO — host-aware site mode.
//
// Two experiences served from the same deployment, switched by Host header:
//   - PUBLIC  (fitcoapp.com, www.fitcoapp.com): always Coming Soon. No
//     password prompt, no /access link, never reveals the real app.
//   - PRIVATE (private.fitcoapp.com, *.lovable.app preview hosts): real
//     app, gated by HMAC-signed cookie issued at /access.

export const ACCESS_COOKIE_NAME = "fitco_access";

export const PUBLIC_HOSTS = new Set<string>([
  "fitcoapp.com",
  "www.fitcoapp.com",
]);

export const PRIVATE_HOSTS = new Set<string>([
  "private.fitcoapp.com",
]);

// Hostnames matching these suffixes are treated as PRIVATE (used for
// Lovable preview/published staging URLs and local dev).
const PRIVATE_HOST_SUFFIXES = [".lovable.app", "localhost"];

export type HostMode = "public" | "private";

export function resolveHostMode(hostname: string): HostMode {
  const h = hostname.toLowerCase().split(":")[0];
  if (PUBLIC_HOSTS.has(h)) return "public";
  if (PRIVATE_HOSTS.has(h)) return "private";
  if (PRIVATE_HOST_SUFFIXES.some((s) => h === s || h.endsWith(s))) return "private";
  // Unknown host — default to public (safer: never expose real app).
  return "public";
}

// Cookie Domain attribute. We want the cookie to be scoped to the apex so
// that adding more private subdomains later just works, but only on the real
// fitcoapp.com domain. Lovable preview hosts ride a public suffix
// (lovable.app) where Domain= attributes are rejected by browsers, so the
// cookie stays host-only there.
export function cookieDomainForHost(hostname: string): string | undefined {
  const h = hostname.toLowerCase().split(":")[0];
  if (h === "fitcoapp.com" || h.endsWith(".fitcoapp.com")) {
    return ".fitcoapp.com";
  }
  return undefined;
}

// Paths reachable on PRIVATE hosts even without a valid cookie (so the
// visitor can reach the unlock screen and submit the password).
const PRIVATE_UNAUTH_PATHS = new Set<string>([
  "/access",
  "/api/public/access",
  "/robots.txt",
  "/favicon.ico",
]);

const ASSET_PREFIXES = [
  "/_build/",
  "/assets/",
  "/@vite/",
  "/@fs/",
  "/@id/",
  "/__tanstack/",
  "/node_modules/",
  "/src/",
];

export function isPrivateUnauthPath(pathname: string): boolean {
  if (PRIVATE_UNAUTH_PATHS.has(pathname)) return true;
  return ASSET_PREFIXES.some((p) => pathname.startsWith(p));
}

// On PUBLIC hosts only assets and robots.txt are reachable; everything else
// returns the Coming Soon HTML.
export function isPublicPassthroughPath(pathname: string): boolean {
  if (pathname === "/robots.txt" || pathname === "/favicon.ico") return true;
  return ASSET_PREFIXES.some((p) => pathname.startsWith(p));
}