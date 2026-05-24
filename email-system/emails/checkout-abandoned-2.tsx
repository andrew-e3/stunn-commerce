import { Section, Text } from "@react-email/components";
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
import { tags, urls } from "../lib/klaviyo-tags";
import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

export const templateName = "STUNN - Checkout Abandoned 2";
export const subject = "Still thinking about the second cup?";
export const preview = "STUNN is the coffee ritual without caffeine owning the rest of your day.";

export default function CheckoutAbandoned2() {
  return (
    <EmailFrame
      preheader={preview}
      eyebrow="Still waiting"
      title="You do not need another caffeine hit."
      intro="You left STUNN behind. The calmer coffee ritual is still there."
      image={urls.comparison}
      imageLabel="Real coffee ritual. 0mg caffeine."
      cta={{ href: tags.cartUrl, label: "Return to checkout" }}
    >
      <StatementBand kicker="The shift" tone="purple">
        The point is not quitting coffee. It is not needing caffeine.
      </StatementBand>
      <CopySection>
        <Copy>
          The second cup can look harmless, until it starts deciding your focus,
          your sleep, and your afternoon.
        </Copy>
        <Copy>
          STUNN keeps the ritual familiar: coffee taste, one sachet, no
          caffeine, no stimulant rebound.
        </Copy>
      </CopySection>
      <RuleRows
        rows={[
          { label: "Caffeine", value: "0mg" },
          { label: "Format", value: "Single sachet" },
          { label: "Guarantee", value: "30 days" },
        ]}
      />
      <EditorialNote
        eyebrow="Reminder"
        title="Subscription orders ship free."
        body="If STUNN becomes your daily second cup, subscription is the cleanest way to keep it stocked."
      />
      <Callout>
        No caffeine now. No crash later. Same cup, better terms.
      </Callout>
      <Section className="stunn-pad" style={{ padding: "0 34px 30px" }}>
        <Text
          style={{
            margin: 0,
            backgroundColor: colors.lilac,
            border: `1px solid ${colors.rule}`,
            borderRadius: "14px",
            color: colors.muted,
            fontFamily: typography.body,
            fontSize: "14px",
            lineHeight: 1.6,
            padding: "18px",
          }}
        >
          <strong style={{ color: colors.offBlack }}>Still in checkout:</strong>
          <br />
          {"{% for item in event.extra.line_items %}"}
          {"{{ item.quantity|default:1 }}"} x{" "}
          {"{{ item.product.title|default:item.title }}"}
          <br />
          {"{% endfor %}"}
        </Text>
      </Section>
    </EmailFrame>
  );
}
