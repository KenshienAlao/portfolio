"use client";

import { useState } from "react";

import {
  useDeleteMessageById,
  useMessagesAdmin,
  useToggleMessageRead,
} from "@/hooks/admin/use-message-admin";
import {
  CheckCircle,
  Circle,
  Inbox,
  Trash,
  AlertCircle,
  Loader,
} from "@/components/icons";

function formatDate(isoString: string) {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

export function MessagesTab() {
  const {
    data: messages,
    isPending: loadingMessages,
    error: messagesError,
    refetch: refetchMessages,
  } = useMessagesAdmin();

  const {
    mutate: deleteMessage,
    isPending: isDeleting,
    variables: deletingId,
  } = useDeleteMessageById();

  const { mutate: toggleRead } = useToggleMessageRead();

  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const hasMessages = (messages?.length ?? 0) > 0;
  let unreadCount = 0;
  if (messages) {
    for (const m of messages) {
      if (!m.isRead) unreadCount++;
    }
  }
  return (
    <div className="space-y-6">
      <h2 className="flex flex-wrap items-center gap-2 text-lg font-bold text-text-primary">
        Inbox
        {hasMessages && (
          <span className="font-mono text-xs font-normal text-text-secondary">
            ({messages?.length} total
            {unreadCount > 0 ? `, ${unreadCount} unread` : ""})
          </span>
        )}
      </h2>

      {messagesError ? (
        <div className="flex flex-col items-center justify-center gap-3 border border-destructive px-6 py-16 text-center">
          <AlertCircle
            className="h-6 w-6 text-destructive"
            aria-hidden="true"
          />
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-text-primary">
              Couldn&apos;t load messages
            </h3>
            <p className="max-w-xs text-xs text-text-secondary">
              {messagesError.message ||
                "Something went wrong. Please try again."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => refetchMessages()}
            className="mt-2 border border-border px-4 py-2 text-xs font-medium text-text-primary transition-colors hover:border-text-primary"
          >
            Retry
          </button>
        </div>
      ) : loadingMessages ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse border border-border bg-background"
            />
          ))}
        </div>
      ) : !hasMessages ? (
        <div className="border border-dashed border-border bg-background p-12 text-center">
          <Inbox
            className="mx-auto mb-3 h-8 w-8 text-text-secondary"
            aria-hidden="true"
          />
          <h3 className="mb-1 text-sm font-bold text-text-primary">
            Your inbox is empty
          </h3>
          <p className="text-xs text-text-secondary">
            Messages sent through your contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages?.map((msg) => {
            const isDeletingThis = isDeleting && deletingId === msg.id;
            const isConfirmingDelete = confirmDeleteId === msg.id;

            return (
              <div
                key={msg.id}
                className={`space-y-3 border p-5 transition-colors ${
                  !msg.isRead ? "border-accent" : "border-border"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border pb-3">
                  <div className="flex items-start gap-2.5">
                    <button
                      type="button"
                      onClick={() => toggleRead(msg.id)}
                      title={msg.isRead ? "Mark as unread" : "Mark as read"}
                      className="mt-0.5 text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {msg.isRead ? (
                        <CheckCircle className="h-4 w-4 text-text-secondary" />
                      ) : (
                        <Circle className="h-4 w-4 text-accent" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-text-primary">
                          {msg.name}
                        </h4>
                        {!msg.isRead && (
                          <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-accent">
                            New
                          </span>
                        )}
                      </div>
                      <a
                        href={`mailto:${msg.email}`}
                        className="block text-xs text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {msg.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-text-secondary">
                      {formatDate(msg.createdAt)}
                    </span>

                    {isConfirmingDelete ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            deleteMessage(msg.id);
                            setConfirmDeleteId(null);
                          }}
                          className="bg-destructive px-2 py-1 font-mono text-[10px] font-medium text-background transition-opacity hover:opacity-90"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="border border-border px-2 py-1 font-mono text-[10px] text-text-secondary transition-colors hover:text-text-primary"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(msg.id)}
                        disabled={isDeletingThis}
                        className="p-1.5 text-text-secondary transition-colors hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Delete message"
                      >
                        {isDeletingThis ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="block text-xs font-semibold text-text-primary">
                    Subject: {msg.subject}
                  </span>
                  <p className="text-xs leading-relaxed whitespace-pre-wrap text-text-secondary">
                    {msg.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
