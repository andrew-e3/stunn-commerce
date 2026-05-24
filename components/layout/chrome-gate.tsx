"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Hides the marketing site chrome (announcement bar, navbar, popups) on the
// embedded Sanity Studio at /admin, so the Studio renders full-screen.
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
