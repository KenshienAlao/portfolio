import { Tab } from "@/types/dashboard";
import { Skill } from "@/service/skill.service";
import { Education } from "@/service/education.service";
import { Message } from "@/service/message.service";
import { SetupCategory } from "@/service/setup.service";
import { Project } from "@/service/project.service";
import {
  ArrowRight,
  Folder,
  GraduationCap,
  Mail,
  Search,
  Stack,
  type IconProps,
} from "@/components/icons";
import { type ComponentType } from "react";

interface props {
  setActiveTab: (tab: Tab) => void;
  projects: Project[];
  skills: Skill[];
  setupCategories: SetupCategory[];
  education: Education[];
  messages: Message[];
  unreadMessagesCount: number;
}

export function Manage({
  projects,
  skills,
  setupCategories,
  education,
  messages,
  unreadMessagesCount,
  setActiveTab,
}: props) {
  let totalSetupItems = 0;
  for (const cat of setupCategories) {
    totalSetupItems += cat.items?.length ?? 0;
  }
  interface statsProps {
    label: string;
    value: number;
    Icon: ComponentType<IconProps>;
    tab: Tab;
    color: string;
    subtitle?: string;
  }

  const stats: statsProps[] = [
    {
      label: "Projects",
      value: projects.length,
      Icon: Stack,
      tab: "projects" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      label: "Skills",
      value: skills.length,
      Icon: Search,
      tab: "skills" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      label: "Setup Tools",
      value: totalSetupItems,
      subtitle: `${setupCategories.length} categories`,
      Icon: Folder,
      tab: "setup" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      label: "Education",
      value: education.length,
      Icon: GraduationCap,
      tab: "education" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      label: "Messages",
      value: messages.length,
      subtitle:
        unreadMessagesCount > 0 ? `${unreadMessagesCount} unread` : "All read",
      Icon: Mail,
      tab: "messages" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <button
          type="button"
          key={stat.label}
          onClick={() => setActiveTab(stat.tab)}
          className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 text-left transition-all hover:border-accent/40 hover:bg-surface/80"
        >
          <div className="flex items-start justify-between">
            <span className="text-2xl font-extrabold text-text-primary">
              {stat.value}
            </span>
            <div
              className={`rounded-xl border p-2.5 transition-transform group-hover:scale-110 ${stat.color}`}
            >
              <stat.Icon className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              {stat.label}
            </p>
            {stat.subtitle && (
              <p className="text-[10px] text-text-secondary/70">
                {stat.subtitle}
              </p>
            )}
            <span className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
              Manage
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
