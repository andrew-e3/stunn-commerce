import { StunnPurchasePanel } from "components/product/stunn-purchase-panel";
import { ImageGallery } from "components/product/image-gallery";
import Footer from "components/layout/footer";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct } from "lib/shopify";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable },
    },
    openGraph: url ? { images: [{ url, width, height, alt }] } : null,
  };
}

// Real ingredient photos from CDN
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
  {
    label: "Coffee Ritual",
    stunn: "Still intact",
    competitor: "Still intact",
    type: "text",
  },
  {
    label: "Caffeine",
    stunn: "0mg",
    competitor: "High caffeine",
    type: "text",
  },
  { label: "Jitters", stunn: "None", competitor: "Common", type: "text" },
  {
    label: "Crash",
    stunn: "No rebound",
    competitor: "Afternoon crash",
    type: "text",
  },
  {
    label: "Sleep",
    stunn: "Sleep-friendly",
    competitor: "Can disrupt",
    type: "text",
  },
  {
    label: "Daily Format",
    stunn: "Single sachet",
    competitor: "Brew + queue",
    type: "text",
  },
];

const testimonials = [
  {
    quote:
      "I quit caffeine a few months ago but missed my morning ritual. STUNN changed everything — I get the taste of coffee without the jitters or crashes. It's calm, focused energy in a cup.",
    name: "Sarah M.",
    age: "34",
  },
  {
    quote:
      "Coffee used to make me anxious, but STUNN lets me enjoy my favorite ritual without the racing heart. I feel alert, productive, and surprisingly relaxed at the same time.",
    name: "James T.",
    age: "29",
  },
  {
    quote:
      "I love coffee, but a 3 PM cup always messed with my sleep. With STUNN, I can enjoy my afternoon ritual and still sleep well. Smooth energy that lasts without the crash.",
    name: "Emma L.",
    age: "41",
  },
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
    title: "No jitters. No crash. No anxious second cup.",
    copy: "For the people who still want the workday lift, but are tired of paying for it with tension, irritability, and the afternoon drop.",
  },
  {
    eyebrow: "For the optimizer",
    title: "Keep the edge without making caffeine your identity.",
    copy: "For founders, operators, and senior ICs who want the productivity cue of coffee without needing a stimulant to feel switched on.",
  },
  {
    eyebrow: "For the coffee lover",
    title: "The ritual stays. The stimulant goes.",
    copy: "For anyone who misses coffee more than caffeine: the cup, the pause, the warmth, and the moment before the day starts again.",
  },
];

