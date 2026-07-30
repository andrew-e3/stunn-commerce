import { CartProvider } from "components/cart/cart-context";
import { KlaviyoOnsite } from "components/klaviyo-onsite";
import { AnnouncementBar } from "components/layout/announcement-bar";
import { ChromeGate } from "components/layout/chrome-gate";
import { Navbar } from "components/layout/navbar";
import { MetaPixel } from "components/meta-pixel";
import { OffTheDripCapture } from "components/off-the-drip-capture";
import { QuietClubPopup } from "components/quiet-club-popup";
import { Inter } from "next/font/google";
import { getCart } from "lib/shopify";
import { getSiteSettings } from "lib/sanity";
import { urlForImage } from "lib/sanity/image";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const { SITE_NAME } = process.env;
const SCRATCH_POPUP_ENABLED =
  process.env.NEXT_PUBLIC_STUNN_SCRATCH_POPUP_ENABLED !== "false";

// Default site metadata, overridable from Sanity (Site Settings → Default SEO).
// Falls back to SITE_NAME when the CMS is empty.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const seo = settings?.defaultSeo;
  const ogImage = seo?.ogImage
    ? urlForImage(seo.ogImage)?.width(1200).height(630).url()
    : undefined;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: seo?.title || SITE_NAME!,
      template: `%s | ${SITE_NAME}`,
    },
    description: seo?.description,
    robots: { follow: true, index: true },
    openGraph: ogImage ? { images: [{ url: ogImage }] } : undefined,
  };
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cart = getCart();
  // Content-managed via Sanity (/admin). Falls back to hardcoded copy when empty.
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white font-[family-name:var(--font-inter)] text-[#111111]">
        <CartProvider cartPromise={cart}>
          <ChromeGate>
            <div className="sticky top-0 z-40">
              <AnnouncementBar messages={settings?.announcements} />
              <Navbar links={settings?.navLinks} />
            </div>
          </ChromeGate>
          <main>
            {children}
            <Toaster closeButton />
          </main>
          <ChromeGate>
            {SCRATCH_POPUP_ENABLED ? (
              <QuietClubPopup />
            ) : (
              <OffTheDripCapture mode="popup" tone="dark" />
            )}
          </ChromeGate>
        </CartProvider>
        <MetaPixel />
        <KlaviyoOnsite />
      </body>
    </html>
  );
}
