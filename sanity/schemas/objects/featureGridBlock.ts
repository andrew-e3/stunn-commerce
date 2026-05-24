import { defineField, defineType } from "sanity";

export const featureGridBlock = defineType({
  name: "featureGridBlock",
  title: "Feature Grid",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 2 }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      initialValue: 3,
      options: {
        list: [
          { title: "2", value: 2 },
          { title: "3", value: 3 },
          { title: "4", value: 4 },
        ],
      },
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineField({
          name: "feature",
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "description", type: "text", rows: 2 }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: { select: { title: "title", media: "image" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title || "Feature Grid",
      subtitle: "Feature grid block",
    }),
  },
});
