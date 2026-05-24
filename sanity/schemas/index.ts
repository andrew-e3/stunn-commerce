import { type SchemaTypeDefinition } from "sanity";
import { homepage } from "./homepage";
import { landingPage } from "./landingPage";
import { ctaBlock } from "./objects/ctaBlock";
import { emailCaptureBlock } from "./objects/emailCaptureBlock";
import { featureGridBlock } from "./objects/featureGridBlock";
import { heroBlock } from "./objects/heroBlock";
import { imageBlock } from "./objects/imageBlock";
import { manifestoBlock } from "./objects/manifestoBlock";
import { personaBlock } from "./objects/personaBlock";
import { proseBlock } from "./objects/proseBlock";
import { seo } from "./objects/seo";
import { siteSettings } from "./siteSettings";

// Reusable block objects used by the landing page builder (and future pages).
const blocks: SchemaTypeDefinition[] = [
  heroBlock,
  manifestoBlock,
  featureGridBlock,
  personaBlock,
  ctaBlock,
  emailCaptureBlock,
  proseBlock,
  imageBlock,
];

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  siteSettings,
  homepage,
  landingPage,
  // Objects
  seo,
  ...blocks,
];
