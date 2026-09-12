import { SectionHeader } from "@/components/section-header";
import { SkillCategoryFilter } from "@/components/skills/skill-category-filter";
import { type Skill } from "@/service/skill.service";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Skills({
  skills,
  selectedCategory = "All",
}: {
  skills?: Skill[] | null;
  selectedCategory?: string;
}) {
  const groupedSkills = (() => {
    if (!Array.isArray(skills)) return {};
    return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
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
    <section
      id="skills"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        <SectionHeader
          path="~/skills"
          command="npm ls --global"
          title="Skills"
          description="Tools and technologies I work with across the stack."
        />

        <div className="mt-12 space-y-10">
          {categories.length > 1 && (
            <SkillCategoryFilter categories={categories} />
          )}

          {Object.keys(visibleSkills).length === 0 ? (
            <div className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 py-12 text-center">
              <h3 className="font-mono text-base font-bold text-text-primary">
                No skills found
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                No tools or technologies found under this category.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(visibleSkills).map(([category, items]) => (
                <div
                  key={category}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 hover:border-accent/40"
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill: Skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-text-primary"
                      >
                        {skill.imageLight && (
                          <Image
                            src={skill.imageLight}
                            alt={skill.name}
                            width={16}
                            height={16}
                            loading="lazy"
                            decoding="async"
                            className={cn(
                              "h-4 w-4 shrink-0 object-contain",
                              skill.imageDark ? "dark:hidden" : "",
                            )}
                          />
                        )}
                        {skill.imageDark && (
                          <Image
                            src={skill.imageDark}
                            alt={skill.name}
                            width={16}
                            height={16}
                            loading="lazy"
                            decoding="async"
                            className="hidden h-4 w-4 shrink-0 object-contain dark:block"
                          />
                        )}
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
