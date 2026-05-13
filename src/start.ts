import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import {
  ACCESS_COOKIE_NAME,
  STEALTH_MODE,
  isStealthAllowedPath,
} from "./lib/site-mode";
import { parseCookie, verifyAccessToken } from "./server/access-cookie";
import { getComingSoonHtml } from "./server/coming-soon-html";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex",
  "Referrer-Policy": "no-referrer",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
};

const stealthMiddleware = createMiddleware().server(async ({ next, request }) => {
  if (!STEALTH_MODE) return next();

  const url = new URL(request.url);
  if (isStealthAllowedPath(url.pathname)) return next();

  const secret = process.env.ACCESS_COOKIE_SECRET;
  if (secret) {
    const token = parseCookie(request.headers.get("cookie"), ACCESS_COOKIE_NAME);
    const payload = await verifyAccessToken(token, secret);
    if (payload) return next();
  }

  return new Response(getComingSoonHtml(), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      ...SECURITY_HEADERS,
    },
  });
});

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [stealthMiddleware, errorMiddleware],
}));
