import { StunnPurchasePanel } from "components/product/stunn-purchase-panel";
import { ImageGallery } from "components/product/image-gallery";
import { StickyAtc } from "components/product/sticky-atc";
import { PurchaseSelectionProvider } from "components/product/purchase-selection-context";
import { BEST_VALUE_PER_DAY_LABEL } from "lib/pricing";
import { getProduct } from "lib/shopify";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";
const PRODUCT_HANDLE = "focus-without-caffeine";

export const metadata: Metadata = {
  title: "STUNN Decaf Coffee — Founding Member Offer",
  description:
    "Lock in founding member pricing on STUNN. First batch only. 30-day money-back guarantee.",
  robots: { index: false, follow: false },
};

const ingredients = [
  {
    name: "Lion's Mane",
    dose: "300mg",
    benefit: "Focus + Clarity",
    description:
      "Supports focus, memory, and mental clarity so you can stay sharp without feeling wired.",
  },
  {
    name: "Rhodiola",
    dose: "250mg",
    benefit: "Stress + Energy",
    description:
      "Helps reduce stress and mental fatigue while supporting steady energy throughout the day.",
  },
  {
    name: "Cordyceps",
    dose: "100mg",
    benefit: "Endurance + Drive",
    description:
      "Boosts natural energy and endurance without overstimulation or crashes.",
  },
  {
    name: "L-Theanine",
    dose: "100mg",
    benefit: "Calm + Alert",
    description:
      "Promotes calm focus and smooths out the edges, helping you stay relaxed and alert.",
  },
  {
    name: "Decaf Instant Coffee",
    dose: "1500mg",
    benefit: "Coffee Ritual",
    description:
      "The real coffee base that keeps STUNN feeling like a cup, not a supplement stack.",
  },
];

const comparisonRows = [
  { label: "Coffee Ritual", stunn: "Still intact", competitor: "Still intact", type: "text" },
  { label: "Caffeine",      stunn: "0mg",          competitor: "High caffeine", type: "text" },
  { label: "Jitters",      stunn: "None",          competitor: "Common",        type: "text" },
  { label: "Crash",        stunn: "No rebound",    competitor: "Afternoon crash", type: "text" },
  { label: "Sleep",        stunn: "Sleep-friendly", competitor: "Can disrupt",  type: "text" },
  { label: "Daily Format", stunn: "Single sachet", competitor: "Brew + queue",  type: "text" },
];

const pdpFaqs = [
  {
    question: "Will I still feel focused without caffeine?",
    answer:
      "STUNN is designed for calm focus, not stimulant intensity. The formula combines decaf coffee with Lion's Mane, Rhodiola, Cordyceps, and L-Theanine so you can keep the coffee ritual while stepping away from caffeine dependency.",
  },
  {
    question: "Is STUNN a supplement or coffee?",
    answer:
      "STUNN is coffee first: a premium decaf instant coffee ritual with functional ingredients added for support. It should not feel like swallowing a supplement stack or replacing the emotional comfort of coffee.",
  },
  {
    question: "Can I drink it if caffeine makes me anxious?",
    answer:
      "Yes. STUNN was made for people who love coffee but are done with the side effects: jitters, anxious energy, crashes, and disrupted sleep. It contains decaf coffee, not caffeine as the driver.",
  },
  {
    question: "Does it taste like coffee?",
    answer:
      "Yes. STUNN is built around decaf instant coffee, so the ritual still starts with a real coffee base. It is functional, but it should still feel like a cup of coffee.",
  },
  {
    question: "When can I drink STUNN?",
    answer:
      "Morning, afternoon, or evening. Since STUNN is decaf, it is designed to be sleep-friendly and does not force the usual coffee cutoff time.",
  },
  {
    question: "How do I prepare STUNN?",
    answer:
      "Mix one sachet with hot or cold water, stir, and drink. You can add milk or your preferred sweetener if that is part of your ritual.",
  },
];

const PERSONA_CARDS = [
  {
    eyebrow: "For the side-effect done crowd",
    title: "A cleaner cup for the same ambitious day.",
    copy: "For the people who still want the workday ritual, without paying for it with tension, irritability, and the afternoon drop.",
  },
  {
    eyebrow: "For the optimizer",
    title: "Keep your edge without the stimulant dependency.",
    copy: "For founders, operators, and senior ICs who want the productivity cue of coffee while staying calm, clear, and in control.",
  },
  {
    eyebrow: "For the coffee lover",
    title: "The ritual stays. The rest gets lighter.",
    copy: "For anyone who misses coffee more than caffeine: the cup, the pause, the warmth, and the moment before the day starts again.",
  },
];

