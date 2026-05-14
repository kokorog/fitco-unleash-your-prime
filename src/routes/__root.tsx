import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="pill bg-primary/20 text-white mx-auto">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ink-foreground hover:bg-ink/90">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-bold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try refreshing or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-ink-foreground hover:bg-ink/90">Try again</button>
          <a href="/" className="rounded-full border border-border px-4 py-2 text-sm font-medium">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FitCo — Fitness, Nutrition, Training & Community" },
      { name: "description", content: "FitCo helps you track nutrition with an AI food scanner, follow personalized workouts, join challenges and stay consistent with a community." },
      { name: "theme-color", content: "#0f1714" },
      { property: "og:site_name", content: "FitCo" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "FitCo — Fitness, Nutrition, Training & Community" },
      { property: "og:description", content: "Nutrition tracking, AI food scanner, personalized training, progress, challenges and community." },
      { property: "og:url", content: "https://fitcoapp.com" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@fitcoapp" },
      { name: "twitter:title", content: "FitCo — Fitness, Nutrition, Training & Community" },
      { name: "twitter:description", content: "Nutrition tracking, AI food scanner, personalized training, progress, challenges and community." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        name: "FitCo",
        operatingSystem: "iOS, Android",
        applicationCategory: "HealthApplication",
        description: "Nutrition tracking, AI food scanner, personalized training, progress, challenges and community.",
        url: "https://fitcoapp.com",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }),
    }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Outlet />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
