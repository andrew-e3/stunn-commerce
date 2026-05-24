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

export const templateName = "STUNN - Welcome 2";
export const subject = "This is not anti-coffee.";
export const preview = "The point is not quitting coffee. The point is not needing caffeine.";

export default function Welcome2() {
  return (
    <EmailFrame
      preheader={preview}
      eyebrow="Quiet Club / 02"
      title="This is not anti-coffee."
      intro="It is anti-needing-caffeine-to-feel-normal."
      image={urls.ritual}
      imageLabel="Same ritual, different relationship"
      cta={{ href: urls.movement, label: "Read the movement" }}
    >
      <StatementBand tone="purple" kicker="The line">
        We are not here to take coffee away. We are here to take the dependency
        out.
      </StatementBand>
      <CopySection>
        <Copy>
          We love the cup: the pause, the taste, the reset, the signal that it
          is time to focus.
        </Copy>
        <Copy>
          What we do not love is the dependency sold as performance. The
          headache without it. The anxiety from too much. The crash that asks
          for another round.
        </Copy>
      </CopySection>
      <EditorialNote
        eyebrow="Who it is for"
        title="The person who chooses the 2pm cup carefully."
        body="Espresso at 7am and STUNN at 2pm can live in the same life. That is the point: caffeine becomes a choice, not a requirement."
      />
      <Callout>
        Someone can drink espresso at 7am and STUNN at 2pm. That is still Off
        The Drip: choosing when caffeine serves you, not being owned by it.
      </Callout>
    </EmailFrame>
  );
}
