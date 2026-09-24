import type { ReactNode } from "react";

export const fieldLabel =
  "block font-mono text-[11px] uppercase tracking-widest text-text-secondary";

export const fieldError =
  "font-mono text-[11px] text-destructive";

export const inputBase =
  "w-full rounded-lg border bg-input/40 px-3.5 py-2.5 font-mono text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 disabled:cursor-not-allowed disabled:opacity-60";

export const inputNormal =
  "border-border focus:border-accent focus:ring-2 focus:ring-accent/25";

export const inputInvalid =
  "border-destructive/60 focus:border-destructive focus:ring-2 focus:ring-destructive/20";

export function inputClass(invalid = false) {
  return `${inputBase} ${invalid ? inputInvalid : inputNormal}`;
}

export function FieldError({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className={fieldError}>
      {children}
    </p>
  );
}