import { SectionHeader } from "@/components/section-header";
import { SkillCardSkeleton } from "@/components/ui/skeleton";

export default function SkillsLoading() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <SectionHeader
          path="~/skills"
          command="npm ls --global"
          title="Skills"
          description="Tools and technologies I work with across the stack."
        />

        <div className="mt-12 space-y-10">
          <div
            className="flex flex-wrap gap-2 animate-pulse"
            aria-hidden="true"
          >
            <div className="h-7 w-14 rounded-full bg-muted-foreground/15" />
            <div className="h-7 w-20 rounded-full bg-muted-foreground/15" />
            <div className="h-7 w-24 rounded-full bg-muted-foreground/15" />
            <div className="h-7 w-16 rounded-full bg-muted-foreground/15" />
            <div className="h-7 w-20 rounded-full bg-muted-foreground/15" />
          </div>

          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="status"
            aria-busy="true"
            aria-label="Loading skills"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <SkillCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
