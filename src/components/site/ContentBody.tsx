import { useMemo } from "react";

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

// Renders body content. If it looks like HTML, render as-is (lightly sanitized by
// stripping <script>/<style>). Otherwise treat as plain text / markdown-ish and
// preserve paragraphs + headings.
export function ContentBody({ body }: { body?: string | null }) {
  const html = useMemo(() => {
    if (!body) return "";
    const trimmed = body.trim();
    const looksHtml = /<\/?[a-z][\s\S]*?>/i.test(trimmed);
    if (looksHtml) {
      return trimmed
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/ on[a-z]+="[^"]*"/gi, "")
        .replace(/ on[a-z]+='[^']*'/gi, "");
    }
    // Plain text → paragraphs. Lines starting with "# " become h2.
    const paragraphs = trimmed.split(/\n{2,}/);
    return paragraphs
      .map((p) => {
        const line = p.trim();
        if (/^#\s+/.test(line)) return `<h2>${escapeHtml(line.replace(/^#\s+/, ""))}</h2>`;
        if (/^##\s+/.test(line)) return `<h3>${escapeHtml(line.replace(/^##\s+/, ""))}</h3>`;
        return `<p>${escapeHtml(line).replace(/\n/g, "<br/>")}</p>`;
      })
      .join("\n");
  }, [body]);

  if (!html) return null;
  return <div className="prose-fitco" dangerouslySetInnerHTML={{ __html: html }} />;
}