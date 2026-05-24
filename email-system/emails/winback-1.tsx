import React from "react";
import {
  Callout,
  Copy,
  CopySection,
  EditorialNote,
  EmailFrame,
  StatementBand,
} from "../components/EmailFrame";
import { urls } from "../lib/klaviyo-tags";

export const templateName = "STUNN - Winback 1";
export const subject = "Did caffeine take the ritual back?";
export const preview = "Come back to the cup that does not borrow from later.";

export default function Winback1() {
  return (
    <EmailFrame
      preheader={preview}
      eyebrow="Come back"
      title="The loop is easy to slip back into."
      intro="If caffeine crept back into the slot, STUNN is still here for the cup without the cost."
      image={urls.hero}
      imageLabel="STUNN is always caffeine-free"
      cta={{ href: urls.product, label: "Start again" }}
    >
      <StatementBand kicker="Reminder" tone="purple">
        You do not need caffeine to function.
      </StatementBand>
      <CopySection>
        <Copy>
          The old loop is familiar: need it to start, need it again to keep
          going, pay for it later.
        </Copy>
        <Copy>
          STUNN gives you a different default. Same ritual, no caffeine, calmer
          terms.
        </Copy>
      </CopySection>
      <EditorialNote
        eyebrow="No drama"
        title="This is not a reset. It is just the next cup."
        body="Come back when you are ready to make the second coffee caffeine-free again."
      />
      <Callout>Caffeine had its run.</Callout>
    </EmailFrame>
  );
}
