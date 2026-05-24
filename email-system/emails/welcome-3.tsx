import React from "react";
import {
  Callout,
  Copy,
  CopySection,
  EmailFrame,
  RuleRows,
  StatementBand,
  ThreePointStrip,
} from "../components/EmailFrame";
import { urls } from "../lib/klaviyo-tags";

export const templateName = "STUNN - Welcome 3";
export const subject = "Built for calm focus.";
export const preview = "Real decaf coffee plus functional support. Caffeine never.";

export default function Welcome3() {
  return (
    <EmailFrame
      preheader={preview}
      eyebrow="Quiet Club / 03"
      title="Built for calm focus."
      intro="Coffee first. Functional support second. Caffeine never."
      image={urls.pour}
      imageLabel="One sachet. 0mg caffeine."
      cta={{ href: urls.product, label: "Shop STUNN" }}
    >
      <StatementBand kicker="The formula">
        Coffee taste, functional support, no stimulant tax.
      </StatementBand>
      <CopySection>
        <Copy>
          STUNN is designed for the part of the day when another caffeine hit
          would cost too much: focus without the spike, ritual without the
          crash.
        </Copy>
        <Copy>
          Every sachet starts with real decaf instant coffee, then adds
          functional support for calm, steady energy.
        </Copy>
      </CopySection>
      <ThreePointStrip
        items={[
          { label: "No spike", text: "Built without caffeine, so there is no stimulant peak." },
          { label: "No rebound", text: "A ritual that does not borrow energy from later." },
          { label: "No surprise", text: "STUNN is the brand that does not use caffeine." },
        ]}
      />
      <RuleRows
        rows={[
          { label: "Lion's mane", value: "Focus + clarity" },
          { label: "Rhodiola", value: "Stress + energy" },
          { label: "L-theanine", value: "Calm + alert" },
          { label: "Decaf coffee", value: "The ritual" },
        ]}
      />
      <Callout>No caffeine. No proprietary blend. One sachet, every day.</Callout>
    </EmailFrame>
  );
}
