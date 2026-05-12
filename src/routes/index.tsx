import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight, Activity, Apple, Users, Trophy, Sparkles, Dumbbell,
  Heart, Flame, Zap, Star, ShieldCheck, Bot, Calendar, MapPin, Droplet,
} from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { PhoneFrame } from "@/components/site/PhoneFrame";
import { StoreButtons } from "@/components/site/StoreButtons";

import scrToday from "@/assets/screens/today.png";
import scrPlan from "@/assets/screens/plan.png";
import scrNutrition from "@/assets/screens/nutrition.png";
import scrProgress from "@/assets/screens/progress.png";
import scrMetrics from "@/assets/screens/metrics.png";
import scrCommunity from "@/assets/screens/community.png";
import scrProfile from "@/assets/screens/profile.png";
import scrChats from "@/assets/screens/chats.png";
import scrEdit from "@/assets/screens/edit.png";
import scrSettings from "@/assets/screens/settings.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FITCO — Тренирай по-умно. Живей по-силен." },
      { name: "description", content: "FITCO е премиум фитнес платформа с AI: персонализирани тренировки, проследяване на хранене, общност и геймификация. Изтегли за iOS и Android." },
      { property: "og:title", content: "FITCO — Тренирай по-умно. Живей по-силен." },
      { property: "og:description", content: "Премиум AI фитнес, хранене и общност." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      <Hero />
      <PressStrip />
      <Stats />
      <ScrollScreens />
      <Features />
      <NutritionDemo />
      <ProgressDemo />
      <CommunityDemo />
      <Gamification />
      <Testimonials />
      <PricingTeaser />
      <Faq />
      <Download />
    </PageShell>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.86_0.24_142/0.22),transparent_60%)]" />
      <motion.div style={{ y, opacity }} className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-28 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Нов сезон. Ново тяло.
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Тренирай умно.<br />
            <span className="gradient-text">Живей силен.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            FITCO е твоят AI треньор, дневник за хранене и фитнес общност — всичко в едно. Персонализирани планове, калории, прогрес и мотивация всеки ден.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-[0_0_30px_oklch(0.86_0.24_142/0.5)]">
              <a href="#download">Изтегли безплатно <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Виж функциите</a>
            </Button>
          </div>
          <StoreButtons className="mt-6" />
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><div className="h-2 w-2 animate-pulse rounded-full bg-primary" /> 2.4M+ потребители</div>
            <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-primary text-primary" /> 4.9 в App Store</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> GDPR съвместим</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative grid place-items-center"
        >
          <div className="relative">
            <PhoneFrame src={scrToday} alt="FITCO дневен ритъм" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-12 hidden sm:block"
            >
              <PhoneFrame src={scrNutrition} alt="FITCO хранене" className="!w-[180px] scale-90 opacity-90" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 bottom-8 hidden sm:block"
            >
              <PhoneFrame src={scrCommunity} alt="FITCO общност" className="!w-[180px] scale-90 opacity-90" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- PRESS ---------- */
