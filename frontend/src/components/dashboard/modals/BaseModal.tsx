"use client";

import { ReactNode } from "react";
import { X } from "@/components/icons";

interface BaseModalProps {
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
}

export function BaseModal({
  onClose,
  children,
  maxWidth = "max-w-lg",
}: BaseModalProps) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Dialog"
        className={`relative flex max-h-[92vh] w-full ${maxWidth} flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-lg p-2 text-text-secondary transition-colors hover:bg-background hover:text-text-primary"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6 pr-12">{children}</div>
      </div>
    </div>
  );
}

export function ModalFooter({
  onCancel,
  cancelDisabled = false,
  children,
}: {
  onCancel: () => void;
  cancelDisabled?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="mt-6 flex flex-col-reverse gap-2.5 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        disabled={cancelDisabled}
        className="rounded-lg border border-border px-4 py-2.5 font-mono text-sm font-semibold text-text-secondary transition-colors hover:border-accent/50 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        Cancel
      </button>
      {children}
    </div>
  );
}