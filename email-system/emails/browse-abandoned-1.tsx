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

export const templateName = "STUNN - Browse Abandoned 1";
export const subject = "Looking for the cup without the crash?";
export const preview = "You viewed STUNN. Here is the simple version.";

export default function BrowseAbandoned1() {
  return (
    <EmailFrame
      preheader={preview}
      eyebrow="You had a look"
      title="Keep the ritual. Lose the dependency."
      intro="STUNN is real decaf coffee built for calm focus, not another stimulant loop."
      image={urls.hero}
      imageLabel="STUNN caffeine-free decaf coffee"
      cta={{ href: urls.product, label: "Try STUNN" }}
    >
      <CopySection>
        <Copy>
          Most people do not realise caffeine has them until they skip it:
          headache, fog, anxiety, crash, repeat.
        </Copy>
        <Copy>
          STUNN is for the moment you want the cup without borrowing energy
          from later.
        </Copy>
      </CopySection>
      <ThreePointStrip
        items={[
          { label: "0mg caffeine", text: "No spike, no caffeine rebound." },
          { label: "Coffee ritual", text: "A cup that still feels like coffee." },
          { label: "One sachet", text: "Simple enough to make every day." },
        ]}
      />
      <EditorialNote
        eyebrow="Off The Drip"
        title="You do not have to quit caffeine. You just stop needing it."
        body="The move is control. Espresso when you choose it. STUNN when you want the ritual without the cost."
      />
      <Callout>
        STUNN will never use caffeine. That is the brand rule.
      </Callout>
    </EmailFrame>
  );
}
