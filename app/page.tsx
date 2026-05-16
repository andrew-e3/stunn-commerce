import Footer from "components/layout/footer";
import Image from "next/image";
import Link from "next/link";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";
const PDP = "/products/focus-without-caffeine";

function Cta({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "light" | "outline";
}) {
  const styles = {
    primary:
      "bg-[#7C3AED] text-white shadow-[0_4px_0_0_#5E22B8] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#5E22B8]",
    light: "bg-white text-[#111111] hover:bg-white/90",
    outline:
      "border border-[#111111]/18 bg-white text-[#111111] hover:border-[#111111]",
  };

  return (
    <Link
      href={PDP}
      className={`inline-flex min-h-12 w-full items-center justify-center rounded-lg px-6 text-sm font-black transition-all sm:w-auto ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#111111]/45">
      {children}
    </p>
  );
}

const BENEFITS = [
  ["99.9% caffeine-free", "Keep coffee without the stimulant loop."],
  ["Adaptogen support", "Lion's Mane, Rhodiola, Cordyceps, and L-Theanine."],
  ["Coffee taste", "A real decaf coffee ritual, not a supplement chore."],
];

const RITUAL_STEPS = [
  ["01", "Keep the cup", "The warmth, the pause, the start signal."],
  ["02", "Remove the spike", "No caffeine surge, no nervous lift."],
  ["03", "Hold the edge", "Calm focus that fits the workday."],
  ["04", "Protect the evening", "A coffee habit that does not tax sleep."],
];

const PROOF_POINTS = [
  ["300mg", "Lion's Mane", "Focus and mental clarity support."],
  ["250mg", "Rhodiola", "Stress resilience and steady energy support."],
  ["100mg", "L-Theanine", "A calmer, smoother coffee experience."],
];

const PERSONAS = [
  {
    label: "Done with side effects",
    title: "No jitters. No crash. No anxious second cup.",
    copy: "For Jamie: the ambitious professional who still wants lift, but not the tension and afternoon drop.",
  },
  {
    label: "The optimizer",
    title: "Keep the edge without making caffeine your identity.",
    copy: "For Sam: founders, operators, and senior ICs who want the cue of coffee without stimulant dependency.",
  },
  {
    label: "The coffee lover",
    title: "The ritual stays. The stimulant goes.",
    copy: "For Rachel: people who miss coffee more than caffeine and want the cup back on their terms.",
  },
];

const FAQS = [
  {
    question: "Is STUNN actually coffee?",
    answer:
      "Yes. STUNN is real decaf instant coffee enhanced with functional ingredients for calm focus and steady daily energy.",
  },
  {
    question: "How much caffeine is in it?",
    answer:
      "STUNN is 99.9% caffeine-free, so it keeps the coffee ritual without the stimulant tradeoff.",
  },
  {
    question: "When should I drink it?",
    answer:
      "Anytime you want the coffee cue without risking jitters, a crash, or poorer sleep later.",
  },
  {
    question: "What is the best value?",
    answer:
      "The 3-box subscription gives the lowest price per cup, free shipping, and the strongest savings.",
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
      <section className="bg-white">
        <div className="px-5 py-16 text-[#111111] sm:px-8 lg:py-24">
          <div className="mx-auto max-w-[1440px] text-center">
            <div className="mb-7 flex items-center justify-center gap-3 text-sm font-semibold text-[#111111]/65">
              <span className="text-[#EFAF00]">★★★★★</span>
              <span>4.8 Stars</span>
              <span className="h-5 w-px bg-[#111111]/20" />
              <span>1,000+ Customers</span>
            </div>
            <h1 className="mx-auto max-w-4xl font-serif text-[clamp(52px,11vw,132px)] leading-[0.95] tracking-[-0.06em]">
              The decaf coffee for calm focus.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#111111]/68 sm:text-xl">
              Everything you love about coffee. None of what you don't: no jitters, no crash, no stimulant dependency.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <Cta>Shop now - save up to 25%</Cta>
            </div>
            <div className="mx-auto mt-6 grid max-w-3xl grid-cols-3 gap-3 text-xs font-semibold text-[#111111]/60 sm:text-sm">
              {BENEFITS.map(([title]) => (
                <span key={title}>{title}</span>
              ))}
            </div>
          </div>
        </div>

        <Link href={PDP} className="relative block h-[430px] overflow-hidden sm:h-[560px] lg:h-[680px]">
          <Image
            src={`${CDN}img-stunn-decaf-coffee-stick-pour-adaptogens-nootropics-480-x-745.jpg`}
            alt="STUNN sachet poured into coffee"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute bottom-5 left-5 rounded-full bg-[#7C3AED] px-5 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(17,17,17,0.18)] sm:left-8">
            Limited launch offer
          </div>
        </Link>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1320px] text-center">
          <h2 className="mx-auto max-w-4xl font-serif text-[clamp(44px,7vw,96px)] leading-[0.95] tracking-[-0.045em] text-[#111111]">
            How we're raising the bar for decaf.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#111111]/68 sm:text-xl">
            STUNN is not a supplement pretending to be coffee. It is coffee redesigned for people who want the ritual without the stimulant cost.
          </p>

          <div className="mx-auto mt-10 inline-flex rounded-full bg-[#F4F0FB] p-1 shadow-[0_18px_50px_rgba(17,17,17,0.08)]">
            <span className="rounded-full bg-[#111111] px-5 py-3 text-xs font-black uppercase tracking-wide text-white">
              Decaf coffee
            </span>
            <span className="px-5 py-3 text-xs font-black uppercase tracking-wide text-[#111111]/35">
              Functional support
            </span>
          </div>

          <div className="mx-auto mt-10 grid max-w-md gap-3 lg:hidden">
            <div className="relative flex min-h-[260px] items-center justify-center rounded-[26px] bg-[#F4F0FB]">
              <Image
                src={`${CDN}mockup-stunn-box.webp`}
                alt="STUNN box"
                width={260}
                height={260}
                className="w-[230px] drop-shadow-[0_24px_50px_rgba(124,58,237,0.18)]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 text-left">
              {[
                "Backed by ritual",
                "Coffee taste",
                "Clean daily format",
                "No caffeine loop",
              ].map((text) => (
                <Link
                  key={text}
                  href={PDP}
                  className="rounded-[18px] border border-[#111111]/10 bg-white p-4 text-xs font-black uppercase leading-tight tracking-[-0.01em] text-[#111111] shadow-[0_12px_30px_rgba(17,17,17,0.04)]"
                >
                  <span className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] text-base text-white">
                    +
                  </span>
                  {text}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-10 hidden min-h-[560px] max-w-[980px] place-items-center lg:grid">
            <div className="absolute h-[320px] w-[320px] rounded-full border-2 border-dotted border-[#111111]/38 sm:h-[460px] sm:w-[460px]" />
            <Image
              src={`${CDN}mockup-stunn-box.webp`}
              alt="STUNN box"
              width={300}
              height={300}
              className="relative z-10 w-[220px] drop-shadow-[0_24px_50px_rgba(124,58,237,0.18)] sm:w-[300px]"
            />
            {[
              ["Backed by ritual", "left-0 top-12 text-left"],
              ["Coffee taste", "right-0 top-20 text-right"],
              ["Clean daily format", "bottom-18 left-0 text-left"],
              ["No caffeine loop", "bottom-10 right-0 text-right"],
            ].map(([text, pos]) => (
              <Link
                key={text}
                href={PDP}
                className={`absolute ${pos} max-w-[150px] text-sm font-black uppercase leading-tight tracking-[-0.02em] text-[#111111] sm:max-w-[190px] sm:text-lg`}
              >
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] text-xl text-white">
                  +
                </span>
                <br />
                {text}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[28px] border border-[#111111] bg-white lg:grid-cols-[0.86fr_1.14fr]">
          <div className="p-7 sm:p-10 lg:p-14">
            <Label>Scientifically informed</Label>
            <h2 className="max-w-xl text-[clamp(42px,6vw,86px)] font-black uppercase leading-[0.94] tracking-[-0.045em] text-[#111111]">
              Calm focus. Made easy.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[#111111]/68">
              Caffeine can make tired feel productive for a few hours. STUNN keeps the coffee cue while supporting a steadier state.
            </p>

            <div className="mt-9 space-y-6">
              {PROOF_POINTS.map(([amount, ingredient, copy]) => (
                <div key={ingredient}>
                  <p className="text-[clamp(44px,8vw,82px)] font-black leading-none tracking-[-0.055em] text-[#111111]">
                    {amount}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-[#111111]">{ingredient}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#111111]/62">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[560px] bg-[#F4F0FB]">
            <Image
              src={`${CDN}img-a-man-sipping-a-cup-of-coffee-while-holding-stunn-sachet_1.webp`}
              alt="Drinking STUNN coffee"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 lg:py-22">
        <div className="mx-auto max-w-[1440px] rounded-[28px] bg-[#F4F0FB] px-7 py-12 sm:px-10 lg:px-16 lg:py-18">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <Label>The STUNN shift</Label>
              <h2 className="max-w-4xl text-[clamp(44px,7vw,108px)] font-black uppercase leading-[0.92] tracking-[-0.052em] text-[#111111]">
                Keep the ritual. Feel clear again.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#111111]/68 sm:text-lg">
                A positive reset for people who are not anti-coffee. They are just done letting caffeine set the terms.
              </p>
            </div>
            <div className="overflow-hidden rounded-[22px] border border-[#111111]/10 bg-white shadow-[0_24px_70px_rgba(17,17,17,0.08)]">
              {RITUAL_STEPS.map(([number, title, copy]) => (
                <div key={number} className="grid grid-cols-[48px_1fr] gap-4 border-b border-[#111111]/10 p-5 last:border-b-0">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-xs font-black text-white">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-[-0.025em] text-[#111111]">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#111111]/62">{copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid border-t border-[#111111]/12 pt-8 lg:grid-cols-3 lg:divide-x lg:divide-[#111111]/12">
            {PERSONAS.map((persona) => (
              <Link key={persona.label} href={PDP} className="block py-5 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#111111]/42">
                  {persona.label}
                </p>
                <h3 className="text-2xl font-black uppercase leading-[1.05] tracking-[-0.03em] text-[#111111]">
                  {persona.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#111111]/62">{persona.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Label>Best value</Label>
            <h2 className="max-w-xl text-[clamp(44px,6vw,92px)] font-black uppercase leading-[0.92] tracking-[-0.052em] text-[#111111]">
              Start with three boxes. Save 25%.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[#111111]/65">
              The 3-box subscription is the best way to make the switch stick: lowest price per cup, free shipping, and a full ritual reset.
            </p>
          </div>

          <Link
            href={PDP}
            className="group overflow-hidden rounded-[26px] border border-[#111111]/10 bg-[#F8F6FB] shadow-[0_24px_70px_rgba(17,17,17,0.08)] transition-transform hover:-translate-y-1"
          >
            <div className="grid md:grid-cols-[0.92fr_1.08fr]">
              <div className="relative min-h-[330px] overflow-hidden bg-white">
                <img
                  src={`${CDN}3-boxes-of-stunn-1080x1080.webp`}
                  alt="Three STUNN boxes"
                  className="absolute inset-0 h-full w-full object-cover object-bottom"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-[#7C3AED] px-3 py-1 text-xs font-black text-white">
                    SAVE 25%
                  </span>
                  <span className="text-sm font-semibold text-[#111111]/55">From $1.00 / cup</span>
                </div>
                <h3 className="text-3xl font-black tracking-[-0.03em] text-[#111111]">
                  3 boxes delivered every 3 months
                </h3>
                <div className="mt-7 grid gap-3 text-sm font-semibold text-[#111111]/75 sm:grid-cols-3">
                  <span>Free shipping</span>
                  <span>Cancel anytime</span>
                  <span>30-day guarantee</span>
                </div>
                <div className="mt-8 inline-flex w-full items-center justify-center rounded-lg bg-[#7C3AED] px-6 py-4 text-sm font-black text-white shadow-[0_4px_0_0_#5E22B8] transition-transform group-hover:-translate-y-0.5">
                  Shop the subscription
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-y border-[#111111]/10 bg-white px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Label>Questions</Label>
            <h2 className="max-w-md text-[clamp(42px,6vw,82px)] font-black uppercase leading-[0.92] tracking-[-0.052em] text-[#111111]">
              A better cup should feel simple.
            </h2>
            <div className="mt-8">
              <Cta>Shop STUNN</Cta>
            </div>
          </div>
          <div className="grid gap-3">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group rounded-[16px] border border-[#111111]/10 bg-white p-5 shadow-[0_12px_40px_rgba(17,17,17,0.04)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                  <span className="text-lg font-black text-[#111111]">{faq.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F4F0FB] text-[#111111] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#111111]/65">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[28px] bg-[#F4F0FB] lg:grid-cols-[1fr_0.82fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-16">
            <Label>Start your ritual</Label>
            <h2 className="max-w-3xl text-[clamp(44px,7vw,102px)] font-black uppercase leading-[0.92] tracking-[-0.052em] text-[#111111]">
              Your next coffee ritual starts here.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#111111]/65">
              Save up to 25% on subscription and get STUNN delivered before the old habit pulls you back in.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Cta>Get STUNN from $1.00/cup</Cta>
              <span className="text-sm font-semibold text-[#111111]/55">Free shipping on best value</span>
            </div>
          </div>
          <Link
            href={PDP}
            className="relative min-h-[360px] overflow-hidden bg-white/45 lg:min-h-[560px]"
          >
            <img
              src={`${CDN}3-boxes-of-stunn-1080x1080.webp`}
              alt="STUNN boxes"
              className="absolute inset-0 h-full w-full object-cover object-bottom"
            />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
