import { defineField, defineType } from "sanity";

export const imageBlock = defineType({
  name: "imageBlock",
  title: "Image",
  type: "object",
  fields: [
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
      description: "Describe the image for accessibility.",
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "fullBleed",
      title: "Full-bleed (edge to edge)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { media: "image", title: "caption" },
    prepare: ({ media, title }) => ({
      title: title || "Image",
      subtitle: "Image block",
      media,
    }),
  },
});
