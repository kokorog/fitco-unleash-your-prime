import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Check,
  Dumbbell,
  Flame,
  Map,
  MessageCircle,
  Route as RouteIcon,
  ScanLine,
  ShieldCheck,
  Star,
  Sparkles,
  Trophy,
  Users,
  Utensils,
  WalletCards,
} from "lucide-react";
import heroAthlete from "@/assets/hero-athlete.jpg";
import chatsScreen from "@/assets/screens/chats.png";
import communityCleanScreen from "@/assets/screens/community-clean.png";
import nutritionCleanScreen from "@/assets/screens/nutrition-clean.png";
import planScreen from "@/assets/screens/plan.png";
import profileScreen from "@/assets/screens/profile.png";
import progressScreen from "@/assets/screens/progress.png";
import routesLiveScreen from "@/assets/screens/routes-live-clean.png";
import todayCleanScreen from "@/assets/screens/today-clean.png";
import { PageShell } from "@/components/site/PageShell";
import { PhoneFrame } from "@/components/site/PhoneFrame";
import { Reveal, Parallax } from "@/components/site/Reveal";
import { FAQSection } from "@/components/site/FAQSection";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { CTASection } from "@/components/site/CTASection";
import { useLang } from "@/lib/i18n/LanguageProvider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FitCo - Fitness, Nutrition, Training & Community" },
      {
        name: "description",
        content:
          "FitCo helps you track meals, follow personalized workouts, build routes, join challenges and stay consistent with a calm fitness community.",
      },
      { property: "og:title", content: "FitCo - Fitness, Nutrition, Training & Community" },
      {
        property: "og:description",
        content: "Track nutrition, workouts, routes, progress and community in one mobile app.",
      },
      { property: "og:url", content: "https://fitcoapp.com" },
    ],
    links: [{ rel: "canonical", href: "https://fitcoapp.com" }],
  }),
  component: HomePage,
});

const featureIcons = [
  Utensils,
  ScanLine,
  Dumbbell,
  RouteIcon,
  Activity,
  MessageCircle,
  Trophy,
  WalletCards,
] as const;

