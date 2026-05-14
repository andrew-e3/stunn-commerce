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
    <footer className="bg-[#5A3493]">
      {/* ── Top: Newsletter + Nav ── */}
      <div className="mx-auto flex max-w-screen-xl flex-col gap-16 px-6 py-16 lg:flex-row lg:gap-24 lg:px-8 lg:py-20">
        {/* Newsletter */}
        <div className="flex flex-col gap-6 lg:w-[42%] lg:flex-shrink-0">
          <h2 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,3vw,3.2rem)] uppercase leading-tight text-white">
            {`DON'T MISS OUT ON`}<br />STUNN UPDATES
          </h2>
          <p className="text-sm font-semibold text-white">
            Exclusive perks, early access, and better coffee — join the list.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="min-w-0 flex-1 border border-white/25 bg-white px-4 py-3 font-[family-name:var(--font-anton)] text-sm uppercase tracking-wider text-[#5A3493] placeholder-[#5A3493] outline-none focus:border-white"
            />
            <button
              type="submit"
              className="shrink-0 border border-white/25 bg-[#F9CEE1] px-5 py-3 font-[family-name:var(--font-anton)] text-sm uppercase tracking-widest text-[#5A3493] transition-opacity hover:opacity-90"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Nav columns + social */}
        <nav className="flex flex-wrap gap-x-16 gap-y-10 lg:flex-1 lg:justify-end">
          {/* Store */}
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-white/60">STORE</p>
            <ul className="flex flex-col gap-3">
              {STORE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-white/60">HELP</p>
            <ul className="flex flex-col gap-3">
              {HELP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-white/60">Follow Us</p>
            <div className="flex gap-3">
              <a
                href="http://instagram.com/drinkstunn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/80 hover:text-white"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* ── STUNN white logo ── */}
      <div className="px-6 py-4 lg:px-8">
        <Image
          src={`${CDN}STUNN_LOGO-White.png`}
          alt="STUNN"
          width={1400}
          height={120}
          className="w-full"
        />
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex flex-col gap-3 px-6 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>© {year}, <Link href="/" className="hover:text-white">STUNN</Link></span>
        <Image
          src={`${CDN}icon-payment-mode-logos.svg`}
          alt="Visa, Apple Pay, Mastercard and more"
          width={240}
          height={20}
          className="h-4 w-auto opacity-60"
        />
      </div>

      {/* ── FDA Disclaimer ── */}
      <div className="px-6 py-6 text-center text-[10px] italic leading-relaxed text-white/40 lg:px-16">
        <p>{DISCLAIMER}</p>
      </div>
    </footer>
  );
}
