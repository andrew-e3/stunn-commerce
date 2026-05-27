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

export const templateName = "STUNN - Order Confirmation";
export const subject = "Your STUNN order is confirmed.";
export const preview = "Your quieter coffee ritual is on its way.";

export default function OrderConfirmation() {
  return (
    <EmailFrame
      preheader={preview}
      eyebrow="Order confirmed"
      title="Your quieter coffee ritual starts now."
      intro={<>Thanks {tags.firstName} — we have your order.</>}
      image={urls.ritual}
      imageLabel="Your caffeine-free coffee ritual is moving"
      cta={{ href: urls.product, label: "View your ritual" }}
      footerNote="You are receiving this transactional email because you placed an order with STUNN."
    >
      <StatementBand kicker="Confirmed">
        No caffeine. No crash. Same ritual.
      </StatementBand>
      <CopySection>
        <Copy>
          We are getting your STUNN ready now. You will receive tracking as soon
          as it ships, and your order will move through Shopify checkout and
          fulfilment like any normal coffee order.
        </Copy>
        <Copy>
          When it lands: mix one sachet with hot water or milk, stir, and keep
          the coffee ritual without the caffeine dependency. Use it where
          caffeine usually wins: the second cup, the afternoon cup, or the
          evening ritual.
        </Copy>
      </CopySection>
      <EditorialNote
        eyebrow="Subscription note"
        title="If you chose autoship, your discount is locked in."
        body="Your first order is confirmed today. Future renewals follow the cadence you selected at checkout, and you can pause, edit, or cancel before renewal."
      />
      <Callout>Order {tags.orderNumber} is confirmed.</Callout>
      <RuleRows
        rows={[
          { label: "Order date", value: tags.orderDate },
          { label: "Ships to", value: tags.shippingName },
          { label: "Need help?", value: "Reply to this email" },
        ]}
      />
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
          <strong style={{ color: colors.offBlack }}>What happens next:</strong>
          <br />
          1. We prepare your order.
          <br />
          2. You get tracking when it ships.
          <br />
          3. Your caffeine-free coffee ritual arrives.
          <br />
          4. One sachet becomes your next calmer cup.
        </Text>
      </Section>
    </EmailFrame>
  );
}
