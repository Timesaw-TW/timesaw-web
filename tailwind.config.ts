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
        soda: {
          100: "#9FD7E2",
          80: "#B2DFE8",
          60: "#C5E7EE",
          40: "#D9EFF3",
          20: "#ECF7F9",
        },
        daisy: {
          100: "#F9D060",
          80: "#FAD980",
          60: "#FBE3A0",
          40: "#FDECBF",
          20: "#FEF6DF",
        },
        white: "#FFFFFF",
        primary: "#090000",
        secondary: "#5C5858",
        caption: "#E1E0E0",
        success: "#77BD5B",
        warning: "#F7AF0A",
        error: "#D7402A",
      },
      boxShadow: {
        fab: "0px 3px 1px 0px #0000000A, 0px 3px 8px 0px #0000001F",
        segmentedPickerSelected:
          "0px 3px 1px 0px #0000000A, 0px 3px 8px 0px #0000001F",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

export default config;
