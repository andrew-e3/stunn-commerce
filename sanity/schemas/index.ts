import { type SchemaTypeDefinition } from "sanity";
import { homepage } from "./homepage";
import { siteSettings } from "./siteSettings";

// Phase 1 schema set. New document/object types are added here as later
// phases land (landing pages, testimonials, personas, product content).
export const schemaTypes: SchemaTypeDefinition[] = [siteSettings, homepage];
