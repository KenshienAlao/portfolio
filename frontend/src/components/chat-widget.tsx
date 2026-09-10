"use client";

import {
  HiSparkles,
  HiPaperAirplane,
  HiTrash,
  HiArrowTopRightOnSquare,
} from "react-icons/hi2";
import { FaUser, FaRobot } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { HiX } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";

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

function FormattedText({ text, isUser }: { text: string; isUser: boolean }) {
  const tokenRegex =
    /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s)]+|\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("[") && match[2] && match[3]) {
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "font-medium underline decoration-1 underline-offset-2 transition-colors inline-flex items-center gap-0.5",
            isUser
              ? "text-white decoration-white/50 hover:decoration-white"
              : "text-accent decoration-accent/40 hover:decoration-accent",
          )}
        >
          {match[2]}
          <HiArrowTopRightOnSquare className="h-3 w-3 shrink-0 opacity-70" />
        </a>,
      );
    } else if (token.startsWith("http")) {
      parts.push(
        <a
          key={match.index}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "font-medium underline decoration-1 underline-offset-2 transition-colors break-all",
            isUser
              ? "text-white decoration-white/50 hover:decoration-white"
              : "text-accent decoration-accent/40 hover:decoration-accent",
          )}
        >
          {token}
        </a>,
      );
    } else if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong
          key={match.index}
          className={cn("font-semibold", !isUser && "text-text-primary")}
        >
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (
      (token.startsWith("*") && token.endsWith("*")) ||
      (token.startsWith("_") && token.endsWith("_"))
    ) {
      parts.push(
        <em
          key={match.index}
          className={cn("italic opacity-90", !isUser && "text-text-secondary")}
        >
          {token.slice(1, -1)}
        </em>,
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}

function ProjectPreviewCard({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="my-2 overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      {!imgError && (
        <div className="relative w-full aspect-video overflow-hidden bg-background">
          <img
            src={imageUrl}
            alt={`${title} preview`}
            className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      )}
      <div className="px-3 py-2 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-accent shrink-0" />
        <span className="text-xs font-semibold text-text-primary truncate">
          {title}
        </span>
      </div>
    </div>
  );
}

const PROJECT_EMBED_REGEX = /^::project\[([^\]]+)\]\(([^)]+)\)$/;

function FormattedMessage({
  content,
  isUser,
}: {
  content: string;
  isUser: boolean;
}) {
  if (isUser) {
    return (
      <p className="whitespace-pre-wrap leading-relaxed text-white font-medium">
        {content}
      </p>
    );
  }

  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let currentList: { text: string; indent: number }[] = [];

  const flushList = (key: string) => {
    if (currentList.length === 0) return;
    blocks.push(
      <ul key={key} className="my-1.5 space-y-1.5 pl-1">
        {currentList.map((item, i) => (
          <li
            key={i}
            className={cn(
              "relative flex items-start gap-2",
              item.indent > 0
                ? "pl-4 text-[12px] opacity-90"
                : "text-xs sm:text-[13px]",
            )}
          >
            <span
              className={cn(
                "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                item.indent > 0
                  ? "border border-accent bg-transparent"
                  : "bg-accent",
              )}
            />
            <div className="flex-1">
              <FormattedText text={item.text} isUser={isUser} />
            </div>
          </li>
        ))}
      </ul>,
    );
    currentList = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList(`list-${index}`);
      blocks.push(<div key={`blank-${index}`} className="h-1.5" />);
      return;
    }

    // Check for project embed
    const embedMatch = trimmed.match(PROJECT_EMBED_REGEX);
    if (embedMatch) {
      flushList(`list-${index}`);
      blocks.push(
        <ProjectPreviewCard
          key={`embed-${index}`}
          title={embedMatch[1]}
          imageUrl={embedMatch[2]}
        />,
      );
      return;
    }

    const bulletMatch = line.match(/^(\s*)(?:[*+-]|\d+\.)\s+(.+)$/);
    if (bulletMatch) {
      const indent = bulletMatch[1].length;
      currentList.push({ text: bulletMatch[2], indent });
    } else {
      flushList(`list-${index}`);
      blocks.push(
        <p key={`p-${index}`} className="leading-relaxed">
          <FormattedText text={line} isUser={isUser} />
        </p>,
      );
    }
  });

  flushList("list-final");

  return <div className="space-y-1">{blocks}</div>;
}

const WELCOME_MESSAGE =
  "Hi, I'm Kenshien's AI assistant. Ask me anything about his projects, skills, or experience \u2014 I'm happy to help.";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
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
      setHasOpenedOnce(true);
      scrollToBottom();
      setTimeout(() => textareaRef.current?.focus(), 150);
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

  // Lock the page behind the widget while it's open, so a touch-scroll on
  // mobile moves the chat, not the page underneath it. The fixed-position
  // trick (rather than plain overflow:hidden) is what actually holds still
  // on iOS Safari, and we restore the exact scroll offset on close.
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

        assistantReply += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantReply,
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
          <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <HiSparkles className="h-4 w-4" />
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:text-destructive hover:bg-destructive/10 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <HiTrash className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-border/50 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>
          </div>
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
                      <FaUser className="h-3 w-3" />
                    ) : (
                      <FaRobot className="h-3 w-3" />
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
                      <span className="inline-flex gap-2 items-center py-1 text-text-secondary">
                        <span className="text-xs sm:text-[13px]">Thinking</span>
                        <span className="inline-flex gap-1 items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce" />
                          <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:0.2s]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:0.4s]" />
                        </span>
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-2.5 items-start flex-row">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] mt-0.5 bg-accent/10 border border-accent/20 text-accent">
                  <FaRobot className="h-3 w-3" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-background border border-border text-text-primary rounded-tl-sm text-xs sm:text-[13px]">
                  <span className="inline-flex gap-2 items-center py-1 text-text-secondary">
                    <span className="text-xs sm:text-[13px]">Thinking</span>
                    <span className="inline-flex gap-1 items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce" />
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:0.2s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:0.4s]" />
                    </span>
                  </span>
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
                      className="text-left text-xs px-3.5 py-2.5 rounded-xl bg-background hover:bg-accent/10 hover:border-accent/40 border border-border text-text-primary transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
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
              className="flex h-11 w-11 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <HiPaperAirplane className="h-4 w-4 -rotate-45" />
            </button>
          </form>
        </div>
      )}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI chat"
          className="m-5 flex items-center justify-center gap-2 rounded-full px-4 py-3 shadow-lg transition-colors bg-accent text-white hover:opacity-90 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <HiSparkles className="h-5 w-5 text-white" />
          <span className="text-xs font-semibold tracking-wide">Ask AI</span>
        </button>
      )}
    </div>
  );
}
