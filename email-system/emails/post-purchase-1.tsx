import React from "react";
import {
  Callout,
  Copy,
  CopySection,
  EditorialNote,
  EmailFrame,
  RuleRows,
  StatementBand,
} from "../components/EmailFrame";
import { urls } from "../lib/klaviyo-tags";

export const templateName = "STUNN - Post Purchase 1";
export const subject = "How to use STUNN.";
export const preview = "Your first cup works best when you know where it fits.";

export default function PostPurchase1() {
  return (
    <EmailFrame
      preheader={preview}
      eyebrow="First cup"
      title="Use it where caffeine usually wins."
      intro="STUNN works best as the coffee ritual you reach for when you do not want caffeine deciding the rest of your day."
      image={urls.ritual}
      imageLabel="A calmer daily coffee ritual"
      cta={{ href: urls.product, label: "Shop STUNN" }}
    >
      <StatementBand kicker="Best moments">
        Second cup. Afternoon cup. Evening ritual.
      </StatementBand>
      <CopySection>
        <Copy>
          Make STUNN like a normal coffee: one sachet, hot water or milk, stir.
          Keep it simple.
        </Copy>
        <Copy>
          The point is not to become anti-coffee. The point is to stop needing
          caffeine every time you want the ritual.
        </Copy>
      </CopySection>
      <RuleRows
        rows={[
          { label: "Sachet", value: "1 per cup" },
          { label: "Caffeine", value: "0mg" },
          { label: "Best use", value: "Second cup" },
        ]}
      />
      <EditorialNote
        eyebrow="First week"
        title="Notice what happens after the cup."
        body="No spike is the point. You are looking for calm focus, not the familiar rush that asks for payback."
      />
      <Callout>No caffeine. No crash. Same ritual.</Callout>
    </EmailFrame>
  );
}
