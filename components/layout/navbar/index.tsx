import CartModal from "components/cart/modal";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";

const CDN = "https://cdn.shopify.com/s/files/1/0758/0785/0596/files/";

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <nav className="relative flex items-center justify-between bg-[#5A3493] px-6 py-4">
      {/* Mobile menu */}
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>

      {/* Logo - left */}
      <div className="flex w-1/3 items-center">
        <Link href="/" prefetch={true}>
          <Image
            src={`${CDN}STUNN_LOGO-White.png`}
            alt="STUNN"
            width={120}
            height={32}
            className="h-7 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Nav links - center */}
      <div className="hidden w-1/3 items-center justify-center md:flex">
        {menu.length ? (
          <ul className="flex gap-8 text-sm">
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  prefetch={true}
                  className="font-semibold uppercase tracking-widest text-white/80 hover:text-white"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex gap-8 text-sm">
            {["Shop", "About Us", "Contact"].map((label) => (
              <li key={label}>
                <Link
                  href={label === "Shop" ? "/products/focus-without-caffeine" : `/${label.toLowerCase().replace(" ", "-")}`}
                  className="font-semibold uppercase tracking-widest text-white/80 hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Cart - right */}
      <div className="flex w-1/3 justify-end">
        <CartModal />
      </div>
    </nav>
  );
}
