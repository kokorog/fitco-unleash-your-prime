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

export const Route = createFileRoute("/api/public/account-delete-login")({
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

        const email = typeof body.email === "string" ? body.email.trim() : "";
        const password = typeof body.password === "string" ? body.password : "";
        if (!email || email.length > 320 || password.length > 256) {
          return jsonResponse({ ok: false, error: "Invalid sign-in details." }, { status: 400 });
        }

        const upstream = await fetch(`${FITCO_API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const payload = await upstream.json().catch(() => null);
        return jsonResponse(payload ?? { ok: upstream.ok }, { status: upstream.status });
      },
    },
  },
});
