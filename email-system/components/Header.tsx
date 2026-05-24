import { Link, Section, Text } from "@react-email/components";
import React from "react";
import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";
import { urls } from "../lib/klaviyo-tags";

export function Header() {
  return (
    <Section
      style={{
        backgroundColor: colors.purple,
        padding: "22px 34px",
        textAlign: "center",
      }}
    >
      <Link href={urls.home} style={{ textDecoration: "none" }}>
        <Text
          style={{
            margin: 0,
            color: colors.white,
            fontFamily: typography.body,
            fontSize: "27px",
            fontWeight: 900,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          STUNN<span style={{ color: "#C9B9EF" }}>+</span>
        </Text>
        <Text
          style={{
            margin: "8px 0 0",
            color: "#D9CBFF",
            fontFamily: typography.body,
            fontSize: "10px",
            fontWeight: 900,
            letterSpacing: "0.24em",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          Quiet Club
        </Text>
      </Link>
    </Section>
  );
}
