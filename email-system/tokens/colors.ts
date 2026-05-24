export const colors = {
  purple: "#5A3493",
  primary: "#5A3493",
  shadow: "#43256F",
  primaryDark: "#43256F",
  offBlack: "#111111",
  text: "#111111",
  ink: "#1F1B24",
  muted: "#686170",
  rule: "#DDD5E9",
  accent: "#DDD5E9",
  lavender: "#EDE9F8",
  primaryLight: "#EDE9F8",
  lilac: "#F5F1FB",
  background: "#F5F1FB",
  white: "#FFFFFF",
  cream: "#FFFFFF",
  textOnPurple: "#FFFFFF",
  gold: "#EFAF00",
} as const;

export type ColorKey = keyof typeof colors;
