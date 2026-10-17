import { DashboardProjectCardSkeleton } from "@/components/ui/skeleton";

export default function DashboardProjectsLoading() {
  return (
    <div
      className="space-y-6 skeleton-scope"
      role="status"
      aria-busy="true"
      aria-label="Loading projects"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
        <div className="space-y-2">
          <div className="h-6 w-36 skeleton" />
          <div className="h-4 w-60 skeleton" />
        </div>
        <div className="h-9 w-32 skeleton" />
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <DashboardProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
