"use client";

import { useTheme } from "next-themes";
import { FC } from "react";

interface Props {
  className?: string;
}

const ThemeToggle: FC<Props> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  return (
    <select
      className={className}
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
};

export default ThemeToggle;
