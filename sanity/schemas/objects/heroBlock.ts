import { defineField, defineType } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({ name: "subhead", title: "Subheadline", type: "text", rows: 3 }),
    defineField({
      name: "ratingText",
      title: "Rating / social-proof line",
      type: "string",
      description: 'Optional, e.g. "4.6 Stars · 900+ Customers".',
    }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
    defineField({ name: "ctaHref", title: "Button link", type: "string" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "headline" },
    prepare: ({ title }) => ({ title: title || "Hero", subtitle: "Hero block" }),
  },
});
