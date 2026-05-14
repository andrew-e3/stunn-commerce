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

const ingredients = [
  {
    name: "Lion's Mane",
    img: `${CDN}img-lions-mane_1.png`,
    description: "Supports focus, memory, and mental clarity so you can stay sharp without feeling wired.",
  },
  {
    name: "Rhodiola",
    img: `${CDN}img-rhodiola_1.png`,
    description: "Helps reduce stress and mental fatigue while supporting steady energy throughout the day.",
  },
  {
    name: "Cordyceps",
    img: `${CDN}img-cordyceps_1.png`,
    description: "Boosts natural energy and endurance without overstimulation or crashes.",
  },
  {
    name: "L'theanine",
    img: `${CDN}img-lteanine_1.png`,
    description: "Promotes calm focus and smooths out the edges, helping you stay relaxed and alert at the same time.",
  },
];

const timeline = [
  {
    label: "20-30 mins",
    heading: "Clearer head.",
    description: "The mental fog starts lifting before your second sip.",
  },
  {
    label: "1 hour",
    heading: "Focused state.",
    description: "You're in it — no false starts, no jitter tax.",
  },
  {
    label: "3-4 hours",
    heading: "Sustained output.",
    description: "The kind you'd normally trade for a crash.",
  },
  {
    label: "Evening",
    heading: "No crash. Normal sleep.",
    description: "You actually close the loop today.",
  },
];

