"use client";

import { useMemo, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import { useProjectAdmin } from "@/hooks/admin/use-project-admin";
import { useEducationAdmin } from "@/hooks/admin/use-education-admin";
import { useSkillAdmin } from "@/hooks/admin/use-skill-admin";
import {
  useMessagesAdmin,
  type Message,
} from "@/hooks/admin/use-message-admin";
import { useDismiss } from "@/hooks/use-dismiss";
import { OverviewTabSkeleton } from "@/components/ui/skeleton";
import {
  Check,
  Code,
  ExternalLink,
  Filter,
  Folder,
  GraduationCap,
  Inbox,
  Search,
  X,
  type IconProps,
} from "@/components/icons";

interface Stat {
  label: string;
  value: number;
  href: string;
  icon: ComponentType<IconProps>;
  note?: string;
}

export function Overview() {
  const { data: projects = [], isPending: loadingProjects } = useProjectAdmin();
  const { data: education = [], isPending: loadingEducation } =
    useEducationAdmin();
  const { data: skills = [], isPending: loadingSkills } = useSkillAdmin();
  const { data: messages = [], isPending: loadingMessages } =
    useMessagesAdmin();

  if (loadingProjects || loadingEducation || loadingSkills || loadingMessages) {
    return <OverviewTabSkeleton />;
  }

  let unreadCount = 0;
  for (const message of messages) {
    if (!message.isRead) unreadCount++;
  }

  const stats: Stat[] = [
    {
      label: "Projects",
      value: projects.length,
      href: "/dashboard/projects",
      icon: Folder,
    },
    {
      label: "Skills",
      value: skills.length,
      href: "/dashboard/skills",
      icon: Code,
    },
    {
      label: "Education",
      value: education.length,
      href: "/dashboard/education",
      icon: GraduationCap,
    },
    {
      label: "Messages",
      value: messages.length,
      href: "/dashboard/messages",
      icon: Inbox,
      note: unreadCount > 0 ? `${unreadCount} unread` : "All read",
    },
  ];

  return (
    <div className="space-y-6">
      <OverviewStats stats={stats} />

      <div className="grid gap-6 lg:grid-cols-3">
        <RecentMessages messages={messages} />
      </div>
    </div>
  );
}

function OverviewStats({ stats }: { stats: Stat[] }) {
  return (
    <ul className="grid grid-cols-1 gap-px border border-border bg-border rounded-lg sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, href, icon: Icon, note }) => (
        <li key={label}>
          <Link
            href={href}
            className="flex h-full items-center gap-3 bg-background p-3 transition-colors duration-150 hover:bg-subtle rounded-lg cursor-pointer sm:gap-4 sm:p-5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-border text-text-secondary rounded-lg sm:h-12 sm:w-12">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                {value}
              </span>
              <span className="block text-xs font-mono uppercase tracking-wider text-text-secondary">
                {label}
              </span>
              {note && (
                <span className="mt-0.5 block text-[10px] font-mono text-text-secondary/70">
                  {note}
                </span>
              )}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function FilterMenu<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, () => setOpen(false), open);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-7 w-7 items-center justify-center border border-border bg-background text-text-secondary transition-colors duration-150 hover:border-text-primary hover:text-text-primary rounded-lg cursor-pointer"
      >
        <Filter className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-2 w-36 border border-border bg-background py-1 rounded-lg"
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="menuitemradio"
              aria-checked={value === option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs font-mono uppercase tracking-wider transition-colors duration-150 hover:bg-subtle rounded-lg cursor-pointer ${
                value === option
                  ? "text-text-primary font-bold"
                  : "text-text-secondary"
              }`}
            >
              {option}
              {value === option && (
                <Check className="h-3 w-3" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const MESSAGE_FILTERS = ["all", "unread", "read"] as const;
type MessageFilter = (typeof MESSAGE_FILTERS)[number];

function formatDate(isoString: string) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function RecentMessages({ messages }: { messages: Message[] }) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [filter, setFilter] = useState<MessageFilter>("all");

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return messages.filter((message) => {
      if (filter === "unread" && message.isRead) return false;
      if (filter === "read" && !message.isRead) return false;
      if (!needle) return true;
      return `${message.name} ${message.email} ${message.subject}`
        .toLowerCase()
        .includes(needle);
    });
  }, [messages, query, filter]);

  return (
    <section className="border border-border bg-background rounded-lg lg:col-span-3">
      <div className="flex items-center gap-2 border-b border-border p-3 sm:p-6">
        <h2 className="mr-auto text-sm font-bold tracking-tight text-text-primary uppercase font-mono">
          Recent Messages
        </h2>
        <button
          type="button"
          onClick={() => setSearchOpen((current) => !current)}
          aria-label={searchOpen ? "Close message search" : "Search messages"}
          aria-expanded={searchOpen}
          className="flex h-7 w-7 items-center justify-center border border-border bg-background text-text-secondary transition-colors duration-150 hover:border-text-primary hover:text-text-primary rounded-lg cursor-pointer"
        >
          {searchOpen ? (
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Search className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
        <FilterMenu
          label="Filter messages"
          value={filter}
          options={MESSAGE_FILTERS}
          onChange={setFilter}
        />
      </div>

      {searchOpen && (
        <div className="border-b border-border p-3">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, email or subject…"
            aria-label="Search messages"
            autoFocus
            className="h-9 w-full border border-border bg-background px-3 text-sm font-mono text-text-primary placeholder:text-text-secondary/60 focus:border-text-primary focus:outline-none rounded-lg"
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[280px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="px-3 py-3 text-xs font-mono font-normal uppercase tracking-wider text-text-secondary sm:px-6">
                Sender
              </th>
              <th className="hidden px-3 py-3 text-xs font-mono font-normal uppercase tracking-wider text-text-secondary sm:table-cell sm:px-6">
                Subject
              </th>
              <th className="px-3 py-3 text-xs font-mono font-normal uppercase tracking-wider text-text-secondary sm:px-6">
                Date
              </th>
              <th className="px-3 py-3 text-xs font-mono font-normal uppercase tracking-wider text-text-secondary sm:px-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-10 text-center text-xs font-mono text-text-secondary sm:px-6"
                >
                  No messages match this view.
                </td>
              </tr>
            ) : (
              rows.slice(0, 6).map((message) => (
                <tr
                  key={message.id}
                  className="transition-colors duration-150 hover:bg-subtle/50"
                >
                  <td className="px-3 py-3.5 sm:px-6">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center border border-border bg-text-primary font-mono text-[10px] font-bold text-background rounded-full sm:h-8 sm:w-8 sm:text-xs"
                        aria-hidden="true"
                      >
                        {message.name.charAt(0).toUpperCase() || "?"}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-bold text-text-primary">
                          {message.name}
                        </span>
                        <span className="block truncate text-[11px] font-mono text-text-secondary sm:hidden">
                          {message.subject}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="hidden max-w-48 px-3 py-3.5 sm:table-cell sm:px-6">
                    <span className="block truncate text-xs font-mono text-text-secondary">
                      {message.subject}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 font-mono text-[11px] text-text-secondary sm:px-6">
                    {formatDate(message.createdAt)}
                  </td>
                  <td className="px-3 py-3.5 sm:px-6">
                    <span
                      className={`inline-flex items-center border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider rounded-lg ${
                        message.isRead
                          ? "border-border text-text-secondary bg-subtle"
                          : "border-text-primary text-text-primary bg-background font-bold"
                      }`}
                    >
                      {message.isRead ? "Read" : "New"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-border px-3 py-3 sm:px-6">
        <Link
          href="/dashboard/messages"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-text-secondary transition-colors duration-150 hover:text-text-primary cursor-pointer"
        >
          <span>View all messages</span>
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
