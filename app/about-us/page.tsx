import Footer from "components/layout/footer";
import { BEST_VALUE_PER_DAY_LABEL } from "lib/pricing";
import Image from "next/image";
import Link from "next/link";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";
const PDP = "/products/focus-without-caffeine";

export const metadata = {
  title: "About STUNN - Keep the Coffee Ritual",
  description:
    "STUNN is decaf coffee rebuilt for calm focus: real coffee taste, functional support, and none of the caffeine loop.",
};

const BELIEFS = [
  {
    label: "Coffee is the cue",
    title: "The ritual matters.",
    copy: "The first cup is not just caffeine. It is a pause, a signal, and a way into the day. STUNN keeps that part intact.",
  },
  {
    label: "Caffeine is the compromise",
    title: "The side effects are not the point.",
    copy: "Jitters, crashes, anxious energy, and sleep tradeoffs are not what people love about coffee. They are what people tolerate.",
  },
  {
    label: "Decaf can do more",
    title: "A better cup should still feel like coffee.",
    copy: "STUNN starts with real decaf instant coffee, then adds functional support for calm focus without turning the ritual into a supplement stack.",
  },
];

const INGREDIENTS = [
  ["Real decaf coffee", "Taste, warmth, and the familiar daily cue."],
  ["Lion's Mane", "Focus and mental clarity support."],
  ["Rhodiola", "Stress resilience and steadier energy."],
  ["Cordyceps", "Daily drive without stimulant intensity."],
  ["L-Theanine", "A calmer, smoother coffee experience."],
];

const PRINCIPLES = [
  "Coffee first, supplement second.",
  "Calm focus over stimulant intensity.",
  "Simple sachets over complicated routines.",
  "Useful daily support without the caffeine debt.",
];

