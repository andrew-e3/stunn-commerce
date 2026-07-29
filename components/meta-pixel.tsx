"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

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
  window.fbq("track", event, params);
}

// Base pixel + SPA-aware PageView. Renders nothing without NEXT_PUBLIC_META_PIXEL_ID.
export function MetaPixel() {
  const pathname = usePathname();
  const initialised = useRef(false);

  useEffect(() => {
    if (!pixelId || !window.fbq) return;
    // The inline snippet fires the first PageView; only re-fire on route change.
    if (!initialised.current) {
      initialised.current = true;
      return;
    }
    window.fbq("track", "PageView");
  }, [pathname]);

  if (!pixelId) return null;

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
