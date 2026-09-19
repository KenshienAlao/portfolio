import { ThemeTogglerButton } from "../theme-toggle";
import { Tab } from "@/types/dashboard";

interface props {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}
interface NavProps {
  id: Tab;
  label: string;
  path: string;
  viewbox: string;
}

const NAV_ITEMS: NavProps[] = [
  {
    id: "overview",
    label: "Overview",
    path: "M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z",
    viewbox: "0 -960 960 960",
  },
  {
    id: "projects",
    label: "Projects",
    path: "M480-400 40-640l440-240 440 240-440 240Zm0 160L63-467l84-46 333 182 333-182 84 46-417 227Zm0 160L63-307l84-46 333 182 333-182 84 46L480-80Zm0-411 273-149-273-149-273 149 273 149Zm0-149Z",
    viewbox: "0 -960 960 960",
  },
  {
    id: "education",
    label: "Education",
    path: "M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z",
    viewbox: "0 -960 960 960",
  },
  {
    id: "skills",
    label: "Skills",
    path: "M686-132 444-376q-20 8-40.5 12t-43.5 4q-100 0-170-70t-70-170q0-36 10-68.5t28-61.5l146 146 72-72-146-146q29-18 61.5-28t68.5-10q100 0 170 70t70 170q0 23-4 43.5T584-516l244 242q12 12 12 29t-12 29l-84 84q-12 12-29 12t-29-12Zm29-85 27-27-256-256q18-20 26-46.5t8-53.5q0-60-38.5-104.5T386-758l74 74q12 12 12 28t-12 28L332-500q-12 12-28 12t-28-12l-74-74q9 57 53.5 95.5T360-440q26 0 52-8t47-25l256 256ZM472-488Z",
    viewbox: "0 -960 960 960",
  },
  {
    id: "setup",
    label: "Setup",
    path: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180 0v-80h240v80H480Z",
    viewbox: "0 -960 960 960",
  },
  {
    id: "messages",
    label: "Messages",
    path: "M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-120H640q-30 38-71.5 59T480-240q-47 0-88.5-21T320-320H200v120Zm349-142q31-22 43-58h168v-360H200v360h168q12 36 43 58t69 22q38 0 69-22ZM200-200h560-560Z",
    viewbox: "0 -960 960 960",
  },
] as const;

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
              className="transition-transform duration-300 ease-in-out group-has-[#sidebar-collapse:checked]/sidebar:rotate-180"
            >
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
            </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={item.viewbox}
                    fill="currentColor"
                    className="h-4 w-4 shrink-0"
                  >
                    <path d={item.path} />
                  </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              fill="currentColor"
              className="h-3.5 w-3.5 -rotate-90"
            >
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
            </svg>
          </label>

          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg text-[10px] relative transition-colors ${
                  isActive ? "text-accent font-semibold" : "text-text-secondary"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={item.viewbox}
                  fill="currentColor"
                  className="h-5 w-5 mb-0.5"
                >
                  <path d={item.path} />
                </svg>
                <span className="scale-90 font-mono">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <label
          htmlFor="mobile-nav-toggle"
          aria-label="Show navigation"
          className="md:hidden fixed bottom-4 right-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-border bg-surface/90 text-accent shadow-lg backdrop-blur-md translate-y-20 opacity-0 scale-75 pointer-events-none transition-all duration-300 group-has-[#mobile-nav-toggle:checked]/mobilenav:translate-y-0 group-has-[#mobile-nav-toggle:checked]/mobilenav:opacity-100 group-has-[#mobile-nav-toggle:checked]/mobilenav:scale-100 group-has-[#mobile-nav-toggle:checked]/mobilenav:pointer-events-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </label>
      </div>
    </>
  );
}
