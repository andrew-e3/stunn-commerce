// Sanity environment config. Kept tolerant: if the public vars are missing,
// `projectId`/`dataset` are undefined and the content fetchers fall back to
// hardcoded copy so the site never breaks.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// Server-only. Used for draft/preview reads (Phase 2) and webhook handling.
export const readToken = process.env.SANITY_API_READ_TOKEN;

// True only when both required public values are present.
export const isSanityConfigured = Boolean(projectId && dataset);
