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
    <footer className="bg-[#5A3493] text-white">
      {/* ── Top: Newsletter + Nav ── */}
      <div className="mx-auto grid max-w-screen-xl gap-8 px-6 py-8 lg:grid-cols-[1.25fr_0.9fr] lg:gap-14 lg:px-8 lg:py-10">
        {/* Nav columns + social */}
        <nav className="grid gap-7 sm:grid-cols-3">
          {/* Store */}
          <div className="flex flex-col gap-3">
            <p className="border-b border-white/70 pb-3 text-sm font-extrabold text-white">
              STORE
            </p>
            <ul className="flex flex-col gap-2.5">
              {STORE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm font-bold uppercase tracking-wide text-white/90 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="flex flex-col gap-3">
            <p className="border-b border-white/70 pb-3 text-sm font-extrabold text-white">
              HELP
            </p>
            <ul className="flex flex-col gap-2.5">
              {HELP_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm font-bold uppercase tracking-wide text-white/90 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col gap-3">
            <p className="border-b border-white/70 pb-3 text-sm font-extrabold text-white">
              FOLLOW US
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/drinkstunn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#5A3493] transition-transform hover:-translate-y-0.5"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/drinkstunn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#5A3493] transition-transform hover:-translate-y-0.5"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
                </svg>
              </a>
              <a
                href="https://x.com/drinkstunn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#5A3493] transition-transform hover:-translate-y-0.5"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.9 2.5h3.3l-7.2 8.2 8.5 10.8h-6.7l-5.2-6.6-6 6.6H2.3l7.7-8.6L1.8 2.5h6.8l4.7 6 5.6-6Zm-1.2 17.1h1.8L7.6 4.3H5.7l12 15.3Z" />
                </svg>
              </a>
            </div>
          </div>
        </nav>

        {/* Newsletter */}
        <div className="flex flex-col gap-4 lg:pl-4">
          <h2 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,3.2vw,3.25rem)] uppercase leading-[0.95] text-white">
            Sign up for
            <br />
            STUNN updates
          </h2>
          <p className="max-w-md text-sm font-semibold leading-relaxed text-white/90">
            Ritual notes, product drops, and subscriber-only perks for calmer
            coffee days.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="E-mail"
              className="min-w-0 flex-1 rounded-[6px] border border-white bg-transparent px-4 py-2.5 text-sm font-bold text-white placeholder-white/75 outline-none focus:bg-white/10"
            />
            <button
              type="submit"
              className="shrink-0 rounded-[6px] bg-white px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide text-[#111111] transition-all hover:-translate-y-0.5 hover:bg-[#111111] hover:text-white"
            >
              Sign up
            </button>
          </form>
          <p className="text-[9px] font-medium leading-relaxed text-white/70">
            By joining, you&apos;ll receive STUNN updates and can unsubscribe
            anytime.
          </p>
        </div>
      </div>

      {/* ── STUNN white logo ── */}
      <div className="mx-auto border-t border-white/70 px-6 py-5 lg:max-w-screen-xl lg:px-8 lg:py-6">
        <Image
          src={`${CDN}STUNN_LOGO-White.png`}
          alt="STUNN"
          width={3533}
          height={1099}
          className="mx-auto h-auto w-full max-w-[760px] object-contain lg:max-w-[840px]"
          priority
        />
      </div>

      {/* ── Bottom bar ── */}
      <div className="mx-auto flex flex-col gap-3 px-6 pb-4 text-xs text-white/85 sm:flex-row sm:items-center sm:justify-between lg:max-w-screen-xl lg:px-8">
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacy-policy" className="underline hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="underline hover:text-white">
            Terms & Conditions
          </Link>
          <Link href="/refund-policy" className="underline hover:text-white">
            Return Policy
          </Link>
        </div>
        <span className="font-medium">
          © {year}{" "}
          <Link href="/" className="hover:text-white">
            STUNN
          </Link>
        </span>
      </div>

      {/* ── FDA Disclaimer ── */}
      <div className="mx-auto px-6 pb-5 pt-1 text-center text-[9px] italic leading-snug text-white/50 lg:max-w-screen-xl lg:px-8">
        <p>{DISCLAIMER}</p>
      </div>
    </footer>
  );
}
