"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function SkillCategoryFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "All";

  return (
    <div className="flex flex-wrap gap-2">
      <form method="GET" className="contents">
        {categories.map((cat) => {
          const isActive =
            cat === "All"
              ? !searchParams.get("category") || currentCategory === "All"
              : currentCategory === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                if (cat === "All") {
                  params.delete("category");
                } else {
                  params.set("category", cat);
                }
                const queryString = params.toString();
                router.push(queryString ? `?${queryString}` : "/skills", {
                  scroll: false,
                });
              }}
              className={cn(
                "rounded-full border px-4 py-1.5 font-mono text-xs font-semibold transition-colors cursor-pointer",
                isActive
                  ? "border-accent bg-accent text-on-accent"
                  : "border-border bg-transparent text-text-secondary hover:border-accent/50 hover:text-text-primary",
              )}
            >
              {cat}
            </button>
          );
        })}

        <noscript>
          <div className="mt-2 flex items-center gap-2">
            <select
              name="category"
              defaultValue={currentCategory}
              className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-text-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-text-primary hover:border-accent/50"
            >
              Filter
            </button>
          </div>
        </noscript>
      </form>
    </div>
  );
}
