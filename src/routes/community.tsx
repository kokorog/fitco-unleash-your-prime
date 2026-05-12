import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Heart, MessageCircle, Repeat, Trophy } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Общност — FITCO" },
      { name: "description", content: "Сподели тренировки, последвай атлети и се състезавай в седмични мисии." },
    ],
  }),
  component: CommunityPage,
});

const FEED = [
  { name: "Иван П.", handle: "@ivanp", time: "преди 2 ч", text: "Нов личен рекорд: 5 км за 22:14 🏃‍♂️", likes: 124, comments: 18, reposts: 6 },
  { name: "Мария К.", handle: "@maria", time: "преди 5 ч", text: "30-дневно предизвикателство — ден 21 ✅", likes: 89, comments: 12, reposts: 4 },
  { name: "Стоян Г.", handle: "@stoyang", time: "вчера", text: "Push day: 110 кг лежанка 💪", likes: 256, comments: 41, reposts: 12 },
];

const LEADERS = [
  { name: "Алекс К.", xp: 12450 },
  { name: "Деси М.", xp: 11820 },
  { name: "Никола В.", xp: 10970 },
  { name: "Биляна С.", xp: 10430 },
  { name: "Тошко П.", xp: 9880 },
];

function CommunityPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Общност"
        title="Тренирай заедно."
        description="Сподели постижения, последвай атлети и се състезавай в седмични мисии."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4 lg:col-span-2">
          {FEED.map((p, i) => (
            <article key={i} className="rounded-2xl border border-border bg-card p-6">
              <header className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 font-semibold text-primary">
                  {p.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold">{p.name} <span className="ml-1 text-xs text-muted-foreground">{p.handle} · {p.time}</span></div>
                </div>
              </header>
              <p className="mt-4 text-base">{p.text}</p>
              <footer className="mt-4 flex gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Heart className="h-4 w-4" /> {p.likes}</span>
                <span className="flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> {p.comments}</span>
                <span className="flex items-center gap-1.5"><Repeat className="h-4 w-4" /> {p.reposts}</span>
              </footer>
            </article>
          ))}
        </div>
        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Седмична класация</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {LEADERS.map((l, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg bg-secondary/40 p-3 text-sm">
                <span className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
                  {l.name}
                </span>
                <span className="font-semibold text-primary">{l.xp.toLocaleString("bg-BG")} XP</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </PageShell>
  );
}
