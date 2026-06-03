import { createFileRoute } from "@tanstack/react-router";

const UPSTREAM = "https://api.fitcoapp.com/api/v1";
const ALLOWED_TYPES = new Set(["LEGAL", "PRIVACY", "GDPR", "COOKIE", "FAQ", "REVIEW", "SUPPORT", "MARKETING", "BLOCK"]);
const ALLOWED_KEYS = new Set(["terms-of-service", "privacy-policy", "gdpr-rights", "cookie-policy"]);

function json(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60, s-maxage=300",
      ...(init.headers ?? {}),
    },
  });
}

export const Route = createFileRoute("/api/public/web-content")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const language = url.searchParams.get("language") === "EN" ? "EN" : "BG";
        const type = url.searchParams.get("type");
        const key = url.searchParams.get("key");

        let upstreamUrl: string;
        if (key) {
          if (!ALLOWED_KEYS.has(key)) return json({ error: "Invalid key" }, { status: 400 });
          upstreamUrl = `${UPSTREAM}/web-content/${key}?language=${language}`;
        } else {
          const qs = new URLSearchParams({ language });
          if (type) {
            if (!ALLOWED_TYPES.has(type)) return json({ error: "Invalid type" }, { status: 400 });
            qs.set("type", type);
          }
          upstreamUrl = `${UPSTREAM}/web-content?${qs.toString()}`;
        }

        try {
          const upstream = await fetch(upstreamUrl, { headers: { Accept: "application/json" } });
          const text = await upstream.text();
          return new Response(text, {
            status: upstream.status,
            headers: {
              "Content-Type": upstream.headers.get("content-type") ?? "application/json",
              "Cache-Control": "public, max-age=60, s-maxage=300",
            },
          });
        } catch (e) {
          return json({ error: "Upstream unavailable" }, { status: 502 });
        }
      },
    },
  },
});