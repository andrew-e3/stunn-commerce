import React from "react";
import {
  Callout,
  Copy,
  CopySection,
  EditorialNote,
  EmailFrame,
  RuleRows,
  StatementBand,
  ThreePointStrip,
} from "../components/EmailFrame";
import { tags, urls } from "../lib/klaviyo-tags";

export const templateName = "STUNN - Welcome 1";
export const subject = "Caffeine had its run.";
export const preview = "Welcome to Quiet Club.";

export default function Welcome1() {
  return (
    <EmailFrame
      preheader={preview}
      eyebrow="Quiet Club / 01"
      title="Caffeine had its run."
      intro={<>Hey {tags.firstName} — welcome in.</>}
      image={urls.hero}
      imageLabel="The coffee ritual, rebuilt without caffeine"
      cta={{ href: urls.product, label: "Try STUNN" }}
    >
      <StatementBand kicker="The shift">
        You can like coffee without letting caffeine run the day.
      </StatementBand>
      <CopySection>
        <Copy>
          Most people do not notice the dependency until they skip a cup:
          headache, fog, irritability, then another caffeine hit just to feel
          normal again.
        </Copy>
        <Copy>
          STUNN is for people changing that relationship. Keep the cup. Keep
          the taste. Drop the dependency loop.
        </Copy>
      </CopySection>
      <EditorialNote
        eyebrow="What you joined"
        title="Quiet Club is not about quitting everything."
        body="It is for people who still love the coffee ritual, but want the edge without the noise. Off The Drip is the idea. Quiet Club is where it lives."
      />
      <RuleRows
        rows={[
          { label: "Coffee ritual", value: "Still intact" },
          { label: "Caffeine", value: "0mg" },
          { label: "Crash", value: "No rebound" },
        ]}
      />
      <ThreePointStrip
        items={[
          { label: "Real coffee", text: "Decaf instant coffee, not a fake replacement." },
          { label: "Functional dose", text: "Support for calm focus without the stimulant edge." },
          { label: "Caffeine-free", text: "0mg now, and 0mg in future STUNN products." },
        ]}
      />
      <Callout>
        You do not need caffeine to function. You need a ritual that works
        without owning your day.
      </Callout>
    </EmailFrame>
  );
}
