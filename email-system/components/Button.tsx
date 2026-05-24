import React from "react";
import { colors } from "../tokens/colors";
import { typography } from "../tokens/typography";

export function Button({
  href,
  children,
  inverse = false,
}: {
  href: string;
  children: React.ReactNode;
  inverse?: boolean;
}) {
  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      role="presentation"
      style={{ borderCollapse: "separate" }}
    >
      <tbody>
        <tr>
          <td
            className={inverse ? "stunn-button-shell-inverse" : "stunn-button-shell"}
            style={{
              backgroundColor: inverse ? colors.white : colors.purple,
              border: `2px solid ${inverse ? colors.white : colors.purple}`,
              borderRadius: "8px",
              msoPaddingAlt: "0",
            }}
          >
            <a
              className="stunn-button"
              href={href}
              style={{
                display: "inline-block",
                minWidth: "172px",
                padding: "16px 24px",
                color: inverse ? colors.purple : colors.white,
                fontFamily: typography.body,
                fontSize: "14px",
                fontWeight: 900,
                letterSpacing: "0.08em",
                lineHeight: 1,
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              {children}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
