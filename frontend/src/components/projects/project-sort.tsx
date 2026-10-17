"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function ProjectSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "latest";

  return (
    <div className="flex items-center justify-end">
      <form method="GET" className="flex items-center gap-2">
        <label
          htmlFor="sort-projects"
          className="text-xs font-mono uppercase tracking-wider text-text-secondary"
        >
          Sort by
        </label>
        <select
          id="sort-projects"
          name="sort"
          defaultValue={sort}
          onChange={(e) =>
            router.push(`?sort=${e.target.value}`, { scroll: false })
          }
          className="cursor-pointer border border-border bg-background px-3 py-1.5 text-xs font-mono text-text-primary transition-colors hover:border-text-primary rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
        <noscript>
          <button
            type="submit"
            className="px-3 py-1.5 bg-background text-text-primary text-xs font-mono border border-border hover:border-text-primary rounded-lg"
          >
            Apply
          </button>
        </noscript>
      </form>
    </div>
  );
}
