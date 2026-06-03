import { useQuery } from "@tanstack/react-query";
import type { Lang } from "@/lib/i18n/dictionary";

export type ContentType = "LEGAL" | "PRIVACY" | "GDPR" | "COOKIE" | "FAQ" | "REVIEW" | "SUPPORT" | "MARKETING" | "BLOCK";

export interface ContentItem {
  id: string;
  key: string;
  language: "BG" | "EN";
  type: ContentType;
  status: "PUBLISHED";
  title?: string | null;
  subtitle?: string | null;
  excerpt?: string | null;
  body?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  sortOrder?: number | null;
  metadata?: Record<string, unknown> | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
}

function apiLang(l: Lang): "BG" | "EN" {
  return l === "en" ? "EN" : "BG";
}

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}

function extractList(payload: unknown): ContentItem[] {
  if (Array.isArray(payload)) return payload as ContentItem[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    for (const k of ["items", "data", "results", "content"]) {
      const v = obj[k];
      if (Array.isArray(v)) return v as ContentItem[];
    }
  }
  return [];
}

function extractItem(payload: unknown): ContentItem | null {
  if (!payload || typeof payload !== "object") return null;
  const obj = payload as Record<string, unknown>;
  if ("id" in obj || "body" in obj || "title" in obj) return obj as unknown as ContentItem;
  for (const k of ["item", "data", "content"]) {
    const v = obj[k];
    if (v && typeof v === "object") return v as unknown as ContentItem;
  }
  return null;
}

export function useContentByKey(key: string, lang: Lang) {
  return useQuery({
    queryKey: ["web-content", "key", key, apiLang(lang)],
    queryFn: async () => {
      const qs = new URLSearchParams({ key, language: apiLang(lang) }).toString();
      const payload = await getJSON<unknown>(`/api/public/web-content?${qs}`);
      return extractItem(payload);
    },
    staleTime: 60_000,
  });
}

export function useContentList(type: ContentType, lang: Lang) {
  return useQuery({
    queryKey: ["web-content", "list", type, apiLang(lang)],
    queryFn: async () => {
      const qs = new URLSearchParams({ language: apiLang(lang), type }).toString();
      const payload = await getJSON<unknown>(`/api/public/web-content?${qs}`);
      const items = extractList(payload).filter((i) => i.status === "PUBLISHED" || !i.status);
      items.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      return items;
    },
    staleTime: 60_000,
  });
}

export function metaString(item: ContentItem | null | undefined, key: string): string | undefined {
  const v = item?.metadata?.[key];
  return typeof v === "string" && v.trim() ? v : undefined;
}

export function metaNumber(item: ContentItem | null | undefined, key: string): number | undefined {
  const v = item?.metadata?.[key];
  return typeof v === "number" ? v : undefined;
}