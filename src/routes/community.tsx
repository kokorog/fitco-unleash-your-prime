import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Heart, MessageCircle, Share2, Trophy } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — FITCO" },
      { name: "description", content: "Connect with millions of athletes. Share workouts, follow friends, join groups, and climb leaderboards." },
    ],
  }),
  component: CommunityPage,
});

const posts = [
  { user: "Maya R.", role: "Cycling · 2h", content: "Smashed a new century ride PR today. 100km in 3:42 🚴‍♀️", likes: 248, comments: 32, badge: "🏆 PR" },
  { user: "Jordan T.", role: "Powerlifting · 5h", content: "180kg deadlift for 3. Felt smooth. The form-check AI saved my back.", likes: 412, comments: 58, badge: "💪 Strength" },
  { user: "Lena P.", role: "Yoga · 1d", content: "30-day flexibility challenge: complete. Crow pose unlocked.", likes: 189, comments: 24, badge: "🧘 Flex" },
];

const leaderboard = [
  { rank: 1, name: "Sarah M.", xp: "12,840 XP" },
  { rank: 2, name: "David L.", xp: "11,920 XP" },
  { rank: 3, name: "Anna W.", xp: "10,560 XP" },
  { rank: 4, name: "Marcus T.", xp: "9,840 XP" },
  { rank: 5, name: "You", xp: "5,210 XP", you: true },
];

function CommunityPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Community"
        title={<>Train together. <span className="gradient-text">Win together.</span></>}
        description="Follow athletes, share milestones, and join groups built around your goals."
      />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-xl font-semibold">Latest from the feed</h2>
            {posts.map((p, i) => (
              <article key={i} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 font-semibold text-primary">
                    {p.user.split(" ").map((s) => s[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{p.user}</div>
                    <div className="text-xs text-muted-foreground">{p.role}</div>
                  </div>
                  <span className="ml-auto rounded-full bg-primary/15 px-2.5 py-1 text-xs text-primary">{p.badge}</span>
                </div>
                <p className="mt-4 text-base">{p.content}</p>
                <div className="mt-5 flex gap-6 text-sm text-muted-foreground">
                  <button className="inline-flex items-center gap-1.5 hover:text-primary"><Heart className="h-4 w-4" /> {p.likes}</button>
                  <button className="inline-flex items-center gap-1.5 hover:text-primary"><MessageCircle className="h-4 w-4" /> {p.comments}</button>
                  <button className="inline-flex items-center gap-1.5 hover:text-primary"><Share2 className="h-4 w-4" /> Share</button>
                </div>
              </article>
            ))}
          </div>
          <aside>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Weekly leaderboard</h3>
                </div>
                <ul className="mt-4 space-y-3">
                  {leaderboard.map((r) => (
                    <li key={r.rank} className={`flex items-center justify-between rounded-lg px-3 py-2 ${r.you ? "bg-primary/10" : ""}`}>
                      <div className="flex items-center gap-3">
                        <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${r.rank <= 3 ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{r.rank}</span>
                        <span className={`text-sm ${r.you ? "font-semibold text-primary" : ""}`}>{r.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{r.xp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold">Active groups</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {["Marathon Crew", "Push/Pull/Legs", "Yoga Daily", "Vegan Athletes", "Cyclists EU"].map((g) => (
                    <li key={g} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-secondary">
                      <span>{g}</span>
                      <span className="text-xs text-muted-foreground">Join</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
