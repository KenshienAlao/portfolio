"use client";

import { cn } from "@/lib/utils";

interface AnimatedHamburgerProps {
  isOpen: boolean;
  className?: string;
}

export function AnimatedHamburger({ isOpen, className }: AnimatedHamburgerProps) {
  return (
    <div className={cn("relative w-4 h-4", className)} aria-hidden="true">
      <span
        className={cn(
          "absolute left-0 top-1/2 block h-0.5 w-4 bg-current transition-all duration-300 ease-out",
          isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 block h-0.5 w-4 bg-current transition-all duration-300 ease-out",
          isOpen ? "opacity-0" : "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-1/2 block h-0.5 w-4 bg-current transition-all duration-300 ease-out",
          isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5",
        )}
      />
    </div>
  );
}
