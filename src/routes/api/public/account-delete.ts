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

export const Route = createFileRoute("/api/public/account-delete")({
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

        const accessToken = typeof body.accessToken === "string" ? body.accessToken.trim() : "";
        const password = typeof body.password === "string" ? body.password : "";
        const reason = typeof body.reason === "string" ? body.reason.trim() : "";
        const details = typeof body.details === "string" ? body.details.trim() : "";
        const confirmation = typeof body.confirmation === "string" ? body.confirmation.trim() : "";

        if (!accessToken || accessToken.length > 8192) {
          return jsonResponse({ ok: false, error: "Missing session." }, { status: 401 });
        }
        if (confirmation.toUpperCase() !== "DELETE" || body.deleteAllData !== true) {
          return jsonResponse({ ok: false, error: "Deletion confirmation is incomplete." }, { status: 400 });
        }

        const upstream = await fetch(`${FITCO_API_BASE_URL}/users/me`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            password,
            reason: [reason, details].filter(Boolean).join(" | ").slice(0, 1000),
            confirmation: "DELETE",
            deleteAllData: true,
          }),
        });

        const payload = await upstream.json().catch(() => null);
        return jsonResponse(payload ?? { ok: upstream.ok }, { status: upstream.status });
      },
    },
  },
});
