"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Code,
  Dashboard,
  Folder,
  GraduationCap,
  Mail,
  type IconProps,
} from "@/components/icons";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: ComponentType<IconProps>;
  exact?: boolean;
}

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { href: "/dashboard", label: "Overview", icon: Dashboard, exact: true },
  { href: "/dashboard/projects", label: "Projects", icon: Folder },
  { href: "/dashboard/education", label: "Education", icon: GraduationCap },
  { href: "/dashboard/skills", label: "Skills", icon: Code },
  { href: "/dashboard/messages", label: "Messages", icon: Mail },
];

export function isNavItemActive(
  pathname: string,
  item: Pick<DashboardNavItem, "href" | "exact">,
) {
  return item.exact ? pathname === item.href : pathname.startsWith(item.href);
}

const iconButton =
  "flex h-10 w-10 items-center justify-center text-text-secondary transition-colors duration-150 hover:text-text-primary rounded-full cursor-pointer";

const tooltip =
  "pointer-events-none absolute left-[calc(100%+0.75rem)] top-1/2 z-50 -translate-y-1/2 scale-0 whitespace-nowrap border border-border bg-background px-2.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-text-primary opacity-0 transition-all duration-150 ease-out motion-reduce:transition-none group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside
        aria-label="Dashboard navigation"
        className="fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-visible border-r border-border bg-background md:flex"
      >
        <div className="flex flex-1 flex-col items-center gap-1 py-4">
          {DASHBOARD_NAV.map(({ icon: Icon, ...item }) => {
            const isActive = isNavItemActive(pathname, item);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className={`group relative ${iconButton} ${
                  isActive
                    ? "bg-subtle text-text-primary"
                    : "hover:bg-subtle/50"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className={tooltip}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      <nav
        aria-label="Dashboard navigation"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-border bg-background px-2 py-2 md:hidden"
      >
        {DASHBOARD_NAV.map(({ icon: Icon, ...item }) => {
          const isActive = isNavItemActive(pathname, item);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              aria-label={item.label}
              className={`group relative ${iconButton} ${
                isActive ? "bg-subtle text-text-primary" : ""
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            </Link>
          );
        })}
      </nav>
    </>
  );
}
