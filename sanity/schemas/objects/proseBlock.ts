import { defineField, defineType } from "sanity";

// Simple headed text block. Line breaks are preserved on render.
export const proseBlock = defineType({
  name: "proseBlock",
  title: "Text",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "align",
      title: "Alignment",
      type: "string",
      initialValue: "left",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "body" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Text",
      subtitle: subtitle || "Text block",
    }),
  },
});
