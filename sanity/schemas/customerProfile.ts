import { defineField, defineType } from "sanity";

// The "Jamie / Sam / Rachel" style customer personas, as managed content.
export const customerProfile = defineType({
  name: "customerProfile",
  title: "Customer Profile",
  type: "document",
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
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers show first.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "headline" },
  },
});
