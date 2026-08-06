import { defineField, defineType } from "sanity";

// Homepage content. Phase 1 covers the hero block; later phases add the
// manifesto, feature grid, personas, etc. to the same document.
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  // Singleton behaviour is enforced by the desk structure (sanity/desk-structure.ts).
  groups: [{ name: "hero", title: "Hero", default: true }],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "ratingText",
          title: "Rating / social-proof line",
          type: "string",
          description: 'e.g. "4.6 Stars · 900+ Customers". Optional.',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          description: "The big display headline.",
          validation: (rule) => rule.max(80),
        }),
        defineField({
          name: "subhead",
          title: "Subheadline",
          type: "text",
          rows: 3,
          validation: (rule) => rule.max(220),
        }),
        defineField({
          name: "ctaLabel",
          title: "Button label",
          type: "string",
          validation: (rule) => rule.max(40),
        }),
        defineField({
          name: "ctaHref",
          title: "Button link",
          type: "string",
        }),
        defineField({
          name: "ctaNote",
          title: "Note under button",
          type: "string",
          // Was 'e.g. "Free shipping on subscription + $75+ orders"'. There is
          // no shipping threshold and never was - Economy is $0.00 at every
          // cart value - so that example instructed editors to type a false
          // claim. See FREE_SHIPPING_THRESHOLD in lib/pricing.ts.
          description: 'e.g. "Free shipping on every US order"',
          validation: (rule) => rule.max(80),
        }),
        defineField({
          name: "image",
          title: "Hero image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
