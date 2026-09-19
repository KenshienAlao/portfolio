import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export function Header({
  unreadMessagesCount,
}: {
  unreadMessagesCount: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-xs text-text-secondary">
        {unreadMessagesCount > 0 ? (
          <>
            You have{" "}
            <span className="font-bold text-accent">
              {unreadMessagesCount} unread message
              {unreadMessagesCount !== 1 ? "s" : ""}
            </span>
            .
          </>
        ) : (
          "All caught up — no unread messages."
        )}
      </p>
      <Link
        href="/?clear=session"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
      >
        View Public Portfolio
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
        </svg>
      </Link>
    </div>
  );
  1;
}
