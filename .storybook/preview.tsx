import React from "react";
import type { Preview } from "@storybook/react";
import localFont from "next/font/local";
import "../src/app/globals.css";

const notoSans = localFont({
  src: "../public/fonts/Noto_Sans/regular.ttf",
  display: "swap",
  variable: "--font-notoSans",
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <main className={`${notoSans.variable} font-main`}>
        <Story />
      </main>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    darkMode: {
      defaultValue: false,
    },
    className: {
      defaultValue: "dark",
    },
  },
};

export default preview;