const copy = {
  en: {
    heroKicker: "Early access 2026",
    heroLine:
      "A calm fitness app for food, movement, progress and people who help you keep showing up.",
    heroTrust: "Private by default. Built for real days. Not medical advice.",
    productTour: "Product tour",
    seeScreens: "See screens",
    availableSoon: "iOS and Android access opens in phases.",
    stats: [
      { value: "5", label: "core areas" },
      { value: "1", label: "daily rhythm" },
      { value: "BG + EN", label: "languages" },
    ],
    screenshotEyebrow: "Inside FitCo",
    screenshotTitle: "The app is the hero.",
    screenshotBody:
      "No generic dashboard art. These are real FitCo screens: daily rhythm, nutrition, progress, community, chats and profile.",
    screens: [
      {
        title: "Daily rhythm",
        body: "Food, water and movement in one calm view.",
        src: todayCleanScreen,
        alt: "FitCo daily rhythm screen",
      },
      {
        title: "Nutrition",
        body: "Macros, water and meal diary without the noise.",
        src: nutritionCleanScreen,
        alt: "FitCo nutrition screen",
      },
      {
        title: "Progress",
        body: "Trends, streaks and a cleaner picture of consistency.",
        src: progressScreen,
        alt: "FitCo progress screen",
      },
      {
        title: "Routes",
        body: "Create and follow outdoor routes with live session progress.",
        src: routesLiveScreen,
        alt: "FitCo active route screen",
      },
      {
        title: "Community",
        body: "Posts, reactions and groups with moderation-first defaults.",
        src: communityCleanScreen,
        alt: "FitCo community screen",
      },
      {
        title: "Chats",
        body: "Direct and group messages around real fitness goals.",
        src: chatsScreen,
        alt: "FitCo chats screen",
      },
      {
        title: "Profile",
        body: "Identity, achievements and public progress controls.",
        src: profileScreen,
        alt: "FitCo profile screen",
      },
    ],
    rhythmTitle: "One rhythm, not five disconnected tools.",
    rhythmBody:
      "FitCo connects what you eat, how you train, where you move and the community around you, so the app feels like a single daily system.",
    routes: {
      eyebrow: "Routes",
      title: "Outdoor movement that feels made for people.",
      sub: "Create walking, running or cycling routes, preview the map and follow your next point during an active session.",
      bullets: [
        "Fullscreen route creation",
        "Nearby places and map picking",
        "Live route progress",
        "Distance, time, speed and elevation",
      ],
    },
    club: {
      eyebrow: "FitCo Club",
      title: "Progress should feel useful, not just decorative.",
      sub: "Levels, badges and FitCoins give consistency a visible reward loop. Keep the tone premium, calm and earned.",
      bullets: ["Badges with rarity", "FitCoins wallet", "Profile perks", "History and unlocks"],
    },
    privacy: [
      {
        title: "You choose what becomes social",
        body: "Community features are opt-in, with privacy controls for profile details and location context.",
      },
      {
        title: "Estimates stay honest",
        body: "Nutrition and AI scan outputs are clearly framed as estimates, not medical advice.",
      },
      {
        title: "Moderation comes first",
        body: "Reports, blocks and admin tools are designed into the community layer.",
      },
    ],
    finalStrip:
      "Built as one product: daily rhythm, nutrition, training, routes, progress, community and rewards.",
  },
  bg: {
    heroKicker: "Ранен достъп 2026",
    heroLine:
      "Спокойно фитнес приложение за храна, движение, прогрес и хора, които ти помагат да останеш постоянен.",
    heroTrust: "Поверително по подразбиране. За реални дни. Не е медицински съвет.",
    productTour: "Виж продукта",
    seeScreens: "Виж екраните",
    availableSoon: "Достъпът за iOS и Android ще се отваря поетапно.",
    stats: [
      { value: "5", label: "основни зони" },
      { value: "1", label: "дневен ритъм" },
      { value: "BG + EN", label: "езици" },
    ],
    screenshotEyebrow: "Вътре във FitCo",
    screenshotTitle: "Приложението е главният герой.",
    screenshotBody:
      "Без generic dashboard илюстрации. Това са реални FitCo екрани: дневен ритъм, хранене, прогрес, общност, чатове и профил.",
    screens: [
      {
        title: "Дневен ритъм",
        body: "Храна, вода и движение в един спокоен изглед.",
        src: todayCleanScreen,
        alt: "FitCo дневен ритъм екран",
      },
      {
        title: "Хранене",
        body: "Макроси, вода и дневник без излишен шум.",
        src: nutritionCleanScreen,
        alt: "FitCo хранене екран",
      },
      {
        title: "Прогрес",
        body: "Трендове, поредици и по-ясна картина на постоянството.",
        src: progressScreen,
        alt: "FitCo прогрес екран",
      },
      {
        title: "Маршрути",
        body: "Създавай и следвай маршрути с live прогрес по време на сесия.",
        src: routesLiveScreen,
        alt: "FitCo активен маршрут екран",
      },
      {
        title: "Общност",
        body: "Постове, реакции и групи с moderation-first подход.",
        src: communityCleanScreen,
        alt: "FitCo общност екран",
      },
      {
        title: "Чатове",
        body: "Лични и групови съобщения около реални фитнес цели.",
        src: chatsScreen,
        alt: "FitCo чатове екран",
      },
      {
        title: "Профил",
        body: "Идентичност, постижения и контрол над публичния прогрес.",
        src: profileScreen,
        alt: "FitCo профил екран",
      },
    ],
    rhythmTitle: "Един ритъм, не пет отделни инструмента.",
    rhythmBody:
      "FitCo свързва какво ядеш, как тренираш, къде се движиш и общността около теб, така че приложението да се усеща като една дневна система.",
    routes: {
      eyebrow: "Маршрути",
      title: "Движение навън, направено за хора.",
      sub: "Създавай маршрути за ходене, бягане или колело, преглеждай картата и следвай следващата точка по време на активна сесия.",
      bullets: [
        "Fullscreen създаване",
        "Nearby места и избор от карта",
        "Live прогрес по маршрута",
        "Разстояние, време, скорост и денивелация",
      ],
    },
    club: {
      eyebrow: "FitCo Club",
      title: "Прогресът трябва да има смисъл, не само украса.",
      sub: "Нива, badges и FitCoins дават видима награда за постоянство. Тонът остава премиум, спокоен и заслужен.",
      bullets: ["Badges с rarity", "FitCoins портфейл", "Perks за профила", "История и unlocks"],
    },
    privacy: [
      {
        title: "Ти избираш кое е социално",
        body: "Общността е по желание, с контрол над профилни детайли и location контекст.",
      },
      {
        title: "Оценките са честни",
        body: "Храненето и AI скенерът са ясно описани като приблизителни оценки, не медицински съвет.",
      },
      {
        title: "Модерацията е заложена",
        body: "Докладване, блокиране и админ инструменти са част от community слоя.",
      },
    ],
    finalStrip:
      "Един продукт: дневен ритъм, хранене, тренировки, маршрути, прогрес, общност и награди.",
  },
} as const;

