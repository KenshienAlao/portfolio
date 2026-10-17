import type { ReactNode } from "react";

export const fieldLabel =
  "block text-xs font-mono uppercase tracking-wider text-text-secondary";

export const fieldError = "text-xs font-mono text-destructive";

const inputBase =
  "w-full border border-border bg-background px-4 py-3 text-sm font-mono text-text-primary transition-colors duration-150 placeholder:text-text-secondary/60 focus:border-text-primary focus:outline-none rounded-lg disabled:cursor-not-allowed disabled:opacity-60";

export function inputClass(invalid = false) {
  return invalid
    ? `${inputBase} border-destructive focus:border-destructive`
    : inputBase;
}

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 border border-transparent bg-text-primary px-4 py-2.5 text-sm font-medium text-background rounded-lg transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

export const btnSecondary =
  "inline-flex items-center justify-center gap-2 border border-border bg-background px-4 py-2.5 text-sm font-medium text-text-primary rounded-lg transition-colors hover:border-text-primary disabled:cursor-not-allowed disabled:opacity-50";

export const btnGhost =
  "inline-flex items-center justify-center gap-2 border border-transparent p-2 text-sm font-medium text-text-secondary rounded-lg transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50";

export const btnDanger =
  "inline-flex items-center justify-center gap-2 border border-transparent p-2 text-sm font-medium text-text-secondary rounded-lg transition-colors hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50";

export const panel = "border border-border bg-background p-6";

export function FieldError({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className={fieldError}>
      {children}
    </p>
  );
}
