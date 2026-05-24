import { Section, Row, Column, Text, Img } from "@react-email/components";
import React from "react";
import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

interface ProductCardProps {
  name: string;
  price: string;
  imageUrl?: string;
  imageAlt?: string;
  quantity?: number;
}

export function ProductCard({
  name,
  price,
  imageUrl,
  imageAlt,
  quantity,
}: ProductCardProps) {
  return (
    <Section
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.accent}`,
        borderRadius: "4px",
        margin: "8px 0",
      }}
    >
      <Row className="px-4 py-3">
        {imageUrl && (
          <Column style={{ width: "72px", verticalAlign: "top" }}>
            <Img
              src={imageUrl}
              alt={imageAlt || name}
              width={64}
              height={64}
              style={{ borderRadius: "2px", objectFit: "cover" }}
            />
          </Column>
        )}
        <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
          <Text
            style={{
              fontFamily: typography.fontBody,
              fontSize: typography.fontSize.sm,
              color: colors.text,
              fontWeight: "600",
              margin: "0 0 4px",
            }}
          >
            {name}
          </Text>
          {quantity !== undefined && (
            <Text
              style={{
                fontFamily: typography.fontBody,
                fontSize: typography.fontSize.xs,
                color: colors.muted,
                margin: "0 0 4px",
              }}
            >
              Qty: {quantity}
            </Text>
          )}
          <Text
            style={{
              fontFamily: typography.fontBody,
              fontSize: typography.fontSize.sm,
              color: colors.primary,
              fontWeight: "700",
              margin: "0",
            }}
          >
            {price}
          </Text>
        </Column>
      </Row>
    </Section>
  );
}
