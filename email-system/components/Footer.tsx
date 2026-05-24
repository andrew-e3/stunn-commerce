import { Link, Section, Text } from "@react-email/components";
import React from "react";
import { urls } from "../lib/klaviyo-tags";
import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

export function Footer({
  note = "You are receiving this because you joined STUNN or started a STUNN checkout.",
}: {
  note?: string;
}) {
  return (
    <Section
      style={{
        backgroundColor: colors.offBlack,
        padding: "32px 34px",
        textAlign: "center",
      }}
    >
      <Text
        style={{
          margin: "0 0 10px",
          color: colors.white,
          fontFamily: typography.body,
          fontSize: "13px",
          fontWeight: 800,
          lineHeight: 1.5,
        }}
      >
        No caffeine. No crash. Same ritual.
      </Text>
      <Text
        style={{
          margin: "0 0 14px",
          color: "#BDB7C7",
          fontFamily: typography.body,
          fontSize: "12px",
          lineHeight: 1.6,
        }}
      >
        {note}
      </Text>
      <Text
        style={{
          margin: 0,
          color: "#BDB7C7",
          fontFamily: typography.body,
          fontSize: "12px",
          lineHeight: 1.6,
        }}
      >
        <Link href={urls.home} style={{ color: colors.white }}>
          stunn.co
        </Link>
        {" | "}
        <Link href={urls.privacy} style={{ color: colors.white }}>
          Privacy
        </Link>
        {" | "}
        <Link href="{% unsubscribe_link %}" style={{ color: colors.white }}>
          Unsubscribe
        </Link>
      </Text>
    </Section>
  );
}