function HomePage() {
  const { t, lang } = useLang();
  const c = copy[lang];

  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;
    const id = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <PageShell>
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-ink text-ink-foreground">
        <img
          src={heroAthlete}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-28"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.16_0.025_165/0.96),oklch(0.18_0.025_165/0.80)_48%,oklch(0.16_0.025_165/0.45))]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        />
        <div className="pointer-events-none absolute -bottom-28 -right-20 z-0 block opacity-35 sm:-right-10 lg:hidden">
          <PhoneFrame
            src={todayCleanScreen}
            alt=""
            loading="eager"
            className="w-[225px] sm:w-[255px]"
          />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-12 px-4 pb-12 pt-24 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pt-28">
          <div className="max-w-3xl">
            <Reveal y={16}>
              <span className="pill border border-white/10 bg-white/10 text-ink-foreground">
                {c.heroKicker}
              </span>
            </Reveal>
            <Reveal delay={80} y={18}>
              <h1 className="mt-5 font-display text-6xl font-bold leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
                Fit<span className="text-primary">Co</span>
              </h1>
            </Reveal>
            <Reveal delay={140} y={18}>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-ink-foreground/78 sm:text-2xl sm:leading-9">
                {c.heroLine}
              </p>
            </Reveal>
            <Reveal delay={210} y={18}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#waitlist"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {t.cta.waitlist}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#screens"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 text-sm font-bold text-ink-foreground backdrop-blur transition-all hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {c.seeScreens}
                </a>
              </div>
            </Reveal>
            <Reveal delay={280} y={18}>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                {c.stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur"
                  >
                    <p className="font-display text-2xl font-bold">{item.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-foreground/55">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={340} y={18}>
              <p className="mt-5 flex max-w-xl items-center gap-2 text-sm text-ink-foreground/60">
                <ShieldCheck className="h-4 w-4 text-primary" />
                {c.heroTrust}
              </p>
            </Reveal>
          </div>

          <div className="relative mx-auto h-[540px] w-full max-w-[620px] sm:h-[610px] lg:mx-0">
            <Parallax speed={0.06} className="absolute left-0 top-20 hidden md:block">
              <motion.div
                initial={{ opacity: 0, rotate: -8, x: -26 }}
                animate={{ opacity: 0.9, rotate: -8, x: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
              >
                <PhoneFrame
                  src={nutritionCleanScreen}
                  alt="FitCo nutrition screen"
                  className="w-[230px] sm:w-[260px]"
                />
              </motion.div>
            </Parallax>
            <motion.div
              className="absolute left-1/2 top-4 z-20 -translate-x-1/2"
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <PhoneFrame
                src={todayCleanScreen}
                alt="FitCo daily rhythm screen"
                loading="eager"
                className="w-[260px] sm:w-[300px] lg:w-[325px]"
              />
            </motion.div>
            <Parallax speed={-0.04} className="absolute right-0 top-28 hidden md:block">
              <motion.div
                initial={{ opacity: 0, rotate: 8, x: 26 }}
                animate={{ opacity: 0.92, rotate: 8, x: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
              >
                <PhoneFrame
                  src={communityCleanScreen}
                  alt="FitCo community screen"
                  className="w-[230px] sm:w-[260px]"
                />
              </motion.div>
            </Parallax>
            <Reveal
              delay={520}
              className="absolute bottom-4 left-1/2 z-30 w-[min(92%,520px)] -translate-x-1/2 rounded-[2rem] border border-white/10 bg-ink/80 p-4 shadow-elevated backdrop-blur-xl"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    {c.productTour}
                  </p>
                  <p className="mt-1 text-sm text-ink-foreground/70">{c.availableSoon}</p>
                </div>
                <a
                  href="#features"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                  aria-label={t.cta.learnMore}
                >
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="screens" className="scroll-mt-24 bg-ink py-16 text-ink-foreground sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <span className="pill border border-white/10 bg-white/10 text-ink-foreground">
                {c.screenshotEyebrow}
              </span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {c.screenshotTitle}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink-foreground/66">
                {c.screenshotBody}
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 text-sm text-ink-foreground/64">
              {c.finalStrip}
            </div>
          </Reveal>
          <div className="mt-12 flex snap-x gap-6 overflow-x-auto pb-6 [scrollbar-width:thin]">
            {c.screens.map((screen, index) => (
              <Reveal
                key={screen.title}
                delay={index * 55}
                className="min-w-[260px] snap-center sm:min-w-[300px]"
              >
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-4 shadow-elevated"
                >
                  <PhoneFrame
                    src={screen.src}
                    alt={screen.alt}
                    className="w-[230px] sm:w-[255px]"
                  />
                  <div className="px-2 pb-1 pt-5">
                    <h3 className="text-xl font-bold">{screen.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-foreground/62">{screen.body}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-24 bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="pill">{t.nav.features}</span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{c.rhythmTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{c.rhythmBody}</p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.featuresGrid.items.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <Reveal key={feature.title} delay={(index % 4) * 70}>
                  <motion.article
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="group h-full rounded-[1.75rem] border border-border bg-card p-6 shadow-soft transition-colors hover:border-primary/35"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.body}</p>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <ProductSection
        id="nutrition"
        eyebrow={t.nutrition.eyebrow}
        title={t.nutrition.title}
        sub={t.nutrition.sub}
        bullets={t.nutrition.bullets}
        screen={nutritionCleanScreen}
        screenAlt="FitCo nutrition dashboard"
        Icon={Utensils}
        accent="food"
      />

      <ProductSection
        id="training"
        eyebrow={t.training.eyebrow}
        title={t.training.title}
        sub={t.training.sub}
        bullets={t.training.bullets}
        screen={planScreen}
        screenAlt="FitCo workout plan screen"
        Icon={Dumbbell}
        reverse
        dark
        accent="training"
      />

      <ProductSection
        id="routes"
        eyebrow={c.routes.eyebrow}
        title={c.routes.title}
        sub={c.routes.sub}
        bullets={c.routes.bullets}
        screen={routesLiveScreen}
        screenAlt="FitCo route activity screen"
        Icon={Map}
        accent="routes"
      />

      <ProductSection
        id="community"
        eyebrow={t.community.eyebrow}
        title={t.community.title}
        sub={t.community.sub}
        bullets={t.community.bullets}
        screen={communityCleanScreen}
        screenAlt="FitCo community feed screen"
        Icon={Users}
        reverse
        dark
        accent="community"
      />

      <section id="rewards" className="scroll-mt-24 bg-background py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <span className="pill">{c.club.eyebrow}</span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{c.club.title}</h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">{c.club.sub}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {c.club.bullets.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft"
                  >
                    <Star className="h-5 w-5 text-primary" />
                    <span className="text-sm font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120} className="relative">
              <div className="absolute inset-6 rounded-[3rem] bg-primary/20 blur-3xl" />
              <div className="relative rounded-[2.5rem] bg-ink p-6 text-ink-foreground shadow-elevated">
                <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
                  <PhoneFrame
                    src={progressScreen}
                    alt="FitCo progress and rewards screen"
                    className="w-[245px]"
                  />
                  <div className="space-y-3">
                    {[
                      { icon: Trophy, label: t.progress.bullets[0] },
                      { icon: Flame, label: t.progress.bullets[1] },
                      { icon: WalletCards, label: t.progress.bullets[3] },
                      { icon: Sparkles, label: t.progress.bullets[4] },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                      >
                        <Icon className="h-5 w-5 text-primary" />
                        <span className="text-sm font-bold">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-4 lg:grid-cols-3">
            {c.privacy.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-border bg-card p-6 shadow-soft"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <ReviewsSection />
      <FAQSection />
      <CTASection />
    </PageShell>
  );
}

function ProductSection({
  id,
  eyebrow,
  title,
  sub,
  bullets,
  screen,
  screenAlt,
  Icon,
  reverse = false,
  dark = false,
  accent,
}: {
  id: string;
  eyebrow: string;
  title: string;
  sub: string;
  bullets: readonly string[];
  screen: string;
  screenAlt: string;
  Icon: typeof Activity;
  reverse?: boolean;
  dark?: boolean;
  accent: "food" | "training" | "routes" | "community";
}) {
  const content = (
    <Reveal>
      <span
        className={`pill ${dark ? "border border-white/10 bg-white/10 text-ink-foreground" : ""}`}
      >
        {eyebrow}
      </span>
      <div className="mt-5 flex items-start gap-4">
        <div
          className={`mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${dark ? "bg-white/10 text-primary" : "bg-primary/15 text-primary"}`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      </div>
      <p
        className={`mt-5 max-w-2xl text-lg leading-8 ${dark ? "text-ink-foreground/68" : "text-muted-foreground"}`}
      >
        {sub}
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {bullets.map((item, index) => (
          <Reveal
            key={item}
            delay={index * 40}
            className={`flex items-start gap-3 rounded-2xl border p-4 ${dark ? "border-white/10 bg-white/[0.055]" : "border-border bg-card"}`}
          >
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span
              className={`text-sm font-semibold leading-6 ${dark ? "text-ink-foreground/78" : ""}`}
            >
              {item}
            </span>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );

  const media = (
    <Reveal delay={120} className="relative flex justify-center">
      <div
        className={`absolute inset-x-10 top-12 h-80 rounded-full blur-3xl ${accentGlow[accent]}`}
      />
      <Parallax speed={0.05}>
        <motion.div
          whileHover={{ y: -7, rotate: reverse ? -1.5 : 1.5 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
        >
          <PhoneFrame
            src={screen}
            alt={screenAlt}
            className="w-[260px] sm:w-[305px] lg:w-[330px]"
          />
        </motion.div>
      </Parallax>
    </Reveal>
  );

  return (
    <section
      id={id}
      className={`scroll-mt-24 overflow-hidden py-20 sm:py-24 ${dark ? "bg-ink text-ink-foreground" : "bg-surface"}`}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        {reverse ? (
          <>
            <div className="lg:order-2">{content}</div>
            <div className="lg:order-1">{media}</div>
          </>
        ) : (
          <>
            {content}
            {media}
          </>
        )}
      </div>
    </section>
  );
}

const accentGlow = {
  food: "bg-primary/20",
  training: "bg-coral/20",
  routes: "bg-lemon/20",
  community: "bg-primary/20",
} as const;
