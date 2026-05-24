import { Hr } from "@react-email/components";
import React from "react";
import { colors } from "../tokens/colors";

interface DividerProps {
  color?: string;
  margin?: string;
}

export function Divider({
  color = colors.accent,
  margin = "24px 0",
}: DividerProps) {
  return (
    <Hr
      style={{
        borderColor: color,
        borderTopWidth: "1px",
        margin,
      }}
    />
  );
}
