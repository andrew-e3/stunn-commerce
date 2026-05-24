import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../../sanity/env";

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
