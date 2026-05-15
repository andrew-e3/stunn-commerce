import Footer from "components/layout/footer";
import Image from "next/image";
import Link from "next/link";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";
const PDP = "/products/focus-without-caffeine";

/* ── Shared helpers ─────────────────────────────── */

function CtaBtn({
  href = PDP,
  text,
  icon,
  variant = "primary",
}: {
  href?: string;
  text: string;
  icon?: string;
  variant?: "primary" | "outline" | "white";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all";
  const styles = {
    primary: `${base} bg-[#7C3AED] text-white hover:bg-[#6D28D9]`,
    outline: `${base} border-2 border-white text-white hover:bg-white hover:text-[#111111]`,
    white: `${base} bg-white text-[#111111] hover:bg-white/90`,
  };
  return (
    <Link href={href} className={styles[variant]}>
      {icon && <img src={icon} alt="" className="h-4 w-4" />}
      {text}
    </Link>
  );
}

function Tag({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={`mb-3 inline-block rounded-full border px-3 py-1 text-xs font-medium tracking-widest ${light ? "border-white/40 text-white" : "border-[#111111] text-[#111111]"}`}
    >
      {children}
    </span>
  );
}

function Guarantee({ light = false }: { light?: boolean }) {
  return (
    <p
      className={`mt-2 flex items-center gap-1 text-xs ${light ? "text-white/60" : "text-[#111111]/50"}`}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      30-Day Guarantee
    </p>
  );
}

/* ── Data ───────────────────────────────────────── */

const AVATARS = [
  "img-avatar-3.jpg",
  "img-avatar-4.jpg",
  "img-avatar-5.jpg",
  "img-avatar-v1.jpg",
];

const BENEFITS_GRID = [
  {
    heading: "Steady Focus",
    image: `${CDN}img-stunn-man-holding-a-sachet-of-stunn-coffee.png`,
  },
  {
    heading: "No Jitters",
    image: `${CDN}img-stunn-decaf-coffee-stick-pour-adaptogens-nootropics-480-x-745.jpg`,
  },
  {
    heading: "No Crash",
    image: `${CDN}img-a-man-sipping-a-cup-of-coffee-while-holding-stunn-sachet_1.webp`,
  },
  {
    heading: "Sleep-Friendly",
    image: `${CDN}img-stunn-coffee-product-shot.png`,
  },
];

const BENEFITS_HERO = [
  {
    number: "01",
    title: "Calm, steady focus",
    description:
      "Supports mental clarity without overstimulating your nervous system.",
  },
  {
    number: "02",
    title: "No jitters or anxiety",
    description:
      "Caffeine-free by design, so there is no racing heart or shaky feeling.",
  },
  {
    number: "03",
    title: "No crash later on",
    description: "Focus without the spike-and-drop effect of caffeine.",
  },
  {
    number: "04",
    title: "Sleep-friendly",
    description:
      "Enjoy STUNN in the morning, afternoon, or evening without disrupting sleep.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I quit caffeine a few months ago but missed my morning ritual. STUNN changed everything — I get the taste of coffee without the jitters or crashes. It's calm, focused energy in a cup.",
    name: "Sarah M., 34",
    label: "Customer",
  },
  {
    quote:
      "Coffee used to make me anxious, but STUNN lets me enjoy my favorite ritual without the racing heart. I feel alert, productive, and surprisingly relaxed at the same time.",
    name: "James T., 29",
    label: "Customer",
  },
  {
    quote:
      "I love coffee, but a 3 PM cup always messed with my sleep. With STUNN, I can enjoy my afternoon ritual and still sleep well. Smooth energy that lasts without the crash.",
    name: "Emma L., 41",
    label: "Customer",
  },
];

const FAQS = [
  {
    question: "What makes STUNN different from regular coffee?",
    answer:
      "STUNN gives you the experience of coffee without the usual downsides. It's decaf, but enhanced with functional ingredients like Lion's Mane, Rhodiola, Cordyceps, and L-Theanine to support focus, calm, and steady energy. Instead of spikes and crashes, you get a smoother, more controlled way to enjoy coffee.",
  },
  {
    question: "How do I prepare STUNN?",
    answer:
      "Simply mix one sachet with hot/cold water, stir, and enjoy. You can also customize it with milk or your preferred sweetener depending on your taste. It's quick, easy, and designed to fit seamlessly into your daily routine.",
  },
  {
    question: "When can I drink STUNN?",
    answer:
      "STUNN is made to be enjoyed anytime, whether it's morning, mid-day, or late at night. Since it's decaf, it won't disrupt your sleep or leave you feeling wired. It's perfect for work, workouts, or winding down.",
  },
  {
    question: "How long does one box last?",
    answer:
      "This depends on how often you drink it, but typically one box lasts around 2 to 4 weeks. If you enjoy one cup daily, it can last close to a month. It's an easy way to stay consistent with your coffee routine.",
  },
];

export const metadata = {
  title: "STUNN - Decaf Coffee That Keeps You Sharp",
  description:
    "Functional decaf coffee with Lion's Mane, Rhodiola, Cordyceps, and L-Theanine. Calm focus, no jitters, no crash.",
  openGraph: { type: "website" },
};

export default function HomePage() {
  return (
    <>
      {/* ── 1. Text Marquee ───────────────────────────── */}
      <section className="overflow-hidden bg-white py-4">
        <div
          className="animate-marquee"
          style={{ animationDuration: "28s" }}
          aria-hidden="true"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="px-6 font-[family-name:var(--font-anton)] text-[clamp(72px,10vw,136px)] uppercase leading-none text-[#111111]"
            >
              FOCUS WITHOUT CAFFEINE
            </span>
          ))}
        </div>
      </section>

      {/* ── 2. Hero Split ─────────────────────────────── */}
      <section className="bg-white">
        <div className="grid min-h-[560px] lg:grid-cols-2">
          {/* Left: copy */}
          <div className="flex flex-col items-center justify-center px-8 py-12 text-center lg:px-14 lg:py-16">
            {/* Star badge — pill with avatars */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#fef8dd] px-4 py-2">
              <span className="text-[#EFAF00]">★★★★★</span>
              <span className="text-sm font-bold text-[#111111]">4.8</span>
              <span className="text-sm text-[#111111]/65">Excellent</span>
              <div className="flex -space-x-2">
                {AVATARS.slice(0, 3).map((a) => (
                  <Image
                    key={a}
                    src={`${CDN}${a}`}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full border-2 border-[#fef8dd] object-cover"
                  />
                ))}
              </div>
            </div>

            <h1 className="mb-5 font-[family-name:var(--font-anton)] text-[clamp(40px,5vw,72px)] uppercase leading-[1.0] text-[#111111]">
              COFFEE, WITHOUT THE
              <br />
              CONSEQUENCES.
            </h1>
            <p className="mb-7 max-w-md text-base leading-relaxed text-[#111111]/65">
              <strong>STUNN</strong> is a functional decaf coffee that delivers
              calm, steady focus, without overstimulating your nervous system.
            </p>
            <div className="mb-4">
              <CtaBtn text="Try STUNN And Save 23% 🎁" />
            </div>
            <div className="space-y-1 text-sm text-[#111111]/50">
              <p>30 sachets • One month supply</p>
              <p>Subscribe or buy once • Cancel anytime</p>
            </div>
          </div>

          {/* Right: product image - bleeds to edge */}
          <div className="relative min-h-[400px] overflow-hidden">
            <Image
              src={`${CDN}3-boxes-of-stunn-1080x1080.webp`}
              alt="Three STUNN boxes"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── 3. Benefits Grid ──────────────────────────── */}
      <section className="bg-white">
        <div className="grid grid-cols-2 border-t border-[#111111]/10 lg:grid-cols-4">
          {BENEFITS_GRID.map((b, i) => (
            <div
              key={b.heading}
              className={`flex flex-col border-[#111111]/10 ${i > 0 ? "border-l" : ""}`}
            >
              {/* Label above image */}
              <div className="border-b border-[#111111]/10 px-4 py-3">
                <p className="font-[family-name:var(--font-anton)] text-sm uppercase tracking-widest text-[#111111]">
                  {b.heading}
                </p>
              </div>
              {/* Image below */}
              <div className="relative h-[280px] w-full overflow-hidden lg:h-[440px]">
                <Image
                  src={b.image}
                  alt={b.heading}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4a. Benefits Marquee Band (purple bg) ─────── */}
      <section className="overflow-hidden bg-[#111111] py-4">
        <div
          className="animate-marquee"
          style={{ animationDuration: "32s" }}
          aria-hidden="true"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="px-16 font-[family-name:var(--font-anton)] text-[clamp(56px,8vw,120px)] uppercase leading-none text-white"
            >
              The coffee your day actually deserves
            </span>
          ))}
        </div>
      </section>

      {/* ── 4b. Benefits Hero (split, purple right) ───── */}
      <section className="grid lg:grid-cols-2">
        {/* Left: product image */}
        <div className="relative min-h-[500px] overflow-hidden bg-[#f5f0ee]">
          <Image
            src={`${CDN}img-stunn-coffee.webp`}
            alt="STUNN box and sachet"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Right: purple bg with grid overlay and benefits */}
        <div className="relative flex flex-col justify-center bg-[#111111] px-8 py-14 lg:px-12">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10">
            <Tag light>The Benefits</Tag>
            <h2 className="mb-8 font-[family-name:var(--font-anton)] text-[clamp(32px,4vw,52px)] uppercase leading-tight text-white">
              Everything you want from coffee.
            </h2>
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {BENEFITS_HERO.map((b) => (
                <div key={b.number} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 font-[family-name:var(--font-anton)] text-3xl leading-none text-white/20">
                    {b.number}
                  </span>
                  <div>
                    <p className="font-bold text-white">{b.title}</p>
                    <p className="text-sm text-white/70">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <CtaBtn text="Try STUNN And Save 23% 🎁" variant="outline" />
            <Guarantee light />
          </div>
        </div>
      </section>

      {/* ── 5. Stats Split ───────────────────────────── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-6 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-8">
          {/* Left */}
          <div className="mb-10 lg:mb-0">
            <Tag>The Hidden Costs of Coffee</Tag>
            <h2 className="mb-5 font-[family-name:var(--font-anton)] text-[clamp(28px,4vw,52px)] uppercase leading-tight text-[#111111]">
              Caffeine may not be as simple as it seems.
            </h2>
            <p className="mb-8 text-base leading-relaxed text-[#111111]/65">
              Caffeine, especially at higher intake levels, is linked to an
              increased risk of anxiety symptoms. Research shows that people
              with higher caffeine consumption have a significantly greater risk
              of anxiety compared with those who consume less or none.
            </p>
            <div className="mb-8 grid grid-cols-2 gap-4">
              {[
                {
                  number: "4%",
                  description:
                    "Of people report experiencing anxiety or nervousness linked to caffeine intake",
                },
                {
                  number: "3%",
                  description:
                    "Of adults who drink more than 6 per day report multiple sleep problems",
                },
              ].map((s) => (
                <div
                  key={s.number}
                  className="rounded-lg border-2 border-[#111111] p-5"
                >
                  <p className="mb-2 font-[family-name:var(--font-anton)] text-5xl text-[#111111]">
                    {s.number}
                  </p>
                  <p className="text-xs leading-relaxed text-[#111111]/65">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
            <CtaBtn text="Try STUNN And Save 23% 🎁" />
            <Guarantee />
          </div>

          {/* Right: photo */}
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={`${CDN}img-man-drinking-stunn-coffee.webp`}
              alt="Holding STUNN box"
              width={600}
              height={700}
              className="h-full min-h-[400px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 6. Rich Text ─────────────────────────────── */}
      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-[760px] border-b border-t border-[#111111]/20 px-6 py-12 text-center">
          <Tag>Calm Focus in Every Cup</Tag>
          <p className="mt-4 text-base leading-relaxed text-[#111111]/75 lg:text-lg">
            <strong>STUNN</strong> combines smooth decaf coffee with functional
            ingredients that support calm focus, steady energy, and balanced
            mental clarity. Designed for people who want the ritual of{" "}
            <strong>coffee without jitters, crashes, or disrupted sleep</strong>
            , each sachet helps you enjoy your coffee anytime while supporting
            your overall well-being.
          </p>
        </div>
      </section>

      {/* ── 10. Purple Marquee 2 ─────────────────────── */}
      <section className="overflow-hidden bg-[#111111] py-4">
        <div
          className="animate-marquee"
          style={{ animationDuration: "20s" }}
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6">
              <span className="font-[family-name:var(--font-anton)] text-[clamp(56px,10vw,152px)] uppercase leading-none text-white">
                CALM
              </span>
              <span className="font-[family-name:var(--font-anton)] text-[clamp(40px,6vw,100px)] leading-none text-white/60">
                +
              </span>
              <span className="font-[family-name:var(--font-anton)] text-[clamp(56px,10vw,152px)] uppercase leading-none text-white">
                ENERGY
              </span>
              <span className="font-[family-name:var(--font-anton)] text-[clamp(40px,6vw,100px)] leading-none text-white/60">
                +
              </span>
              <span className="font-[family-name:var(--font-anton)] text-[clamp(56px,10vw,152px)] uppercase leading-none text-white">
                FOCUS
              </span>
              <span className="font-[family-name:var(--font-anton)] text-[clamp(40px,6vw,100px)] leading-none text-white/60">
                +
              </span>
            </span>
          ))}
        </div>
      </section>

      {/* ── 11. Quote Split ──────────────────────────── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-0 lg:grid lg:grid-cols-2">
          {/* Left: tall image */}
          <div className="relative min-h-[400px] overflow-hidden lg:min-h-[600px]">
            <Image
              src={`${CDN}img-andrew-jennings-stunn-founder.webp`}
              alt="Andrew Jennings, STUNN founder"
              fill
              className="object-cover object-top"
            />
          </div>
          {/* Right: content */}
          <div className="flex flex-col justify-center px-8 py-12 lg:px-14">
            <Tag>The STUNN Experience</Tag>
            <blockquote className="mb-4 mt-3 font-[family-name:var(--font-anton)] text-[clamp(24px,3vw,40px)] uppercase leading-tight text-[#111111]">
              &ldquo;I love that I can enjoy coffee without the crash or
              jitters...&rdquo;
            </blockquote>
            <p className="mb-2 font-bold text-[#111111]">
              This is exactly how you&apos;ll feel drinking STUNN
            </p>
            <p className="mb-7 text-base leading-relaxed text-[#111111]/65">
              STUNN gives you everything you love about coffee — the flavor, the
              warmth, the ritual — but none of the downsides.
            </p>
            <CtaBtn text="Try STUNN And Save 23% 🎁" />
            <p className="mt-2 text-xs text-[#111111]/50">
              Your coffee ritual, upgraded. Anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── 12. CTA Banner (sage green) ──────────────── */}
      <section className="relative overflow-hidden bg-[#F7F4FA]">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Coffee + bread — bottom left */}
        <div className="pointer-events-none absolute -bottom-6 -left-6 h-48 w-48 opacity-95 lg:h-72 lg:w-72">
          <img
            src={`${CDN}img-stunn-coffee-and-bread-background-desktop.webp`}
            alt=""
            className="h-full w-full object-cover object-left-bottom"
          />
        </div>
        {/* Coffee + bread — top right, mirrored */}
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-48 w-48 opacity-95 lg:h-72 lg:w-72"
          style={{ transform: "scaleX(-1)" }}
        >
          <img
            src={`${CDN}img-stunn-coffee-and-bread-background-desktop.webp`}
            alt=""
            className="h-full w-full object-cover object-right-top"
          />
        </div>
        <div className="relative flex min-h-[480px] flex-col items-center justify-center px-6 py-16 text-center">
          <Tag>Ready to Upgrade Your Coffee?</Tag>
          <h2 className="mb-4 font-[family-name:var(--font-anton)] text-[clamp(36px,6vw,72px)] uppercase leading-tight text-[#111111]">
            Get STUNN Today
          </h2>
          <p className="mb-8 max-w-md text-base text-[#111111]/80">
            One box gives you 30 sachets of smooth, functional decaf coffee
            delivered straight to your door.
          </p>
          <CtaBtn text="Try STUNN And Save 23% 🎁" />
          <Guarantee />
        </div>
      </section>

      {/* ── 13. Image Panels ─────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {[
          {
            image: `${CDN}img-a-man-sipping-a-cup-of-coffee-while-holding-stunn-sachet_1.webp`,
            heading: "Take Control of Your Day",
            button: "Get Calm Focus Now",
            subtext: "30 sachets per box. Cancel anytime.",
          },
          {
            image: `${CDN}img-stunn-coffee-product-shot.png`,
            heading: "Stay Sharp, Calm, and Energized",
            button: "Fuel Your Day Today",
            subtext: "23% OFF on subscription orders. Cancel anytime.",
          },
        ].map((panel) => (
          <div
            key={panel.heading}
            className="group relative min-h-[500px] overflow-hidden lg:min-h-[650px]"
          >
            <Image
              src={panel.image}
              alt={panel.heading}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="mb-4 font-[family-name:var(--font-anton)] text-[clamp(24px,3vw,40px)] uppercase leading-tight text-white">
                {panel.heading}
              </h2>
              <CtaBtn href={PDP} text={panel.button} variant="white" />
              <p className="mt-3 text-sm text-white/70">{panel.subtext}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── 14. Testimonials ─────────────────────────── */}
      <section className="border-y border-black/10 bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-1">
              <span className="text-[#EFAF00]">★★★★★</span>
              <span className="ml-1 text-sm font-bold text-[#111111]">4.8</span>
            </div>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-[#111111]/50">
              What People Are Saying
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-anton)] text-[clamp(24px,4vw,48px)] uppercase leading-tight text-[#111111]">
              See Why Thousands Are Switching to STUNN
            </h2>
          </div>
          <div className="grid divide-x divide-black/10 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="flex flex-col p-6 lg:p-8">
                <p className="mb-6 flex-1 text-sm leading-relaxed text-[#111111]/75">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={`${CDN}icon-smiley.svg`}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#111111]">{t.name}</p>
                    <p className="text-xs text-[#111111]/50">{t.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 15. FAQ Split ────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-6 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16 lg:px-8">
          {/* Left */}
          <div className="mb-10 flex flex-col justify-start lg:mb-0">
            <Tag>Frequently Asked Questions</Tag>
            <h2 className="mb-6 mt-3 font-[family-name:var(--font-anton)] text-[clamp(36px,5vw,64px)] uppercase leading-tight text-[#111111]">
              Any Questions?
            </h2>
            <CtaBtn text="No? Try STUNN Now" />
            <Guarantee />
          </div>

          {/* Right: accordions */}
          <div className="divide-y divide-[#111111]/15">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-[family-name:var(--font-anton)] text-base uppercase tracking-wide text-[#111111]">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-[#111111] transition-transform duration-200 group-open:rotate-180">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#111111]/65">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 16. Hero Banner ──────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="relative min-h-[500px] lg:min-h-[560px]">
          <Image
            src={`${CDN}img-stunn-coffee-and-bread-background-desktop.webp`}
            alt="STUNN coffee"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#7C3AED]/15" />
          <div className="relative flex min-h-[500px] flex-col items-center justify-center px-6 py-16 text-center text-white lg:min-h-[560px]">
            <Tag light>Time to Upgrade Your Coffee</Tag>
            <h2 className="mb-4 font-[family-name:var(--font-anton)] text-[clamp(32px,6vw,64px)] uppercase leading-tight">
              Smooth Energy. Clear Focus. Every Cup.
            </h2>
            <p className="mb-8 max-w-md text-base text-white/90">
              Stop settling for coffee that spikes your heart rate and crashes
              your day.
            </p>
            <CtaBtn text="Try STUNN And Save 23% 🎁" variant="white" />
            <Guarantee light />
          </div>
        </div>
      </section>

      {/* ── 17. Icon Columns ─────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid divide-x divide-[#111111]/10 border-b border-t border-[#111111]/10 lg:grid-cols-3">
            {[
              {
                icon: `${CDN}icon-package.svg`,
                heading: "Fast Delivery",
                text: "Get STUNN shipped straight to your door. Quick, reliable, hassle-free.",
              },
              {
                icon: `${CDN}icon-exchange.svg`,
                heading: "Subscription Made Easy",
                text: "Never run out. Save up to 23% with subscription orders, and cancel anytime.",
              },
              {
                icon: `${CDN}icon-bolt-circle.svg`,
                heading: "Simple & Convenient",
                text: "One box a month, zero stress, coffee delivered the way you want it.",
              },
            ].map((col) => (
              <div
                key={col.heading}
                className="flex flex-col items-center px-8 py-12 text-center"
              >
                <Image
                  src={col.icon}
                  alt={col.heading}
                  width={40}
                  height={40}
                  className="mb-4 h-10 w-10"
                />
                <p className="mb-2 font-[family-name:var(--font-anton)] text-xl uppercase text-[#111111]">
                  {col.heading}
                </p>
                <p className="text-sm leading-relaxed text-[#111111]/65">
                  {col.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
