import type { Config } from "tailwindcss";

const config: Config = {
  ...(process.env.TAILWIND_MODE === "aot" && {
    safelist: [{ pattern: /^(.*?)/ }],
  }),
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["var(--font-notoSans)"],
      },
      colors: {
        primary: {
          100: "#9FD7E2",
          80: "#B2DFE8",
          60: "#C5E7EE",
          40: "#D9EFF3",
          20: "#ECF7F9",
        },
        secondary: {
          100: "#F9D060",
          80: "#FAD980",
          60: "#FBE3A0",
          40: "#FDECBF",
          20: "#FEF6DF",
        },
        neutral: {
          primary: "#090000",
          secondary: "#5C5858",
          divider: "#E1E0E0",
          white: "#FFFFFF",
          error: "#D7402A",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
