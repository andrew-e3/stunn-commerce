"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// Only report from the real storefront, matching the first-party beacon's guard
// in analytics-beacon.tsx. Without this the pixel fired from every `npm run dev`
// session and every Vercel preview deploy straight into the production pixel:
// those AddToCart events counted for Meta and not for us, which is part of why
// Meta's add-to-cart figure read far above JIQ's, and - worse - they fed fake
// conversions into the ad account's optimisation and audience building.
//
// Set NEXT_PUBLIC_ANALYTICS_FORCE=1 to test the pixel outside production.
const ALLOWED_HOSTS = ["stunn.co", "www.stunn.co"];

function reportingEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NEXT_PUBLIC_ANALYTICS_FORCE === "1") return true;
  return ALLOWED_HOSTS.includes(window.location.hostname);
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// Fire a standard Meta pixel event from anywhere in the client tree.
export function trackMetaEvent(
  event: string,
  params?: Record<string, unknown>,
) {
  if (!pixelId || typeof window === "undefined" || !window.fbq) return;
  if (!reportingEnabled()) return;
  window.fbq("track", event, params);
}

// Base pixel + SPA-aware PageView. Renders nothing without
// NEXT_PUBLIC_META_PIXEL_ID, and nothing outside the real storefront.
export function MetaPixel() {
  const pathname = usePathname();
  const initialised = useRef(false);
  // Resolved after mount rather than during render: reportingEnabled() needs
  // window, so evaluating it inline would return false on the server and true
  // on the client, and the differing markup would be a hydration mismatch.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(reportingEnabled());
  }, []);

  useEffect(() => {
    if (!pixelId || !window.fbq) return;
    // The inline snippet fires the first PageView; only re-fire on route change.
    if (!initialised.current) {
      initialised.current = true;
      return;
    }
    window.fbq("track", "PageView");
  }, [pathname]);

  if (!pixelId || !enabled) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');`}
    </Script>
  );
}

// Drop into a PDP to fire ViewContent once per product view.
export function MetaViewContent({
  contentId,
  contentName,
  value,
  currency = "USD",
}: {
  contentId: string;
  contentName: string;
  value?: number;
  currency?: string;
}) {
  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_ids: [contentId],
      content_name: contentName,
      content_type: "product",
      ...(value ? { value, currency } : {}),
    });
  }, [contentId, contentName, value, currency]);
  return null;
}
