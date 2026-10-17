"use client";

import { ReactNode } from "react";
import { X } from "@/components/icons";
import { btnSecondary } from "./form-styles";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Dialog"
        className={`relative flex max-h-[92vh] w-full ${maxWidth} flex-col overflow-hidden border border-border bg-background`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 p-2 text-text-secondary transition-colors hover:text-text-primary"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex-1 overflow-y-auto px-6 py-6 pr-12">
          {children}
        </div>
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
    <div className="mt-6 flex flex-col-reverse gap-2.5 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        disabled={cancelDisabled}
        className={btnSecondary}
      >
        Cancel
      </button>
      {children}
    </div>
  );
}
