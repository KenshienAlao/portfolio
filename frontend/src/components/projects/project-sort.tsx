"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "@/components/icons";

export function ProjectSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "latest";

  return (
    <div className="mt-8 flex items-center justify-end border-b border-border/50 pb-4">
      <form method="GET" className="flex items-center gap-2 font-mono text-xs">
        <label
          htmlFor="sort-projects"
          className="flex items-center gap-1 text-[11px] text-text-muted"
        >
          <Filter className="h-4 w-4 text-foreground" aria-hidden="true" />
        </label>
        <select
          id="sort-projects"
          name="sort"
          defaultValue={sort}
          onChange={(e) =>
            router.push(`?sort=${e.target.value}`, { scroll: false })
          }
          className="cursor-pointer rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-text-primary transition-colors hover:border-accent/50 focus:border-accent focus:outline-none"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
        <noscript>
          <button
            type="submit"
            className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-text-primary hover:border-accent/50"
          >
            Apply
          </button>
        </noscript>
      </form>
    </div>
  );
}
