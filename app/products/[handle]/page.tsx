import { StunnPurchasePanel } from "components/product/stunn-purchase-panel";
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
    benefit: "Focus + Clarity",
    img: `${CDN}img-lions-mane_1.png`,
    description: "Supports focus, memory, and mental clarity so you can stay sharp without feeling wired.",
  },
  {
    name: "Rhodiola",
    benefit: "Stress + Energy",
    img: `${CDN}img-rhodiola_1.png`,
    description: "Helps reduce stress and mental fatigue while supporting steady energy throughout the day.",
  },
  {
    name: "Cordyceps",
    benefit: "Endurance + Drive",
    img: `${CDN}img-cordyceps_1.png`,
    description: "Boosts natural energy and endurance without overstimulation or crashes.",
  },
  {
    name: "L-Theanine",
    benefit: "Calm + Alert",
    img: `${CDN}img-lteanine_1.png`,
    description: "Promotes calm focus and smooths out the edges, helping you stay relaxed and alert.",
  },
];

const timeline = [
  { label: "20-30 mins", heading: "Clearer head.", description: "The mental fog starts lifting before your second sip." },
  { label: "1 hour", heading: "Focused state.", description: "You're in it — no false starts, no jitter tax." },
  { label: "3-4 hours", heading: "Sustained output.", description: "The kind you'd normally trade for a crash." },
  { label: "Evening", heading: "No crash. Normal sleep.", description: "You actually close the loop today." },
];

const comparisonRows = [
  { label: "Cost Per Serving", stunn: "From $0.38", competitor: "$3.99+", type: "text" },
  { label: "Taste", stunn: "★★★★★", competitor: "★★", type: "stars" },
  { label: "Jitters", stunn: "None", competitor: "Often jitters or anxiety", type: "text" },
  { label: "Digestive Friendly", stunn: "Gentle on stomach", competitor: "Can be acidic or harsh", type: "text" },
  { label: "Convenience", stunn: "Instant sachet, on-the-go", competitor: "Brewing Required", type: "text" },
  { label: "Routine Friendly", stunn: "Morning, afternoon, or evening", competitor: "Best only in morning for many", type: "text" },
];

const testimonials = [
  {
    quote: "I quit caffeine a few months ago but missed my morning ritual. STUNN changed everything — I get the taste of coffee without the jitters or crashes. It's calm, focused energy in a cup.",
    name: "Sarah M.",
    age: "34",
  },
  {
    quote: "Coffee used to make me anxious, but STUNN lets me enjoy my favorite ritual without the racing heart. I feel alert, productive, and surprisingly relaxed at the same time.",
    name: "James T.",
    age: "29",
  },
  {
    quote: "I love coffee, but a 3 PM cup always messed with my sleep. With STUNN, I can enjoy my afternoon ritual and still sleep well. Smooth energy that lasts without the crash.",
    name: "Emma L.",
    age: "41",
  },
];

const pdpFaqs = [
  {
    question: "What makes STUNN different from regular coffee?",
    answer: "STUNN gives you the experience of coffee without the usual downsides. It's decaf, but enhanced with functional ingredients like Lion's Mane, Rhodiola, Cordyceps, and L-Theanine to support focus, calm, and steady energy. Instead of spikes and crashes, you get a smoother, more controlled way to enjoy coffee.",
  },
  {
    question: "How do I prepare STUNN?",
    answer: "Simply mix one sachet with hot/cold water, stir, and enjoy. You can also customize it with milk or your preferred sweetener. It's quick, easy, and designed to fit seamlessly into your daily routine.",
  },
  {
    question: "When can I drink STUNN?",
    answer: "STUNN is made to be enjoyed anytime — morning, mid-day, or late at night. Since it's decaf, it won't disrupt your sleep or leave you feeling wired.",
  },
  {
    question: "How long does one box last?",
    answer: "One box typically lasts 2-4 weeks depending on how often you drink it. If you enjoy one cup daily, it lasts close to a month.",
  },
];

const BENEFITS = [
  { label: "Calm Focus", desc: "No anxiety, no spike" },
  { label: "Steady Energy", desc: "Without stimulants" },
  { label: "No Jitters", desc: "Adaptogens, not caffeine" },
  { label: "No Crash", desc: "Smooth all day" },
  { label: "Sleep Friendly", desc: "Drink it at 9pm" },
  { label: "Gentle Stomach", desc: "No acid, no burn" },
];