// Mosaic images — calm ritual first, then clean product/packaging proof.
// Keep paid-social infographic assets out of the hero gallery so the PDP feels premium.
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

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* ── HERO: coffee lifestyle image + purchase panel ── */}
      <div className="relative lg:flex lg:items-start">
        {/* Left: expandable image gallery */}
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
                        <img
                          src={`${CDN}${pill.icon}`}
                          alt=""
                          className="h-4 w-4"
                        />
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
                        <img
                          src={`${CDN}${pill.icon}`}
                          alt=""
                          className="h-4 w-4"
                        />
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

        {/* Right: purchase panel */}
        <div id="purchase" className="lg:w-1/2">
          <Suspense
            fallback={<div className="h-screen animate-pulse bg-gray-50" />}
          >
            <StunnPurchasePanel product={product} />
          </Suspense>
        </div>
      </div>

      {/* ── IDENTITY REFRAME ── */}
      <section className="bg-white px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl rounded-[28px] bg-[#EEEAF8] px-6 py-12 lg:px-16 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_0.9fr_1fr] lg:items-center">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#111111]/50">
                The caffeine loop
              </p>
              <h2 className="mb-7 font-[family-name:var(--font-anton)] text-[clamp(2.5rem,5vw,5.2rem)] uppercase leading-[0.95] text-[#111111]">
                You don&apos;t have low energy.
                <br />
                You&apos;re overstimulated.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-[#111111]/68">
                Caffeine can make tired feel productive for a few hours. Then
                the bill shows up as tension, a crash, worse sleep, and the need
                for another cup tomorrow.
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
                {
                  title: "Spike",
                  copy: "A fast lift that feels like energy, but often comes with tension.",
                },
                {
                  title: "Crash",
                  copy: "Adenosine rebounds. Focus drops. The next cup starts calling.",
                },
                {
                  title: "Poor sleep",
                  copy: "Even earlier caffeine can disrupt the depth of your rest.",
                },
                {
                  title: "Tolerance",
                  copy: "Yesterday's dose becomes today's baseline.",
                },
              ].map((step, index) => (
                <div key={step.title} className="relative pb-9 last:pb-0">
                  <span className="absolute -left-[34px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7C3AED] text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mb-2 font-[family-name:var(--font-anton)] text-3xl uppercase leading-none text-[#111111]">
                    {step.title}
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-[#111111]/65">
                    {step.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-black/15 pt-8">
            <div className="grid gap-8 md:grid-cols-3">
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

      {/* ── WHAT TO EXPECT — photo timeline ── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
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
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                headline: "Smooth, steady clarity.",
                copy: "No jitters, no crash — just clean focus from the first sip.",
                img: `${CDN}img-s-6.webp`,
                alt: "STUNN coffee ritual without caffeine",
              },
              {
                time: "After 14 Days",
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                ),
                headline: "Balanced all day.",
                copy: "No 3PM crash, no irritability. Just steady, natural energy that lasts.",
                img: `${CDN}img-stunn-decaf-coffee-stick-pour-adaptogens-nootropics-480-x-745.jpg`,
                alt: "STUNN sachet poured into coffee",
              },
              {
                time: "After 30 Days",
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ),
                headline: "Better nights, better mornings.",
                copy: "Deep, restorative sleep — wake up reset and truly refreshed.",
                img: `${CDN}img-stunn-coffee-and-bread-background-desktop.webp`,
                alt: "A calm morning coffee ritual with STUNN",
                objectPosition: "left bottom",
              },
            ].map((step) => (
              <div key={step.time} className="flex flex-col">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[8px]">
                  <Image
                    src={step.img}
                    alt={step.alt}
                    fill
                    className="object-cover object-top"
                    style={{
                      objectPosition: step.objectPosition || "center top",
                    }}
                  />
                </div>
                <div className="pt-6">
                  <div className="mb-2 flex items-center gap-2">
                    {step.icon}
                    <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">
                      {step.time}
                    </span>
                  </div>
                  <p className="mb-1 font-[family-name:var(--font-anton)] text-2xl uppercase leading-none tracking-normal text-[#111111]">
                    {step.headline}
                  </p>
                  <p className="text-sm leading-relaxed text-[#111111]/65">
                    {step.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO + CONTENT GALLERY ── */}
      <section className="overflow-hidden">
        {/* Panel A: Formula */}
        <div className="flex flex-col lg:flex-row">
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:w-1/2 lg:min-h-[560px]">
            <Image
              src={`${CDN}img-stunn-decaf-coffee-stick-pour-adaptogens-nootropics-480-x-745.jpg`}
              alt="STUNN sachet poured into coffee"
              fill
              className="object-cover"
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
              STUNN is built like a daily coffee ritual, not a supplement stack.
              Real decaf coffee carries the cup. The functional ingredients sit
              underneath to support calm focus without the caffeine loop.
            </p>

            <div className="border-y border-[#7C3AED]/20">
              {ingredients.map((ing) => (
                <div
                  key={ing.name}
                  className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#7C3AED]/15 py-4 last:border-b-0"
                >
                  <div>
                    <p className="font-[family-name:var(--font-anton)] text-xl uppercase leading-none text-[#111111]">
                      {ing.name}
                    </p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[#111111]/55">
                      {ing.benefit}
                    </p>
                  </div>
                  <p className="pt-0.5 text-right text-sm font-extrabold uppercase tracking-widest text-[#111111]">
                    {ing.dose}
                  </p>
                  <p className="col-span-2 max-w-lg text-sm leading-relaxed text-[#111111]/68">
                    {ing.description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#111111]">
              No caffeine. No proprietary blend. One sachet, every day.
            </p>
          </div>
        </div>

        {/* Panel C: Comparison */}
        <div className="flex flex-col lg:flex-row">
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:w-1/2 lg:min-h-[500px]">
            <Image
              src={`${CDN}img-s-6.webp`}
              alt="STUNN vs regular coffee"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#EDE9F8] px-8 py-14 lg:w-1/2 lg:px-16">
            <span className="mb-4 text-xs font-bold uppercase tracking-widest text-[#111111]/60">
              STUNN vs the caffeine loop
            </span>
            <h2 className="mb-8 font-[family-name:var(--font-anton)] text-[clamp(2rem,4vw,3.5rem)] uppercase leading-tight text-[#111111]">
              Keep the cup.
              <br />
              Lose the cost.
            </h2>
            <div>
              <table className="w-full table-fixed text-sm">
                <thead>
                  <tr>
                    <th className="w-[34%] pb-4" />
                    <th className="w-[33%] rounded-t-[10px] bg-[#7C3AED] px-1 pb-4 pt-4 text-center">
                      <span className="font-[family-name:var(--font-anton)] text-base text-white sm:text-lg">
                        STUNN+
                      </span>
                    </th>
                    <th className="w-[33%] px-1 pb-4 text-center text-[9px] font-bold uppercase tracking-wider text-[#111111]/60 sm:text-[10px]">
                      Caffeine Loop
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => {
                    const isLast = i === comparisonRows.length - 1;
                    return (
                      <tr
                        key={row.label}
                        className="border-t border-[#7C3AED]/10"
                      >
                        <td className="py-3 pr-2 text-[10px] font-bold uppercase tracking-wider text-[#111111] sm:text-[11px]">
                          {row.label}
                        </td>
                        <td
                          className={`bg-[#7C3AED] px-2 py-3 text-center text-[11px] font-medium leading-tight text-white sm:text-xs ${isLast ? "rounded-b-[10px]" : ""}`}
                        >
                          {row.type === "stars" ? (
                            <span className="text-base text-[#EFAF00]">
                              {row.stunn}
                            </span>
                          ) : (
                            row.stunn
                          )}
                        </td>
                        <td className="px-2 py-3 text-center text-[11px] leading-tight text-[#111111]/50 sm:text-xs">
                          {row.type === "stars" ? (
                            <span className="text-base text-[#EFAF00]/50">
                              {row.competitor}
                            </span>
                          ) : (
                            row.competitor
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <a
              href="#purchase"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-[10px] bg-[#7C3AED] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_5px_0_0_#5B21B6] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#5B21B6]"
            >
              Start Your Ritual →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="border-y border-black/10 bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mb-2 text-lg leading-none text-[#EFAF00]">
              ★★★★★
            </div>
            <span className="text-sm font-bold text-[#111111]/70">
              4.8 · Over 1,000 happy customers
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col gap-4 border-t border-black/15 pt-6"
              >
                <p className="text-sm leading-relaxed text-[#111111]/75">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-sm font-bold text-[#111111]">
                  {t.name}, {t.age}
                </p>
              </div>
            ))}
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
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="flex flex-col justify-center px-8 py-12 lg:px-14">
            <span className="mb-3 inline-block rounded-full border border-[#7C3AED]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#111111]">
              The Founder
            </span>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-[clamp(28px,4vw,52px)] uppercase leading-tight text-[#111111]">
              Why I Created STUNN
            </h2>
            <p className="mb-2 text-sm font-semibold text-[#111111]/82">
              I didn&apos;t want to quit coffee. I wanted to quit what caffeine
              was doing to me.
            </p>
            <p className="mb-7 text-base leading-relaxed text-[#111111]/70">
              I&apos;ve always loved the ritual: the first cup, the reset, the
              feeling that the day is about to start properly. I just
              didn&apos;t love the jitters, the crash, or the nights where sleep
              felt like a negotiation. STUNN is built to keep everything we love
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
              className="inline-flex items-center gap-2 self-start rounded-[10px] bg-[#7C3AED] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_5px_0_0_#5B21B6] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#5B21B6]"
            >
              Start Your Ritual →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-6 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16 lg:px-8">
          <div className="mb-10 flex flex-col justify-start lg:mb-0">
            <span className="mb-3 inline-block rounded-full border border-[#7C3AED]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#111111]">
              Frequently Asked Questions
            </span>
            <h2 className="mb-6 font-[family-name:var(--font-anton)] text-[clamp(36px,5vw,64px)] uppercase leading-tight text-[#111111]">
              Questions,
              <br />
              answered.
            </h2>
            <a
              href="#purchase"
              className="inline-flex items-center gap-2 self-start rounded-[10px] bg-[#7C3AED] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_5px_0_0_#5B21B6] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#5B21B6]"
            >
              Start Your Ritual →
            </a>
          </div>
          <div className="divide-y divide-[#7C3AED]/15">
            {pdpFaqs.map((faq) => (
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
                <p className="mt-3 text-sm leading-relaxed text-[#111111]/68">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA RAIL ── */}
      <section className="relative overflow-hidden bg-[#111111]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-screen-xl px-6 py-16 text-center lg:py-24">
          <span className="mb-4 inline-block rounded-full border border-white/30 px-3 py-1 text-xs font-medium tracking-widest text-white/80">
            Start your ritual.
          </span>
          <h2 className="mb-6 font-[family-name:var(--font-anton)] text-[clamp(36px,6vw,72px)] uppercase leading-tight text-white">
            The cup you reach for.
            <br />
            Without the cost you&apos;ve been paying.
          </h2>
          <a
            href="#purchase"
            className="inline-flex items-center gap-2 rounded-[10px] bg-[#7C3AED] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_5px_0_0_rgba(255,255,255,0.18)] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_rgba(255,255,255,0.18)]"
          >
            Get STUNN from $1.13/day
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
