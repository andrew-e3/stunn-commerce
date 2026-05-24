import { CartProvider } from "components/cart/cart-context";
import { AnnouncementBar } from "components/layout/announcement-bar";
import { Navbar } from "components/layout/navbar";
import { OffTheDripCapture } from "components/off-the-drip-capture";
import { Inter } from "next/font/google";
import { getCart } from "lib/shopify";
import { getSiteSettings } from "lib/sanity";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

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
          <div className="sticky top-0 z-40">
            <AnnouncementBar messages={settings?.announcements} />
            <Navbar />
          </div>
          <main>
            {children}
            <Toaster closeButton />
          </main>
          <OffTheDripCapture mode="popup" tone="dark" />
        </CartProvider>
      </body>
    </html>
  );
}
