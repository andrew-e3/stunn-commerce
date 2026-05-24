import { defineField, defineType } from "sanity";

// The "Off The Drip / Caffeine had its run" style conviction section.
export const manifestoBlock = defineType({
  name: "manifestoBlock",
  title: "Manifesto",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: 'e.g. "OFF THE DRIP"',
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({ name: "body", title: "Body", type: "text", rows: 5 }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
    defineField({ name: "ctaHref", title: "Button link", type: "string" }),
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      initialValue: "dark",
      options: {
        list: [
          { title: "Dark", value: "dark" },
          { title: "Light", value: "light" },
          { title: "Lilac", value: "lilac" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { title: "headline" },
    prepare: ({ title }) => ({
      title: title || "Manifesto",
      subtitle: "Manifesto block",
    }),
  },
});
