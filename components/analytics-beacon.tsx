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

// Only report from the real storefront. The endpoint is production Supabase with
// no environment split, so without this guard every `npm run dev` session writes
// sessions, pageviews and funnel flags straight into the live analytics - and dev
// traffic lands disproportionately on the PDP hitting add-to-cart, which is
// exactly the metric that matters. Two phantom add-to-carts showed up on the
// dashboard on 2026-08-04 from local testing before this was added.
//
// Set NEXT_PUBLIC_ANALYTICS_FORCE=1 locally if you genuinely need to test the
// beacon end to end.
const ALLOWED_HOSTS = ["stunn.co", "www.stunn.co"];

function reportingEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NEXT_PUBLIC_ANALYTICS_FORCE === "1") return true;
  return ALLOWED_HOSTS.includes(window.location.hostname);
}

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

// Exposed so add-to-cart can stamp the session onto the Shopify cart, which is
// what makes order-to-session attribution a real join instead of a guess.
// Returns null when reporting is off or storage is blocked.
export function getStunnSessionKey(): string | null {
  if (!reportingEnabled()) return null;
  return sessionKey();
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
  if (!reportingEnabled()) return;
  const key = sessionKey();
  if (!key) return;
  const payload = JSON.stringify({
    brand_slug: "stunn",
    session_key: key,
    event,
    path: window.location.pathname,
    value,
    // A PDP fires view_product and pageview within milliseconds of each other,
    // and whichever lands first is the one that creates the session row. When
    // this event won that race it used to create the row with a null device,
    // which is why most sessions had no device recorded. Send it on every
    // event so the row is complete regardless of ordering.
    device: device(),
    utm: utms(new URLSearchParams(window.location.search)),
  });
  try {
    // sendBeacon survives the navigation away to Shopify checkout.
    //
    // The Blob MUST be text/plain: application/json is not a CORS-safelisted
    // content type, so it forces a preflight, and sendBeacon cannot preflight —
    // the browser drops the request and returns false. The edge function parses
    // the body with req.json() regardless of the declared content type.
    if (navigator.sendBeacon) {
      const queued = navigator.sendBeacon(
        ENDPOINT,
        new Blob([payload], { type: "text/plain" }),
      );
      if (queued) return; // otherwise fall through to fetch
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
    if (!reportingEnabled()) return;
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

// Drop into a PDP so the funnel's "viewed product" step is populated. Pairs with
// MetaViewContent, which does the same job for the Meta pixel.
export function StunnViewProduct() {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackStunnEvent("view_product");
  }, []);
  return null;
}
