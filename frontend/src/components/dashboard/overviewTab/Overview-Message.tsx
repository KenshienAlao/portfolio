import { Message } from "@/hooks/admin/use-message-admin";
import { Tab } from "@/types/dashboard";
import {
  ArrowRight,
  CheckCircle,
  Circle,
  Mail,
} from "@/components/icons";

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
            <Mail className="h-5 w-5 text-accent" aria-hidden="true" />
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
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-text-secondary">
            <Mail className="h-8 w-8 text-text-secondary/40" aria-hidden="true" />
            <p className="mt-2 text-sm">No messages received yet</p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {messages.slice(0, 4).map((msg) => (
              <button
                type="button"
                key={msg.id}
                onClick={() => setActiveTab("messages")}
                className="flex cursor-pointer flex-col items-stretch gap-1.5 rounded-xl border border-border bg-background p-4 text-left transition-colors hover:border-accent/40"
              >
                <div className="flex min-w-0 items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    {msg.isRead ? (
                      <Circle
                        className="h-4 w-4 shrink-0 text-text-secondary/40"
                        aria-hidden="true"
                      />
                    ) : (
                      <CheckCircle
                        className="h-4 w-4 shrink-0 fill-accent text-accent"
                        aria-hidden="true"
                      />
                    )}
                    <span className="text-xs font-bold text-text-primary">
                      {msg.name}
                    </span>
                    <span className="min-w-0 truncate text-[11px] text-text-secondary/60">
                      &lt;{msg.email}&gt;
                    </span>
                  </div>
                  <span className="shrink-0 text-[10px] text-text-secondary">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>

                <p className="truncate text-xs font-medium text-accent">
                  {msg.subject}
                </p>
                <p className="line-clamp-2 text-[11px] leading-relaxed text-text-secondary">
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
