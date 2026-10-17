"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Check, AlertCircle, ArrowRight } from "@/components/icons";

type SubmitStatus = "idle" | "loading" | "success" | "error";

const MIN_LOADING_MS = 600;
const SUCCESS_HOLD_MS = 1800;
const ERROR_HOLD_MS = 1600;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface AnimatedSubmitButtonProps {
  action: () => Promise<boolean | void>;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function AnimatedSubmitButton({
  action,
  label = "Submit",
  className,
  disabled = false,
}: AnimatedSubmitButtonProps) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const busy = useRef(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSending = status === "loading";

  const handleClick = useCallback(async () => {
    if (busy.current || disabled) return;
    busy.current = true;
    setStatus("loading");

    const startedAt = Date.now();
    const settle = async () => {
      const remaining = MIN_LOADING_MS - (Date.now() - startedAt);
      if (remaining > 0) await sleep(remaining);
    };

    try {
      const result = await action();
      await settle();
      if (result === false) {
        setStatus("error");
        holdTimer.current = setTimeout(() => {
          busy.current = false;
          setStatus("idle");
        }, ERROR_HOLD_MS);
      } else {
        setStatus("success");
        holdTimer.current = setTimeout(() => {
          busy.current = false;
          setStatus("idle");
        }, SUCCESS_HOLD_MS);
      }
    } catch {
      await settle();
      setStatus("error");
      holdTimer.current = setTimeout(() => {
        busy.current = false;
        setStatus("idle");
      }, ERROR_HOLD_MS);
    }
  }, [action, disabled]);

  return (
    <button
      type="button"
      data-state={status}
      aria-disabled={status !== "idle" || disabled}
      aria-busy={isSending}
      onClick={handleClick}
      className={cn(
        "animated-submit-btn relative inline-flex items-center justify-center gap-2 overflow-hidden border border-transparent bg-text-primary px-6 py-3 text-sm font-medium text-background transition-all duration-300 hover:opacity-90 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        status === "loading" && "animated-submit-btn--loading",
        status === "success" && "animated-submit-btn--success",
        status === "error" && "animated-submit-btn--error",
        className,
      )}
    >
      {status === "loading" && (
        <span className="animated-submit-btn__spinner" aria-hidden="true" />
      )}

      {status === "success" && (
        <>
          <Check className="animated-submit-btn__checkmark h-5 w-5" aria-hidden="true" />
          <span>Sent</span>
        </>
      )}

      {status === "error" && (
        <>
          <AlertCircle className="animated-submit-btn__error-icon h-5 w-5" aria-hidden="true" />
          <span>Failed</span>
        </>
      )}

      {status === "idle" && (
        <>
          <span>{label}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </>
      )}

      <span role="status" className="sr-only">
        {status === "loading"
          ? "Processing"
          : status === "success"
            ? "Success"
            : status === "error"
              ? "Error"
              : ""}
      </span>
    </button>
  );
}
