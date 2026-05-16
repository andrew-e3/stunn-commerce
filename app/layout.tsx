import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { Anton, Inter } from "next/font/google";
import { getCart } from "lib/shopify";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});
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

  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="bg-white font-[family-name:var(--font-inter)] text-[#111111]">
        <CartProvider cartPromise={cart}>
          <div className="sticky top-0 z-40">
            <div className="bg-[#7C3AED] py-2 text-center text-sm font-semibold text-white">
              Upgrade your coffee ritual — get up to 25% off + free shipping →
            </div>
            <Navbar />
          </div>
          <main>
            {children}
            <Toaster closeButton />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
