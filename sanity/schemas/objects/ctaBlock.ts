import { defineField, defineType } from "sanity";

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Call To Action",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({ name: "subhead", title: "Subheadline", type: "text", rows: 2 }),
    defineField({
      name: "ctaLabel",
      title: "Button label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaHref",
      title: "Button link",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "note", title: "Note under button", type: "string" }),
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      initialValue: "lilac",
      options: {
        list: [
          { title: "Lilac", value: "lilac" },
          { title: "Dark", value: "dark" },
          { title: "Light", value: "light" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { title: "headline" },
    prepare: ({ title }) => ({
      title: title || "Call To Action",
      subtitle: "CTA block",
    }),
  },
});
