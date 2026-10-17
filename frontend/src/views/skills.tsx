"use client";

import { SectionHeader } from "@/components/section-header";
import { SkillCategoryFilter } from "@/components/skills/skill-category-filter";
import { useSkills } from "@/hooks/use-public-data";
import { type Skill } from "@/service/skill.service";

export function Skills({
  selectedCategory = "All",
}: {
  selectedCategory?: string;
}) {
  const { data: skills, isLoading } = useSkills();
  const skillList = Array.isArray(skills) ? skills : [];

  const groupedSkills = (() => {
    if (skillList.length === 0) return {};
    return skillList.reduce<Record<string, Skill[]>>((acc, skill) => {
      const cat = skill.category || "Uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {});
  })();

  const categories = ["All", ...Object.keys(groupedSkills)];

  const activeCategory =
    selectedCategory && categories.includes(selectedCategory)
      ? selectedCategory
      : "All";

  const visibleSkills: Record<string, Skill[]> =
    activeCategory === "All"
      ? groupedSkills
      : { [activeCategory]: groupedSkills[activeCategory] ?? [] };

  return (
    <section className="container max-w-5xl mx-auto py-24 px-4 sm:px-6">
      <SectionHeader
        title="Skills"
        description="Tools, languages, and technologies I work with across the stack."
      />

      <div className="mt-12">
        {isLoading ? (
          <div
            className="space-y-8 skeleton-scope"
            role="status"
            aria-busy="true"
            aria-label="Loading skills"
          >
            <div className="h-9 w-64 skeleton" />
            <div className="border-t border-border pt-8 space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-4"
                >
                  <div className="h-4 w-32 skeleton" />
                  <div className="h-4 w-64 skeleton" />
                </div>
              ))}
            </div>
          </div>
        ) : categories.length > 1 ? (
          <>
            <SkillCategoryFilter categories={categories} />

            {Object.keys(visibleSkills).length === 0 ? (
              <div className="mt-12 border-t border-border pt-8">
                <p className="text-sm font-mono text-text-primary">
                  No skills in this category.
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  Try another category or select &quot;All&quot;.
                </p>
              </div>
            ) : (
              <div className="mt-12 border-t border-border">
                {Object.entries(visibleSkills).map(([category, items]) => (
                  <div
                    key={category}
                    className="border-b border-border py-8 grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-4 sm:gap-6 items-baseline"
                  >
                    <h3 className="text-xs font-mono uppercase tracking-wider text-text-secondary font-medium">
                      {category}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      {items.map((skill: Skill, idx: number) => (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-4 text-sm font-mono text-text-primary"
                        >
                          <span className="hover:text-accent transition-colors">
                            {skill.name}
                          </span>
                          {idx < items.length - 1 && (
                            <span
                              className="text-border select-none"
                              aria-hidden="true"
                            >
                              /
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
    </section>
  );
}
