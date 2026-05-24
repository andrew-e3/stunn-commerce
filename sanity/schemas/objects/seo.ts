import { defineField, defineType } from "sanity";

// Reusable per-page SEO. Used by landing pages (and future page types).
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "string",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
