import { DashboardSkillCategorySkeleton } from "@/components/ui/skeleton";

export default function DashboardSkillsLoading() {
  return (
    <div
      className="space-y-6 skeleton-scope"
      role="status"
      aria-busy="true"
      aria-label="Loading skills"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
        <div className="space-y-2">
          <div className="h-6 w-36 skeleton" />
          <div className="h-4 w-60 skeleton" />
        </div>
        <div className="h-9 w-32 skeleton" />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <DashboardSkillCategorySkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