// Mosaic images — coffee cup hero first (Matt's note), then product shots
const MOSAIC_IMAGES = [
  {
    src: `${CDN}img-a-man-sipping-a-cup-of-coffee-while-holding-stunn-sachet_1.webp`,
    alt: "A man enjoying STUNN decaf coffee",
  },
  {
    src: `${CDN}img-stunn-decaf-coffee-after-two-week-effect.webp`,
    alt: "In 2 Weeks, Say Goodbye To Jitters",
  },
  {
    src: `${CDN}img-stunn-decaf-coffee-what-to-expect-after-use.webp`,
    alt: "What to expect after switching to STUNN",
  },
  {
    src: `${CDN}3-boxes-of-stunn-1080x1080.webp`,
    alt: "3 boxes of STUNN",
  },
  {
    src: `${CDN}img-all-the-edge-none-of-the-jitters-stunn-coffee-benefits_95c6e424-1565-46f6-b269-24a86114b866.webp`,
    alt: "All the Edge, None of the Jitters",
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
        {/* Left: hero image (coffee cup first) + benefit callouts + 2-col mosaic below */}
        <div className="lg:w-1/2">
          {/* Hero image with floating benefit cards */}
          <div className="relative aspect-square w-full bg-[#EDE9F8]">
            <Image
              src={MOSAIC_IMAGES[0]!.src}
              alt={MOSAIC_IMAGES[0]!.alt}
              fill
              className="object-cover"
              priority
            />
            {/* Floating benefit callout cards — like Create's style */}
            {/* Left column */}
            <div className="absolute left-3 top-1/2 flex -translate-y-1/2 flex-col gap-3 sm:left-4">
              {[
                {
                  label: "Calm Focus",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5A3493" strokeWidth="1.8" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                    </svg>
                  ),
                },
                {
                  label: "No Jitters",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5A3493" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
                      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
                    </svg>
                  ),
                },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/90 px-3 py-3 shadow-lg backdrop-blur-sm sm:px-4">
                  {b.icon}
                  <span className="whitespace-nowrap font-[family-name:var(--font-anton)] text-[11px] uppercase tracking-wide text-[#5A3493] sm:text-xs">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Right column */}
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-3 sm:right-4">
              {[
                {
                  label: "Steady Energy",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#5A3493">
                      <path d="M13 2L4.5 13.5H11L9 22L19.5 10.5H13L13 2Z" />
                    </svg>
                  ),
                },
                {
                  label: "Sleep Friendly",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5A3493" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  ),
                },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/90 px-3 py-3 shadow-lg backdrop-blur-sm sm:px-4">
                  {b.icon}
                  <span className="whitespace-nowrap font-[family-name:var(--font-anton)] text-[11px] uppercase tracking-wide text-[#5A3493] sm:text-xs">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* 2-col mosaic below hero */}
          <div className="grid grid-cols-2">
            {MOSAIC_IMAGES.slice(1).map((img) => (
              <div key={img.src} className="relative aspect-square bg-gray-100">
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: purchase panel */}
        <div id="purchase" className="lg:w-1/2">
          <Suspense fallback={<div className="h-screen animate-pulse bg-gray-50" />}>
            <StunnPurchasePanel product={product} />
          </Suspense>
        </div>
      </div>

      {/* ── BENEFITS GRID — large, scannable (Matt's key ask) ── */}
      <section className="bg-[#fef8dd] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-[#5A3493]/60">
            What you get with every cup
          </p>
          <div className="grid grid-cols-2 gap-px bg-[#5A3493]/10 border border-[#5A3493]/10 md:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-2 bg-[#fef8dd] px-6 py-10 text-center">
                <p className="font-[family-name:var(--font-anton)] text-[clamp(1.4rem,2.5vw,2rem)] uppercase leading-tight text-[#5A3493]">
                  {b.label}
                </p>
                <p className="text-sm text-[#5A3493]/60">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO + CONTENT GALLERY ── */}
      <section className="overflow-hidden">
        {/* Panel A: Ingredients */}
        <div className="flex flex-col lg:flex-row">
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:w-1/2 lg:min-h-[560px]">
            <Image
              src={`${CDN}img-stunn-decaf-coffee-stick-pour-adaptogens-nootropics-480-x-745.jpg`}
              alt="STUNN ingredients — adaptogens and nootropics"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#EDE9F8] px-8 py-14 lg:w-1/2 lg:px-16">
            <span className="mb-4 text-xs font-bold uppercase tracking-widest text-[#5A3493]/60">
              What's inside
            </span>
            <h2 className="mb-8 font-[family-name:var(--font-anton)] text-[clamp(2rem,4vw,3.5rem)] uppercase leading-tight text-[#5A3493]">
              4 functional ingredients.<br />One ritual.
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {ingredients.map((ing) => (
                <div key={ing.name} className="flex flex-col gap-1">
                  <div className="relative h-20 w-full">
                    <Image src={ing.img} alt={ing.name} fill className="object-contain object-left" />
                  </div>
                  <p className="font-[family-name:var(--font-anton)] text-lg uppercase text-[#5A3493]">
                    {ing.name}
                  </p>
                  <span className="inline-block rounded-full bg-[#5A3493]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#5A3493]">
                    {ing.benefit}
                  </span>
                  <p className="text-xs leading-relaxed text-gray-600">{ing.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel B: Timeline */}
        <div className="flex flex-col lg:flex-row-reverse">
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:w-1/2 lg:min-h-[500px]">
            <Image
              src={`${CDN}img-man-drinking-stunn-coffee.webp`}
              alt="Person enjoying STUNN coffee"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-white px-8 py-14 lg:w-1/2 lg:px-16">
            <span className="mb-4 text-xs font-bold uppercase tracking-widest text-[#5A3493]/60">
              What you'll feel · timeline
            </span>
            <h2 className="mb-8 font-[family-name:var(--font-anton)] text-[clamp(2rem,4vw,3.5rem)] uppercase leading-tight text-[#5A3493]">
              This isn't 'no caffeine.'<br />It's a different system.
            </h2>
            <div className="relative space-y-8">
              <div className="absolute left-[1.65rem] top-4 bottom-4 w-px border-l-2 border-dashed border-[#5A3493]/20" />
              {timeline.map((t) => (
                <div key={t.label} className="flex gap-5">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#5A3493] text-center text-[9px] font-bold uppercase leading-tight tracking-wide text-[#fef8dd]">
                    {t.label.split(" ").map((w, i) => <span key={i} className="block">{w}</span>)}
                  </div>
                  <div className="pt-2">
                    <p className="font-[family-name:var(--font-anton)] text-lg uppercase text-[#5A3493]">{t.heading}</p>
                    <p className="text-sm text-gray-500">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
            <span className="mb-4 text-xs font-bold uppercase tracking-widest text-[#5A3493]/60">
              STUNN vs Regular Coffee
            </span>
            <h2 className="mb-8 font-[family-name:var(--font-anton)] text-[clamp(2rem,4vw,3.5rem)] uppercase leading-tight text-[#5A3493]">
              Why switch<br />to STUNN?
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[340px] text-sm">
                <thead>
                  <tr>
                    <th className="w-[40%] pb-4" />
                    <th className="w-[30%] rounded-t-[10px] bg-[#5A3493] pb-4 pt-4 text-center">
                      <span className="font-[family-name:var(--font-anton)] text-lg text-white">STUNN+</span>
                    </th>
                    <th className="w-[30%] pb-4 text-center text-[10px] font-bold uppercase tracking-wider text-[#5A3493]/60">
                      Regular Coffee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => {
                    const isLast = i === comparisonRows.length - 1;
                    return (
                      <tr key={row.label} className="border-t border-[#5A3493]/10">
                        <td className="py-3 pr-3 text-[11px] font-bold uppercase tracking-wider text-[#5A3493]">{row.label}</td>
                        <td className={`bg-[#5A3493] py-3 text-center text-xs font-medium text-white ${isLast ? "rounded-b-[10px]" : ""}`}>
                          {row.type === "stars" ? <span className="text-base text-[#EFAF00]">{row.stunn}</span> : row.stunn}
                        </td>
                        <td className="py-3 text-center text-xs text-[#5A3493]/50">
                          {row.type === "stars" ? <span className="text-base text-[#EFAF00]/50">{row.competitor}</span> : row.competitor}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <a
              href="#purchase"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#fef8dd] shadow-[0_5px_0_0_#3d1c8f] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#3d1c8f]"
            >
              Start Your Ritual →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#5A3493] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mb-2 text-lg leading-none text-[#EFAF00]">★★★★★</div>
            <span className="text-sm font-bold text-white/80">5.0 · Over 1,000 happy customers</span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col gap-4 border-t border-white/20 pt-6">
                <p className="text-sm leading-relaxed text-white/90">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-sm font-bold text-white">{t.name}, {t.age}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="bg-[#EDEAEF]">
        <div className="mx-auto max-w-screen-xl px-0 lg:grid lg:grid-cols-2">
          <div className="relative min-h-[400px] overflow-hidden lg:min-h-[560px]">
            <Image
              src={`${CDN}img-andrew-jennings-stunn-founder.webp`}
              alt="Andrew Jennings, founder of STUNN"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col justify-center px-8 py-12 lg:px-14">
            <span className="mb-3 inline-block rounded-full border border-[#5A3493]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#5A3493]">
              The Founder
            </span>
            <h2 className="mb-3 font-[family-name:var(--font-anton)] text-[clamp(28px,4vw,52px)] uppercase leading-tight text-[#5A3493]">
              Why I Created STUNN
            </h2>
            <p className="mb-2 text-sm font-semibold text-gray-700">
              Because coffee shouldn&apos;t leave you feeling worse than before
            </p>
            <p className="mb-7 text-base leading-relaxed text-gray-600">
              I&apos;ve always loved coffee, but I didn&apos;t love how it made me feel. The jitters, the crashes, and the nights where sleep just wouldn&apos;t come. So I decided to create a better option. STUNN is built to keep everything we love about coffee, while removing what we don&apos;t.
            </p>
            <p className="mb-6 font-[family-name:var(--font-anton)] text-sm uppercase tracking-widest text-[#5A3493]">
              ANDREW JENNINGS<br />
              <span className="font-sans text-xs font-normal normal-case tracking-normal text-gray-500">Founder, STUNN</span>
            </p>
            <a
              href="#purchase"
              className="inline-flex items-center gap-2 self-start rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#fef8dd] shadow-[0_5px_0_0_#3d1c8f] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#3d1c8f]"
            >
              Start Your Ritual →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#EDEAEF] py-12 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-6 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16 lg:px-8">
          <div className="mb-10 flex flex-col justify-start lg:mb-0">
            <span className="mb-3 inline-block rounded-full border border-[#5A3493]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#5A3493]">
              Frequently Asked Questions
            </span>
            <h2 className="mb-6 font-[family-name:var(--font-anton)] text-[clamp(36px,5vw,64px)] uppercase leading-tight text-[#5A3493]">
              Questions,<br />answered.
            </h2>
            <a
              href="#purchase"
              className="inline-flex items-center gap-2 self-start rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#fef8dd] shadow-[0_5px_0_0_#3d1c8f] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#3d1c8f]"
            >
              Start Your Ritual →
            </a>
          </div>
          <div className="divide-y divide-[#5A3493]/15">
            {pdpFaqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-[family-name:var(--font-anton)] text-base uppercase tracking-wide text-[#5A3493]">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-[#5A3493] transition-transform duration-200 group-open:rotate-180">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA RAIL ── */}
      <section className="relative overflow-hidden bg-[#5A3493]">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-screen-xl px-6 py-16 text-center lg:py-24">
          <span className="mb-4 inline-block rounded-full border border-white/30 px-3 py-1 text-xs font-medium tracking-widest text-white/80">
            Start your ritual.
          </span>
          <h2 className="mb-6 font-[family-name:var(--font-anton)] text-[clamp(36px,6vw,72px)] uppercase leading-tight text-white">
            The cup you reach for.<br />Without the cost you&apos;ve been paying.
          </h2>
          <a
            href="#purchase"
            className="inline-flex items-center gap-2 rounded-[10px] bg-[#fef8dd] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#5A3493] shadow-[0_5px_0_0_rgba(0,0,0,0.2)] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_rgba(0,0,0,0.2)]"
          >
            Get STUNN from $33.99
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
