"use client";

import { useEffect, useRef, useState } from "react";
import { messageService } from "@/service/message.service";
import { AnimatedSubmitButton } from "@/components/ui/animated-submit-button";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

const MIN_LOADING_MS = 600;
const SUCCESS_HOLD_MS = 1800;
const ERROR_HOLD_MS = 1600;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function errorMessage(err: unknown) {
  const e = err as {
    response?: { data?: { message?: string } };
    message?: string;
  };
  return (
    e?.response?.data?.message ||
    e?.message ||
    "Failed to send message. Please try again."
  );
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const alive = useRef(true);
  const busy = useRef(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      if (holdTimer.current) clearTimeout(holdTimer.current);
    };
  }, []);

  const isSending = status === "loading";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy.current) return;

    busy.current = true;
    setErrorMsg(null);
    setStatus("loading");

    const startedAt = Date.now();
    const settle = async () => {
      const remaining = MIN_LOADING_MS - (Date.now() - startedAt);
      if (remaining > 0) await sleep(remaining);
      return alive.current;
    };

    try {
      await messageService.sendMessage(form);
      if (!(await settle())) return;
      setForm(INITIAL_STATE);
      setStatus("success");
      holdTimer.current = setTimeout(() => {
        busy.current = false;
        setStatus("idle");
      }, SUCCESS_HOLD_MS);
    } catch (err) {
      if (!(await settle())) return;
      setErrorMsg(errorMessage(err));
      setStatus("error");
      holdTimer.current = setTimeout(() => {
        busy.current = false;
        setStatus("idle");
      }, ERROR_HOLD_MS);
    }
  };

  const inputClass =
    "w-full border border-border bg-background px-4 py-3 text-sm font-mono text-text-primary transition-colors duration-150 placeholder:text-text-secondary/60 focus:border-text-primary focus:outline-none rounded-lg disabled:opacity-60";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-xs font-mono uppercase tracking-wider text-text-secondary"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={isSending}
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-xs font-mono uppercase tracking-wider text-text-secondary"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={isSending}
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="subject"
          className="text-xs font-mono uppercase tracking-wider text-text-secondary"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          disabled={isSending}
          value={form.subject}
          onChange={handleChange}
          placeholder="What is this about"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-xs font-mono uppercase tracking-wider text-text-secondary"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          disabled={isSending}
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <p role="status" className="sr-only">
        {status === "loading"
          ? "Sending your message"
          : status === "success"
            ? "Message sent"
            : ""}
      </p>

      {errorMsg && (
        <p role="alert" className="text-xs font-mono text-destructive">
          {errorMsg}
        </p>
      )}

      <AnimatedSubmitButton
        action={async () => {
          const startedAt = Date.now();
          const settle = async () => {
            const remaining = MIN_LOADING_MS - (Date.now() - startedAt);
            if (remaining > 0) await sleep(remaining);
          };

          try {
            await messageService.sendMessage(form);
            await settle();
            setForm(INITIAL_STATE);
            return true;
          } catch (err) {
            await settle();
            setErrorMsg(errorMessage(err));
            return false;
          }
        }}
        label="Send message"
      />
    </form>
  );
}
