import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { client, previewClient } from "./client";
import {
  HOMEPAGE_QUERY,
  LANDING_PAGE_QUERY,
  LANDING_PAGE_SLUGS_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";

// Cache tags, revalidated by the Sanity publish webhook (one tag per type).
export const SANITY_TAGS = {
  siteSettings: "sanity:siteSettings",
  homepage: "sanity:homepage",
  landingPage: "sanity:landingPage",
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

// ---- Landing pages (block builder) --------------------------------------

export interface PageBlock {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

export interface LandingPageSeo {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
}

export interface LandingPage {
  title?: string;
  slug?: string;
  noindex?: boolean;
  seo?: LandingPageSeo;
  pageBuilder?: PageBlock[];
}

// Published landing page (cached). Returns null when missing.
export async function getLandingPage(
  slug: string,
): Promise<LandingPage | null> {
  "use cache";
  cacheTag(SANITY_TAGS.landingPage);
  cacheLife("hours");
  if (!client) return null;
  try {
    return await client.fetch<LandingPage>(LANDING_PAGE_QUERY, { slug });
  } catch (error) {
    console.error("Sanity landing page fetch failed:", error);
    return null;
  }
}

// Draft landing page (uncached, token-authed). Used only in Draft Mode.
export async function getLandingPagePreview(
  slug: string,
): Promise<LandingPage | null> {
  if (!previewClient) return null;
  try {
    return await previewClient.fetch<LandingPage>(LANDING_PAGE_QUERY, { slug });
  } catch (error) {
    console.error("Sanity landing page preview fetch failed:", error);
    return null;
  }
}

export async function getLandingPageSlugs(): Promise<string[]> {
  if (!client) return [];
  try {
    const rows =
      await client.fetch<{ slug: string }[]>(LANDING_PAGE_SLUGS_QUERY);
    return rows.map((r) => r.slug).filter(Boolean);
  } catch (error) {
    console.error("Sanity landing page slugs fetch failed:", error);
    return [];
  }
}
