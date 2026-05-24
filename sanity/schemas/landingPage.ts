import { defineArrayMember, defineField, defineType } from "sanity";

// A campaign landing page composed from the block library. Renders at
// /lp/<slug>. New pages need zero code — editors compose from blocks.
export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      group: "settings",
      description: "For your reference in the admin (not shown on the page).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: { source: "title", maxLength: 96 },
      description: "The URL path: /lp/<slug>",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageBuilder",
      title: "Page content",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({ type: "heroBlock" }),
        defineArrayMember({ type: "manifestoBlock" }),
        defineArrayMember({ type: "featureGridBlock" }),
        defineArrayMember({ type: "personaBlock" }),
        defineArrayMember({ type: "ctaBlock" }),
        defineArrayMember({ type: "emailCaptureBlock" }),
        defineArrayMember({ type: "proseBlock" }),
        defineArrayMember({ type: "imageBlock" }),
      ],
    }),
    defineField({
      name: "noindex",
      title: "Hide from search engines",
      type: "boolean",
      group: "settings",
      initialValue: true,
      description:
        "Recommended ON for paid-campaign pages so they don't compete in organic search.",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "settings" }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title: title || "Landing Page",
      subtitle: slug ? `/lp/${slug}` : "no slug set",
    }),
  },
});
