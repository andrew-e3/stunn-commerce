import { defineField, defineType } from "sanity";

// Global, site-wide content. A singleton (only one document of this type).
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton behaviour is enforced by the desk structure (sanity/desk-structure.ts).
  groups: [
    { name: "announcement", title: "Announcement Bar" },
    { name: "nav", title: "Navigation" },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "Default SEO" },
  ],
  fields: [
    defineField({
      name: "announcements",
      title: "Announcement bar messages",
      description:
        "Rotating messages in the top bar. Leave empty to use the site defaults.",
      type: "array",
      group: "announcement",
      of: [
        defineField({
          name: "announcement",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Message",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "href",
              title: "Link (optional)",
              type: "string",
              description: "If set, the message links here.",
            }),
          ],
          preview: { select: { title: "text" } },
        }),
      ],
    }),
    defineField({
      name: "navLinks",
      title: "Header navigation links",
      type: "array",
      group: "nav",
      of: [
        defineField({
          name: "navLink",
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required().max(24),
            }),
            defineField({
              name: "href",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "highlighted",
              title: "Highlighted (button style)",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "footerLinks",
      title: "Footer links",
      type: "array",
      group: "footer",
      of: [
        defineField({
          name: "footerLink",
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: "href",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          title: "Default title",
          type: "string",
          validation: (rule) => rule.max(70),
        }),
        defineField({
          name: "description",
          title: "Default meta description",
          type: "text",
          rows: 3,
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: "ogImage",
          title: "Default social share image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
