import { Message } from "@/hooks/admin/use-message-admin";
import { Tab } from "@/types/dashboard";

function formatDate(isoString: string) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface props {
  unreadMessagesCount: number;
  setActiveTab: (tab: Tab) => void;
  messages: Message[];
}

export function Messages({
  unreadMessagesCount,
  setActiveTab,
  messages,
}: props) {
  return (
    <div className="lg:col-span-2">
      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="currentColor"
              className="h-5 w-5 text-accent"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm349-142q31-22 43-58h168v-360H200v360h168q12 36 43 58t69 22q38 0 69-22ZM200-200h560-560Z" />
            </svg>
            <h3 className="text-sm font-bold text-text-primary">
              Recent Messages
            </h3>
            {unreadMessagesCount > 0 && (
              <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent">
                {unreadMessagesCount} new
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("messages")}
            className="inline-flex items-center gap-1 text-xs text-text-secondary transition-colors hover:text-accent"
          >
            View all{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
            </svg>
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="currentColor"
              className="h-8 w-8 text-text-secondary/40"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm349-142q31-22 43-58h168v-360H200v360h168q12 36 43 58t69 22q38 0 69-22ZM200-200h560-560Z" />
            </svg>
            <p className="mt-2 text-sm">No messages received yet</p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {messages.slice(0, 4).map((msg) => (
              <button
                type="button"
                key={msg.id}
                onClick={() => setActiveTab("messages")}
                className="flex items-start gap-2 cursor-pointer rounded-xl border border-border bg-background p-4 transition-colors hover:border-accent/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {msg.isRead ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                        className="h-4 w-4 text-text-secondary/40 shrink-0"
                      >
                        <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="currentColor"
                        className="h-4 w-4 fill-accent text-accent shrink-0"
                      >
                        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                      </svg>
                    )}
                    <span className="text-xs font-bold text-text-primary">
                      {msg.name}
                    </span>
                    <span className="text-[11px] text-text-secondary/60">
                      &lt;{msg.email}&gt;
                    </span>
                  </div>
                  <span className="text-[10px] text-text-secondary shrink-0">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>

                <p className="mt-1.5 text-xs font-medium text-accent truncate">
                  {msg.subject}
                </p>
                <p className="mt-1 text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                  {msg.message}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
