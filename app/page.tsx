import Footer from "components/layout/footer";
import Image from "next/image";
import Link from "next/link";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";
const PDP = "/products/focus-without-caffeine";

function CtaBtn({
  href = PDP,
  children,
  variant = "primary",
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
}) {
  const styles = {
    primary:
      "bg-[#7C3AED] text-white shadow-[0_4px_0_0_#5E22B8] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#5E22B8]",
    secondary:
      "border border-[#111111]/20 bg-white text-[#111111] hover:border-[#111111]",
    dark: "bg-[#111111] text-white hover:bg-[#242424]",
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-6 py-4 text-sm font-extrabold transition-all ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`mb-4 text-xs font-bold uppercase tracking-[0.28em] ${
        light ? "text-white/55" : "text-[#111111]/45"
      }`}
    >
      {children}
    </p>
  );
}

const BENEFITS = [
  {
    icon: "icon-focus.svg",
    title: "Calm focus",
    copy: "The lift you want from coffee, without feeling wired.",
  },
  {
    icon: "icon-smile.svg",
    title: "No jitters",
    copy: "Caffeine-free by design, so the cup feels steady.",
  },
  {
    icon: "icon-return.svg",
    title: "No crash",
    copy: "No spike, no rebound, no afternoon tax.",
  },
  {
    icon: "icon-sleep.svg",
    title: "Sleep friendly",
    copy: "Keep the ritual without borrowing from tonight.",
  },
];

const PERSONAS = [
  {
    label: "For the side-effect done crowd",
    title: "A cleaner cup for the same ambitious day.",
    copy: "For people who still want the weekday lift, but are tired of tension, irritability, and the second-cup spiral.",
  },
  {
    label: "For the optimizer",
    title: "Keep your edge without making caffeine your identity.",
    copy: "For founders, operators, and senior ICs who want the productivity cue of coffee without needing a stimulant to feel switched on.",
  },
  {
    label: "For the coffee lover",
    title: "The ritual stays. The rest gets lighter.",
    copy: "For anyone who misses the cup more than the caffeine: the pause, the warmth, and the moment before the day starts again.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I quit caffeine but missed my morning coffee. STUNN gives me the ritual back without the jitters.",
    name: "Sarah M.",
  },
  {
    quote:
      "It feels like coffee for adults who have things to do. Focused, calm, and no afternoon drop.",
    name: "James T.",
  },
  {
    quote:
      "I can finally have an afternoon cup and still sleep properly. That alone makes it worth it.",
    name: "Emma L.",
  },
];

