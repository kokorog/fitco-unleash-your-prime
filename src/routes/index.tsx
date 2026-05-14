import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Activity, Apple, Users, Trophy, Sparkles, Dumbbell,
  Flame, Zap, Star, ShieldCheck, Bot, MapPin, Droplet, LineChart,
  Utensils, Target, Quote, Check,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { StoreButtons } from "@/components/site/StoreButtons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FITCO — Тренирай по-умно. Живей по-силен." },
      { name: "description", content: "FITCO е премиум AI фитнес екосистема: персонализирани тренировки, хранене, маршрути и общност. Изтегли за iOS и Android." },
      { property: "og:title", content: "FITCO — Тренирай по-умно. Живей по-силен." },
      { property: "og:description", content: "Премиум AI фитнес екосистема — тренировки, хранене и общност." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      <Hero />
      <PressStrip />
      <StatsBar />
      <SectionAITrainer />
      <SectionNutrition />
      <SectionRoutes />
      <SectionProgress />
      <SectionCommunity />
      <Reviews />
      <Pricing />
      <DownloadCTA />
    </PageShell>
  );
}

/* ============ HERO ============ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-28 pt-32 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:px-8 lg:pt-40"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            AI Powered Fitness Ecosystem
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Тренирай умно.<br />
            <span className="gradient-text">Живей силен.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            FITCO е твоят AI треньор, дневник за хранене и фитнес общност — всичко в едно.
            Персонализирани планове, калории, прогрес и мотивация всеки ден.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button size="lg" asChild className="group h-12 bg-primary px-6 text-primary-foreground hover:bg-primary-glow shadow-glow">
              <a href="#download">
                Изтегли безплатно
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 border-foreground/15 bg-foreground/[0.03] px-6 hover:bg-foreground/[0.06]">
              <a href="#features">Виж как работи</a>
            </Button>
          </div>
          <StoreButtons className="mt-7" />
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-primary" /> Live dashboard</div>
            <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-primary text-primary" /> Premium AI</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> GDPR съвместим</div>
          </div>
        </motion.div>

        {/* Hero visual: floating mock dashboard cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="relative hidden h-[560px] lg:block"
        >
          <HeroEcosystem />
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroEcosystem() {
  return (
    <div className="relative h-full w-full">
      {/* Main card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-3xl glass-card p-6 shadow-elevated"
      >
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
          <span>Today</span>
          <span className="flex items-center gap-1.5 text-primary">
            <Flame className="h-3.5 w-3.5" /> 38d streak
          </span>
        </div>
        <div className="mt-4">
          <div className="text-5xl font-bold">
            <Counter to={1842} /> <span className="text-base font-medium text-muted-foreground">kcal</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">от 2 200 цел</div>
        </div>
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "84%" }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.4 }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow"
          />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { l: "Протеин", v: "112g" },
            { l: "Стъпки", v: "8 340" },
            { l: "Вода", v: "2.1L" },
          ].map((m) => (
            <div key={m.l} className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.l}</div>
              <div className="mt-1 text-sm font-semibold">{m.v}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top right floating */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-0 top-6 w-[200px] rounded-2xl glass-card p-4 shadow-soft"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Bot className="h-3.5 w-3.5 text-primary" /> AI Coach
        </div>
        <p className="mt-2 text-[13px] leading-snug text-foreground/90">
          „Утре кардио — пулсът ти е готов за +5%."
        </p>
      </motion.div>

      {/* Bottom left floating */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-8 left-0 w-[210px] rounded-2xl glass-card p-4 shadow-soft"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" /> Маршрут
        </div>
        <div className="mt-2 text-sm font-semibold">Южен парк loop</div>
        <div className="mt-1 text-[11px] text-muted-foreground">5.2 км · 360 kcal</div>
        <div className="mt-3 h-12 w-full overflow-hidden rounded-md bg-foreground/[0.03]">
          <svg viewBox="0 0 200 48" className="h-full w-full" preserveAspectRatio="none">
            <path
              d="M0,30 C20,18 40,40 60,28 C80,16 100,38 120,22 C140,8 160,30 180,18 L200,22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

/* ============ PRESS STRIP ============ */
function PressStrip() {
  const items = ["Forbes", "Capital", "Bloomberg", "TechCrunch", "Wired", "Men's Health", "GQ", "Vogue"];
  return (
    <section className="relative border-y border-foreground/5 bg-muted/40 py-10">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-[11px] uppercase tracking-[0.25em] text-muted-foreground">As featured in</p>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee gap-16">
            {[...items, ...items].map((name, i) => (
              <span key={i} className="font-display text-xl font-semibold text-foreground/40 whitespace-nowrap">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ STATS BAR (animated counters) ============ */
function StatsBar() {
  const stats = [
    { value: 2.4, suffix: "M+", label: "Активни спортисти" },
    { value: 180, suffix: "+", label: "Държави" },
    { value: 94, suffix: "%", label: "Достигат целите си" },
    { value: 4.9, suffix: "★", label: "App Store оценка" },
  ];
  return (
    <section className="border-b border-foreground/5 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="text-center"
          >
            <div className="text-5xl font-bold gradient-text sm:text-6xl">
              <Counter to={s.value} decimals={s.value % 1 !== 0 ? 1 : 0} />{s.suffix}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setVal(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, to, decimals, mv]);
  return <span ref={ref}>{val}</span>;
}

/* ============ ALTERNATING SECTIONS ============ */

function SectionShell({
  eyebrow,
  title,
  description,
  bullets,
  visual,
  flip = false,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  bullets: { icon: React.ComponentType<{ className?: string }>; text: string }[];
  visual: React.ReactNode;
  flip?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className="relative overflow-hidden border-b border-foreground/5 py-28">
      <div className="absolute inset-0 dot-bg opacity-40" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={flip ? "lg:order-2" : ""}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</span>
          <h2 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>
          <ul className="mt-8 grid gap-3">
            {bullets.map(({ icon: Icon, text }, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-md bg-primary/15 text-primary">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="text-foreground/90">{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className={`relative ${flip ? "lg:order-1" : ""}`}
        >
          {visual}
        </motion.div>
      </div>
    </section>
  );
}

/* Premium placeholder card – future-ready container */
function PlaceholderCanvas({
  label,
  children,
  height = "h-[460px]",
}: {
  label: string;
  children?: React.ReactNode;
  height?: string;
}) {
  return (
    <div className={`group relative ${height} w-full overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.015] p-8 shadow-elevated backdrop-blur-sm`}>
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/15 blur-[80px] transition-opacity group-hover:opacity-80" />
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        {label}
      </div>
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

function SectionAITrainer() {
  return (
    <SectionShell
      id="features"
      eyebrow="AI Coach"
      title={<>Личен треньор,<br />който се учи от теб.</>}
      description="Адаптивни тренировки, които еволюират с твоя прогрес, възстановяване и цели. AI асистент 24/7 — план, форма, мотивация."
      bullets={[
        { icon: Bot, text: "AI препоръки според възстановяване и сън" },
        { icon: Dumbbell, text: "Сила, хипертрофия, мобилност и кардио" },
        { icon: Target, text: "Седмични цели и интелигентни корекции" },
      ]}
      visual={
        <PlaceholderCanvas label="AI Trainer Preview">
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-3">
              <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Bot className="h-3.5 w-3.5 text-primary" /> Coach
                </div>
                <p className="mt-2 text-sm">„Готов си за upper body push. 4×8 на 80%."</p>
              </div>
              <div className="ml-auto w-fit rounded-2xl border border-primary/30 bg-primary/10 p-3 text-sm">
                Започни тренировката →
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["Push", "Pull", "Legs"].map((d, i) => (
                <div key={d} className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Day {i + 1}</div>
                  <div className="mt-1 text-sm font-semibold">{d}</div>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${30 + i * 25}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PlaceholderCanvas>
      }
    />
  );
}

function SectionNutrition() {
  const macros = [
    { label: "Протеин", value: 78, target: 140, tone: "from-primary to-primary-glow" },
    { label: "Въглехидрати", value: 92, target: 220, tone: "from-sky-400 to-sky-300" },
    { label: "Мазнини", value: 32, target: 70, tone: "from-amber-400 to-amber-300" },
  ];
  return (
    <SectionShell
      flip
      eyebrow="Nutrition"
      title={<>Калории и макроси —<br />на автопилот.</>}
      description="Сканирай чинията си или избери от база с 100k+ продукти. FITCO смята протеин, въглехидрати, мазнини и хидратация автоматично."
      bullets={[
        { icon: Utensils, text: "100k+ продукти и рецепти" },
        { icon: Apple, text: "Snap a meal — AI разпознаване" },
        { icon: Droplet, text: "Хидратация и 16:8 прозорец" },
      ]}
      visual={
        <PlaceholderCanvas label="Nutrition Tracking">
          <div className="flex h-full flex-col gap-4">
            {macros.map((m, i) => (
              <div key={m.label} className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{m.label}</span>
                  <span className="text-muted-foreground">{m.value}g / {m.target}g</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-foreground/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(m.value / m.target) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.15 }}
                    className={`h-full rounded-full bg-gradient-to-r ${m.tone}`}
                  />
                </div>
              </div>
            ))}
            <div className="mt-auto flex items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-3">
              <Droplet className="h-5 w-5 text-sky-300" />
              <div className="flex-1 text-sm">Хидратация</div>
              <div className="text-sm font-semibold">2.1 / 2.5 L</div>
            </div>
          </div>
        </PlaceholderCanvas>
      }
    />
  );
}

function SectionRoutes() {
  return (
    <SectionShell
      eyebrow="Routes & GPS"
      title={<>Откривай маршрути.<br />Чупи рекорди.</>}
      description="GPS маршрути в твоя град, темпо, надморска височина и калории. Mission-based bundles за дистанция и постоянство."
      bullets={[
        { icon: MapPin, text: "Локални и популярни маршрути" },
        { icon: Activity, text: "Темпо, пулс, надморска височина" },
        { icon: Trophy, text: "Седмични мисии и сегменти" },
      ]}
      visual={
        <PlaceholderCanvas label="Routes Preview">
          <div className="flex h-full flex-col gap-4">
            <div className="relative flex-1 overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02]">
              <svg viewBox="0 0 400 240" className="h-full w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="rg" x1="0" x2="1">
                    <stop offset="0%" stopColor="oklch(0.88 0.22 130)" />
                    <stop offset="100%" stopColor="oklch(0.94 0.20 128)" />
                  </linearGradient>
                </defs>
                <path
                  d="M20,200 C60,140 100,210 150,160 C200,110 240,180 290,120 C320,80 360,100 380,60"
                  fill="none"
                  stroke="url(#rg)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="200" r="6" fill="oklch(0.88 0.22 130)" />
                <circle cx="380" cy="60" r="6" fill="oklch(0.88 0.22 130)" />
              </svg>
              <div className="absolute bottom-3 left-3 rounded-lg border border-foreground/10 bg-background/70 px-3 py-1.5 text-[11px] backdrop-blur">
                5.2 км · 360 kcal · 27 мин
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { l: "Pace", v: "5:12 /км" },
                { l: "Pulse", v: "148 bpm" },
                { l: "Elev.", v: "+82 м" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
                  <div className="mt-1 text-sm font-semibold">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </PlaceholderCanvas>
      }
    />
  );
}

function SectionProgress() {
  const bars = [40, 62, 55, 78, 70, 88, 95];
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
  return (
    <SectionShell
      flip
      eyebrow="Progress"
      title={<>Виждаш всяка стъпка<br />напред.</>}
      description="Тегло, обиколки, лични рекорди, сън и постоянство. Прогнози и тенденции в едно живо табло."
      bullets={[
        { icon: LineChart, text: "Тенденции, прогнози и PR-и" },
        { icon: Flame, text: "Серия и календар на постоянство" },
        { icon: ShieldCheck, text: "Криптирани данни, GDPR" },
      ]}
      visual={
        <PlaceholderCanvas label="Weekly Progress">
          <div className="flex h-full flex-col">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Седмица</div>
                <div className="mt-1 text-2xl font-bold">Постоянство 64%</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary">
                <Flame className="h-4 w-4" /> 38 дни серия
              </div>
            </div>
            <div className="mt-8 grid h-44 grid-cols-7 items-end gap-3">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.07, ease: "easeOut" }}
                  className="rounded-t-md bg-gradient-to-t from-primary/60 to-primary-glow"
                />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-3 text-center text-[11px] text-muted-foreground">
              {days.map((d) => <span key={d}>{d}</span>)}
            </div>
          </div>
        </PlaceholderCanvas>
      }
    />
  );
}

function SectionCommunity() {
  return (
    <SectionShell
      eyebrow="Community"
      title={<>Тренирай заедно.<br />Расти по-бързо.</>}
      description="Споделяй тренировки, трансформации и постижения. Влез в групи, следвай атлети и участвай в седмични общностни предизвикателства."
      bullets={[
        { icon: Users, text: "Групи, feed и реакции" },
        { icon: Trophy, text: "Глобални и локални класации" },
        { icon: Sparkles, text: "Общностни мисии и турнири" },
      ]}
      visual={
        <PlaceholderCanvas label="Community Feed">
          <div className="flex h-full flex-col gap-3">
            {[
              { who: "@maria.runs", what: "Сутрешен 8 km tempo", v: "42:18 · 5:17 /км" },
              { who: "@ivo.lifts", what: "Bench PR — 132.5 kg ×1", v: "+2.5 kg vs миналата седмица" },
              { who: "@lena.flex", what: "Yoga flow · 30 мин", v: "🔥 streak 21 дни" },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                    {p.who.slice(1, 3).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{p.who}</div>
                    <div className="text-xs text-muted-foreground">{p.what}</div>
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">{p.v}</div>
              </motion.div>
            ))}
          </div>
        </PlaceholderCanvas>
      }
    />
  );
}

/* ============ REVIEWS PLACEHOLDERS ============ */
function Reviews() {
  return (
    <section className="relative border-b border-foreground/5 py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-primary">Reviews</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Реални хора. Реални резултати.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Скоро ще покажем истории от нашата общност — трансформации, рекорди и постоянство.
            Това място е запазено за теб.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/[0.04] to-foreground/[0.015] p-6 transition-all hover:border-primary/30"
            >
              <Quote className="h-6 w-6 text-primary/60" />
              <div className="mt-5 space-y-2">
                <div className="h-2 w-3/4 rounded-full bg-foreground/10" />
                <div className="h-2 w-full rounded-full bg-foreground/10" />
                <div className="h-2 w-5/6 rounded-full bg-foreground/10" />
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-foreground/10" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2 w-20 rounded-full bg-foreground/10" />
                  <div className="h-2 w-28 rounded-full bg-foreground/5" />
                </div>
              </div>
              <div className="absolute right-4 top-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                Soon
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center text-sm text-muted-foreground">
          Искаш да споделиш своята история? Пиши ни на{" "}
          <a href="mailto:support@fitcoapp.com" className="text-primary hover:underline">support@fitcoapp.com</a>
        </div>
      </div>
    </section>
  );
}

/* ============ PRICING ============ */
function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "0 лв.",
      period: "завинаги",
      desc: "Започни без риск",
      features: [
        "Дневник за хранене (базов)",
        "Лимитирани тренировки",
        "До 3 GPS маршрута / месец",
        "Базови AI препоръки",
        "Общност",
      ],
      cta: "Започни безплатно",
    },
    {
      name: "Pro",
      price: "19.99 лв.",
      period: "/месец",
      desc: "Препоръчван — пълен AI",
      featured: true,
      features: [
        "Всичко от Free",
        "Пълен AI треньор 24/7",
        "Премиум програми и планове",
        "Неограничени маршрути",
        "Разширени анализи и прогнози",
        "Премиум insights и тенденции",
      ],
      cta: "Премини към Pro",
    },
    {
      name: "Elite",
      price: "149 лв.",
      period: "/година",
      desc: "Най-добра стойност",
      features: [
        "Всичко от Pro",
        "Годишен план — 38% спестяване",
        "Ексклузивни бъдещи функции",
        "Приоритетна поддръжка",
        "Личен онбординг",
      ],
      cta: "Избери Elite",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-foreground/5 py-28">
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-primary">Pricing</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Прости планове. Нула обвързване.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Започни безплатно. Премини към Pro когато си готов. Откажи се с един клик.
          </p>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative flex flex-col rounded-3xl p-8 ${
                t.featured
                  ? "border border-primary/40 bg-gradient-to-b from-primary/[0.08] to-foreground/[0.02] shadow-glow"
                  : "border border-foreground/10 bg-foreground/[0.02]"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  Most Popular
                </span>
              )}
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{t.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-5xl font-bold">{t.price}</span>
                <span className="text-sm text-muted-foreground">{t.period}</span>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{t.desc}</div>

              <ul className="mt-8 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className={`mt-10 h-11 w-full ${
                  t.featured
                    ? "bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow"
                    : "border border-foreground/15 bg-foreground/[0.03] text-foreground hover:bg-foreground/[0.06]"
                }`}
              >
                <Link to="/pricing">{t.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ DOWNLOAD ============ */
function DownloadCTA() {
  return (
    <section id="download" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.88_0.22_130/0.18),transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Zap className="mx-auto h-10 w-10 text-primary" />
        <h2 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Най-силната ти<br />година започва <span className="gradient-text">днес.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Изтегли FITCO за iOS и Android. Безплатно завинаги — с опционален Pro.
        </p>
        <div className="mt-10 flex justify-center">
          <StoreButtons />
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          Въпроси? <a href="mailto:support@fitcoapp.com" className="text-primary hover:underline">support@fitcoapp.com</a>
        </div>
      </div>
    </section>
  );
}
