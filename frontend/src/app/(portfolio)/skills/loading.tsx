import { SectionHeader } from "@/components/section-header";

export default function SkillsLoading() {
  return (
    <section className="container max-w-5xl mx-auto py-24 px-4 sm:px-6">
      <SectionHeader
        title="Skills"
        description="Tools, languages, and technologies I work with across the stack."
      />

      <div className="mt-12 space-y-8 skeleton-scope">
        <div className="flex flex-wrap gap-2">
          <div className="h-8 w-16 skeleton" />
          <div className="h-8 w-24 skeleton" />
          <div className="h-8 w-20 skeleton" />
          <div className="h-8 w-28 skeleton" />
        </div>

        <div
          className="border-t border-border"
          role="status"
          aria-busy="true"
          aria-label="Loading skills"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="border-b border-border py-8 grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-4 sm:gap-6 items-baseline"
            >
              <div className="h-3 w-28 skeleton" />
              <div className="h-4 w-full max-w-md skeleton" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
