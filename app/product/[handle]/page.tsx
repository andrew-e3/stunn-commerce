import { AddToCart } from "components/cart/add-to-cart";
import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { StunnFaq } from "components/product/stunn-faq";
import { StunnVariantSelector } from "components/product/stunn-variant-selector";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct } from "lib/shopify";
import type { Image } from "lib/shopify/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
    dose: "300mg",
    benefit: "Memory & Clarity",
    description:
      "Supports neuroplasticity and cognitive function. Shown to enhance focus and memory recall without stimulants.",
    emoji: "🍄",
  },
  {
    name: "Rhodiola",
    dose: "250mg",
    benefit: "Stress & Fatigue",
    description:
      "An adaptogen that helps your body handle stress more efficiently, reducing mental fatigue during demanding work.",
    emoji: "🌿",
  },
  {
    name: "Cordyceps",
    dose: "100mg",
    benefit: "Energy & Endurance",
    description:
      "Naturally increases ATP production for sustained energy output — without the spike and crash of caffeine.",
    emoji: "⚡",
  },
  {
    name: "L-Theanine",
    dose: "100mg",
    benefit: "Calm Focus",
    description:
      "The amino acid found in green tea. Promotes alpha brain waves — a state of relaxed alertness and deep focus.",
    emoji: "🧘",
  },
];

const benefits = [
  { icon: "🎯", title: "Steady Focus", desc: "Dialed in without the overstimulation" },
  { icon: "✋", title: "No Jitters", desc: "Smooth energy from functional ingredients" },
  { icon: "📈", title: "No Crash", desc: "Sustained output through your whole day" },
  { icon: "🌙", title: "Sleep-Friendly", desc: "Drink it at 4pm. Sleep perfectly at 10pm." },
];

const timeline = [
  { time: "20-30 min", label: "Clearer head", desc: "L-Theanine starts promoting calm focus" },
  { time: "1 hour", label: "Focused state", desc: "Lion's Mane and Rhodiola fully activated" },
  { time: "3-4 hours", label: "Sustained output", desc: "Cordyceps keeps your energy steady" },
  { time: "Evening", label: "No crash. Normal sleep.", desc: "Zero caffeine means zero disruption" },
];

const testimonials = [
  {
    quote:
      "I quit caffeine six months ago because of the anxiety. STUNN gave me my morning ritual back — without any of the side effects I hated.",
    name: "Sarah K.",
    detail: "Customer",
  },
  {
    quote:
      "I drink this at 3pm and it genuinely helps me push through the afternoon slump. And I'm asleep by 10. It's the only thing that's ever done that.",
    name: "Marcus T.",
    detail: "Customer",
  },
  {
    quote:
      "I was skeptical. Decaf coffee with mushrooms? But the focus is real. I've been on the 3-month plan for a while and I'm not going back.",
    name: "Jess R.",
    detail: "Customer",
  },
];

