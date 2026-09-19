import { Tab } from "@/types/dashboard";
import { Skill } from "@/service/skill.service";
import { Education } from "@/service/education.service";
import { Message } from "@/service/message.service";
import { SetupCategory } from "@/service/setup.service";
import { Project } from "@/service/project.service";

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
    path: string;
    viewbox: string;
    tab: Tab;
    color: string;
    subtitle?: string;
  }

  const stats: statsProps[] = [
    {
      label: "Projects",
      value: projects.length,
      path: "M480-400 40-640l440-240 440 240-440 240Zm0 160L63-467l84-46 333 182 333-182 84 46-417 227Zm0 160L63-307l84-46 333 182 333-182 84 46L480-80Zm0-411 273-149-273-149-273 149 273 149Zm0-149Z",
      viewbox: "0 -960 960 960",
      tab: "projects" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      label: "Skills",
      value: skills.length,
      path: "M686-132 444-376q-20 8-40.5 12t-43.5 4q-100 0-170-70t-70-170q0-36 10-68.5t28-61.5l146 146 72-72-146-146q29-18 61.5-28t68.5-10q100 0 170 70t70 170q0 23-4 43.5T584-516l244 242q12 12 12 29t-12 29l-84 84q-12 12-29 12t-29-12Zm29-85 27-27-256-256q18-20 26-46.5t8-53.5q0-60-38.5-104.5T386-758l74 74q12 12 12 28t-12 28L332-500q-12 12-28 12t-28-12l-74-74q9 57 53.5 95.5T360-440q26 0 52-8t47-25l256 256ZM472-488Z",
      viewbox: "0 -960 960 960",
      tab: "skills" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      label: "Setup Tools",
      value: totalSetupItems,
      subtitle: `${setupCategories.length} categories`,
      path: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180 0v-80h240v80H480Z",
      viewbox: "0 -960 960 960",
      tab: "setup" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      label: "Education",
      value: education.length,
      path: "M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z",
      viewbox: "0 -960 960 960",
      tab: "education" as Tab,
      color: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    },
    {
      label: "Messages",
      value: messages.length,
      subtitle:
        unreadMessagesCount > 0 ? `${unreadMessagesCount} unread` : "All read",
      path: "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm349-142q31-22 43-58h168v-360H200v360h168q12 36 43 58t69 22q38 0 69-22ZM200-200h560-560Z",
      viewbox: "0 -960 960 960",
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={stat.viewbox}
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d={stat.path} />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
              </svg>
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
