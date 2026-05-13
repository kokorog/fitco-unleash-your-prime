Currently the stealth gate is client-side only (renders Coming Soon in React if `localStorage` flag is missing). That means the real route HTML, route tree, and assets are still served by SSR — a determined visitor can read them in DevTools or via direct fetch. This plan upgrades it to true server-side enforcement.

Note on stack: this project runs on TanStack Start (Cloudflare Workers), not Next.js. The same pattern (edge middleware + signed cookie) applies; only the framework primitives differ.

## What changes

### 1. Server-side stealth middleware (the real lock)
Add a request middleware in `src/start.ts` that runs on every SSR request and server function call:

- If `STEALTH_MODE === false` → pass through.
- If the request has a valid `fitco_access` HTTP-only cookie → pass through.
- If the path is on the allow-list (`/access`, `/api/public/access`, `/robots.txt`, static assets, framework chunks) → pass through.
- Otherwise → return a fully-rendered Coming Soon HTML response with status 200 and security headers. The real route never runs, so no real markup, no route data, no leaked metadata.

This guarantees public visitors literally cannot fetch any other page's HTML, regardless of what URL they type.

### 2. Password unlock via signed cookie
Replace `localStorage` with a server-issued cookie:

- New server route `POST /api/public/access` accepts `{ password }`, compares against `ACCESS_PASSWORD` (server env), and if correct sets `fitco_access` as `HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=7d`. Cookie value is HMAC-signed so it can't be forged.
- `/access` page posts to it; on success, navigates to `/`.
- Logout endpoint clears the cookie.

Result: only people who know the password can ever request the real site, and the token can't be read or copied via JS.

### 3. Secure response headers
Apply on every response from the middleware:

- `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet, noimageindex` (header-level, in addition to meta tags).
- `Referrer-Policy: no-referrer`.
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
- `Cache-Control: no-store` for the Coming Soon response (so caches don't pin a public version after launch).
- A minimal CSP for the Coming Soon page (it doesn't need third-party scripts).

### 4. Robots + sitemap hygiene
- Keep `public/robots.txt` as `Disallow: /` while in stealth.
- Do not create a sitemap while in stealth (already absent — leave it).
- When `STEALTH_MODE` flips off, robots.txt and sitemap can be updated in one commit.

### 5. Route hygiene cleanup
- Remove the existing client-side `StealthGate` from `__root.tsx` once server middleware is live (no longer needed; avoid double-rendering).
- Keep the `/access` page (now talks to the API instead of localStorage).
- The branded Coming Soon component stays — middleware reuses it via `renderToString` for the public response.

### 6. One-toggle production switch
Single flag in `src/lib/site-mode.ts`:
```
export const STEALTH_MODE = true; // flip to false at launch
```
When false: middleware short-circuits, robots/sitemap go public, noindex headers/meta drop. No other code touches required.

## Folder layout after the change

```text
src/
  lib/
    site-mode.ts            # STEALTH_MODE flag + cookie helpers
  server/
    stealth-middleware.ts   # request middleware (SSR gate)
    access-cookie.ts        # HMAC sign/verify
  components/
    stealth/
      ComingSoon.tsx        # branded public page (already exists)
  routes/
    access.tsx              # password entry UI
    api/
      public/
        access.ts           # POST sets cookie, DELETE clears it
public/
  robots.txt                # Disallow: / while in stealth
```

## Secrets needed

Two server-only env vars (added via Lovable secrets, not committed):
- `ACCESS_PASSWORD` — the dev password.
- `ACCESS_COOKIE_SECRET` — random 32+ byte string used to HMAC-sign the cookie.

I'll prompt for both during implementation.

## What this does NOT cover
- A user-facing email capture / waitlist on the Coming Soon page (can be added later).
- Multi-user admin accounts — this is a single shared password, which matches the brief ("only I should access it"). Can be upgraded to Lovable Cloud auth later without changing the gate pattern.

## Confirm before I build

1. Replace the current client-side gate with the server-side middleware approach above? (recommended — current setup leaks HTML.)
2. OK to use Lovable secrets for `ACCESS_PASSWORD` and `ACCESS_COOKIE_SECRET`? I'll ask for the password value when implementing; the cookie secret I'll generate.
3. Keep the existing Coming Soon visual design as-is, or do you want a refresh pass?