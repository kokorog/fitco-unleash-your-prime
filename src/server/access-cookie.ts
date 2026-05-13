// HMAC-signed access cookie utilities. Server-only.
// Cookie value format: base64url(payloadJSON).base64url(hmacSha256)

const encoder = new TextEncoder();

function b64urlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export interface AccessTokenPayload {
  /** Unix seconds expiration */
  exp: number;
}

export async function signAccessToken(
  payload: AccessTokenPayload,
  secret: string,
): Promise<string> {
  const json = JSON.stringify(payload);
  const payloadB64 = b64urlEncode(encoder.encode(json));
  const key = await getKey(secret);
  const sig = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64)),
  );
  return `${payloadB64}.${b64urlEncode(sig)}`;
}

export async function verifyAccessToken(
  token: string | undefined | null,
  secret: string,
): Promise<AccessTokenPayload | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;
  try {
    const key = await getKey(secret);
    const expected = new Uint8Array(
      await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64)),
    );
    const provided = b64urlDecode(sigB64);
    if (!timingSafeEqual(expected, provided)) return null;
    const json = new TextDecoder().decode(b64urlDecode(payloadB64));
    const payload = JSON.parse(json) as AccessTokenPayload;
    if (typeof payload.exp !== "number") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function parseCookie(
  header: string | null | undefined,
  name: string,
): string | undefined {
  if (!header) return undefined;
  const parts = header.split(/;\s*/);
  for (const p of parts) {
    const eq = p.indexOf("=");
    if (eq === -1) continue;
    if (p.slice(0, eq) === name) return decodeURIComponent(p.slice(eq + 1));
  }
  return undefined;
}

export interface AccessCookieOptions {
  maxAgeSeconds?: number;
  secure?: boolean;
  domain?: string;
}

export function buildSetCookie(
  value: string,
  opts: AccessCookieOptions = {},
  name = "fitco_access",
): string {
  const maxAge = opts.maxAgeSeconds ?? 60 * 60 * 24 * 7;
  const secure = opts.secure ?? true;
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];
  if (opts.domain) parts.push(`Domain=${opts.domain}`);
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

export function buildClearCookie(name = "fitco_access", domain?: string): string {
  const parts = [
    `${name}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
    "Secure",
  ];
  if (domain) parts.push(`Domain=${domain}`);
  return parts.join("; ");
}