import { defineArrayMember, defineField, defineType } from "sanity";

// Marketing overlay for a Shopify product, joined to product data by handle.
// Commerce (price, variants, stock) stays in Shopify — this is copy/sections.
export const productContent = defineType({
  name: "productContent",
  title: "Product Content",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "handle",
      title: "Shopify product handle",
      type: "string",
      description: 'The product handle, e.g. "focus-without-caffeine".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle override",
      type: "text",
      rows: 2,
      description: "Replaces the PDP subtitle when set.",
    }),
    defineField({
      name: "sections",
      title: "Extra sections",
      type: "array",
      description: "Marketing blocks rendered on the product page.",
      of: [
        defineArrayMember({ type: "manifestoBlock" }),
        defineArrayMember({ type: "featureGridBlock" }),
        defineArrayMember({ type: "personaBlock" }),
        defineArrayMember({ type: "ctaBlock" }),
        defineArrayMember({ type: "proseBlock" }),
        defineArrayMember({ type: "imageBlock" }),
      ],
    }),
    defineField({
      name: "showTestimonials",
      title: "Show testimonials",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "showPersonas",
      title: "Show customer profiles",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "handle" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Product Content",
      subtitle: subtitle ? `/products/${subtitle}` : "no handle set",
    }),
  },
});
