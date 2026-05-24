import { defineField, defineType } from "sanity";

// "Different reasons, same better cup" — the customer profiles section.
export const personaBlock = defineType({
  name: "personaBlock",
  title: "Personas",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 2 }),
    defineField({
      name: "personas",
      title: "Personas",
      type: "array",
      of: [
        defineField({
          name: "persona",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: 'e.g. "The Optimizer"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "headline",
              title: "Headline",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "label", subtitle: "headline" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title || "Personas",
      subtitle: "Personas block",
    }),
  },
});
