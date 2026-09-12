import React from "react";
import { cn } from "@/lib/utils";

const TOKEN_REGEX =
  /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s)]+|\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g;

export function FormattedText({
  text,
  isUser,
}: {
  text: string;
  isUser: boolean;
}) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN_REGEX.exec(text)) !== null) {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3 w-3 shrink-0 opacity-70"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h4a.75.75 0 0 1 0 1.5h-4Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
              clipRule="evenodd"
            />
          </svg>
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
