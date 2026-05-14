import Link from "next/link";
import Image from "next/image";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";

const STORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products/focus-without-caffeine" },
  { label: "About Us", href: "/about-us" },
];

const HELP_LINKS = [
  { label: "Contact", href: "/contact" },
  { label: "Login & Account", href: "/account" },
  { label: "FAQs", href: "/faqs" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const DISCLAIMER =
  "These statements have not been evaluated by the Food and Drug Administration. STUNN is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease. The information provided is for general wellness and educational purposes only and should not be considered medical advice. Individual results may vary depending on lifestyle, diet, and overall health. STUNN is designed to support focus, calm, and steady energy as part of a balanced routine, but it should not be used as a substitute for a varied diet, proper nutrition, or professional medical care. Always consult a qualified healthcare provider before starting any supplement regimen, especially if you are pregnant, nursing, have a medical condition, or are taking prescription medications. Discontinue use and consult a healthcare professional if you experience any adverse reactions.";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#5A3493] text-[#fef8dd]">
      {/* ── Top: Newsletter + Nav ── */}
      <div className="mx-auto flex max-w-screen-xl flex-col gap-16 px-6 py-16 lg:flex-row lg:gap-24 lg:px-8 lg:py-20">
        {/* Newsletter */}
        <div className="flex flex-col gap-6 lg:w-[42%] lg:flex-shrink-0">
          <h2 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,3vw,3.2rem)] uppercase leading-tight text-[#fef8dd]">
            Don&apos;t Miss Out on<br />STUNN Updates
          </h2>
          <p className="text-sm font-semibold text-[#fef8dd]/80">
            Exclusive perks, early access, and better coffee — join the list.
          </p>
          <form className="flex max-w-lg gap-2">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="flex-1 border border-[#fef8dd]/30 bg-[#fef8dd] px-4 py-3 font-[family-name:var(--font-anton)] text-sm uppercase tracking-wider text-[#5A3493] placeholder-[#5A3493]/60 outline-none focus:border-[#fef8dd]"
            />
            <button
              type="submit"
              className="shrink-0 border border-[#fef8dd]/30 bg-[#F9CEE1] px-5 py-3 font-[family-name:var(--font-anton)] text-sm uppercase tracking-widest text-[#5A3493] transition-opacity hover:opacity-90"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Nav columns + social */}
        <nav className="flex flex-wrap gap-x-16 gap-y-10 lg:flex-1 lg:justify-end">
          {/* Store */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-normal uppercase tracking-widest text-[#fef8dd]/60">Store</p>
            <ul className="flex flex-col gap-3">
              {STORE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-[#fef8dd]/80 hover:text-[#fef8dd]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-normal uppercase tracking-widest text-[#fef8dd]/60">Help</p>
            <ul className="flex flex-col gap-3">
              {HELP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-[#fef8dd]/80 hover:text-[#fef8dd]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-normal uppercase tracking-widest text-[#fef8dd]/60">Follow Us</p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/stunncoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#fef8dd]/80 hover:text-[#fef8dd]"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@stunncoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-[#fef8dd]/80 hover:text-[#fef8dd]"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.19 8.19 0 0 0 4.79 1.52V6.82a4.84 4.84 0 0 1-1.02-.13z" />
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* ── STUNN+ wordmark ── */}
      <div className="overflow-hidden border-t border-[#fef8dd]/10 px-0">
        <p
          className="select-none whitespace-nowrap font-[family-name:var(--font-anton)] uppercase leading-none text-[#fef8dd]/10"
          style={{ fontSize: "clamp(80px, 18vw, 260px)" }}
        >
          STUNN+
        </p>
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex flex-col gap-3 border-t border-[#fef8dd]/10 px-6 py-5 text-xs text-[#fef8dd]/60 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>© {year} STUNN · All rights reserved.</span>
        <Image
          src={`${CDN}icon-payment-mode-logos.svg`}
          alt="Visa, Apple Pay, Mastercard and more"
          width={240}
          height={20}
          className="h-4 w-auto opacity-60"
        />
      </div>

      {/* ── FDA Disclaimer ── */}
      <div className="border-t border-[#fef8dd]/10 px-6 py-6 text-center text-[10px] italic leading-relaxed text-[#fef8dd]/40 lg:px-16">
        <p>{DISCLAIMER}</p>
      </div>
    </footer>
  );
}
