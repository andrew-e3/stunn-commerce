import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      description: "Which FAQ list this belongs to.",
      initialValue: "general",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Product (PDP)", value: "pdp" },
        ],
      },
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "question", subtitle: "section" },
  },
});
