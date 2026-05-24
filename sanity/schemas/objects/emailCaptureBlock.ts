import { defineField, defineType } from "sanity";

// Renders the Quiet Club email capture inline within a landing page.
export const emailCaptureBlock = defineType({
  name: "emailCaptureBlock",
  title: "Email Capture (Quiet Club)",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "Join the Quiet Club",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 2,
      initialValue:
        "Get the launch offer, early access to caffeine-free drops, and notes for people who want the edge without the noise.",
    }),
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      initialValue: "dark",
      options: {
        list: [
          { title: "Dark", value: "dark" },
          { title: "Light", value: "light" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title || "Email Capture",
      subtitle: "Quiet Club capture block",
    }),
  },
});
