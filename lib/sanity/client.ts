import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, readToken } from "../../sanity/env";

// Null when Sanity isn't configured. Every caller must handle null and fall
// back to hardcoded content, so the storefront never depends on the CMS being
// reachable or populated.
export const client: SanityClient | null =
  projectId && dataset
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        // Published content via the CDN: fast and cacheable. Draft/preview
        // reads (Phase 2) use a separate token-authed client.
        useCdn: true,
        perspective: "published",
      })
    : null;

// Token-authed client that reads unpublished drafts. Used only in Draft Mode
// (preview), never cached. Null if Sanity or the token isn't configured.
export const previewClient: SanityClient | null =
  projectId && dataset && readToken
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        perspective: "previewDrafts",
        token: readToken,
        ignoreBrowserTokenWarning: true,
      })
    : null;