function PressStrip() {
  const items = ["Forbes", "Capital", "Bloomberg", "TechCrunch", "Wired", "Men's Health", "Vogue", "GQ"];
  return (
    <section className="border-y border-border/60 bg-background/50 py-8">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">Препоръчано от</p>
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

/* ---------- STATS ---------- */
function Stats() {
  const stats = [
    { value: "2.4M+", label: "Активни спортисти" },
    { value: "180+", label: "Държави" },
    { value: "94%", label: "Достигат целите си" },
    { value: "4.9★", label: "App Store оценка" },
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

/* ---------- SCROLL SCREENS — sticky phone, content shifts ---------- */
function ScrollScreens() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const screens = [
    { src: scrToday, eyebrow: "Днес", title: "Един екран. Целият ти ден.", desc: "Виж калории, хидратация и движение в един жив ритъм. Без претоварване — само това, което има значение." },
    { src: scrPlan, eyebrow: "План", title: "AI треньор в джоба ти.", desc: "Персонализиран 7-дневен план според целта, нивото и възстановяването ти. Адаптира се след всяка тренировка." },
    { src: scrNutrition, eyebrow: "Хранене", title: "Калории и макроси без усилие.", desc: "Сканирай храна или избери от 100k+ продукти. Седмичен ритъм и 16:8 прозорец за хранене." },
    { src: scrProgress, eyebrow: "Прогрес", title: "Карта на твоето движение.", desc: "GPS маршрути, мисии за дистанция и журнал на постоянството. Виждаш точно колко напредваш." },
  ];

  // Index drives which phone shows
  const indexT = useTransform(smooth, [0, 1], [0, screens.length]);

  return (
    <section ref={ref} className="relative" style={{ height: `${screens.length * 90}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Phone column with stacked screens */}
          <div className="relative grid place-items-center">
            {screens.map((s, i) => {
              const start = i / screens.length;
              const end = (i + 1) / screens.length;
              const opacity = useTransform(smooth, [start - 0.05, start, end - 0.05, end], [0, 1, 1, 0]);
              const y = useTransform(smooth, [start, end], [40, -40]);
              const scale = useTransform(smooth, [start, end], [0.96, 1.04]);
              return (
                <motion.div key={i} style={{ opacity, y, scale }} className="absolute">
                  <PhoneFrame src={s.src} alt={s.title} />
                </motion.div>
              );
            })}
          </div>
          {/* Text column */}
          <div className="relative grid place-items-center">
            {screens.map((s, i) => {
              const start = i / screens.length;
              const end = (i + 1) / screens.length;
              const opacity = useTransform(smooth, [start - 0.05, start, end - 0.05, end], [0, 1, 1, 0]);
              const y = useTransform(smooth, [start, end], [60, -60]);
              return (
                <motion.div key={i} style={{ opacity, y }} className="absolute max-w-md">
                  <span className="text-xs uppercase tracking-[0.2em] text-primary">{s.eyebrow}</span>
                  <h3 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{s.title}</h3>
                  <p className="mt-4 text-lg text-muted-foreground">{s.desc}</p>
                  <div className="mt-6 flex gap-2">
                    {screens.map((_, j) => (
                      <span key={j} className={`h-1 w-10 rounded-full ${j === i ? "bg-primary" : "bg-border"}`} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
            {/* hidden, just to silence unused */}
            <span className="hidden">{indexT.get()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURES ---------- */
function Features() {
  const items = [
    { icon: Dumbbell, title: "Тренировки у дома и във фитнеса", desc: "Сила, хипертрофия, мобилност и кардио. Планове, които се адаптират според възстановяването ти." },
    { icon: Apple, title: "Хранене и макроси", desc: "Калории, протеин, въглехидрати, мазнини. 100k+ рецепти и сканиране на храна." },
    { icon: Activity, title: "Прогрес и анализи", desc: "Тегло, обиколки, лични рекорди, сън. Прогнози и тенденции в едно табло." },
    { icon: Users, title: "Социален фитнес", desc: "Споделяй тренировки и трансформации, следвай атлети, влез в групи." },
    { icon: Trophy, title: "Геймификация", desc: "XP, нива, значки, седмични мисии и глобални класации." },
    { icon: Bot, title: "AI препоръки", desc: "AI асистент 24/7 за тренировка, хранене и възстановяване." },
    { icon: Calendar, title: "Календар и предизвикателства", desc: "Седмични мисии, общностни състезания и серии (streaks)." },
    { icon: Droplet, title: "Хидратация и сън", desc: "Следи водата и съня. Малките навици правят голямата разлика." },
    { icon: ShieldCheck, title: "Сигурност и GDPR", desc: "Криптиране, контрол на данните и пълна ЕС съвместимост." },
  ];
  return (
    <section id="features" className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Една платформа</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Всичко, от което се нуждаеш — в едно.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            От първата лицева опора до стотния маратон — FITCO расте с теб.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.04 }}
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

/* ---------- NUTRITION DEMO ---------- */
function NutritionDemo() {
  const macros = [
    { label: "Протеин", value: 78, target: 140, color: "from-primary to-primary-glow" },
    { label: "Въглехидрати", value: 92, target: 220, color: "from-blue-400 to-blue-300" },
    { label: "Мазнини", value: 32, target: 70, color: "from-amber-400 to-amber-300" },
  ];
  return (
    <section className="border-b border-border/60 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Хранене</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Калории и макроси на автопилот.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Сканирай чинията, избери от база с 100k+ продукта или добави бързо ръчно. FITCO смята протеин, въглехидрати, мазнини и хидратация автоматично.
          </p>
          <div className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-6">
            {macros.map((m, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{m.label}</span>
                  <span className="text-muted-foreground">{m.value}g / {m.target}g</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(m.value / m.target) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: "easeOut", delay: i * 0.15 }}
                    className={`h-full rounded-full bg-gradient-to-r ${m.color}`}
                  />
                </div>
              </div>
            ))}
            <div className="mt-2 flex items-center gap-3 rounded-xl bg-secondary/50 p-3">
              <Droplet className="h-5 w-5 text-blue-300" />
              <div className="flex-1 text-sm">Хидратация</div>
              <div className="text-sm font-semibold">2.1 / 2.5 L</div>
            </div>
          </div>
        </div>
        <div className="relative grid place-items-center">
          <PhoneFrame src={scrNutrition} alt="Хранене дневник" />
        </div>
      </div>
    </section>
  );
}

/* ---------- PROGRESS DEMO ---------- */
function ProgressDemo() {
  const bars = [40, 62, 55, 78, 70, 88, 95];
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-24">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="lg:order-2">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Прогрес</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Виждаш всяка стъпка напред.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Стъпки, дистанция, изгорени калории и маршрути в твоя град. Календар на постоянството и журнал със снимки.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { label: "Стъпки", value: "8 340" },
              { label: "Дистанция", value: "4.8 км" },
              { label: "Изгорени", value: "328 kcal" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="mt-1 text-xl font-bold">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:order-1">
          <div className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Седмица</div>
                <div className="mt-1 text-2xl font-bold">Постоянство 64%</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary">
                <Flame className="h-4 w-4" /> Серия 38 дни
              </div>
            </div>
            <div className="mt-8 grid grid-cols-7 items-end gap-3 h-48">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.07, ease: "easeOut" }}
                  className="rounded-t-md bg-gradient-to-t from-primary to-primary-glow"
                />
              ))}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-3 text-center text-xs text-muted-foreground">
              {days.map((d) => <span key={d}>{d}</span>)}
            </div>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div className="text-sm">
                <div className="font-medium">Южен парк burn loop</div>
                <div className="text-muted-foreground text-xs">5.2 км · 360 kcal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- COMMUNITY DEMO ---------- */
function CommunityDemo() {
  return (
    <section className="border-b border-border/60 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="grid place-items-center">
          <PhoneFrame src={scrCommunity} alt="Общност" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Общност</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Тренирай заедно.<br />Расти по-бързо.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Сподели тренировки, трансформации и постижения. Следвай атлети, влез в групи и участвай в седмични общностни предизвикателства.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              { icon: Heart, label: "Реакции", value: "1.2M+ седмично" },
              { icon: Users, label: "Групи", value: "5 400+" },
              { icon: Trophy, label: "Класации", value: "Глобални & локални" },
              { icon: Sparkles, label: "Feed", value: "Снимки и видео" },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-3 text-base font-semibold">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- GAMIFICATION ---------- */
function Gamification() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 py-24">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Геймификация</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Качвай ниво с всяка тренировка.</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Печели XP, отключвай значки и се състезавай в глобални класации. Седмични мисии и общностни турнири държат серията ти жива.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: Trophy, label: "Значки", value: "120+" },
              { icon: Zap, label: "XP", value: "5 210" },
              { icon: Heart, label: "Последователи", value: "847" },
              { icon: Flame, label: "Серия", value: "38 дни" },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <Icon className="h-5 w-5 text-primary" />
                <div className="mt-3 text-2xl font-bold">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid place-items-center">
          <PhoneFrame src={scrProfile} alt="Профил" />
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const items = [
    { name: "Сара М.", role: "Маратонец", quote: "Адаптивните кардио планове на FITCO ми свалиха 12 минути от маратона за 8 седмици.", initial: "СМ" },
    { name: "Марк Т.", role: "Пауърлифтър", quote: "AI треньорът наистина работи. Все едно имам коуч в джоба си 24/7.", initial: "МТ" },
    { name: "Лена П.", role: "Заета професионалистка", quote: "20-минутни тренировки у дома, които работят. Дневникът за хранене е най-добрият, който съм ползвала.", initial: "ЛП" },
    { name: "Иво К.", role: "Триатлонист", quote: "Прогресът, маршрутите и общността — всичко на едно място. Невероятна апликация.", initial: "ИК" },
  ];
  return (
    <section className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Обичана от спортистите</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Реални хора. Реални резултати.</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-primary" />)}
              </div>
              <p className="mt-4 text-base leading-relaxed">"{t.quote}"</p>
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

/* ---------- PRICING TEASER ---------- */
function PricingTeaser() {
  const tiers = [
    { name: "Старт", price: "0 лв.", desc: "Започни безплатно", features: ["Дневник за хранене", "Базови тренировки", "Общност"] },
    { name: "Pro", price: "19.99 лв./м", desc: "Най-избиран", features: ["AI треньор", "Премиум планове", "Анализи", "Карта на маршрути"], featured: true },
    { name: "Elite", price: "39.99 лв./м", desc: "Личен подход", features: ["Личен коуч", "1:1 сесии", "Хранителни планове", "Приоритетна поддръжка"] },
  ];
  return (
    <section className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Цени</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Започни безплатно. Премини към Pro когато си готов.</h2>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative rounded-2xl border p-8 ${t.featured ? "border-primary bg-card shadow-[0_0_60px_oklch(0.86_0.24_142/0.2)]" : "border-border bg-card"}`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Най-популярен
                </span>
              )}
              <div className="text-sm uppercase tracking-wider text-muted-foreground">{t.name}</div>
              <div className="mt-2 text-4xl font-bold">{t.price}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t.desc}</div>
              <ul className="mt-6 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button asChild className={`mt-8 w-full ${t.featured ? "bg-primary text-primary-foreground hover:bg-primary-glow" : ""}`} variant={t.featured ? "default" : "outline"}>
                <Link to="/pricing">Избери {t.name}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const items = [
    { q: "FITCO безплатен ли е?", a: "Да — основните функции са безплатни. Pro предлага AI треньор и премиум планове на 19.99 лв./месец." },
    { q: "Работи ли без интернет?", a: "Да, ключови тренировки и дневникът работят офлайн и се синхронизират при свързване." },
    { q: "Поддържа ли Apple Health и Google Fit?", a: "Да, синхронизира стъпки, тегло, сън и пулс автоматично." },
    { q: "Как защитавате данните ми?", a: "Криптиране в покой и при пренос. Пълна GDPR съвместимост и инструменти за достъп/изтриване." },
    { q: "Мога ли да отменя по всяко време?", a: "Да — без обвързване, отказ с един клик." },
  ];
  return (
    <section className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-primary">ЧЗВ</span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Често задавани въпроси</h2>
        </div>
        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
          {items.map((it, i) => (
            <details key={i} className="group p-6">
              <summary className="flex cursor-pointer items-center justify-between text-base font-medium">
                {it.q}
                <span className="ml-4 text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{it.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Не намираш отговор? Пиши ни на{" "}
          <a href="mailto:support@fitco.app" className="text-primary hover:underline">support@fitco.app</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- DOWNLOAD ---------- */
function Download() {
  return (
    <section id="download" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.86_0.24_142/0.22),transparent_60%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Най-силната ти<br />година започва <span className="gradient-text">днес.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">Изтегли FITCO за iOS и Android. Безплатно завинаги — с опционален Pro.</p>
          <StoreButtons className="mt-8" />
          <div className="mt-6 text-sm text-muted-foreground">
            Въпроси? <a href="mailto:support@fitco.app" className="text-primary hover:underline">support@fitco.app</a>
          </div>
        </div>
        <div className="grid place-items-center">
          <div className="relative">
            <PhoneFrame src={scrSettings} alt="Настройки" />
            <div className="absolute -left-12 top-20 hidden md:block">
              <PhoneFrame src={scrEdit} alt="Редакция" className="!w-[180px] scale-90 opacity-90" />
            </div>
            <div className="absolute -right-12 bottom-20 hidden md:block">
              <PhoneFrame src={scrChats} alt="Чатове" className="!w-[180px] scale-90 opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
