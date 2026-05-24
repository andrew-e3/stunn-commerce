import { defineField, defineType } from "sanity";

// A named, swappable image slot. Code references it by `key`; uploading an
// image here overrides the hardcoded default wherever that slot is used.
export const siteImage = defineType({
  name: "siteImage",
  title: "Site Image",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Human-friendly name, e.g. \"Homepage hero\".",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      description:
        "Stable identifier used in code (don't change once set), e.g. \"home-hero\".",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the image for accessibility/SEO.",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "key", media: "image" },
  },
});
