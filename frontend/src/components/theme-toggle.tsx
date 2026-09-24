"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "@/components/icons";

function ThemeTogglerButton({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleThemeToggle}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-surface/30 text-accent hover:bg-surface hover:text-accent shadow-xs transition-colors",
        !mounted && "pointer-events-none opacity-0",
        className,
      )}
      aria-label="Toggle theme"
    >
      {mounted &&
        (resolvedTheme === "dark" ? (
          <Sun className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5" aria-hidden="true" />
        ))}
    </button>
  );
}

export { ThemeTogglerButton };
