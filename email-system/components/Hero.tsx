import { Section, Row, Column, Text } from "@react-email/components";
import React from "react";
import { Button } from "./Button";
import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

interface HeroProps {
  tag?: string;
  heading: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundColor?: string;
  textColor?: string;
}

export function Hero({
  tag,
  heading,
  body,
  ctaLabel,
  ctaHref = "https://stunn.co",
  backgroundColor = colors.background,
  textColor = colors.primary,
}: HeroProps) {
  return (
    <Section style={{ backgroundColor }} className="px-6 py-8">
      <Row>
        <Column className="text-center">
          {tag && (
            <Text
              style={{
                fontFamily: typography.fontBody,
                fontSize: typography.fontSize.xs,
                color: colors.muted,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                margin: "0 0 12px",
              }}
            >
              {tag}
            </Text>
          )}
          <Text
            style={{
              fontFamily: typography.fontHeading,
              fontSize: "36px",
              color: textColor,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              lineHeight: "1.1",
              margin: "0 0 16px",
            }}
          >
            {heading}
          </Text>
          {body && (
            <Text
              style={{
                fontFamily: typography.fontBody,
                fontSize: typography.fontSize.sm,
                color: colors.muted,
                lineHeight: "1.6",
                margin: "0 0 24px",
                maxWidth: "480px",
              }}
            >
              {body}
            </Text>
          )}
          {ctaLabel && (
            <div style={{ textAlign: "center" }}>
              <Button href={ctaHref}>{ctaLabel}</Button>
            </div>
          )}
        </Column>
      </Row>
    </Section>
  );
}