const FAQS = [
  {
    question: "Is STUNN coffee?",
    answer:
      "Yes. STUNN is real decaf instant coffee enhanced with Lion's Mane, Rhodiola, Cordyceps, and L-Theanine for a calmer daily cup.",
  },
  {
    question: "Does it contain caffeine?",
    answer:
      "STUNN is 99.9% caffeine-free, so it keeps the coffee ritual without the stimulant tradeoff.",
  },
  {
    question: "When should I drink it?",
    answer:
      "Morning, afternoon, or evening. Because it is decaf, it is designed to be sleep-friendly and easy to fit into your routine.",
  },
  {
    question: "How do I make it?",
    answer:
      "Mix one sachet with hot or cold water, then add milk or sweetener if you like. It is designed as a simple daily format.",
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
      <section className="bg-white px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="mx-auto grid max-w-[1500px] overflow-hidden rounded-[28px] bg-[#F3EFFB] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex min-h-[620px] flex-col justify-center px-7 py-12 sm:px-10 lg:px-16">
            <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-[#111111]/65">
              <span className="text-[#EFAF00]">★★★★★</span>
              <span className="font-bold text-[#111111]">4.8</span>
              <span>Excellent</span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#111111] px-3 py-1.5 text-xs font-bold text-white sm:ml-0">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#111111]">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                In Stock
              </span>
            </div>

            <Eyebrow>Your next cup</Eyebrow>
            <h1 className="max-w-[720px] text-[clamp(46px,8vw,112px)] font-black uppercase leading-[0.92] tracking-[-0.045em] text-[#111111]">
              Everything you love about coffee. None of what you don't.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#111111]/68 sm:text-lg">
              STUNN is a caffeine-free coffee ritual for calm focus, steady energy, and better evenings.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaBtn>Shop STUNN - Save up to 25%</CtaBtn>
              <CtaBtn variant="secondary">See how it works</CtaBtn>
            </div>
            <div className="mt-6 grid max-w-xl grid-cols-3 divide-x divide-[#111111]/12 border-y border-[#111111]/12 py-4 text-center text-xs font-semibold text-[#111111]/70">
              <span>No jitters</span>
              <span>No crash</span>
              <span>Sleep friendly</span>
            </div>
          </div>

          <Link href={PDP} className="relative min-h-[480px] overflow-hidden lg:min-h-[720px]">
            <Image
              src={`${CDN}img-stunn-decaf-coffee-stick-pour-adaptogens-nootropics-480-x-745.jpg`}
              alt="STUNN sachet poured into coffee"
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
              priority
            />
          </Link>
        </div>
      </section>

      <section className="bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-[1500px] overflow-hidden rounded-[20px] border border-[#111111]/10 bg-white">
          <div className="grid grid-cols-2 divide-x divide-y divide-[#111111]/10 lg:grid-cols-4 lg:divide-y-0">
            {BENEFITS.map((benefit) => (
              <Link
                key={benefit.title}
                href={PDP}
                className="group flex min-h-[210px] flex-col justify-between p-6 transition-colors hover:bg-[#F3EFFB] sm:p-8"
              >
                <img src={`${CDN}${benefit.icon}`} alt="" className="h-10 w-10" />
                <div>
                  <h2 className="mt-8 text-lg font-extrabold uppercase tracking-tight text-[#111111]">
                    {benefit.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#111111]/60">
                    {benefit.copy}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-[1360px] gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <Eyebrow>Best value</Eyebrow>
            <h2 className="max-w-xl text-[clamp(42px,5.5vw,84px)] font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#111111]">
              Start with three boxes. Save 25%.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#111111]/65">
              Make the switch properly with the best-value subscription: the lowest price per cup, free shipping, and enough STUNN to make the ritual stick.
            </p>
          </div>

          <Link
            href={PDP}
            className="group overflow-hidden rounded-[24px] border border-[#111111]/10 bg-[#F8F6FB] shadow-[0_24px_70px_rgba(17,17,17,0.08)] transition-transform hover:-translate-y-1"
          >
            <div className="grid md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[320px] bg-white">
                <Image
                  src={`${CDN}3-boxes-of-stunn-1080x1080.webp`}
                  alt="Three boxes of STUNN"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-[#7C3AED] px-3 py-1 text-xs font-extrabold text-white">
                    SAVE 25%
                  </span>
                  <span className="text-sm font-semibold text-[#111111]/55">
                    From $1.00 / cup
                  </span>
                </div>
                <h3 className="text-3xl font-black tracking-[-0.03em] text-[#111111]">
                  3 boxes delivered every 3 months
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#111111]/62">
                  90 cups of caffeine-free coffee with Lion's Mane, Rhodiola, Cordyceps, and L-Theanine.
                </p>
                <div className="mt-7 grid gap-3 text-sm font-semibold text-[#111111]/75 sm:grid-cols-3">
                  <span>Free shipping</span>
                  <span>Cancel anytime</span>
                  <span>30-day guarantee</span>
                </div>
                <div className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-[#7C3AED] px-6 py-4 text-sm font-extrabold text-white shadow-[0_4px_0_0_#5E22B8] transition-transform group-hover:-translate-y-0.5">
                  Shop the subscription
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1500px] rounded-[28px] bg-[#F3EFFB] px-7 py-12 sm:px-10 lg:px-16 lg:py-18">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Eyebrow>The STUNN shift</Eyebrow>
              <h2 className="max-w-4xl text-[clamp(44px,6.5vw,98px)] font-black uppercase leading-[0.94] tracking-[-0.045em] text-[#111111]">
                Keep the ritual. Feel clear again.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#111111]/65 sm:text-lg">
                Coffee is not the problem. The dependency loop is. STUNN keeps the cup, the pause, and the daily signal, while removing the stimulant tradeoff.
              </p>
            </div>

            <div className="overflow-hidden rounded-[22px] border border-[#111111]/10 bg-white">
              {[
                ["01", "The cup stays", "Same ritual, warmer pace, better control."],
                ["02", "The edge feels calmer", "Adaptogens and nootropics support focus without force."],
                ["03", "The crash fades", "No caffeine spike means no rebound tax later."],
                ["04", "Evenings get easier", "A coffee habit that does not borrow from sleep."],
              ].map(([number, title, copy]) => (
                <div key={number} className="grid grid-cols-[56px_1fr] gap-4 border-b border-[#111111]/10 p-5 last:border-b-0">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7C3AED] text-xs font-extrabold text-white">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-[-0.02em] text-[#111111]">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#111111]/62">
                      {copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid border-t border-[#111111]/12 pt-8 lg:grid-cols-3 lg:divide-x lg:divide-[#111111]/12">
            {PERSONAS.map((persona) => (
              <Link key={persona.label} href={PDP} className="block py-5 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#111111]/42">
                  {persona.label}
                </p>
                <h3 className="text-2xl font-black uppercase leading-[1.05] tracking-[-0.03em] text-[#111111]">
                  {persona.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#111111]/62">
                  {persona.copy}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-[1500px] overflow-hidden rounded-[28px] border border-[#111111]/10 lg:grid-cols-2">
          <div className="relative min-h-[420px] lg:min-h-[680px] lg:order-2">
            <Image
              src={`${CDN}img-stunn-man-holding-a-sachet-of-stunn-coffee.png`}
              alt="STUNN sachet and coffee ritual"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center bg-white p-7 sm:p-10 lg:p-14">
            <Eyebrow>What is inside</Eyebrow>
            <h2 className="max-w-xl text-[clamp(40px,5vw,76px)] font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#111111]">
              Decaf coffee, upgraded for daily focus.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#111111]/65">
              Each sachet combines decaf instant coffee with Lion's Mane, Rhodiola, Cordyceps, and L-Theanine. No caffeine dependency. No supplement-shaker ritual. Just a better cup.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-[#111111]/10 bg-[#111111]/10">
              {["99.9% caffeine-free", "Adaptogen support", "Coffee taste", "Single sachet format"].map((item) => (
                <div key={item} className="bg-[#F8F6FB] p-4 text-sm font-extrabold text-[#111111]">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <CtaBtn>Try the ritual</CtaBtn>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#111111]/10 bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>Proof</Eyebrow>
              <h2 className="max-w-3xl text-[clamp(38px,5vw,72px)] font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#111111]">
                Coffee people are switching.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#111111]/65">
              <span className="text-[#EFAF00]">★★★★★</span>
              <strong className="text-[#111111]">4.8</strong>
              <span>from 1,000+ customers</span>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <figure key={testimonial.name} className="rounded-[18px] border border-[#111111]/10 bg-[#F8F6FB] p-6">
                <blockquote className="text-lg font-semibold leading-relaxed text-[#111111]">
                  "{testimonial.quote}"
                </blockquote>
                <figcaption className="mt-8 text-sm font-bold text-[#111111]/60">
                  {testimonial.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-[1360px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="max-w-md text-[clamp(40px,5vw,72px)] font-black uppercase leading-[0.95] tracking-[-0.04em] text-[#111111]">
              A better cup should feel simple.
            </h2>
            <div className="mt-8">
              <CtaBtn>Shop STUNN</CtaBtn>
            </div>
          </div>
          <div className="grid gap-3">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group rounded-[16px] border border-[#111111]/10 bg-white p-5 shadow-[0_12px_40px_rgba(17,17,17,0.04)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                  <span className="text-lg font-extrabold text-[#111111]">{faq.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3EFFB] text-[#7C3AED] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#111111]/65">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <div className="mx-auto grid max-w-[1360px] overflow-hidden rounded-[28px] bg-[#F3EFFB] lg:grid-cols-[1fr_0.8fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-16">
            <Eyebrow>Start your ritual</Eyebrow>
            <h2 className="max-w-3xl text-[clamp(42px,6vw,86px)] font-black uppercase leading-[0.94] tracking-[-0.045em] text-[#111111]">
              Your next coffee ritual starts here.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#111111]/65">
              Everything you love about coffee, rebuilt for calm focus, better evenings, and a cleaner daily rhythm.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaBtn>Get STUNN from $1.00/cup</CtaBtn>
              <span className="text-sm font-semibold text-[#111111]/55">
                Save up to 25% + free shipping
              </span>
            </div>
          </div>
          <Link href={PDP} className="relative min-h-[360px] lg:min-h-[520px]">
            <Image
              src={`${CDN}3-boxes-of-stunn-1080x1080.webp`}
              alt="STUNN boxes"
              fill
              className="object-cover"
            />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
