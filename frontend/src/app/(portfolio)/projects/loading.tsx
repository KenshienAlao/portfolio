import { SectionHeader } from "@/components/section-header";

export default function ProjectsLoading() {
  return (
    <section className="container max-w-5xl mx-auto py-24 px-4 sm:px-6">
      <SectionHeader
        title="Projects"
        description="APIs, databases, and backend systems I've engineered."
      />

      <div
        className="mt-12 border-t border-border skeleton-scope"
        role="status"
        aria-busy="true"
        aria-label="Loading projects"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-b border-border py-8 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4">
              <div className="h-5 w-56 skeleton" />
              <div className="h-3 w-24 skeleton" />
            </div>
            <div className="h-4 w-full max-w-[65ch] skeleton" />
            <div className="h-3 w-48 skeleton pt-2" />
            <div className="h-3 w-32 skeleton mt-4" />
          </div>
        ))}
      </div>
    </section>
  );
}
