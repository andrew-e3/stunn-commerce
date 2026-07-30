"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

// First-party analytics for the headless storefront.
//
// stunn.co is served by Vercel, so Shopify Analytics never sees a session —
// it only observes the hosted checkout. This beacon gives Jigsaw IQ the
// sessions, funnel and traffic-source data Shopify would otherwise report.
//
// Privacy: no cookies, no IP, no user agent. Just a random per-tab session key
// held in sessionStorage plus the path/referrer/UTMs needed for attribution.

const ENDPOINT =
  "https://uifcbjueqgrohkavlhcw.supabase.co/functions/v1/track-session";
const KEY = "stunn_sid";

function sessionKey(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let k = window.sessionStorage.getItem(KEY);
    if (!k) {
      k = (crypto.randomUUID?.() ?? String(Math.random()).slice(2)).replace(/-/g, "");
      window.sessionStorage.setItem(KEY, k);
    }
    return k;
  } catch {
    return null; // storage blocked — skip tracking rather than break the page
  }
}

function device(): string {
  if (typeof window === "undefined") return "unknown";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

// UTMs only exist on the entry URL, so remember them for the whole session.
function utms(search: URLSearchParams) {
  try {
    const stored = window.sessionStorage.getItem("stunn_utm");
    const fromUrl = {
      source: search.get("utm_source"),
      medium: search.get("utm_medium"),
      campaign: search.get("utm_campaign"),
      content: search.get("utm_content"),
    };
    if (fromUrl.source || fromUrl.campaign) {
      window.sessionStorage.setItem("stunn_utm", JSON.stringify(fromUrl));
      return fromUrl;
    }
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function trackStunnEvent(
  event: "view_product" | "add_to_cart" | "begin_checkout" | "purchase",
  value?: number,
) {
  const key = sessionKey();
  if (!key) return;
  const payload = JSON.stringify({
    brand_slug: "stunn",
    session_key: key,
    event,
    path: window.location.pathname,
    value,
  });
  try {
    // sendBeacon survives the navigation away to Shopify checkout.
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: "application/json" }));
      return;
    }
  } catch { /* fall through to fetch */ }
  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

function Beacon() {
  const pathname = usePathname();
  const search = useSearchParams();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const key = sessionKey();
    if (!key || lastPath.current === pathname) return;
    lastPath.current = pathname;

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand_slug: "stunn",
        session_key: key,
        event: "pageview",
        path: pathname,
        referrer: document.referrer || null,
        utm: utms(search),
        device: device(),
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname, search]);

  return null;
}

export function AnalyticsBeacon() {
  // useSearchParams needs a Suspense boundary in the app router.
  return (
    <Suspense fallback={null}>
      <Beacon />
    </Suspense>
  );
}
