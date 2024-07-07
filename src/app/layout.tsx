import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import SystemProvider from "@/components/provider/SystemProvider";
import AxiosProvider from "@/components/provider/AxiosProvider";
import ApolloProvider from "@/components/provider/ApolloProvider";
import AuthGuard from "@/components/guard/AuthGuard";
import ModalProvider from "@/components/provider/ModalProvider";
import SlideMenu from "@/components/util/Menu/SlideMenu";

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
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/favicons/apple-icon.png"
          type="image/png"
          sizes="180x180"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicons/manifest.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="h-full font-main">
        <ApolloProvider>
          <SystemProvider>
            <AxiosProvider>
              <AuthGuard>
                <>
                  <SlideMenu />
                  {children}
                  <ModalProvider />
                </>
              </AuthGuard>
            </AxiosProvider>
          </SystemProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