const personas = [
  {
    title: "The Afternoon Coffee Drinker",
    points: [
      "Coffee without the sleep disruption",
      "Stay sharp through the 3pm slump",
      "Wake up fully rested tomorrow",
    ],
  },
  {
    title: "Done With Side Effects",
    points: [
      "No jitters, no anxiety, no crash",
      "Functional focus that actually works",
      "Clean ingredients you can pronounce",
    ],
  },
  {
    title: "Former Caffeine Crowd",
    points: [
      "Keep your morning coffee ritual",
      "Reclaim your focus naturally",
      "No going back to the old way",
    ],
  },
  {
    title: "The Skeptic",
    points: [
      "Clinically-studied ingredient doses",
      "Calm focus — not a placebo",
      "Tried by 1,000+ serious coffee drinkers",
    ],
  },
];

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();

  const images = product.images
    .slice(0, 5)
    .map((image: Image) => ({ src: image.url, altText: image.altText || "" }));

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
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

      {/* ── HERO ── */}
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Gallery */}
          <div className="lg:w-3/5">
            <Suspense
              fallback={
                <div className="aspect-square w-full animate-pulse rounded-2xl bg-gray-100" />
              }
            >
              <Gallery images={images} />
            </Suspense>
          </div>

          {/* Purchase panel */}
          <div className="lg:w-2/5">
            {/* Social proof */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-sm text-gray-500">
                5.0 · 1,000+ Happy Customers
              </span>
            </div>

            <h1 className="mb-2 font-[family-name:var(--font-anton)] text-4xl text-[#5A3493]">
              {product.title}
            </h1>
            <p className="mb-6 text-sm leading-relaxed text-gray-600">
              {product.description}
            </p>

            <Suspense
              fallback={
                <div className="h-24 animate-pulse rounded-xl bg-gray-100" />
              }
            >
              <StunnVariantSelector variants={product.variants} />
            </Suspense>

            <ul className="my-5 space-y-2">
              {[
                "Free shipping on every order",
                "30-day money back guarantee",
                "Pause or cancel anytime",
              ].map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="text-[#5A3493]">✓</span>
                  {b}
                </li>
              ))}
            </ul>

            <Suspense fallback={null}>
              <AddToCart product={product} />
            </Suspense>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { icon: "🚚", label: "Ships Within\n1 Business Day" },
                { icon: "😊", label: "Over 1000+\nHappy Customers" },
                { icon: "🔄", label: "30-Day Money Back\nGuarantee" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-2 rounded-xl bg-[#C1D0A5] px-2 py-4">
                  <span className="text-2xl">{b.icon}</span>
                  <span className="whitespace-pre-line font-semibold text-[#5A3493]">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── BENEFITS ── */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center font-[family-name:var(--font-anton)] text-3xl text-[#5A3493]">
            Focus Without Caffeine
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm"
              >
                <span className="mb-3 text-4xl">{b.icon}</span>
                <h3 className="mb-1 font-semibold text-gray-900">{b.title}</h3>
                <p className="text-sm text-gray-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="bg-[#5A3493] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold">
            What You&apos;ll Feel · Timeline
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {timeline.map((t, i) => (
              <div key={i}>
                <div className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  {t.time}
                </div>
                <h3 className="mb-1 text-lg font-bold">{t.label}</h3>
                <p className="text-sm text-purple-100">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INGREDIENT CARDS ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-2 text-center font-[family-name:var(--font-anton)] text-3xl text-[#5A3493]">
            The Stack
          </h2>
          <p className="mb-10 text-center text-sm text-gray-500">
            Four clinically-studied ingredients. Every dose, every time.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ingredients.map((ing) => (
              <div
                key={ing.name}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <span className="mb-3 block text-4xl">{ing.emoji}</span>
                <div className="mb-1 flex items-baseline gap-2">
                  <h3 className="font-bold text-gray-900">{ing.name}</h3>
                  <span className="text-xs font-semibold text-[#5A3493]">
                    {ing.dose}
                  </span>
                </div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {ing.benefit}
                </p>
                <p className="text-sm leading-relaxed text-gray-600">
                  {ing.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="mb-10 text-center font-[family-name:var(--font-anton)] text-3xl text-[#5A3493]">
            STUNN vs Regular Coffee
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 pl-6 text-left font-medium text-gray-400" />
                  <th className="py-4 text-center font-bold text-[#5A3493]">
                    STUNN
                  </th>
                  <th className="py-4 pr-6 text-center font-medium text-gray-400">
                    Regular Coffee
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Jitters", "✓ None", "✗ Common"],
                  ["Crash", "✓ None", "✗ Always"],
                  ["Sleep-Friendly", "✓ Yes", "✗ No"],
                  ["Afternoon Use", "✓ Any time", "✗ Risky after noon"],
                  ["Functional Ingredients", "✓ Yes", "✗ No"],
                  ["Caffeine-Free", "✓ Yes", "✗ No"],
                ].map(([label, stunn, coffee]) => (
                  <tr key={label}>
                    <td className="py-4 pl-6 font-medium text-gray-700">
                      {label}
                    </td>
                    <td className="py-4 text-center font-medium text-[#5A3493]">
                      {stunn}
                    </td>
                    <td className="py-4 pr-6 text-center text-gray-400">
                      {coffee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center font-[family-name:var(--font-anton)] text-3xl text-[#5A3493]">
            What Our Customers Say
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 text-yellow-400">★★★★★</div>
                <p className="mb-4 text-sm leading-relaxed text-gray-700">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-400">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERSONAS ── */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-10 text-center font-[family-name:var(--font-anton)] text-3xl text-[#5A3493]">
            Made For You If...
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {personas.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-bold text-gray-900">{p.title}</h3>
                <ul className="space-y-2">
                  {p.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="mt-0.5 text-[#5A3493]">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="mb-10 text-center font-[family-name:var(--font-anton)] text-3xl text-[#5A3493]">
            Frequently Asked Questions
          </h2>
          <StunnFaq />
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section className="bg-[#5A3493] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
            <div className="flex h-24 w-24 flex-none items-center justify-center rounded-full bg-purple-600 text-4xl ring-4 ring-white/30">
              👤
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-bold">Meet Andrew</h2>
              <p className="max-w-2xl leading-relaxed text-purple-100">
                I built STUNN after years of depending on caffeine to get through
                my days — and suffering through the anxiety, afternoon crashes,
                and terrible sleep that came with it. I wanted something that
                gave me the ritual and the focus, without paying the price. STUNN
                is what I built for myself. Now I drink it every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-3 text-3xl font-bold text-gray-900">
            Start Your Ritual
          </h2>
          <p className="mb-8 text-gray-500">
            From $39.99 · Free shipping · 30-day guarantee
          </p>
          <a
            href={`/product/${params.handle}`}
            className="inline-block rounded-full bg-[#F9CEE1] px-10 py-4 text-sm font-bold uppercase tracking-widest text-[#5A3493] shadow-lg transition hover:bg-[#f0bbd6]"
          >
            Get STUNN →
          </a>
        </div>
      </section>

      {/* ── TRUST FOOTER ── */}
      <section className="border-t border-gray-100 bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { icon: "📦", title: "Fast Delivery", desc: "Ships within 1 business day" },
              { icon: "🔄", title: "Subscription Made Easy", desc: "Pause or cancel any time" },
              { icon: "⚡", title: "Simple & Convenient", desc: "Stick packs, no equipment needed" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{item.icon}</span>
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
