import { SectionHeader } from "@/components/section-header";

export default function ProjectsLoading() {
  return (
    <section className="container max-w-5xl mx-auto py-24 px-4 sm:px-6">
      <SectionHeader
        title="Projects"
        description="A collection of projects I've built."
      />

      <div
        className="mt-12 border-t border-border skeleton-scope"
        role="status"
        aria-busy="true"
        aria-label="Loading projects"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border-b border-border py-8 flex flex-col sm:flex-row gap-6"
          >
            <div className="aspect-video w-full sm:w-56 md:w-64 shrink-0 skeleton border border-border" />
            <div className="flex-1 space-y-3">
              <div className="h-5 w-48 skeleton" />
              <div className="h-4 w-full max-w-[65ch] skeleton" />
              <div className="h-4 w-3/4 max-w-[40ch] skeleton" />
              <div className="h-3 w-32 skeleton mt-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
