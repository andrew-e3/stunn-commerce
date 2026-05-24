import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

// Embedded Sanity Studio served at /admin. Renders full-screen on the client.
// `metadata`/`viewport` from next-sanity set noindex + the correct viewport
// so the Studio never gets indexed by search engines.
export { metadata, viewport } from "next-sanity/studio";

export const dynamic = "force-static";

export default function AdminStudioPage() {
  return <NextStudio config={config} />;
}