function Cta({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline";
}) {
  const styles = {
    primary:
      "bg-[#5A3493] text-white shadow-[0_5px_0_0_#43256F] hover:bg-[#111111] hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#43256F]",
    outline:
      "border border-[#111111]/18 bg-white text-[#111111] hover:border-[#111111]",
  };

  return (
    <Link
      href={PDP}
      className={`inline-flex min-h-12 items-center justify-center rounded-[10px] px-6 text-sm font-black uppercase tracking-[0.08em] transition-all ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#111111]/45">
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[calc(100vh-68px)] overflow-hidden bg-[#111111] text-white">
        <Image
          src={`${CDN}img-man-drinking-stunn-coffee.webp`}
          alt="A calm morning coffee ritual with STUNN"
          fill
          className="object-cover object-center opacity-72"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/88 via-[#111111]/52 to-[#111111]/8" />
        <div className="relative flex min-h-[calc(100vh-68px)] items-end px-5 py-12 sm:px-8 lg:items-center lg:py-20">
          <div className="max-w-[760px]">
            <Label>About STUNN</Label>
            <h1 className="text-[clamp(48px,8vw,118px)] font-black uppercase leading-[0.9] tracking-[-0.052em]">
              Keep the ritual. Lose the caffeine loop.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/76 sm:text-xl">
              STUNN was built for people who love coffee but are done with what
              caffeine keeps taking from the day: calm, sleep, and control.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Cta>Shop STUNN</Cta>
              <span className="text-sm font-semibold text-white/62">
                Real decaf coffee. Functional support. 0mg caffeine.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <Label>The thesis</Label>
            <h2 className="max-w-3xl text-[clamp(42px,6vw,96px)] font-black uppercase leading-[0.92] tracking-[-0.052em] text-[#111111]">
              We are not anti-coffee. We are anti-compromise.
            </h2>
          </div>
          <div className="grid gap-4">
            {BELIEFS.map((belief) => (
              <div
                key={belief.label}
                className="grid gap-4 border-t border-[#111111]/14 py-6 sm:grid-cols-[180px_1fr]"
              >
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#5A3493]">
                  {belief.label}
                </p>
                <div>
                  <h3 className="text-2xl font-black uppercase leading-tight tracking-[-0.03em] text-[#111111]">
                    {belief.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#111111]/64 sm:text-base">
                    {belief.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-screen-xl lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-[620px]">
            <Image
              src="/images/stunn-founder.webp"
              alt="Andrew Jennings, founder of STUNN"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-col justify-center px-7 py-12 sm:px-10 lg:px-16">
            <Label>Founder note</Label>
            <h2 className="max-w-xl text-[clamp(36px,5vw,64px)] font-black uppercase leading-[0.94] tracking-[-0.045em] text-[#111111]">
              I did not want to quit coffee. I wanted coffee to stop hijacking
              the day.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#111111]/70">
              I loved the ritual: the first cup, the reset, the feeling that the
              day was starting properly. I just did not love the racing heart,
              the anxious edge, the crash, or the nights where sleep felt like a
              negotiation.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#111111]/70">
              STUNN is the answer I wanted: coffee first, caffeine-free by
              design, and supported with functional ingredients that help the
              cup feel smoother on the body.
            </p>
            <div className="mt-7 border-t border-[#111111]/12 pt-5">
              <p className="font-[family-name:var(--font-anton)] text-sm uppercase tracking-widest text-[#111111]">
                Andrew Jennings
              </p>
              <p className="mt-1 text-xs font-semibold text-[#111111]/52">
                Founder, STUNN
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[28px] bg-[#EDE9F8] lg:grid-cols-[1fr_0.92fr]">
          <div className="flex flex-col justify-center px-7 py-12 sm:px-10 lg:px-16">
            <Label>What is inside</Label>
            <h2 className="max-w-3xl text-[clamp(42px,6vw,92px)] font-black uppercase leading-[0.92] tracking-[-0.052em] text-[#111111]">
              Built like coffee. Backed like a daily ritual.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#111111]/68">
              STUNN keeps the cup familiar and the format simple. One sachet,
              real decaf instant coffee, and functional ingredients selected to
              support calm focus.
            </p>
            <div className="mt-9 divide-y divide-[#5A3493]/18">
              {INGREDIENTS.map(([name, copy]) => (
                <div
                  key={name}
                  className="grid grid-cols-[1fr_auto] gap-5 py-4"
                >
                  <p className="font-black uppercase tracking-[-0.02em] text-[#111111]">
                    {name}
                  </p>
                  <p className="max-w-[260px] text-right text-sm leading-relaxed text-[#111111]/62">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-first min-h-[380px] lg:order-last lg:min-h-[680px]">
            <Image
              src={`${CDN}img-stunn-decaf-coffee-stick-pour-adaptogens-nootropics-480-x-745.jpg`}
              alt="STUNN sachet poured into coffee"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#111111]/10 bg-white px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <Label>How we build</Label>
            <h2 className="max-w-xl text-[clamp(38px,5vw,72px)] font-black uppercase leading-[0.92] tracking-[-0.05em] text-[#111111]">
              The rules are simple.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <div
                key={principle}
                className="rounded-[8px] border border-[#111111]/12 bg-white p-5"
              >
                <p className="mb-8 text-xs font-black text-[#5A3493]">
                  0{index + 1}
                </p>
                <p className="text-2xl font-black uppercase leading-[1.02] tracking-[-0.035em] text-[#111111]">
                  {principle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[28px] bg-[#F4F0FB] lg:grid-cols-[1fr_0.82fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-16">
            <Label>Your next cup</Label>
            <h2 className="max-w-3xl text-[clamp(44px,7vw,102px)] font-black uppercase leading-[0.92] tracking-[-0.052em] text-[#111111]">
              Coffee is better when it does not collect interest.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#111111]/65">
              Start with the best value: a 3-box subscription, free shipping,
              and a calmer coffee routine from {BEST_VALUE_PER_DAY_LABEL}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Cta>Shop STUNN</Cta>
              <Cta variant="outline">Learn on the product page</Cta>
            </div>
          </div>
          <Link
            href={PDP}
            className="relative min-h-[360px] overflow-hidden bg-white/45 lg:min-h-[560px]"
          >
            <Image
              src={`${CDN}img-happy-women-business-coffee-break-holding-mugs-steaming-latte_1.webp`}
              alt="Friends enjoying a calm coffee ritual with STUNN"
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
