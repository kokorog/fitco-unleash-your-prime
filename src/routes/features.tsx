import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import {
  Dumbbell, Apple, Activity, Users, Trophy, Sparkles,
  Calendar, Heart, Flame, BarChart3, Bell, Shield, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — FITCO" },
      { name: "description", content: "Adaptive workouts, smart nutrition, social fitness, gamification, and AI coaching — everything FITCO offers." },
    ],
  }),
  component: FeaturesPage,
});

const groups = [
  {
    title: "Fitness & Training",
    icon: Dumbbell,
    items: ["Personalized workout programs", "Gym & home workouts", "Strength training", "Cardio plans", "Progress tracking", "Workout calendar", "Daily challenges", "AI fitness recommendations"],
  },
  {
    title: "Nutrition & Tracking",
    icon: Apple,
    items: ["Calorie tracking", "Macronutrient tracking", "Meal plans", "Healthy recipes", "Water intake tracker", "Weight tracking", "BMI calculator"],
  },
  {
    title: "Social Fitness Network",
    icon: Users,
    items: ["Photo & video feed", "Workout achievements", "Transformation posts", "Follow other athletes", "Like, comment, interact", "Community groups", "User profiles"],
  },
  {
    title: "Gamification",
    icon: Trophy,
    items: ["Reward points", "XP & levels", "Badges & achievements", "Weekly missions", "Global ranking", "Premium rewards", "Community competitions"],
  },
  {
    title: "Premium",
    icon: Sparkles,
    items: ["Personal coach booking", "Premium programs", "AI training plans", "Smart analytics dashboard", "Priority support"],
  },
  {
    title: "Privacy & Security",
    icon: Shield,
    items: ["Google & Apple login", "Secure authentication", "GDPR compliant", "Cookie consent", "Data export & deletion", "EU data protection"],
  },
];

function FeaturesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Features"
        title={<>Everything FITCO can do <span className="gradient-text">for you.</span></>}
        description="A complete fitness operating system — built for athletes, optimized for everyone."
      />
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {groups.map(({ title, icon: Icon, items }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <ul className="mt-4 space-y-2">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">More than fitness</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Calendar, label: "Workout calendar" },
              { icon: Heart, label: "Heart-rate zones" },
              { icon: Flame, label: "Streak tracking" },
              { icon: BarChart3, label: "Smart analytics" },
              { icon: Bell, label: "Notifications" },
              { icon: Activity, label: "Recovery insights" },
              { icon: Shield, label: "End-to-end privacy" },
              { icon: Sparkles, label: "AI everywhere" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary-glow">
              <Link to="/pricing">See pricing <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
