"use client";

// Sanity Studio configuration. The Studio is embedded in the Next.js app and
// served at /admin (see app/admin/[[...index]]/page.tsx).

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/desk-structure";

export default defineConfig({
  basePath: "/admin",
  projectId: projectId!,
  dataset: dataset!,
  title: "STUNN",
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // Vision lets admins run GROQ queries against the dataset for debugging.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
