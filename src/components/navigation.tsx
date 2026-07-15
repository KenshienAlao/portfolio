import { NAV_PAGES } from "@/config/navigation.config";
import { cn } from "@/lib/utils";
import { Code2, Menu, X } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import { ThemeTogglerButton } from "./theme-toggle";

type NavProps = {
  currentPath: string;
  setCurrentPage: (page: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  theme: string | undefined;
  setTheme: (theme: string) => void;
};

const navKeys = Object.keys(NAV_PAGES.LINKS) as Array<
  keyof typeof NAV_PAGES.LINKS
>;

export function Navigation({
  currentPath,
  setCurrentPage,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavProps) {
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const go = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm transition-all duration-300">
      <div className="container flex items-center justify-between py-4 mx-auto px-4 max-w-6xl">
        <Link
          href="/"
          onClick={() => {
            go(NAV_PAGES.LINKS.HOME);
          }}
          className="group flex items-center gap-2.5"
        >
          <div className="flex items-center justify-center rounded-xl bg-accent/10 p-2 text-accent transition-transform duration-300 hover:scale-105 hover:rotate-12 active:scale-95 group-hover:bg-accent/20">
            <Code2 className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-text-primary">
            Ken
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex rounded-full border border-border/40 bg-surface/30 p-1.5 shadow-xs">
          {navKeys.map((key) => {
            const page = NAV_PAGES.LINKS[key];
            const Icon = NAV_PAGES.ICONS[key];
            const active = currentPath === page.toLowerCase();
            return (
              <Link
                key={page}
                href={`#${page.toLowerCase()}`}
                onClick={() => {
                  go(page);
                }}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
                  active
                    ? "text-accent bg-accent/10"
                    : "text-text-secondary hover:text-text-primary",
                )}
                aria-current={active ? "page" : undefined}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {Icon && <Icon className="h-4 w-4" />}
                  {page}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <ThemeTogglerButton />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-surface/30 text-text-secondary transition-all duration-300 hover:bg-surface hover:text-text-primary shadow-xs active:scale-95 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-full border-t border-border/40 bg-background/95 px-6 py-6 shadow-xl md:hidden animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="flex flex-col gap-2">
            {navKeys.map((key) => {
              const page = NAV_PAGES.LINKS[key];
              const Icon = NAV_PAGES.ICONS[key];
              const active = currentPath === page.toLowerCase();
              return (
                <a
                  key={page}
                  href={`#${page.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(page);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-semibold transition-all duration-200",
                    active
                      ? "bg-accent/10 text-accent"
                      : "text-text-secondary hover:bg-surface/60 hover:text-text-primary",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  <span>{page}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
