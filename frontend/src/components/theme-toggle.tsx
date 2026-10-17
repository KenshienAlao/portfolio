"use client";

import { useTheme } from "next-themes";
import { Monitor, Sun, Moon } from "@/components/icons";
import { useCallback, useRef, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const ORDER = ["system", "light", "dark"] as const;
type Mode = (typeof ORDER)[number];

const LABELS: Record<Mode, string> = {
  system: "Theme: following system. Switch to light",
  light: "Theme: light. Switch to dark",
  dark: "Theme: dark. Switch to system",
};

let isTransitioning = false;

export function ThemeTogglerButton({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  const current: Mode = (
    mounted && ORDER.includes(theme as Mode) ? theme : "system"
  ) as Mode;

  const handleClick = useCallback(() => {
    const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];

    const currentResolved = resolvedTheme;
    let nextResolved: string | undefined;
    if (next === "system") {
      nextResolved = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      nextResolved = next;
    }

    const isSameResolvedTheme = currentResolved === nextResolved;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const supportsViewTransition =
      "startViewTransition" in document &&
      typeof (document as unknown as Record<string, unknown>)
        .startViewTransition === "function";

    if (
      !supportsViewTransition ||
      prefersReducedMotion ||
      isSameResolvedTheme ||
      isTransitioning
    ) {
      setTheme(next);
      return;
    }

    const btn = buttonRef.current;
    if (!btn) {
      setTheme(next);
      return;
    }

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const root = document.documentElement;
    root.style.setProperty("--theme-transition-x", `${x}px`);
    root.style.setProperty("--theme-transition-y", `${y}px`);
    root.style.setProperty("--theme-transition-r", `${maxRadius}px`);

    const goingDark = nextResolved === "dark";
    root.dataset.themeTransitionDirection = goingDark ? "dark" : "light";

    isTransitioning = true;

    const transition = (
      document as unknown as {
        startViewTransition: (cb: () => void) => {
          ready: Promise<void>;
          finished: Promise<void>;
        };
      }
    ).startViewTransition(() => {
      setTheme(next);
    });

    transition.ready.then(() => {}).catch(() => {});

    transition.finished
      .then(() => {
        cleanup();
      })
      .catch(() => {
        cleanup();
      });

    function cleanup() {
      isTransitioning = false;
      delete root.dataset.themeTransitionDirection;
      root.style.removeProperty("--theme-transition-x");
      root.style.removeProperty("--theme-transition-y");
      root.style.removeProperty("--theme-transition-r");
    }
  }, [current, resolvedTheme, setTheme]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      aria-label={LABELS[current]}
      suppressHydrationWarning
      className={`flex h-8 w-8 items-center justify-center border border-border bg-background text-text-secondary transition-colors hover:border-text-primary hover:text-text-primary rounded-full cursor-pointer ${
        className ?? ""
      }`}
    >
      {current === "system" ? (
        <Monitor className="h-4 w-4" />
      ) : resolvedTheme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}
