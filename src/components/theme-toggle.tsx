"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

function ThemeTogglerButton({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-surface/30 text-text-secondary hover:bg-surface hover:text-text-primary shadow-xs",
        !mounted && "pointer-events-none opacity-0",
        className,
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <m.div
            key={resolvedTheme}
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.15 }}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4 text-yellow-400" />
            ) : (
              <Moon className="h-4 w-4 text-blue-500" />
            )}
          </m.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export { ThemeTogglerButton };
