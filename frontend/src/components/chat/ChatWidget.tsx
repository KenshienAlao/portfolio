"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FormattedMessage } from "./FormattedMessage";
import { ThinkingIndicator } from "./ThinkingIndicator";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  "What are Kenshien's top projects?",
  "What is his core tech stack?",
  "How can I contact or hire him?",
  "Tell me about his background and experience.",
];

const WELCOME_MESSAGE =
  "Hi, I'm Kenshien's AI assistant. Ask me anything about his projects, skills, or experience \u2014 I'm happy to help.";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      const timer = setTimeout(() => textareaRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const { body } = document;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend ?? input).trim();
    if (!text || isLoading) return;

    if (abortControllerRef.current) abortControllerRef.current.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput("");
    requestAnimationFrame(autoResize);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortController.signal,
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      let assistantReply = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantReply = `${assistantReply}${chunk}`;
        const currentReply = assistantReply;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: currentReply,
          };
          return updated;
        });
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      const errMsg =
        err instanceof Error ? err.message : "Something went wrong.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errMsg,
        },
      ]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleClear = () => {
    if (messages.length > 1) {
      const confirmed = window.confirm(
        "Clear this conversation? This can't be undone.",
      );
      if (!confirmed) return;
    }
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsLoading(false);
    setInput("");
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
  };

  return (
    <div className="fixed bottom-0 right-0 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Kenshien AI chat"
          className={cn(
            "relative flex flex-col w-screen sm:w-96",
            "h-dvh sm:h-136 sm:max-h-[80vh]",
            "border-0 sm:border border-border bg-surface sm:shadow-xl",
            "sm:mb-3 sm:rounded-2xl overflow-hidden",
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                {/* Sparkles Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-text-primary leading-none truncate">
                  Kenshien AI
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-text-secondary leading-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online now
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 1 && (
                <button
                  type="button"
                  onClick={handleClear}
                  title="Clear conversation"
                  aria-label="Clear chat"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
                >
                  {/* Trash Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-border/50 transition-colors focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
              >
                {/* Close X Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div
            aria-live="polite"
            className="chat-scroll flex-1 overflow-y-auto overscroll-contain p-4 space-y-3.5 text-xs sm:text-sm"
          >
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              const isLastAssistant =
                !isUser && isLoading && idx === messages.length - 1;

              return (
                <div
                  key={idx}
                  className={cn(
                    "flex gap-2.5 items-start",
                    isUser ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] mt-0.5",
                      isUser
                        ? "bg-accent text-on-accent"
                        : "bg-accent/10 border border-accent/20 text-accent",
                    )}
                  >
                    {isUser ? (
                      /* User Avatar Icon */
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      >
                        <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                      </svg>
                    ) : (
                      /* Robot / Assistant Icon */
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      >
                        <path d="M12 2a1 1 0 0 1 1 1v1.055A9.004 9.004 0 0 1 20.945 11H22a1 1 0 1 1 0 2h-1.055A9.004 9.004 0 0 1 13 19.945V21a1 1 0 1 1-2 0v-1.055A9.004 9.004 0 0 1 3.055 13H2a1 1 0 1 1 0-2h1.055A9.004 9.004 0 0 1 11 4.055V3a1 1 0 0 1 1-1Zm0 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm-3.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 8.5 15Z" />
                      </svg>
                    )}
                  </div>

                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 max-w-[85%] leading-relaxed wrap-break-word text-xs sm:text-[13px]",
                      isUser
                        ? "bg-accent text-white rounded-tr-sm"
                        : "bg-background border border-border text-text-primary rounded-tl-sm",
                    )}
                  >
                    {msg.content ? (
                      <>
                        <FormattedMessage
                          content={msg.content}
                          isUser={isUser}
                        />
                        {isLastAssistant && (
                          <span className="inline-block ml-0.5 w-1.5 h-3.5 bg-accent/70 rounded-sm animate-pulse align-middle" />
                        )}
                      </>
                    ) : !isUser ? (
                      <ThinkingIndicator />
                    ) : null}
                  </div>
                </div>
              );
            })}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2.5 items-start flex-row">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] mt-0.5 bg-accent/10 border border-accent/20 text-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M12 2a1 1 0 0 1 1 1v1.055A9.004 9.004 0 0 1 20.945 11H22a1 1 0 1 1 0 2h-1.055A9.004 9.004 0 0 1 13 19.945V21a1 1 0 1 1-2 0v-1.055A9.004 9.004 0 0 1 3.055 13H2a1 1 0 1 1 0-2h1.055A9.004 9.004 0 0 1 11 4.055V3a1 1 0 0 1 1-1Zm0 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm-3.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 8.5 15Z" />
                  </svg>
                </div>
                <div className="rounded-2xl px-4 py-3 bg-background border border-border text-text-primary rounded-tl-sm text-xs sm:text-[13px]">
                  <ThinkingIndicator />
                </div>
              </div>
            )}

            {messages.length === 1 && !isLoading && (
              <div className="pt-1">
                <p className="text-[11px] font-medium text-text-secondary mb-2">
                  Try asking:
                </p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="text-left text-xs px-3.5 py-2.5 rounded-xl bg-background hover:bg-accent/10 hover:border-accent/40 border border-border text-text-primary transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-surface flex gap-2 items-end"
          >
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autoResize();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about Kenshien..."
              disabled={isLoading}
              className="flex-1 resize-none bg-background border border-border focus:border-accent rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-60 transition-colors leading-relaxed max-h-30 overflow-y-auto"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className="flex h-11 w-11 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
            >
              {/* Paper airplane send icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 -rotate-45"
                aria-hidden="true"
              >
                <path d="m3.105 2.288 15.342 6.818a.75.75 0 0 1 0 1.368L3.105 17.292a.75.75 0 0 1-1.026-.882l1.62-5.41a.75.75 0 0 1 .716-.54h5.835a.75.75 0 0 0 0-1.5H4.415a.75.75 0 0 1-.716-.54l-1.62-5.41a.75.75 0 0 1 1.026-.882Z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating launcher button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI chat"
          className="m-5 flex items-center justify-center gap-2 rounded-full px-4 py-3 shadow-lg transition-colors bg-accent text-white hover:opacity-90 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5 text-white"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs font-semibold tracking-wide">Ask AI</span>
        </button>
      )}
    </div>
  );
}
