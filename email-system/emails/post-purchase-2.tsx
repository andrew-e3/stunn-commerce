import React from "react";
import {
  Callout,
  Copy,
  CopySection,
  EditorialNote,
  EmailFrame,
  ThreePointStrip,
} from "../components/EmailFrame";
import { urls } from "../lib/klaviyo-tags";

export const templateName = "STUNN - Post Purchase 2";
export const subject = "Welcome to Off The Drip.";
export const preview = "A small manifesto for your new coffee ritual.";

export default function PostPurchase2() {
  return (
    <EmailFrame
      preheader={preview}
      eyebrow="Off The Drip"
      title="Caffeine had its run."
      intro="You bought into a different kind of coffee brand: one that never uses caffeine."
      image={urls.ritual}
      imageLabel="Keep the cup. Lose the cost."
      cta={{ href: urls.movement, label: "Read the movement" }}
    >
      <CopySection>
        <Copy>
          STUNN is not here to shame coffee people. We are coffee people.
        </Copy>
        <Copy>
          We are against the dependency loop: the headache without it, the
          anxiety with too much, the 2pm crash, the feeling that you need
          caffeine to feel normal.
        </Copy>
      </CopySection>
      <ThreePointStrip
        items={[
          { label: "Rule one", text: "STUNN products are caffeine-free." },
          { label: "Rule two", text: "The ritual still matters." },
          { label: "Rule three", text: "Energy should feel owned." },
        ]}
      />
      <EditorialNote
        eyebrow="The point"
        title="You do not have to quit caffeine."
        body="You just stop letting it own the ritual. That is Off The Drip."
      />
      <Callout>Own your energy.</Callout>
    </EmailFrame>
  );
}
