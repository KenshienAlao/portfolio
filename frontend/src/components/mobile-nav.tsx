"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/config/navigation.config";
import { cn } from "@/lib/utils";
import { X, Menu, ChevronRight } from "@/components/icons";

const emptySubscribe = () => () => {};

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const drawer =
    mounted &&
    createPortal(
      <div
        className={cn(
          "fixed inset-0 z-50 transition-[visibility] duration-300 ease-out",
          isOpen ? "visible" : "invisible",
        )}
        aria-hidden={!isOpen}
      >
        <div
          className={cn(
            "fixed inset-0 bg-black/60 transition-[opacity,backdrop-filter] duration-300 ease-out",
            isOpen
              ? "opacity-100 backdrop-blur-sm"
              : "pointer-events-none opacity-0 backdrop-blur-none",
          )}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={cn(
            "fixed inset-y-2 right-2 flex w-[85%] max-w-xs flex-col overflow-hidden rounded-3xl border border-border/15 bg-background/95 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div
            className="h-px w-full shrink-0 bg-linear-to-r from-transparent via-accent/60 to-transparent"
            aria-hidden="true"
          />

          <div className="flex shrink-0 items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-text-primary">
              <span className="text-accent">$</span>
              <span>menu</span>
              <span className="animate-pulse text-accent">_</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface/60 text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="no-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-3">
            {NAV_ITEMS.map(({ label, href }, index) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl py-3.5 pl-4 pr-3 text-sm font-semibold transition-[opacity,transform,background-color,color] duration-300 ease-out",
                    isOpen
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0",
                    active
                      ? "bg-accent/10 text-accent"
                      : "text-text-secondary hover:bg-surface/80 hover:text-text-primary",
                  )}
                  style={{
                    transitionDelay: isOpen ? `${80 + index * 40}ms` : "0ms",
                  }}
                  aria-current={active ? "page" : undefined}
                >
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-accent transition-[opacity,transform] duration-300 ease-out",
                      active
                        ? "scale-y-100 opacity-100"
                        : "scale-y-0 opacity-0",
                    )}
                  />
                  <span className="flex-1">{label}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-300 ease-out",
                      active
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60",
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-xl border border-border/10 text-text-secondary",
          isOpen
            ? "bg-accent/10 text-accent"
            : "bg-surface/60 hover:bg-surface hover:text-text-primary",
        )}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className="relative block h-4 w-4">
          <Menu
            className={cn(
              "absolute inset-0 h-4 w-4 transition-all duration-300 ease-out",
              isOpen
                ? "rotate-90 scale-50 opacity-0"
                : "rotate-0 scale-100 opacity-100",
            )}
            aria-hidden="true"
          />
          <X
            className={cn(
              "absolute inset-0 h-4 w-4 transition-all duration-300 ease-out",
              isOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-50 opacity-0",
            )}
            aria-hidden="true"
          />
        </span>
      </button>

      {drawer}
    </div>
  );
}
