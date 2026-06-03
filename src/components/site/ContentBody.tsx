import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Strip a leading H1 if present — the page already renders content.title as the hero heading.
function stripLeadingH1(md: string): string {
  return md.replace(/^\s*#\s+.+\n+/, "");
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/ on[a-z]+="[^"]*"/gi, "")
    .replace(/ on[a-z]+='[^']*'/gi, "");
}

// Renders body content as Markdown. If the body looks like HTML, render the
// (lightly sanitized) HTML directly.
export function ContentBody({ body }: { body?: string | null }) {
  const { html, markdown } = useMemo(() => {
    if (!body) return { html: "", markdown: "" };
    const trimmed = body.trim();
    const looksHtml = /^\s*<(?:p|div|section|article|h[1-6]|ul|ol|table|br|hr)\b/i.test(trimmed);
    if (looksHtml) return { html: sanitizeHtml(trimmed), markdown: "" };
    return { html: "", markdown: stripLeadingH1(trimmed) };
  }, [body]);

  if (html) {
    return <div className="prose-fitco" dangerouslySetInnerHTML={{ __html: html }} />;
  }
  if (!markdown) return null;
  return (
    <div className="prose-fitco space-y-4 text-foreground/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="mt-10 text-2xl font-semibold tracking-tight text-foreground first:mt-0">{children}</h2>
          ),
          h2: ({ children }) => (
            <h2 className="mt-10 text-2xl font-semibold tracking-tight text-foreground first:mt-0">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 text-lg font-semibold text-foreground">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-4 text-base font-semibold text-foreground">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="leading-7 text-foreground/85">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-3 list-disc space-y-1 pl-6 text-foreground/85 marker:text-primary">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-3 list-decimal space-y-1 pl-6 text-foreground/85 marker:text-primary">{children}</ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary underline underline-offset-4 hover:text-primary/80"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-4 border-primary/40 pl-4 italic text-foreground/80">{children}</blockquote>
          ),
          hr: () => <hr className="my-8 border-border" />,
          code: ({ children }) => (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">{children}</code>
          ),
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border bg-muted/50 px-3 py-2 text-left font-semibold">{children}</th>
          ),
          td: ({ children }) => <td className="border border-border px-3 py-2 align-top">{children}</td>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}