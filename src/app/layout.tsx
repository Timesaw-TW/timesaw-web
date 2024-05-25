import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import SystemProvider from "@/components/provider/SystemProvider";
import AxiosProvider from "@/components/provider/AxiosProvider";

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
    <html lang="en" className={`${notoSans.variable}`} suppressHydrationWarning>
      <body className="font-main">
        <SystemProvider>
          <AxiosProvider>{children}</AxiosProvider>
        </SystemProvider>
      </body>
    </html>
  );
}
