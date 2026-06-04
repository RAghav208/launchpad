"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { MoonIcon, SunIcon } from "@/components/icons";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid a hydration mismatch: only render the theme-dependent icon after mount.
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="inline-flex size-9 items-center justify-center rounded-control border border-border text-muted transition-colors hover:bg-hover hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50"
    >
      {mounted ? (
        theme === "dark" ? (
          <SunIcon className="size-4" />
        ) : (
          <MoonIcon className="size-4" />
        )
      ) : (
        <span className="size-4" />
      )}
    </button>
  );
}
