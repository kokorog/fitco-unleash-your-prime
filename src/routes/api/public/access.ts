import { createFileRoute } from "@tanstack/react-router";
import {
  ACCESS_COOKIE_NAME,
} from "@/lib/site-mode";
import {
  buildClearCookie,
  buildSetCookie,
  signAccessToken,
} from "@/server/access-cookie";

const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...(init.headers ?? {}),
    },
  });
}

export const Route = createFileRoute("/api/public/access")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const password = process.env.ACCESS_PASSWORD;
        const secret = process.env.ACCESS_COOKIE_SECRET;
        if (!password || !secret) {
          return jsonResponse(
            { ok: false, error: "Server not configured." },
            { status: 500 },
          );
        }

        let body: { password?: unknown } = {};
        try {
          body = (await request.json()) as { password?: unknown };
        } catch {
          return jsonResponse(
            { ok: false, error: "Invalid request." },
            { status: 400 },
          );
        }

        const provided = typeof body.password === "string" ? body.password : "";
        if (provided.length === 0 || provided.length > 256) {
          return jsonResponse(
            { ok: false, error: "Invalid code." },
            { status: 400 },
          );
        }

        // Constant-time-ish comparison via length + char xor.
        const a = new TextEncoder().encode(provided);
        const b = new TextEncoder().encode(password);
        let diff = a.length ^ b.length;
        const len = Math.max(a.length, b.length);
        for (let i = 0; i < len; i++) {
          diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
        }
        if (diff !== 0) {
          return jsonResponse(
            { ok: false, error: "Invalid code." },
            { status: 401 },
          );
        }

        const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
        const token = await signAccessToken({ exp }, secret);
        return jsonResponse(
          { ok: true },
          {
            status: 200,
            headers: {
              "Set-Cookie": buildSetCookie(
                token,
                { maxAgeSeconds: MAX_AGE },
                ACCESS_COOKIE_NAME,
              ),
            },
          },
        );
      },
      DELETE: async () => {
        return jsonResponse(
          { ok: true },
          {
            status: 200,
            headers: {
              "Set-Cookie": buildClearCookie(ACCESS_COOKIE_NAME),
            },
          },
        );
      },
    },
  },
});