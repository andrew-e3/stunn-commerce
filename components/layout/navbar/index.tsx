import CartModal from "components/cart/modal";
import BrandLogo from "components/brand-logo";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";

const ACCOUNT_URL = process.env.SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.SHOPIFY_STORE_DOMAIN}/account/login`
  : "/account";

const LEFT_LINKS = [
  {
    label: "Shop",
    href: "/products/focus-without-caffeine",
    highlighted: true,
  },
  { label: "About", href: "/about-us" },
];

export function Navbar() {
  return (
    <nav className="relative grid min-h-[68px] grid-cols-[1fr_auto_1fr] items-center border-b border-black/10 bg-white px-4 md:px-8">
      {/* Mobile menu */}
      <div className="flex items-center justify-start md:hidden">
        <Suspense fallback={null}>
          <MobileMenu
            menu={[
              ...LEFT_LINKS,
              { label: "Account", href: ACCOUNT_URL, external: true },
            ]}
          />
        </Suspense>
      </div>

      {/* Left nav — Create-style primary links */}
      <div className="hidden items-center gap-8 md:flex">
        {LEFT_LINKS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            prefetch={true}
            className={
              item.highlighted
                ? "rounded-full bg-[#5A3493] px-4 py-2 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition-opacity hover:opacity-85"
                : "text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#111111] transition-opacity hover:opacity-60"
            }
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Centered logo */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <Link href="/" prefetch={true} aria-label="STUNN home">
          <BrandLogo />
        </Link>
      </div>

      {/* Right utility links + cart */}
      <div className="col-start-3 flex items-center justify-end gap-6">
        <a
          href={ACCOUNT_URL}
          className="hidden text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#111111] transition-opacity hover:opacity-60 md:inline-flex"
        >
          Account
        </a>
        <CartModal />
      </div>
    </nav>
  );
}
