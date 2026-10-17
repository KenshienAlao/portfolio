"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "@/components/icons";
import { Item, ItemContent, ItemTitle, ItemMedia } from "@/components/ui/item";

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
] as const;

export function ProjectSortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "latest";
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Latest";

  useEffect(() => {
    if (!expanded) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setExpanded(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [expanded]);

  const handleSelect = (value: string) => {
    router.push(`?sort=${value}`, { scroll: false });
    setExpanded(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-haspopup="menu"
        className="flex items-center gap-2 border border-border bg-background px-3 py-1.5 font-mono text-xs text-text-primary transition-colors hover:border-text-primary rounded-lg cursor-pointer"
      >
        <span>Sort: {currentLabel}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute right-0 top-full z-50 mt-2 w-56 origin-top transition-all duration-300 ${
          expanded
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 224 120"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect
            x="0.75"
            y="0.75"
            width="222.5"
            height="118.5"
            rx="0"
            ry="0"
            fill="var(--background)"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray={expanded ? "682 682" : "0 682"}
            strokeDashoffset="0"
            style={{
              transition:
                "stroke-dasharray 400ms cubic-bezier(0.4, 0.0, 0.2, 1)",
            }}
          />
        </svg>

        <div className="relative z-10 p-1.5">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={sort === option.value}
              onClick={() => handleSelect(option.value)}
              className="w-full rounded-lg text-left cursor-pointer"
            >
              <Item
                size="sm"
                variant={sort === option.value ? "muted" : "default"}
                className="hover:bg-subtle/50"
              >
                <ItemContent>
                  <ItemTitle
                    className={
                      sort === option.value
                        ? "text-text-primary"
                        : "text-text-secondary"
                    }
                  >
                    {option.label}
                  </ItemTitle>
                </ItemContent>
                {sort === option.value && (
                  <ItemMedia variant="icon" className="ml-auto">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </ItemMedia>
                )}
              </Item>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
