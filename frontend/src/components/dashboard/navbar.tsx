import { ThemeTogglerButton } from "../theme-toggle";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Dashboard,
  Folder,
  GraduationCap,
  Mail,
  Menu,
  Search,
  Stack,
  type IconProps,
} from "@/components/icons";
import { Tab } from "@/types/dashboard";
import { type ComponentType } from "react";

interface props {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}
interface NavProps {
  id: Tab;
  label: string;
  Icon: ComponentType<IconProps>;
}

const NAV_ITEMS: NavProps[] = [
  { id: "overview", label: "Overview", Icon: Dashboard },
  { id: "projects", label: "Projects", Icon: Stack },
  { id: "education", label: "Education", Icon: GraduationCap },
  { id: "skills", label: "Skills", Icon: Search },
  { id: "setup", label: "Setup", Icon: Folder },
  { id: "messages", label: "Messages", Icon: Mail },
];

export function Navbar({ activeTab, setActiveTab }: props) {
  return (
    <>
      <aside className="group/sidebar hidden md:flex w-64 border-r border-border bg-surface/50 backdrop-blur-xl flex-col p-4 sticky top-0 h-screen z-10 transition-[width] duration-300 ease-in-out has-[#sidebar-collapse:checked]:w-20">
        <input
          type="checkbox"
          id="sidebar-collapse"
          className="sr-only"
          aria-label="Toggle sidebar width"
        />

        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-2 font-mono text-base font-bold tracking-tight text-text-primary w-auto opacity-100 overflow-hidden whitespace-nowrap transition-[opacity,width] duration-200 group-has-[#sidebar-collapse:checked]/sidebar:w-0 group-has-[#sidebar-collapse:checked]/sidebar:opacity-0">
            <span className="text-accent">$</span>
            <span>admin</span>
            <span className="text-accent">_</span>
          </div>

          <label
            htmlFor="sidebar-collapse"
            aria-label="Toggle sidebar"
            className="inline-flex cursor-pointer p-1.5 rounded-lg border border-border/40 bg-surface/30 text-text-secondary hover:bg-surface hover:text-text-primary transition-colors group-has-[#sidebar-collapse:focus-visible]/sidebar:ring-2 group-has-[#sidebar-collapse:focus-visible]/sidebar:ring-ring"
          >
            <ChevronLeft
              className="transition-opacity duration-300 ease-in-out size-4 group-has-[#sidebar-collapse:checked]/sidebar:hidden"
              aria-hidden="true"
            />
            <ChevronRight
              className="hidden transition-opacity duration-300 ease-in-out size-4 group-has-[#sidebar-collapse:checked]/sidebar:block"
              aria-hidden="true"
            />
          </label>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center justify-start px-3 rounded-lg py-2.5 text-sm font-medium transition-all group-has-[#sidebar-collapse:checked]/sidebar:justify-center group-has-[#sidebar-collapse:checked]/sidebar:px-0 ${
                  isActive
                    ? "bg-accent text-on-accent shadow-soft"
                    : "text-text-secondary hover:bg-surface hover:text-text-primary border border-transparent hover:border-border/30"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="origin-left w-auto opacity-100 overflow-hidden whitespace-nowrap transition-[opacity,width] duration-200 group-has-[#sidebar-collapse:checked]/sidebar:w-0 group-has-[#sidebar-collapse:checked]/sidebar:opacity-0">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
          <div className="group-has-[#sidebar-collapse:checked]/sidebar:mx-auto">
            <ThemeTogglerButton />
          </div>
        </div>
      </aside>

      <div className="group/mobilenav contents">
        <input
          type="checkbox"
          id="mobile-nav-toggle"
          className="sr-only"
          aria-label="Toggle mobile navigation visibility"
        />

        <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-surface/95 backdrop-blur-2xl py-2 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex justify-around items-center z-50 shadow-lg translate-y-0 transition-transform duration-300 ease-in-out group-has-[#mobile-nav-toggle:checked]/mobilenav:translate-y-full">
          <label
            htmlFor="mobile-nav-toggle"
            aria-label="Hide navigation"
            className="absolute top-0 right-4 cursor-pointer border-t border-x border-border bg-surface/95 backdrop-blur-2xl px-3 py-1 rounded-t-lg text-text-secondary hover:text-text-primary flex items-center justify-center gap-1 font-mono text-[10px] opacity-100 -translate-y-full pointer-events-auto transition-all duration-300 group-has-[#mobile-nav-toggle:checked]/mobilenav:opacity-0 group-has-[#mobile-nav-toggle:checked]/mobilenav:translate-y-0 group-has-[#mobile-nav-toggle:checked]/mobilenav:pointer-events-none"
          >
            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
          </label>

          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg p-2 py-2.5 text-[10px] relative transition-colors ${
                  isActive ? "text-accent font-semibold" : "text-text-secondary"
                }`}
              >
                <item.Icon
                  className="h-5 w-5 shrink-0 mb-0.5"
                  aria-hidden="true"
                />
                <span className="w-full max-w-full truncate font-mono text-center">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <label
          htmlFor="mobile-nav-toggle"
          aria-label="Show navigation"
          className="md:hidden fixed bottom-4 right-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border bg-surface/90 text-accent shadow-lg backdrop-blur-md translate-y-20 opacity-0 scale-75 pointer-events-none transition-all duration-300 group-has-[#mobile-nav-toggle:checked]/mobilenav:translate-y-0 group-has-[#mobile-nav-toggle:checked]/mobilenav:opacity-100 group-has-[#mobile-nav-toggle:checked]/mobilenav:scale-100 group-has-[#mobile-nav-toggle:checked]/mobilenav:pointer-events-auto"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </label>
      </div>
    </>
  );
}
