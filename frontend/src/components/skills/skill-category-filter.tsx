"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function SkillCategoryFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "All";

  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2">
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
              aria-pressed={isActive}
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
              className={`cursor-pointer border-b-2 pb-1 text-sm transition-colors duration-150 ${
                isActive
                  ? "border-accent text-text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary"
              }`}
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
              className="border border-border bg-background px-3 py-1.5 text-sm text-text-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="inline-flex items-center justify-center border border-border bg-background px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:border-text-primary rounded-lg"
            >
              Filter
            </button>
          </div>
        </noscript>
      </form>
    </div>
  );
}
