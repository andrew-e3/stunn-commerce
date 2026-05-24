import { Body, Head, Html, Preview } from "@react-email/components";
import React from "react";
import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

export function Layout({
  children,
  preheader,
}: {
  children: React.ReactNode;
  preheader: string;
}) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="x-apple-disable-message-reformatting" />
        <style>{`
          @media only screen and (max-width: 620px) {
            .stunn-wrap { width: 100% !important; }
            .stunn-pad { padding-left: 22px !important; padding-right: 22px !important; }
            .stunn-display { font-size: 44px !important; line-height: 0.94 !important; }
            .stunn-two-col { display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; }
            .stunn-button { display: block !important; min-width: 0 !important; text-align: center !important; }
          }
          @media (hover: hover) {
            .stunn-button-shell:hover {
              background-color: ${colors.offBlack} !important;
              border-color: ${colors.offBlack} !important;
            }
            .stunn-button-shell:hover .stunn-button {
              color: ${colors.white} !important;
            }
            .stunn-button-shell-inverse:hover {
              background-color: ${colors.offBlack} !important;
              border-color: ${colors.offBlack} !important;
            }
            .stunn-button-shell-inverse:hover .stunn-button {
              color: ${colors.white} !important;
            }
          }
        `}</style>
      </Head>
      <Preview>{preheader}</Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: colors.lilac,
          fontFamily: typography.body,
        }}
      >
        {children}
      </Body>
    </Html>
  );
}
