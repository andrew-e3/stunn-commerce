import Footer from "components/layout/footer";
import Image from "next/image";
import Link from "next/link";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";
const PDP = "/products/focus-without-caffeine";

export const metadata = {
  title: "About Us - STUNN",
  description:
    "STUNN was created for people who love coffee but not what it does to them. Learn the story behind the brand.",
};

const values = [
  {
    icon: `${CDN}icon-focus.svg`,
    title: "Calm Focus",
    description:
      "We believe productivity shouldn't come at the cost of your wellbeing. Every cup of STUNN is designed to help you stay sharp without the anxiety.",
  },
  {
    icon: `${CDN}icon-sleep.svg`,
    title: "Sleep Friendly",
    description:
      "Coffee shouldn't ruin your nights. STUNN is caffeine-free, so you can enjoy it morning, afternoon, or evening without compromising sleep.",
  },
  {
    icon: `${CDN}icon-energy.svg`,
    title: "Clean Energy",
    description:
      "Powered by Lion's Mane, Rhodiola, Cordyceps, and L-Theanine — ingredients that support your body, not overstimulate it.",
  },
  {
    icon: `${CDN}icon-heart-outline.svg`,
    title: "The Ritual",
    description:
      "Coffee is more than a drink. It's a ritual. STUNN preserves everything you love about that ritual while removing what holds you back.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="border-b border-black/10 bg-white">
        <div className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative mx-auto max-w-screen-xl px-6 py-20 text-center lg:py-28">
            <span className="mb-4 inline-block rounded-full border border-black/20 px-3 py-1 text-xs font-medium tracking-widest text-[#111111]/60">
              Our Story
            </span>
            <h1 className="mb-6 font-[family-name:var(--font-anton)] text-[clamp(40px,6vw,80px)] uppercase leading-tight text-[#111111]">
              Coffee, Without
              <br />
              the Consequences.
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-[#111111]/65">
              STUNN was built for people who love coffee but not how it makes
              them feel. We kept everything great about coffee and removed what
              holds you back.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOUNDER STORY ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl lg:grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[440px] overflow-hidden lg:min-h-[600px]">
            <Image
              src={`${CDN}img-andrew-jennings-stunn-founder.webp`}
              alt="Andrew Jennings, founder of STUNN"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          {/* Copy */}
          <div className="flex flex-col justify-center px-8 py-14 lg:px-14">
            <span className="mb-3 inline-block rounded-full border border-[#111111]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#111111]">
              The Founder
            </span>
            <h2 className="mb-4 font-[family-name:var(--font-anton)] text-[clamp(28px,4vw,52px)] uppercase leading-tight text-[#111111]">
              Why I Created STUNN
            </h2>
            <p className="mb-2 text-sm font-semibold text-[#111111]/75">
              Because coffee shouldn&apos;t leave you feeling worse than before
            </p>
            <p className="mb-5 text-base leading-relaxed text-[#111111]/65">
              I&apos;ve always loved coffee, but I didn&apos;t love how it made
              me feel. The jitters, the crashes, and the nights where sleep just
              wouldn&apos;t come. I tried cutting back, switching brands, even
              quitting, but nothing really worked.
            </p>
            <p className="mb-7 text-base leading-relaxed text-[#111111]/65">
              So I decided to create a better option. STUNN is built to keep
              everything we love about coffee, while removing what we
              don&apos;t. A smoother, more balanced experience you can enjoy
              anytime, without second-guessing how you&apos;ll feel after.
            </p>
            <p className="mb-6 font-[family-name:var(--font-anton)] text-sm uppercase tracking-widest text-[#111111]">
              ANDREW JENNINGS
            </p>
            <p className="mb-7 text-xs text-[#111111]/50">Founder, STUNN</p>
            <Link
              href={PDP}
              className="inline-flex items-center gap-2 self-start rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_5px_0_0_#43256F] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#43256F]"
            >
              Try STUNN Today
            </Link>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="overflow-hidden bg-[#111111] py-4">
        <div
          className="animate-marquee"
          style={{ animationDuration: "28s" }}
          aria-hidden="true"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="px-12 font-[family-name:var(--font-anton)] text-[clamp(56px,8vw,112px)] uppercase leading-none text-white"
            >
              Focus Without Caffeine
            </span>
          ))}
        </div>
      </section>

      {/* ── VALUES GRID ── */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block rounded-full border border-[#111111]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#111111]">
              What We Stand For
            </span>
            <h2 className="font-[family-name:var(--font-anton)] text-[clamp(28px,4vw,52px)] uppercase leading-tight text-[#111111]">
              Built on These Values
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex flex-col rounded-xl border border-[#111111]/15 bg-white/50 p-8"
              >
                <Image
                  src={v.icon}
                  alt={v.title}
                  width={40}
                  height={40}
                  className="mb-4 h-10 w-10"
                />
                <h3 className="mb-3 font-[family-name:var(--font-anton)] text-xl uppercase text-[#111111]">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#111111]/65">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT IMAGE SPLIT ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl lg:grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-14 lg:px-14">
            <span className="mb-3 inline-block rounded-full border border-[#111111]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#111111]">
              The Product
            </span>
            <h2 className="mb-5 font-[family-name:var(--font-anton)] text-[clamp(28px,4vw,52px)] uppercase leading-tight text-[#111111]">
              What&apos;s Inside Every Sachet
            </h2>
            <p className="mb-6 text-base leading-relaxed text-[#111111]/65">
              Each STUNN sachet is packed with smooth decaf coffee and four
              functional ingredients chosen to support your mind and body
              throughout the day.
            </p>
            <ul className="mb-8 space-y-3">
              {[
                {
                  name: "Lion's Mane",
                  benefit: "Focus, memory, and mental clarity",
                },
                {
                  name: "Rhodiola",
                  benefit: "Stress reduction and steady energy",
                },
                {
                  name: "Cordyceps",
                  benefit: "Natural energy without overstimulation",
                },
                {
                  name: "L-Theanine",
                  benefit: "Calm focus and relaxed alertness",
                },
              ].map((ing) => (
                <li key={ing.name} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 font-bold text-[#111111]">✓</span>
                  <span>
                    <span className="font-bold text-[#111111]">{ing.name}</span>
                    <span className="text-[#111111]/65"> — {ing.benefit}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href={PDP}
              className="inline-flex items-center gap-2 self-start rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_5px_0_0_#43256F] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#43256F]"
            >
              Shop STUNN
            </Link>
          </div>
          <div className="relative min-h-[400px] overflow-hidden">
            <Image
              src={`${CDN}img-stunn-coffee-product-shot.png`}
              alt="STUNN coffee product"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden bg-[#F7F4FA]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="pointer-events-none absolute -bottom-6 -left-6 h-48 w-48 opacity-95 lg:h-72 lg:w-72">
          <img
            src={`${CDN}img-stunn-coffee-and-bread-background-desktop.webp`}
            alt=""
            className="h-full w-full object-cover object-left-bottom"
          />
        </div>
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
        <div className="relative flex min-h-[400px] flex-col items-center justify-center px-6 py-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-[#111111]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#111111]">
            Ready to Start?
          </span>
          <h2 className="mb-4 font-[family-name:var(--font-anton)] text-[clamp(36px,6vw,72px)] uppercase leading-tight text-[#111111]">
            Try STUNN Today
          </h2>
          <p className="mb-8 max-w-md text-base text-[#111111]/80">
            30 sachets. One month supply. Subscribe or buy once.
          </p>
          <Link
            href={PDP}
            className="inline-flex items-center gap-2 rounded-lg bg-[#5A3493] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#4F2D82]"
          >
            Try STUNN And Save 25% 🎁
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
