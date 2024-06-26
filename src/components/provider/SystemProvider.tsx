"use client";

import { FC, ReactNode } from "react";
import { ThemeProvider } from "next-themes";

interface Props {
  children: ReactNode;
}

const SystemProvider: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      themes={["light", "dark"]}
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
};

export default SystemProvider;
