import { DashboardEducationCardSkeleton } from "@/components/ui/skeleton";

export default function DashboardEducationLoading() {
  return (
    <div
      className="space-y-6 skeleton-scope"
      role="status"
      aria-busy="true"
      aria-label="Loading education"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
        <div className="space-y-2">
          <div className="h-6 w-36 skeleton" />
          <div className="h-4 w-60 skeleton" />
        </div>
        <div className="h-9 w-32 skeleton" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <DashboardEducationCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
