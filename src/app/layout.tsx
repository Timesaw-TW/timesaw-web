import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import SystemProvider from "./components/provider/SystemProvider";

const mulish = Mulish({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mulish",
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
    <html lang="en">
      <body className={`${mulish.className}  font-sans`}>
        <SystemProvider>{children}</SystemProvider>
      </body>
    </html>
  );
}
