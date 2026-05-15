import { createFileRoute } from "@tanstack/react-router";

const FITCO_API_BASE_URL = "https://api.fitcoapp.com/api/v1";
const GOALS = new Set(["LOSE_WEIGHT", "MAINTAIN", "GAIN_MUSCLE", "ENDURANCE", "UNKNOWN"]);
const LANGUAGES = new Set(["BG", "EN"]);

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

function textValue(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength ? trimmed : undefined;
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  return new URL(origin).host === new URL(request.url).host;
}

export const Route = createFileRoute("/api/public/waitlist")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!sameOrigin(request)) {
          return jsonResponse({ ok: false, error: "Forbidden" }, { status: 403 });
        }

        let body: Record<string, unknown>;
        try {
          body = (await request.json()) as Record<string, unknown>;
        } catch {
          return jsonResponse({ ok: false, error: "Invalid request." }, { status: 400 });
        }

        const email = textValue(body.email, 254);
        const goal = textValue(body.goal, 32) ?? "UNKNOWN";
        const preferredLanguage = textValue(body.preferredLanguage, 2) ?? "BG";
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !GOALS.has(goal) || !LANGUAGES.has(preferredLanguage)) {
          return jsonResponse({ ok: false, error: "Invalid signup data." }, { status: 400 });
        }

        const upstream = await fetch(`${FITCO_API_BASE_URL}/waitlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name: textValue(body.name, 120),
            goal,
            preferredLanguage,
            marketingConsent: body.marketingConsent === true,
            privacyAccepted: body.privacyAccepted === true,
            source: textValue(body.source, 120) ?? "fitcoapp.com",
            metadata: typeof body.metadata === "object" && body.metadata !== null ? body.metadata : {},
          }),
        });

        const payload = await upstream.json().catch(() => null);
        return jsonResponse(payload ?? { ok: upstream.ok }, { status: upstream.status });
      },
    },
  },
});