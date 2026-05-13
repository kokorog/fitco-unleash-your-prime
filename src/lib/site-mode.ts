// FITCO — site visibility mode.
// Single toggle: set to false when launching publicly.
// When true, all SSR routes are blocked behind the server-side stealth
// middleware in src/start.ts. Only requests with a valid signed access
// cookie (issued by /api/public/access) reach the real app.
export const STEALTH_MODE = true;

// Cookie name carrying the HMAC-signed access token.
export const ACCESS_COOKIE_NAME = "fitco_access";

// Paths that remain reachable while in stealth mode (so admins can unlock).
export const STEALTH_ALLOWED_PATHS = new Set<string>([
  "/access",
  "/api/public/access",
  "/robots.txt",
  "/favicon.ico",
]);

// Path prefixes that remain reachable (Vite assets, framework chunks, fonts).
export const STEALTH_ALLOWED_PREFIXES = [
  "/_build/",
  "/assets/",
  "/@vite/",
  "/@fs/",
  "/@id/",
  "/__tanstack/",
  "/node_modules/",
  "/src/",
];

export function isStealthAllowedPath(pathname: string): boolean {
  if (STEALTH_ALLOWED_PATHS.has(pathname)) return true;
  return STEALTH_ALLOWED_PREFIXES.some((p) => pathname.startsWith(p));
}