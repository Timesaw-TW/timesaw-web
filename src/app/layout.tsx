import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import SystemProvider from "@/components/provider/SystemProvider";
import AxiosProvider from "@/components/provider/AxiosProvider";
import ApolloProvider from "@/components/provider/ApolloProvider";

const notoSans = localFont({
  src: "../../public/fonts/Noto_Sans/regular.ttf",
  display: "swap",
  variable: "--font-notoSans",
});

export const metadata: Metadata = {
  title: "Timesaw",
  description: "Timesaw Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="h-full font-main">
        <ApolloProvider>
          <SystemProvider>
            <AxiosProvider>{children}</AxiosProvider>
          </SystemProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
