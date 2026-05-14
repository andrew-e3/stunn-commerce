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
  {
    label: "Calm Focus",
    desc: "Focus that feels grounded, not wired.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#5A3493" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 28c0 0-8-5-8-13a8 8 0 0 1 16 0c0 8-8 13-8 13z" />
        <path d="M18 15c-3 0-5 2-5 5" />
        <path d="M18 15c3 0 5 2 5 5" />
        <path d="M10 10c-3 1-5 4-5 8" />
        <path d="M26 10c3 1 5 4 5 8" />
      </svg>
    ),
  },
  {
    label: "Steady Energy",
    desc: "Smooth clarity that lasts for hours.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#5A3493" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 6L13 20h7l-5 10 13-16h-8l5-8z" />
      </svg>
    ),
  },
  {
    label: "No Jitters",
    desc: "Clean energy without the overstimulation.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#5A3493" strokeWidth="1.5" strokeLinecap="round">
        <path d="M8 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M8 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M8 26c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      </svg>
    ),
  },
  {
    label: "No Crash",
    desc: "No afternoon slump or sudden drop-off.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#5A3493" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25 13a9 9 0 1 0 1.6 5" />
        <polyline points="26 8 26 14 20 14" />
      </svg>
    ),
  },
  {
    label: "Sleep Friendly",
    desc: "Drink it late and still sleep deeply.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#5A3493" strokeWidth="1.5" strokeLinecap="round">
        <path d="M27 20a10 10 0 1 1-11-11 7 7 0 0 0 11 11z" />
        <path d="M24 10l1.5-1.5M27 13l1.5-.5" />
      </svg>
    ),
  },
  {
    label: "Gentle on Stomach",
    desc: "Easier on digestion than traditional coffee.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#5A3493" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 28V16" />
        <path d="M18 20c0 0-6-4-6-9a6 6 0 0 1 6-3" />
        <path d="M18 20c0 0 6-4 6-9a6 6 0 0 0-6-3" />
      </svg>
    ),
  },
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
        {/* Left: expandable image gallery with benefit pills baked into hero */}
        <div className="lg:w-1/2">
          <ImageGallery
            images={MOSAIC_IMAGES}
            heroOverlay={
              <>
                {/* Bottom-left pills */}
                <div className="absolute bottom-5 left-4 flex flex-col gap-2">
                  {[
                    { label: "Calm Focus",  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5A3493" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="#5A3493" stroke="none"/></svg> },
                    { label: "No Jitters",  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5A3493" strokeWidth="2.2" strokeLinecap="round"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="9" r="1" fill="#5A3493" stroke="none"/><circle cx="15" cy="9" r="1" fill="#5A3493" stroke="none"/></svg> },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-2 rounded-full bg-white/90 py-2 pl-2.5 pr-4 shadow-md backdrop-blur-md">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#EDE9F8]">{b.icon}</div>
                      <span className="whitespace-nowrap font-[family-name:var(--font-anton)] text-[11px] uppercase tracking-wider text-[#5A3493]">{b.label}</span>
                    </div>
                  ))}
                </div>
                {/* Bottom-right pills */}
                <div className="absolute bottom-5 right-4 flex flex-col items-end gap-2">
                  {[
                    { label: "Steady Energy",  icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#5A3493"><path d="M13 2L4.5 13.5H11L9 22L19.5 10.5H13L13 2Z"/></svg> },
                    { label: "Sleep Friendly", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5A3493" strokeWidth="2.2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> },
                  ].map((b) => (
                    <div key={b.label} className="flex items-center gap-2 rounded-full bg-white/90 py-2 pl-2.5 pr-4 shadow-md backdrop-blur-md">
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#EDE9F8]">{b.icon}</div>
                      <span className="whitespace-nowrap font-[family-name:var(--font-anton)] text-[11px] uppercase tracking-wider text-[#5A3493]">{b.label}</span>
                    </div>
                  ))}
                </div>
              </>
            }
          />
        </div>

        {/* Right: purchase panel */}
        <div id="purchase" className="lg:w-1/2">
          <Suspense fallback={<div className="h-screen animate-pulse bg-gray-50" />}>
            <StunnPurchasePanel product={product} />
          </Suspense>
        </div>
      </div>

      {/* ── BENEFITS GRID ── */}
      <section className="bg-[#EDE9F8] py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-[#5A3493]/60">
            What you get with every cup
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 border border-[#5A3493]/15 rounded-[16px] overflow-hidden">
            {BENEFITS.map((b, i) => (
              <div
                key={b.label}
                className={`flex flex-col items-center bg-[#EDE9F8] px-6 py-10 text-center
                  ${i % 3 !== 2 ? "md:border-r border-[#5A3493]/15" : ""}
                  ${i % 2 !== 1 ? "border-r md:border-r-0 border-[#5A3493]/15" : ""}
                  ${i < 3 ? "border-b border-[#5A3493]/15" : ""}
                `}
              >
                <div className="mb-4">{b.icon}</div>
                <p className="mb-2 font-[family-name:var(--font-anton)] text-[clamp(1.1rem,2vw,1.4rem)] uppercase leading-tight text-[#5A3493]">
                  {b.label}
                </p>
                <div className="mb-3 h-px w-8 bg-[#5A3493]/40" />
                <p className="text-sm leading-relaxed text-[#5A3493]/70">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT — photo timeline ── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5A3493]/60">The timeline</p>
            <h2 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,5vw,3.5rem)] uppercase leading-tight text-[#5A3493]">
              What to expect after<br />switching to STUNN
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                time: "After 30 Minutes",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A3493" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                headline: "Smooth, steady clarity.",
                copy: "No jitters, no crash — just clean focus from the first sip.",
                img: `${CDN}img-a-man-sipping-a-cup-of-coffee-while-holding-stunn-sachet_1.webp`,
                alt: "Man focused with STUNN coffee",
              },
              {
                time: "After 14 Days",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A3493" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                ),
                headline: "Balanced all day.",
                copy: "No 3PM crash, no irritability. Just steady, natural energy that lasts.",
                img: `${CDN}img-stunn-decaf-coffee-after-two-week-effect.webp`,
                alt: "After 2 weeks of STUNN",
              },
              {
                time: "After 30 Days",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5A3493" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ),
                headline: "Better nights, better mornings.",
                copy: "Deep, restorative sleep — wake up reset and truly refreshed.",
                img: `${CDN}img-stunn-decaf-coffee-what-to-expect-after-use.webp`,
                alt: "What to expect after 30 days with STUNN",
              },
            ].map((step) => (
              <div key={step.time} className="flex flex-col">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[16px]">
                  <Image src={step.img} alt={step.alt} fill className="object-cover object-top" />
                </div>
                <div className="pt-6">
                  <div className="mb-2 flex items-center gap-2">
                    {step.icon}
                    <span className="text-xs font-bold uppercase tracking-widest text-[#5A3493]">{step.time}</span>
                  </div>
                  <p className="mb-1 font-[family-name:var(--font-anton)] text-xl uppercase text-gray-900">{step.headline}</p>
                  <p className="text-sm leading-relaxed text-gray-500">{step.copy}</p>
                </div>
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
