import React from "react";
import {
  Callout,
  Copy,
  CopySection,
  EditorialNote,
  EmailFrame,
  RuleRows,
} from "../components/EmailFrame";
import { urls } from "../lib/klaviyo-tags";

export const templateName = "STUNN - Replenishment 1";
export const subject = "Running low on the cup without caffeine?";
export const preview = "Keep the caffeine-free ritual stocked.";

export default function Replenishment1() {
  return (
    <EmailFrame
      preheader={preview}
      eyebrow="Restock"
      title="Do not let caffeine take the slot back."
      intro="If STUNN has become your second cup, now is the moment to keep it stocked."
      image={urls.ritual}
      imageLabel="The daily caffeine-free coffee ritual"
      cta={{ href: urls.product, label: "Restock STUNN" }}
    >
      <CopySection>
        <Copy>
          Habits are easiest to keep when the good option is already in the
          cupboard.
        </Copy>
        <Copy>
          Restock before you are down to the last sachet, or move to
          subscription so the caffeine-free ritual stays automatic.
        </Copy>
      </CopySection>
      <RuleRows
        rows={[
          { label: "Subscription", value: "Ships free" },
          { label: "Daily use", value: "One sachet" },
          { label: "Caffeine", value: "Never" },
        ]}
      />
      <EditorialNote
        eyebrow="Brand rule"
        title="Future STUNN products will stay caffeine-free."
        body="That is what people should expect from us: coffee culture without caffeine dependency."
      />
      <Callout>Keep the ritual on your terms.</Callout>
    </EmailFrame>
  );
}
