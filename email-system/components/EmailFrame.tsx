import { Container, Img, Section, Text } from "@react-email/components";
import React from "react";
import { Button } from "./Button";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Layout } from "./Layout";
import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

export function EmailFrame({
  preheader,
  eyebrow,
  title,
  intro,
  image,
  imageLabel,
  children,
  cta,
  footerNote,
}: {
  preheader: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: string;
  imageLabel?: string;
  children?: React.ReactNode;
  cta?: { href: string; label: string; inverse?: boolean };
  footerNote?: string;
}) {
  return (
    <Layout preheader={preheader}>
      <Container
        className="stunn-wrap"
        style={{
          width: "640px",
          maxWidth: "640px",
          margin: "0 auto",
          padding: "28px 0",
        }}
      >
        <Container
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.rule}`,
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          <Header />
          {image ? (
            <Section style={{ padding: "18px 18px 0" }}>
              <table
                role="presentation"
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                style={{
                  backgroundColor: colors.lavender,
                  borderCollapse: "separate",
                  borderRadius: "18px",
                  overflow: "hidden",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      align="center"
                      style={{
                        backgroundColor: colors.lavender,
                        borderRadius: "18px",
                        lineHeight: 0,
                      }}
                    >
                      <Img
                        src={image}
                        width="596"
                        alt="STUNN caffeine-free decaf coffee"
                        style={{
                          display: "block",
                          width: "100%",
                          maxWidth: "596px",
                          border: 0,
                          borderRadius: "18px",
                          color: colors.purple,
                          fontFamily: typography.body,
                          fontSize: "13px",
                          fontWeight: 900,
                          lineHeight: "18px",
                          outline: 0,
                          textAlign: "center",
                          textDecoration: "none",
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              {imageLabel ? (
                <Text
                  style={{
                    margin: "10px 2px 0",
                    color: colors.muted,
                    fontFamily: typography.body,
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    lineHeight: 1.4,
                    textTransform: "uppercase",
                  }}
                >
                  {imageLabel}
                </Text>
              ) : null}
            </Section>
          ) : null}
          <Section className="stunn-pad" style={{ padding: "34px 34px 8px" }}>
            <Text
              style={{
                margin: "0 0 16px",
                color: colors.purple,
                fontFamily: typography.body,
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.18em",
                lineHeight: 1.4,
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </Text>
            <Text
              className="stunn-display"
              style={{
                margin: 0,
                color: colors.offBlack,
                fontFamily: typography.display,
                fontSize: "58px",
                fontWeight: 900,
                letterSpacing: 0,
                lineHeight: 0.92,
                textTransform: "uppercase",
              }}
            >
              {title}
            </Text>
            {intro ? (
              <Text
                style={{
                  margin: "20px 0 0",
                  color: colors.muted,
                  fontFamily: typography.body,
                  fontSize: "19px",
                  fontWeight: 700,
                  lineHeight: 1.55,
                }}
              >
                {intro}
              </Text>
            ) : null}
          </Section>
          {children}
          {cta ? (
            <Section className="stunn-pad" style={{ padding: "0 34px 38px" }}>
              <Button href={cta.href} inverse={cta.inverse}>
                {cta.label}
              </Button>
            </Section>
          ) : null}
          <Footer note={footerNote} />
        </Container>
      </Container>
    </Layout>
  );
}

export function Copy({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        margin: "0 0 18px",
        color: colors.ink,
        fontFamily: typography.body,
        fontSize: "17px",
        lineHeight: 1.6,
      }}
    >
      {children}
    </Text>
  );
}

export function CopySection({ children }: { children: React.ReactNode }) {
  return (
    <Section className="stunn-pad" style={{ padding: "14px 34px 8px" }}>
      {children}
    </Section>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <Section className="stunn-pad" style={{ padding: "0 34px 30px" }}>
      <Text
        style={{
          margin: 0,
          backgroundColor: colors.lavender,
          borderLeft: `4px solid ${colors.purple}`,
          color: colors.offBlack,
          fontFamily: typography.body,
          fontSize: "16px",
          fontWeight: 800,
          lineHeight: 1.5,
          padding: "18px 20px",
        }}
      >
        {children}
      </Text>
    </Section>
  );
}

export function RuleRows({
  rows,
}: {
  rows: Array<{ label: string; value: string }>;
}) {
  return (
    <Section className="stunn-pad" style={{ padding: "8px 34px 30px" }}>
      <table
        role="presentation"
        cellPadding={0}
        cellSpacing={0}
        width="100%"
        style={{ borderCollapse: "collapse" }}
      >
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td
                style={{
                  borderBottom: `1px solid ${colors.rule}`,
                  color: colors.offBlack,
                  fontFamily: typography.body,
                  fontSize: "14px",
                  fontWeight: 900,
                  padding: "13px 0",
                  textTransform: "uppercase",
                }}
              >
                {row.label}
              </td>
              <td
                style={{
                  borderBottom: `1px solid ${colors.rule}`,
                  color: colors.purple,
                  fontFamily: typography.body,
                  fontSize: "14px",
                  fontWeight: 900,
                  padding: "13px 0",
                  textAlign: "right",
                }}
              >
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

export function StatementBand({
  kicker,
  children,
  tone = "black",
}: {
  kicker?: string;
  children: React.ReactNode;
  tone?: "black" | "purple";
}) {
  const background = tone === "purple" ? colors.purple : colors.offBlack;
  return (
    <Section className="stunn-pad" style={{ padding: "14px 34px 30px" }}>
      <table
        role="presentation"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <tbody>
          <tr>
            <td
              style={{
                backgroundColor: background,
                borderRadius: "18px",
                padding: "26px 24px",
              }}
            >
              {kicker ? (
                <Text
                  style={{
                    margin: "0 0 12px",
                    color: tone === "purple" ? "#D9CBFF" : colors.gold,
                    fontFamily: typography.body,
                    fontSize: "11px",
                    fontWeight: 900,
                    letterSpacing: "0.18em",
                    lineHeight: 1.4,
                    textTransform: "uppercase",
                  }}
                >
                  {kicker}
                </Text>
              ) : null}
              <Text
                style={{
                  margin: 0,
                  color: colors.white,
                  fontFamily: typography.display,
                  fontSize: "38px",
                  fontWeight: 900,
                  letterSpacing: 0,
                  lineHeight: 0.98,
                  textTransform: "uppercase",
                }}
              >
                {children}
              </Text>
            </td>
          </tr>
        </tbody>
      </table>
    </Section>
  );
}

export function EditorialNote({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <Section className="stunn-pad" style={{ padding: "0 34px 30px" }}>
      <table
        role="presentation"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{ borderCollapse: "collapse" }}
      >
        <tbody>
          <tr>
            <td
              className="stunn-two-col"
              style={{
                width: "35%",
                borderTop: `2px solid ${colors.purple}`,
                color: colors.purple,
                fontFamily: typography.body,
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.16em",
                lineHeight: 1.4,
                padding: "16px 18px 0 0",
                textTransform: "uppercase",
                verticalAlign: "top",
              }}
            >
              {eyebrow}
            </td>
            <td
              className="stunn-two-col"
              style={{
                width: "65%",
                borderTop: `2px solid ${colors.rule}`,
                padding: "14px 0 0",
                verticalAlign: "top",
              }}
            >
              <Text
                style={{
                  margin: "0 0 8px",
                  color: colors.offBlack,
                  fontFamily: typography.body,
                  fontSize: "18px",
                  fontWeight: 900,
                  lineHeight: 1.35,
                }}
              >
                {title}
              </Text>
              <Text
                style={{
                  margin: 0,
                  color: colors.muted,
                  fontFamily: typography.body,
                  fontSize: "15px",
                  lineHeight: 1.6,
                }}
              >
                {body}
              </Text>
            </td>
          </tr>
        </tbody>
      </table>
    </Section>
  );
}

export function ThreePointStrip({
  items,
}: {
  items: Array<{ label: string; text: string }>;
}) {
  return (
    <Section className="stunn-pad" style={{ padding: "0 34px 30px" }}>
      <table
        role="presentation"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{ borderCollapse: "collapse" }}
      >
        <tbody>
          <tr>
            {items.map((item) => (
              <td
                className="stunn-two-col"
                key={item.label}
                style={{
                  width: "33.33%",
                  padding: "16px 14px",
                  backgroundColor: colors.lilac,
                  borderTop: `1px solid ${colors.rule}`,
                  borderBottom: `1px solid ${colors.rule}`,
                  verticalAlign: "top",
                }}
              >
                <Text
                  style={{
                    margin: "0 0 7px",
                    color: colors.purple,
                    fontFamily: typography.body,
                    fontSize: "12px",
                    fontWeight: 900,
                    letterSpacing: "0.1em",
                    lineHeight: 1.3,
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{
                    margin: 0,
                    color: colors.muted,
                    fontFamily: typography.body,
                    fontSize: "13px",
                    lineHeight: 1.45,
                  }}
                >
                  {item.text}
                </Text>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </Section>
  );
}
