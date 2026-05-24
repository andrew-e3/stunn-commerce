import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { client } from "./client";
import { HOMEPAGE_QUERY, SITE_SETTINGS_QUERY } from "./queries";

// Cache tags, revalidated by the Sanity publish webhook (one tag per type).
export const SANITY_TAGS = {
  siteSettings: "sanity:siteSettings",
  homepage: "sanity:homepage",
} as const;

// ---- Types ---------------------------------------------------------------

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
}

export interface Announcement {
  text: string;
  href?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface DefaultSeo {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
}

export interface SiteSettings {
  announcements?: Announcement[];
  navLinks?: NavLink[];
  footerLinks?: NavLink[];
  defaultSeo?: DefaultSeo;
}

export interface HomepageHero {
  ratingText?: string;
  headline?: string;
  subhead?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaNote?: string;
  image?: SanityImage;
}

export interface Homepage {
  hero?: HomepageHero;
}

// ---- Fetchers ------------------------------------------------------------
// Each returns null on any failure (unconfigured, network, empty) so callers
// fall back to hardcoded content. The storefront never breaks on CMS issues.

async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query);
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  "use cache";
  cacheTag(SANITY_TAGS.siteSettings);
  cacheLife("hours");
  return sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY);
}

export async function getHomepage(): Promise<Homepage | null> {
  "use cache";
  cacheTag(SANITY_TAGS.homepage);
  cacheLife("hours");
  return sanityFetch<Homepage>(HOMEPAGE_QUERY);
}
