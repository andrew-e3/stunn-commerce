import { Section, Text } from "@react-email/components";
import React from "react";
import {
  Callout,
  Copy,
  CopySection,
  EditorialNote,
  EmailFrame,
  StatementBand,
} from "../components/EmailFrame";
import { tags, urls } from "../lib/klaviyo-tags";
import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

export const templateName = "STUNN - Cart Abandoned 1";
export const subject = "Your coffee ritual is waiting.";
export const preview = "Keep the cup. Lose the caffeine cost.";

export default function CartAbandoned1() {
  return (
    <EmailFrame
      preheader={preview}
      eyebrow="Still in your cart"
      title="Keep the cup. Lose the cost."
      intro="Your STUNN is one step away."
      image={urls.pour}
      imageLabel="The cup without the caffeine loop"
      cta={{ href: tags.cartUrl, label: "Complete your order" }}
    >
      <StatementBand kicker="Left behind">
        The coffee ritual you wanted is still waiting.
      </StatementBand>
      <CopySection>
        <Copy>
          You were close to a coffee ritual that does not ask for the jitters,
          the second cup, or the 2pm crash.
        </Copy>
        <Copy>
          STUNN gives you the taste and rhythm of coffee with 0mg caffeine and
          functional support for calm focus.
        </Copy>
      </CopySection>
      <EditorialNote
        eyebrow="Why it matters"
        title="Another caffeine hit is not free."
        body="It can show up later as anxiety, bad sleep, or the crash that asks for yet another cup. STUNN keeps the ritual without that bill."
      />
      <Callout>
        Subscription orders ship free, and every order is backed by a 30-day
        money-back guarantee.
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
          <strong style={{ color: colors.offBlack }}>Still in your cart:</strong>
          <br />
          {"{% for item in event.extra.line_items %}"}
          {"{{ item.quantity|default:1 }}"} x {"{{ item.product.title|default:item.title }}"}
          <br />
          {"{% endfor %}"}
        </Text>
      </Section>
    </EmailFrame>
  );
}
