import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { Anton, Inter } from "next/font/google";
import { getCart } from "lib/shopify";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
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
      <body className="bg-[#EDEAEF] font-[family-name:var(--font-inter)] text-gray-900">
        <div className="bg-[#fef8dd] py-2 pr-6 text-right text-sm text-[#5A3493] font-medium">
          Upgrade your coffee ritual — get 15% off + free shipping →
        </div>
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
