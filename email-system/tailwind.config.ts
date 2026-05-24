import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./emails/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#5A3493",
        background: "#EDEAEF",
        cream: "#F5F0E8",
        muted: "#6B6B6B",
        accent: "#E8E2D9",
        "purple-light": "#EDE8F5",
        "purple-dark": "#3D2268",
        sage: "#C1D0A5",
      },
      fontFamily: {
        heading: ["Anton", "Impact", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": "12px",
        xs: "14px",
        sm: "16px",
        base: "18px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
      },
      spacing: {
        1: "8px",
        2: "16px",
        3: "24px",
        4: "32px",
        6: "48px",
        8: "64px",
      },
      maxWidth: {
        email: "600px",
      },
    },
  },
  plugins: [],
};

export default config;
