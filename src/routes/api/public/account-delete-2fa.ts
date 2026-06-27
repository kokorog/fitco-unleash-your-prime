import { createFileRoute } from "@tanstack/react-router";

const FITCO_API_BASE_URL = "https://api.fitcoapp.com/api/v1";

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

function allowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const hostname = new URL(origin).hostname;
    return (
      hostname === "fitcoapp.com" ||
      hostname === "www.fitcoapp.com" ||
      hostname === "localhost" ||
      hostname.endsWith(".lovableproject.com") ||
      hostname.endsWith(".lovable.app")
    );
  } catch {
    return false;
  }
}

export const Route = createFileRoute("/api/public/account-delete-2fa")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!allowedOrigin(request)) {
          return jsonResponse({ ok: false, error: "Forbidden" }, { status: 403 });
        }

        let body: Record<string, unknown>;
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          return jsonResponse({ ok: false, error: "Invalid request." }, { status: 400 });
        }

        const challengeToken = typeof body.challengeToken === "string" ? body.challengeToken.trim() : "";
        const code = typeof body.code === "string" ? body.code.trim() : "";
        if (!challengeToken || challengeToken.length > 4096 || !/^\d{4}$/.test(code)) {
          return jsonResponse({ ok: false, error: "Invalid verification request." }, { status: 400 });
        }

        const upstream = await fetch(`${FITCO_API_BASE_URL}/auth/2fa/login/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ challengeToken, code }),
        });

        const payload = await upstream.json().catch(() => null);
        return jsonResponse(payload ?? { ok: upstream.ok }, { status: upstream.status });
      },
    },
  },
});
