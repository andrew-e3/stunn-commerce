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

export const templateName = "STUNN - Welcome 4";
export const subject = "Own your energy.";
export const preview = "Make your next cup the one that does not borrow from later.";

export default function Welcome4() {
  return (
    <EmailFrame
      preheader={preview}
      eyebrow="Quiet Club / 04"
      title="Own your energy."
      intro="The easiest place to start is the next cup."
      image={urls.hero}
      imageLabel="A better cup for the rest of the day"
      cta={{ href: urls.product, label: "Start your ritual" }}
    >
      <StatementBand tone="purple" kicker="The move">
        Make the next cup the one that does not ask to be repaid later.
      </StatementBand>
      <CopySection>
        <Copy>
          Keep your morning serious. Keep the taste of coffee. Keep the ritual
          that tells your brain it is time to focus.
        </Copy>
        <Copy>
          Just remove the part that keeps asking to be repaid later: the spike,
          the anxiety, the crash, the dependency loop.
        </Copy>
      </CopySection>
      <EditorialNote
        eyebrow="How to use it"
        title="Put STUNN where caffeine usually starts costing you."
        body="For a lot of people, that is the second cup, the afternoon cup, or the evening cup they wish they could have without wrecking sleep."
      />
      <Callout>
        STUNN is the daily coffee ritual for people who have figured out they do
        not need caffeine to perform.
      </Callout>
    </EmailFrame>
  );
}