const comparisonRows = [
  { label: "Cost Per Serving", stunn: "From $0.38", competitor: "$3.99+", type: "text" },
  { label: "Taste", stunn: "★★★★★", competitor: "★★", type: "stars" },
  { label: "Jitters", stunn: "None", competitor: "Often jitters or anxiety", type: "text" },
  { label: "Digestive Friendly", stunn: "Gentle on stomach", competitor: "Can be acidic or harsh", type: "text" },
  { label: "Convenience", stunn: "Instant sachet, on-the-go", competitor: "Brewing Required", type: "text" },
  { label: "Routine Friendly", stunn: "Perfect for morning, afternoon, or evening", competitor: "Best only in morning for many", type: "text" },
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

// Product image URLs from Shopify CDN
const MOSAIC_IMAGES = [
  {
    src: `${CDN}img-all-the-edge-none-of-the-jitters-stunn-coffee-benefits_95c6e424-1565-46f6-b269-24a86114b866.webp`,
    alt: "All the Edge, None of the Jitters",
    tall: true,
  },
  {
    src: `${CDN}img-stunn-decaf-coffee-after-two-week-effect.webp`,
    alt: "In 2 Weeks, Say Goodbye To jitters",
    tall: false,
  },
  {
    src: `${CDN}img-stunn-decaf-coffee-what-to-expect-after-use.webp`,
    alt: "What to expect after switching to STUNN",
    tall: false,
  },
  {
    src: `${CDN}3-boxes-of-stunn-1080x1080.webp`,
    alt: "3 boxes of STUNN",
    tall: false,
  },
  {
    src: `${CDN}mockup-stunn-box.webp`,
    alt: "STUNN box",
    tall: false,
  },
  {
    src: `${CDN}img-s-11.webp`,
    alt: "STUNN lifestyle",
    tall: false,
  },
  {
    src: `${CDN}mockup-stunn-sachet-back.webp`,
    alt: "STUNN sachet",
    tall: false,
  },
];

const personaSections = [
  {
    tag: "For the Afternoon Coffee Drinker",
    heading: "Have the 3pm coffee. Sleep tonight too.",
    body: "There's always a moment later in the day when you want another cup but stop yourself. STUNN gives that ritual back.",
    bullets: ["Enjoy coffee later in the day", "Stay sharp into the evening", "Sleep as normal"],
    image: `${CDN}img-stunn-decaf-coffee-stick-pour-adaptogens-nootropics-480-x-745.jpg`,
  },
  {
    tag: "For Those Done With the Side Effects",
    heading: "Sharp focus, without what coffee costs you.",
    body: "If caffeine helps and hurts, STUNN is the upgrade. Calm focus, cleaner energy, no crash.",
    bullets: ["Focus without jitters", "No afternoon crash", "Sleep friendly focus"],
    image: `${CDN}img-a-man-sipping-a-cup-of-coffee-while-holding-stunn-sachet_1.webp`,
  },
  {
    tag: "For the Ex Caffeine Crowd",
    heading: "Quit caffeine. Keep the part you loved.",
    body: "You left caffeine behind but missed the ritual and the feeling. STUNN fills that gap.",
    bullets: ["Keep the ritual", "Get the focus back", "No return to caffeine"],
    image: `${CDN}img-man-drinking-stunn-coffee.webp`,
  },
  {
    tag: "For the Skeptics",
    heading: "You don't have to believe in wellness to feel this work.",
    body: "Built for people who want real performance, not marketing language.",
    bullets: ["Clinically dosed ingredients", "Calm, steady focus", "Loved by people who take coffee seriously"],
    image: `${CDN}img-s-6.webp`,
  },
];

const pdpFaqs = [
  {
    question: "What makes STUNN different from regular coffee?",
    answer: "STUNN gives you the experience of coffee without the usual downsides. It's decaf, but enhanced with functional ingredients like Lion's Mane, Rhodiola, Cordyceps, and L-Theanine to support focus, calm, and steady energy. Instead of spikes and crashes, you get a smoother, more controlled way to enjoy coffee.",
  },
  {
    question: "How do I prepare STUNN?",
    answer: "Simply mix one sachet with hot/cold water, stir, and enjoy. You can also customize it with milk or your preferred sweetener depending on your taste. It's quick, easy, and designed to fit seamlessly into your daily routine.",
  },
  {
    question: "When can I drink STUNN?",
    answer: "STUNN is made to be enjoyed anytime, whether it's morning, mid-day, or late at night. Since it's decaf, it won't disrupt your sleep or leave you feeling wired. It's perfect for work, workouts, or winding down.",
  },
  {
    question: "How long does one box last?",
    answer: "This depends on how often you drink it, but typically one box lasts around 2 to 4 weeks. If you enjoy one cup daily, it can last close to a month. It's an easy way to stay consistent with your coffee routine.",
  },
];

const LIFESTYLE_IMAGES = [
  { src: `${CDN}img-a-man-sipping-a-cup-of-coffee-while-holding-stunn-sachet_1.webp`, label: "STEADY FOCUS" },
  { src: `${CDN}img-stunn-decaf-coffee-stick-pour-adaptogens-nootropics-480-x-745.jpg`, label: "NO JITTERS" },
  { src: `${CDN}img-man-drinking-stunn-coffee.webp`, label: "NO CRASH" },
  { src: `${CDN}img-s-6.webp`, label: "SLEEP-FRIENDLY" },
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

      {/* ── HERO: sticky right panel + image + benefit cards ── */}
      <div className="relative lg:flex lg:items-start">
        {/* Left: product image + vertical benefit strip */}
        <div className="flex lg:w-[55%]">
          {/* Main product image */}
          <div className="relative min-h-[360px] flex-1 bg-[#EDE9F8] lg:min-h-[640px]">
            <Image
              src={`${CDN}img-all-the-edge-none-of-the-jitters-stunn-coffee-benefits_95c6e424-1565-46f6-b269-24a86114b866.webp`}
              alt="STUNN — All the Edge, None of the Jitters"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Benefit icon cards — vertical strip */}
          <div className="hidden flex-shrink-0 flex-col border-l border-gray-200 bg-white sm:flex" style={{ width: "38%" }}>
            {[
              {
                label: "Cleaner Focus",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                ),
              },
              {
                label: "Steady Energy",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 2L4.5 13.5H11L9 22L19.5 10.5H13L13 2Z" />
                  </svg>
                ),
              },
              {
                label: "No Jitters",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    <path d="M8 15s1.5-2 4-2 4 2 4 2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" />
                    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" />
                  </svg>
                ),
              },
              {
                label: "Sleep Friendly",
                icon: (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ),
              },
            ].map((b) => (
              <div
                key={b.label}
                className="flex flex-1 flex-col items-center justify-center gap-3 border-b border-gray-100 px-4 py-6 last:border-0"
              >
                <div className="text-[#5A3493]">{b.icon}</div>
                <span className="text-center text-[11px] font-bold uppercase tracking-widest text-[#5A3493]">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: sticky purchase panel */}
        <div id="purchase" className="lg:w-[45%] lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto">
          <Suspense fallback={<div className="h-screen animate-pulse bg-gray-50" />}>
            <StunnPurchasePanel product={product} />
          </Suspense>
        </div>
      </div>

      {/* ── IMAGE MOSAIC (below hero) ── */}
      <div className="grid grid-cols-2 md:grid-cols-4">
        {MOSAIC_IMAGES.slice(1, 5).map((img) => (
          <div key={img.src} className="relative aspect-square bg-gray-100">
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* ── LIFESTYLE PHOTO STRIP ── */}
      <section className="grid grid-cols-2 md:grid-cols-4">
        {LIFESTYLE_IMAGES.map((img) => (
          <div key={img.src} className="relative aspect-square overflow-hidden bg-gray-100">
            <Image src={img.src} alt={img.label} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
            <span className="absolute left-4 top-4 font-[family-name:var(--font-anton)] text-lg uppercase leading-none text-white md:text-2xl">
              {img.label}
            </span>
          </div>
        ))}
      </section>

      {/* ── TIMELINE SPLIT ── */}
      <section className="border-t border-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
            {/* Left: copy */}
            <div className="lg:w-1/2">
              <div className="mb-4 inline-flex items-center rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600">
                What You&apos;ll Feel · Timeline
              </div>
              <h2 className="mb-4 font-[family-name:var(--font-anton)] text-4xl leading-tight text-[#5A3493] uppercase md:text-5xl">
                This isn&apos;t &lsquo;no caffeine.&rsquo;
                <br />
                It&apos;s a different system
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-gray-600">
                Functional ingredients (Lion&apos;s Mane, Rhodiola, Cordyceps, L-Theanine) support calm
                focus, steady output, and sleep-friendly energy — without the spike-and-crash of
                caffeine.
              </p>
              <a
                href="#purchase"
                className="inline-flex items-center gap-2 rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#fef8dd] shadow-[0_5px_0_0_#3d1c8f] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#3d1c8f]"
              >
                Start Your Ritual →
              </a>
              <p className="mt-3 text-xs text-gray-500">From $33.99/mo · Cancel anytime</p>
            </div>

            {/* Right: vertical dotted timeline */}
            <div className="relative lg:w-1/2">
              <div className="absolute left-[1.8rem] top-6 bottom-6 w-px border-l-2 border-dashed border-[#5A3493]/30" />
              <div className="space-y-10">
                {timeline.map((t) => (
                  <div key={t.label} className="flex gap-6">
                    <div className="relative flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5A3493] text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-[#fef8dd]">
                        {t.label.split(" ").map((w, i) => (
                          <span key={i} className="block">{w}</span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2">
                      <h3 className="font-[family-name:var(--font-anton)] text-xl uppercase text-[#5A3493]">
                        {t.heading}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">{t.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INGREDIENTS ── */}
      <section className="border-t border-gray-100 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600">
              Good Stuff, Simple Coffee
            </div>
            <h2 className="font-[family-name:var(--font-anton)] text-4xl uppercase text-[#5A3493] md:text-5xl">
              What&apos;s Inside STUNN Coffee
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ingredients.map((ing) => (
              <div
                key={ing.name}
                className="flex flex-col border border-[#5A3493]/70 px-8 py-10"
              >
                <h3 className="mb-8 font-[family-name:var(--font-anton)] text-[clamp(1.8rem,2.8vw,2.4rem)] uppercase leading-tight text-[#5A3493]">
                  {ing.name}
                </h3>
                <div className="flex flex-1 items-center justify-center py-4">
                  <Image
                    src={ing.img}
                    alt={ing.name}
                    width={240}
                    height={200}
                    className="max-h-[200px] w-full object-contain"
                  />
                </div>
                <p className="mt-8 text-center text-xs leading-relaxed text-[#5A3493]/70">{ing.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="#purchase"
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#fef8dd] shadow-[0_5px_0_0_#3d1c8f] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#3d1c8f]"
            >
              Start Your Ritual →
            </a>
            <p className="mt-2 text-xs text-gray-500">From $33.99/mo · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="border-t border-gray-100 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
            {/* Left: heading + CTA */}
            <div className="flex flex-col lg:w-[300px] lg:flex-shrink-0 lg:pt-16">
              <div className="mb-4 inline-flex w-fit items-center rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-600">
                STUNN vs Regular Coffee
              </div>
              <h2 className="mb-4 font-[family-name:var(--font-anton)] text-5xl uppercase leading-tight text-[#5A3493] md:text-6xl">
                Why Switch<br />to STUNN?
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-gray-600">
                <strong>STUNN</strong> gives you the ritual, flavor, and focus you love,{" "}
                <strong>without the jitters, crashes</strong>, or extra cost of regular coffee.
              </p>
              <a
                href="#purchase"
                className="inline-flex w-fit items-center gap-2 rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#fef8dd] shadow-[0_5px_0_0_#3d1c8f] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#3d1c8f]"
              >
                Start Your Ritual →
              </a>
              <p className="mt-3 text-xs text-gray-500">From $33.99/mo · Cancel anytime</p>
            </div>

            {/* Right: table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr>
                    <th className="w-[36%] pb-5" />
                    <th className="w-[32%] rounded-t-[14px] bg-[#5A3493] pb-5 pt-6 text-center">
                      <span className="font-[family-name:var(--font-anton)] text-2xl tracking-wide text-white">STUNN+</span>
                    </th>
                    <th className="w-[32%] pb-5 text-center text-xs font-bold uppercase tracking-wider text-[#5A3493]">
                      Regular Coffee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => {
                    const isLast = i === comparisonRows.length - 1;
                    return (
                      <tr key={row.label} className="border-t border-gray-200">
                        <td className="py-5 pr-4 text-xs font-bold uppercase tracking-wider text-[#5A3493]">
                          {row.label}
                        </td>
                        <td className={`bg-[#5A3493] py-5 text-center text-sm font-medium text-white ${isLast ? "rounded-b-[14px]" : ""}`}>
                          {row.type === "stars" ? (
                            <span className="text-lg leading-none text-[#EFAF00]">{row.stunn}</span>
                          ) : row.stunn}
                        </td>
                        <td className="py-5 text-center text-sm text-[#5A3493]/70">
                          {row.type === "stars" ? (
                            <span className="text-lg leading-none text-[#EFAF00]/60">{row.competitor}</span>
                          ) : row.competitor}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#5A3493] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mb-2 text-lg leading-none text-[#EFAF00]">★★★★★</div>
            <span className="text-sm font-bold text-white/80">5.0</span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col gap-4 border-t border-white/20 pt-6">
                <p className="text-sm leading-relaxed text-white/90">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-lg">
                    <Image
                      src={`${CDN}icon-smiley.svg`}
                      alt={t.name}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}, {t.age}</p>
                    <p className="text-xs text-white/60">Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERSONA SECTIONS ── */}
      <section className="bg-[#EDEAEF]">
        {personaSections.map((persona, i) => (
          <div
            key={persona.tag}
            className={`border-b border-[#5A3493]/10 py-14 lg:py-20 ${i % 2 === 1 ? "bg-white/30" : ""}`}
          >
            <div className="mx-auto max-w-screen-xl px-6 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-8">
              <div className={`flex flex-col justify-center ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <span className="mb-3 inline-block rounded-full border border-[#5A3493]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#5A3493]">
                  {persona.tag}
                </span>
                <h2 className="mb-4 font-[family-name:var(--font-anton)] text-[clamp(28px,3.5vw,48px)] uppercase leading-tight text-[#5A3493]">
                  {persona.heading}
                </h2>
                <p className="mb-6 text-base leading-relaxed text-gray-600">{persona.body}</p>
                <ul className="mb-8 space-y-2">
                  {persona.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="h-4 w-4 shrink-0 text-[#5A3493]" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.78 6.28-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06l1.47 1.47 3.97-3.97a.75.75 0 0 1 1.06 1.06z" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative min-h-[340px] overflow-hidden rounded-xl ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <Image src={persona.image} alt={persona.heading} fill className="object-cover" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#EDEAEF] py-12 lg:py-16">
        <div className="mx-auto max-w-screen-xl px-6 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16 lg:px-8">
          <div className="mb-10 flex flex-col justify-start lg:mb-0">
            <span className="mb-3 inline-block rounded-full border border-[#5A3493]/30 px-3 py-1 text-xs font-medium tracking-widest text-[#5A3493]">
              Frequently Asked Questions
            </span>
            <h2 className="mb-6 font-[family-name:var(--font-anton)] text-[clamp(36px,5vw,64px)] uppercase leading-tight text-[#5A3493]">
              Questions, answered.
            </h2>
            <a
              href="#purchase"
              className="inline-flex items-center gap-2 self-start rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#fef8dd] shadow-[0_5px_0_0_#3d1c8f] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#3d1c8f]"
            >
              Start Your Ritual →
            </a>
            <p className="mt-2 text-xs text-gray-500">From $33.99/mo · Cancel anytime</p>
          </div>
          <div className="divide-y divide-[#5A3493]/15">
            {pdpFaqs.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-[family-name:var(--font-anton)] text-base uppercase tracking-wide text-[#5A3493]">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-[#5A3493] transition-transform duration-200 group-open:rotate-180">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="bg-[#EDEAEF] py-12 lg:py-20">
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
              I&apos;ve always loved coffee, but I didn&apos;t love how it made me feel. The jitters, the crashes, and the nights where sleep just wouldn&apos;t come. I tried cutting back, switching brands, even quitting, but nothing really worked. So I decided to create a better option. STUNN is built to keep everything we love about coffee, while removing what we don&apos;t. A smoother, more balanced experience you can enjoy anytime, without second-guessing how you&apos;ll feel after.
            </p>
            <p className="mb-6 font-[family-name:var(--font-anton)] text-sm uppercase tracking-widest text-[#5A3493]">
              ANDREW JENNINGS<br />
              <span className="text-gray-500 font-sans font-normal normal-case tracking-normal text-xs">Founder, STUNN</span>
            </p>
            <a
              href="#purchase"
              className="inline-flex items-center gap-2 self-start rounded-[10px] bg-[#5A3493] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#fef8dd] shadow-[0_5px_0_0_#3d1c8f] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#3d1c8f]"
            >
              Start Your Ritual →
            </a>
            <p className="mt-2 text-xs text-gray-500">From $33.99/mo • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden bg-[#5A3493]">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-screen-xl px-6 py-16 text-center lg:py-24">
          <span className="mb-4 inline-block rounded-full border border-white/30 px-3 py-1 text-xs font-medium tracking-widest text-white/80">
            Start your ritual.
          </span>
          <h2 className="mb-4 font-[family-name:var(--font-anton)] text-[clamp(36px,6vw,72px)] uppercase leading-tight text-white">
            The cup you reach for.<br />Without the cost you&apos;ve been paying.
          </h2>
          <a
            href="#purchase"
            className="mt-6 inline-flex items-center gap-2 rounded-[10px] bg-[#fef8dd] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#5A3493] shadow-[0_5px_0_0_#3d1c8f] transition-all hover:translate-y-[2px] hover:shadow-[0_3px_0_0_#3d1c8f]"
          >
            Get STUNN from $33.99
          </a>
        </div>
      </section>

      {/* ── ICON COLUMNS ── */}
      <section className="bg-[#EDEAEF]">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid divide-x divide-[#5A3493]/10 border-b border-t border-[#5A3493]/10 lg:grid-cols-3">
            {[
              { icon: `${CDN}icon-package.svg`, heading: "Fast Delivery", text: "Get STUNN shipped straight to your door. Quick, reliable, hassle-free." },
              { icon: `${CDN}icon-exchange.svg`, heading: "Subscription Made Easy", text: "Never run out. Save 15% with subscription orders, and cancel anytime." },
              { icon: `${CDN}icon-bolt-circle.svg`, heading: "Simple & Convenient", text: "One box a month, zero stress, coffee delivered the way you want it." },
            ].map((col) => (
              <div key={col.heading} className="flex flex-col items-center px-8 py-12 text-center">
                <Image src={col.icon} alt={col.heading} width={40} height={40} className="mb-4 h-10 w-10" />
                <p className="mb-2 font-[family-name:var(--font-anton)] text-xl uppercase text-[#5A3493]">{col.heading}</p>
                <p className="text-sm leading-relaxed text-gray-600">{col.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
