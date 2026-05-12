import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Activity, Apple, Users, Trophy, Sparkles, Dumbbell,
  Heart, Flame, Zap, Star, ChevronRight,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-athlete.jpg";
import strengthImg from "@/assets/feature-strength.jpg";
import cardioImg from "@/assets/feature-cardio.jpg";
import nutritionImg from "@/assets/feature-nutrition.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FITCO — Train Smarter. Live Stronger." },
      { name: "description", content: "Premium AI-powered fitness platform. Personalized workouts, nutrition tracking, and a global fitness community." },
      { property: "og:title", content: "FITCO — Train Smarter. Live Stronger." },
      { property: "og:description", content: "Premium AI-powered fitness, nutrition, and community platform." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      <Hero />
      <LogoStrip />
      <Stats />
      <Features />
      <ShowcaseSplit />
      <Gamification />
      <Testimonials />
      <PricingTeaser />
      <CTA />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.86_0.24_142/0.18),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> AI-powered fitness, reinvented
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Train smarter.<br />
            <span className="gradient-text">Live stronger.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            FITCO is your all-in-one training, nutrition, and community platform.
            Adaptive workouts, calorie tracking, and a global network of athletes — engineered to make every rep count.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-[0_0_30px_oklch(0.86_0.24_142/0.5)]">
              <Link to="/dashboard">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/features">Explore features</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><div className="h-2 w-2 animate-pulse rounded-full bg-primary" /> 2.4M+ athletes</div>
            <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-primary text-primary" /> 4.9 / 5 on App Store</div>
            <div>GDPR compliant</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border glow-soft">
            <img
              src={heroImg}
              alt="Athlete training with neon green lighting"
              width={1536}
              height={1536}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

            {/* Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute left-4 top-4 sm:left-6 sm:top-6 glass-strong rounded-2xl px-4 py-3 shadow-elevated"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Today</div>
                  <div className="font-semibold">642 kcal burned</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 glass-strong rounded-2xl p-4 shadow-elevated min-w-[200px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Weekly streak</span>
                <span className="text-xs font-semibold text-primary">+12%</span>
              </div>
              <div className="mt-2 flex items-end gap-1.5">
                {[40, 65, 50, 80, 55, 90, 75].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 1 + i * 0.07, duration: 0.5 }}
                    style={{ width: 10 }}
                    className="rounded-sm bg-gradient-to-t from-primary to-primary-glow"
                  />
                ))}
              </div>
              <div className="mt-2 text-2xl font-bold">5,210<span className="text-sm font-normal text-muted-foreground"> XP</span></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LogoStrip() {
  const items = ["Forbes", "TechCrunch", "Wired", "Men's Health", "Vogue", "GQ", "Bloomberg", "The Verge"];
  return (
    <section className="border-y border-border/60 bg-background/50 py-8">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured in</p>
        <div className="relative">
          <div className="flex w-max animate-marquee gap-12">
            {[...items, ...items].map((name, i) => (
              <span key={i} className="font-display text-xl font-semibold text-muted-foreground/60 whitespace-nowrap">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "2.4M+", label: "Active athletes" },
    { value: "180+", label: "Countries" },
    { value: "94%", label: "Hit weekly goals" },
    { value: "4.9★", label: "App Store rating" },
  ];
  return (
    <section className="border-b border-border/60 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="text-center"
          >
            <div className="text-4xl font-bold gradient-text sm:text-5xl">{s.value}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: Dumbbell, title: "Adaptive workouts", desc: "Strength, hypertrophy, mobility — programs that adjust to your recovery in real time." },
    { icon: Apple, title: "Smart nutrition", desc: "Calorie & macro tracking with photo logging and a 100k+ recipe library." },
    { icon: Activity, title: "Progress tracking", desc: "Body comp, lifts, cardio, sleep — all in one dashboard with predictive trends." },
    { icon: Users, title: "Social fitness", desc: "Share workouts, follow athletes, and join community groups for accountability." },
    { icon: Trophy, title: "Gamification", desc: "Earn XP, climb leaderboards, unlock badges and weekly missions." },
    { icon: Sparkles, title: "AI coach", desc: "24/7 AI training & nutrition recommendations based on your goals and history." },
  ];
  return (
    <section className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Everything you need</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">One platform. Every workout.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From your first push-up to your hundredth marathon. FITCO scales with every athlete.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-[0_0_40px_oklch(0.86_0.24_142/0.15)]"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/15" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseSplit() {
  const blocks = [
    { img: strengthImg, eyebrow: "Strength", title: "Programs built around your one-rep max", desc: "Periodized lifting plans, RPE-based autoregulation, and form-check video upload.", to: "/workouts" },
    { img: cardioImg, eyebrow: "Cardio", title: "From couch to ultra-marathon", desc: "Heart-rate-zone training, GPS tracking, and adaptive interval workouts.", to: "/workouts" },
    { img: nutritionImg, eyebrow: "Nutrition", title: "Eat for performance", desc: "Macro targets, meal plans, and hydration tracking that work with your schedule.", to: "/nutrition" },
  ];
  return (
    <section className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
        {blocks.map((b, i) => (
          <div key={i} className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-border"
            >
              <img src={b.img} alt={b.title} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover aspect-[4/5]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-primary">{b.eyebrow}</span>
              <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{b.title}</h3>
              <p className="mt-4 text-lg text-muted-foreground">{b.desc}</p>
              <Link to={b.to} className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                Learn more <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Gamification() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-24">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary">Gamified fitness</span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Level up every workout.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Earn XP, unlock achievements, and compete on global leaderboards.
              Weekly missions and community competitions keep your streak alive.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { icon: Trophy, label: "Badges", value: "120+" },
                { icon: Zap, label: "XP earned", value: "5,210" },
                { icon: Heart, label: "Followers", value: "847" },
                { icon: Flame, label: "Day streak", value: "38" },
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-4">
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-2xl font-bold">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="glass-strong rounded-3xl p-6 shadow-elevated">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow font-bold text-primary-foreground">AK</div>
                  <div>
                    <div className="font-semibold">Alex K.</div>
                    <div className="text-xs text-muted-foreground">Level 24 · Elite</div>
                  </div>
                </div>
                <div className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">#142 global</div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Weekly mission</span>
                  <span className="font-medium">4 / 5 workouts</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "80%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-2">
                {["🏆", "🔥", "💪", "⚡"].map((e, i) => (
                  <div key={i} className="aspect-square grid place-items-center rounded-xl border border-border bg-secondary text-2xl">{e}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { name: "Sarah M.", role: "Marathon runner", quote: "FITCO's adaptive cardio plans cut 12 minutes off my marathon time in 8 weeks.", initial: "SM" },
    { name: "Marcus T.", role: "Powerlifter", quote: "The form-check AI is genuinely useful. Like having a coach in my pocket 24/7.", initial: "MT" },
    { name: "Lena P.", role: "Busy professional", quote: "20-minute home workouts that actually work. The nutrition tracker is the best I've used.", initial: "LP" },
  ];
  return (
    <section className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Loved by athletes</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Real results. Real people.</h2>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-primary" />)}
              </div>
              <p className="mt-4 text-lg leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 font-semibold text-primary">{t.initial}</div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-xs uppercase tracking-[0.2em] text-primary">Simple pricing</span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Start free. Go premium when you're ready.</h2>
        <p className="mt-4 text-lg text-muted-foreground">14-day free trial of FITCO Pro. Cancel anytime.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-[0_0_30px_oklch(0.86_0.24_142/0.4)]">
            <Link to="/pricing">View pricing</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/dashboard">Try the dashboard</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.86_0.24_142/0.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Your strongest year<br />starts <span className="gradient-text">today.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">Join 2.4M+ athletes training smarter with FITCO.</p>
        <Button size="lg" asChild className="mt-8 bg-primary text-primary-foreground hover:bg-primary-glow shadow-[0_0_30px_oklch(0.86_0.24_142/0.5)]">
          <Link to="/dashboard">Start free trial <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  );
}