const MOSAIC_IMAGES = [
  {
    src: "/images/stunn-hero-brand-mug-v2.webp",
    alt: "A man enjoying STUNN decaf coffee from a soft lavender mug",
  },
  {
    src: `${CDN}mockup-stunn-box.webp`,
    alt: "STUNN decaf coffee box",
  },
  {
    src: `${CDN}img-stunn-decaf-coffee-stick-pour-adaptogens-nootropics-480-x-745.jpg`,
    alt: "STUNN sachet with adaptogens and nootropics",
  },
  {
    src: `${CDN}3-boxes-of-stunn-1080x1080.webp`,
    alt: "3 boxes of STUNN",
  },
  {
    src: `${CDN}img-s-11.webp`,
    alt: "STUNN coffee ritual",
  },
];

const CTA_LABEL = "Claim Founding Member Price →";

export default async function FoundingMemberPage() {
  const product = await getProduct(PRODUCT_HANDLE);
  if (!product) return notFound();

  return (
    <PurchaseSelectionProvider>
      {/* ── HERO ── */}
      <div className="relative lg:flex lg:items-start">
        <div className="lg:w-1/2">
          <ImageGallery
            images={MOSAIC_IMAGES}
            heroOverlay={
              <>
                <div className="absolute bottom-5 left-4 flex flex-col gap-2">
                  {[
                    { label: "Calm Focus", icon: "icon-focus.svg" },
                    { label: "No Jitters", icon: "icon-smile.svg" },
                  ].map((pill) => (
                    <div
                      key={pill.label}
                      className="flex items-center gap-2 rounded-full bg-white/90 py-2 pl-2.5 pr-4 shadow-md backdrop-blur-md"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDE9F8]">
                        <img src={`${CDN}${pill.icon}`} alt="" className="h-4 w-4" />
                      </span>
                      <span className="font-[family-name:var(--font-anton)] text-[11px] uppercase tracking-wider text-[#111111]">
                        {pill.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-5 right-4 flex flex-col gap-2">
                  {[
                    { label: "Steady Energy", icon: "icon-energy.svg" },
                    { label: "Sleep Friendly", icon: "icon-sleep.svg" },
                  ].map((pill) => (
                    <div
                      key={pill.label}
                      className="flex items-center gap-2 rounded-full bg-white/90 py-2 pl-2.5 pr-4 shadow-md backdrop-blur-md"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDE9F8]">
                        <img src={`${CDN}${pill.icon}`} alt="" className="h-4 w-4" />
                      </span>
                      <span className="font-[family-name:var(--font-anton)] text-[11px] uppercase tracking-wider text-[#111111]">
                        {pill.label}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            }
          />
        </div>
        <div id="purchase" className="lg:w-1/2">
          <Suspense fallback={<div className="h-screen animate-pulse bg-gray-50" />}>
            <StunnPurchasePanel product={product} />
          </Suspense>
        </div>
      </div>

      {/* ── IDENTITY REFRAME ── */}
      <section className="bg-white px-4 py-8 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl rounded-[28px] bg-[#EEEAF8] px-6 py-9 lg:px-16 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_0.9fr_1fr] lg:items-center lg:gap-12">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#111111]/50">
                The STUNN shift
              </p>
              <h2 className="mb-7 font-[family-name:var(--font-anton)] text-[clamp(2.5rem,5vw,5.2rem)] uppercase leading-[0.95] text-[#111111]">
                Keep the ritual.
                <br />
                Feel clear again.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-[#111111]/68">
                STUNN gives coffee lovers a calmer way back to the cup: real decaf coffee,
                functional support, and none of the stimulant tradeoff that can make the day
                feel harder than it needs to.
              </p>
            </div>

            <div className="relative mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center">
              <div className="absolute inset-6 rounded-full bg-white/70 blur-2xl" />
              <Image
                src={`${CDN}mockup-stunn-box.webp`}
                alt="STUNN decaf coffee box"
                width={420}
                height={420}
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_24px_35px_rgba(17,17,17,0.14)]"
              />
            </div>

            <div className="relative pl-8">
              <div className="absolute bottom-4 left-[11px] top-4 w-px bg-[#111111]/25" />
              {[
                { title: "Ritual",  copy: "The taste, warmth, and daily coffee cue stay intact." },
                { title: "Clarity", copy: "Adaptogens and nootropics support calm focus without the wired edge." },
                { title: "Control", copy: "No caffeine dependency deciding when you can think, work, or wind down." },
                { title: "Rest",    copy: "A sleep-friendly cup that fits the afternoon without stealing the night." },
              ].map((step, index) => (
                <div key={step.title} className="relative pb-9 last:pb-0">
                  <span className="absolute -left-[34px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#5A3493] text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mb-2 font-[family-name:var(--font-anton)] text-3xl uppercase leading-none text-[#111111]">
                    {step.title}
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-[#111111]/65">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-black/15 pt-6 lg:mt-12 lg:pt-8">
            <div className="grid gap-7 md:grid-cols-3 lg:gap-8">
              {PERSONA_CARDS.map((card) => (
                <div key={card.eyebrow}>
                  <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#111111]/42">
                    {card.eyebrow}
                  </p>
                  <h3 className="font-[family-name:var(--font-anton)] text-2xl uppercase leading-[1.02] tracking-normal text-[#111111]">
                    {card.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="bg-white py-9 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8 text-center lg:mb-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#111111]/60">
              The timeline
            </p>
            <h2 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,5vw,3.5rem)] uppercase leading-tight text-[#111111]">
              What to expect after
              <br />
              switching to STUNN
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                time: "After 30 Minutes",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A3493" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
                headline: "Smooth, steady clarity.",
                copy: "No jitters, no crash — just clean focus from the first sip.",
                img: `${CDN}img-s-6.webp`,
                alt: "STUNN coffee ritual without caffeine",
              },
              {
                time: "After 14 Days",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A3493" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
                headline: "Balanced all day.",
                copy: "No 3PM crash, no irritability. Just steady, natural energy that lasts.",
                img: `${CDN}img-stunn-decaf-coffee-stick-pour-adaptogens-nootropics-480-x-745.jpg`,
                alt: "STUNN sachet poured into coffee",
              },
              {
                time: "After 30 Days",
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A3493" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>,
                headline: "Better nights, better mornings.",
                copy: "Deep, restorative sleep — wake up reset and truly refreshed.",
                img: `${CDN}img-man-drinking-stunn-coffee.webp`,
                alt: "A calm morning coffee ritual after switching to STUNN",
                objectPosition: "center center",
              },
            ].map((step) => (
              <div key={step.time} className="flex flex-col">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[8px]">
                  <Image
                    src={step.img} alt={step.alt} fill
                    className="object-cover object-top"
                    style={{ objectPosition: step.objectPosition || "center top" }}
                  />
                </div>
                <div className="pt-6">
                  <div className="mb-2 flex items-center gap-2">
                    {step.icon}
                    <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">{step.time}</span>
                  </div>
                  <p className="mb-1 font-[family-name:var(--font-anton)] text-2xl uppercase leading-none tracking-normal text-[#111111]">
                    {step.headline}
                  </p>
                  <p className="text-sm leading-relaxed text-[#111111]/65">{step.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULA + COMPARISON ── */}
      <section className="overflow-hidden">
        {/* Formula panel */}
        <div className="flex flex-col lg:flex-row">
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:w-1/2 lg:min-h-[560px]">
            <Image
              src="/images/stunn-function-pour-corrected.png"
              alt="STUNN sachet poured into coffee"
              fill className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#EDE9F8] px-7 py-14 lg:w-1/2 lg:px-16">
            <span className="mb-4 text-xs font-bold uppercase tracking-widest text-[#111111]/60">
              What makes it work
            </span>
            <h2 className="mb-5 font-[family-name:var(--font-anton)] text-[clamp(2.2rem,4vw,3.7rem)] uppercase leading-[0.95] text-[#111111]">
              Coffee first.
              <br />
              Function underneath.
            </h2>
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-[#111111]/70">
              STUNN is built like a daily coffee ritual, not a supplement stack. Real decaf coffee
              carries the cup. The functional ingredients sit underneath to support calm focus without
              the caffeine loop.
            </p>
            <div className="border-y border-[#5A3493]/20">
              {ingredients.map((ing) => (
                <div key={ing.name} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#5A3493]/15 py-4 last:border-b-0">
                  <div>
                    <p className="font-[family-name:var(--font-anton)] text-xl uppercase leading-none text-[#111111]">{ing.name}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[#111111]/55">{ing.benefit}</p>
                  </div>
                  <p className="pt-0.5 text-right text-sm font-extrabold uppercase tracking-widest text-[#111111]">{ing.dose}</p>
                  <p className="col-span-2 max-w-lg text-sm leading-relaxed text-[#111111]/68">{ing.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111]">
              No caffeine. No proprietary blend. One sachet, every day.
            </p>
          </div>
        </div>

        {/* Comparison panel */}
        <div className="flex flex-col lg:flex-row">
          <div className="order-2 flex flex-col justify-center bg-[#EDE9F8] px-8 py-14 lg:order-1 lg:w-1/2 lg:px-16">
            <span className="mb-4 text-xs font-bold uppercase tracking-widest text-[#111111]/60">
              STUNN vs the caffeine loop
            </span>
            <h2 className="mb-8 font-[family-name:var(--font-anton)] text-[clamp(2rem,4vw,3.5rem)] uppercase leading-tight text-[#111111]">
              Keep the cup.
              <br />
              Lose the cost.
            </h2>
            <table className="w-full table-fixed text-sm">
              <thead>
                <tr>
                  <th className="w-[34%] pb-4" />
                  <th className="w-[33%] rounded-t-[10px] bg-[#5A3493] px-1 pb-4 pt-4 text-center">
                    <span className="font-[family-name:var(--font-anton)] text-base text-white sm:text-lg">STUNN+</span>
                  </th>
                  <th className="w-[33%] px-1 pb-4 text-center text-[9px] font-bold uppercase tracking-wider text-[#111111]/60 sm:text-[10px]">
                    Caffeine Loop
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className="border-t border-[#5A3493]/10">
                    <td className="py-3 pr-2 text-[10px] font-bold uppercase tracking-wider text-[#111111] sm:text-[11px]">{row.label}</td>
                    <td className={`bg-[#5A3493] px-2 py-3 text-center text-[11px] font-medium leading-tight text-white sm:text-xs ${i === comparisonRows.length - 1 ? "rounded-b-[10px]" : ""}`}>
                      {row.stunn}
                    </td>
                    <td className="px-2 py-3 text-center text-[11px] leading-tight text-[#111111]/50 sm:text-xs">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a
              href="#purchase"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_5px_0_0_#43256F] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#43256F]"
            >
              {CTA_LABEL}
            </a>
          </div>
          <div className="relative order-1 aspect-[4/3] w-full lg:order-2 lg:aspect-auto lg:w-1/2 lg:min-h-[500px]">
            <Image src={`${CDN}img-s-6.webp`} alt="STUNN vs regular coffee" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-0 lg:grid lg:grid-cols-2">
          <div className="relative min-h-[400px] overflow-hidden lg:min-h-[560px]">
            <Image
              src="/images/stunn-founder.webp"
              alt="Andrew Jennings, founder of STUNN"
              fill className="object-cover object-center" priority
            />
          </div>
          <div className="flex flex-col justify-center px-8 py-12 lg:px-14">
            <span className="mb-3 inline-block rounded-full border border-[#5A3493]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#111111]">
              The Founder
            </span>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-[clamp(28px,4vw,52px)] uppercase leading-tight text-[#111111]">
              Why I Created STUNN
            </h2>
            <p className="mb-2 text-sm font-semibold text-[#111111]/82">
              I didn&apos;t want to quit coffee. I wanted to quit what caffeine was doing to me.
            </p>
            <p className="mb-7 text-base leading-relaxed text-[#111111]/70">
              I&apos;ve always loved the ritual: the first cup, the reset, the feeling that the day
              is about to start properly. I just didn&apos;t love the jitters, the crash, or the
              nights where sleep felt like a negotiation. STUNN is built to keep everything we love
              about coffee, while removing what we don&apos;t.
            </p>
            <p className="mb-6 font-[family-name:var(--font-anton)] text-sm uppercase tracking-widest text-[#111111]">
              ANDREW JENNINGS
              <br />
              <span className="font-sans text-xs font-normal normal-case tracking-normal text-[#111111]/55">
                Founder, STUNN
              </span>
            </p>
            <a
              href="#purchase"
              className="inline-flex items-center gap-2 self-start rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_5px_0_0_#43256F] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#43256F]"
            >
              {CTA_LABEL}
            </a>
          </div>
        </div>
      </section>

      {/* ── FOUNDING MEMBER GUARANTEE (replaces fake testimonials) ── */}
      <section className="border-y border-black/10 bg-[#EDE9F8] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#111111]/50">
              First Batch — Founding Members Only
            </p>
            <h2 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,5vw,3.5rem)] uppercase leading-tight text-[#111111]">
              We&apos;re new.
              <br />
              Here&apos;s what that means for you.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Lock-in pricing */}
            <div className="rounded-[16px] bg-white px-8 py-8">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#5A3493] text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-anton)] text-2xl uppercase leading-tight text-[#111111]">
                Price Locked In.<br />Forever.
              </h3>
              <p className="text-sm leading-relaxed text-[#111111]/65">
                Founding member pricing is locked for the life of your subscription. As we scale,
                the price goes up. You never pay more than you do today.
              </p>
            </div>

            {/* 30-day guarantee */}
            <div className="rounded-[16px] bg-white px-8 py-8">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#5A3493] text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-anton)] text-2xl uppercase leading-tight text-[#111111]">
                30 Days.<br />Full Refund.
              </h3>
              <p className="text-sm leading-relaxed text-[#111111]/65">
                Try STUNN for a full month. If it doesn&apos;t change how your days feel, email us
                and we&apos;ll refund every dollar. No forms, no questions, no friction.
              </p>
            </div>

            {/* Be a first reviewer */}
            <div className="rounded-[16px] bg-white px-8 py-8">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#5A3493] text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="mb-3 font-[family-name:var(--font-anton)] text-2xl uppercase leading-tight text-[#111111]">
                Be One Of<br />Our First Reviews.
              </h3>
              <p className="text-sm leading-relaxed text-[#111111]/65">
                We&apos;re not pretending we&apos;re established. Founding members shape what STUNN
                becomes — your feedback goes directly to the team and helps build what comes next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-6 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16 lg:px-8">
          <div className="mb-10 flex flex-col justify-start lg:mb-0">
            <span className="mb-3 inline-block rounded-full border border-[#5A3493]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#111111]">
              Frequently Asked Questions
            </span>
            <h2 className="mb-6 font-[family-name:var(--font-anton)] text-[clamp(36px,5vw,64px)] uppercase leading-tight text-[#111111]">
              Questions,
              <br />
              answered.
            </h2>
            <a
              href="#purchase"
              className="inline-flex items-center gap-2 self-start rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_5px_0_0_#43256F] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#43256F]"
            >
              {CTA_LABEL}
            </a>
          </div>
          <div className="divide-y divide-[#5A3493]/15">
            {pdpFaqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-[family-name:var(--font-anton)] text-base uppercase tracking-wide text-[#111111]">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-[#111111] transition-transform duration-200 group-open:rotate-180">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#111111]/68">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-white px-4 py-12 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-[#EDE9F8] lg:grid-cols-[1fr_0.9fr]">
          <div className="flex flex-col justify-center px-7 py-12 lg:px-14 lg:py-16">
            <span className="mb-5 w-fit rounded-full border border-[#5A3493]/25 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#111111]/60">
              Founding Member Offer
            </span>
            <h2 className="mb-5 font-[family-name:var(--font-anton)] text-[clamp(2.8rem,6vw,5.8rem)] uppercase leading-[0.92] text-[#111111]">
              Keep the ritual.
              <br />
              Lose the caffeine.
            </h2>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-[#111111]/68">
              Everything you love about coffee - the taste, the pause, the daily cue - without the
              jitters, crash, or sleep tradeoff. Founding member pricing locked in for life.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#purchase"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#5A3493] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_5px_0_0_#43256F] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#43256F]"
              >
                {CTA_LABEL}
              </a>
              <p className="text-xs text-[#111111]/50">
                From {BEST_VALUE_PER_DAY_LABEL} · 30-day money-back guarantee · Cancel anytime
              </p>
            </div>
          </div>
          <div className="relative order-first aspect-[4/3] lg:order-last lg:aspect-auto">
            <Image
              src={`${CDN}img-happy-women-business-coffee-break-holding-mugs-steaming-latte_1.webp`}
              alt="Friends enjoying a calm coffee ritual with STUNN"
              fill className="object-cover"
            />
          </div>
        </div>
      </section>

      <StickyAtc product={product} />
      {/* No Footer — landing page only */}
    </PurchaseSelectionProvider>
  );
}
