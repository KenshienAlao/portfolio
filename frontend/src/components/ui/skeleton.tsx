export const DashboardProjectCardSkeleton = () => {
  return (
    <article
      className="flex flex-col overflow-hidden border border-border bg-background"
      aria-hidden="true"
    >
      <div className="relative aspect-video overflow-hidden border-b border-border skeleton" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="h-4 w-1/2 skeleton" />
          <div className="flex shrink-0 gap-1">
            <div className="h-6 w-6 skeleton" />
            <div className="h-6 w-6 skeleton" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full skeleton" />
          <div className="h-3 w-4/5 skeleton" />
        </div>
        <div className="mt-auto flex flex-wrap gap-1 pt-1">
          <div className="h-4 w-10 skeleton" />
          <div className="h-4 w-12 skeleton" />
          <div className="h-4 w-14 skeleton" />
        </div>
      </div>
    </article>
  );
};

export const DashboardEducationCardSkeleton = () => {
  return (
    <div
      className="flex flex-col justify-between gap-4 border border-border bg-background p-5 md:flex-row"
      aria-hidden="true"
    >
      <div className="flex-1 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-4 w-1/3 skeleton" />
          <div className="h-5 w-24 skeleton" />
        </div>
        <div className="h-3 w-1/4 skeleton" />
        <div className="space-y-2 pt-1">
          <div className="h-3 w-full max-w-3xl skeleton" />
          <div className="h-3 w-5/6 max-w-3xl skeleton" />
        </div>
      </div>
      <div className="flex shrink-0 items-end justify-start gap-2 md:flex-col">
        <div className="h-8 w-20 skeleton" />
        <div className="h-8 w-24 skeleton" />
      </div>
    </div>
  );
};

export const DashboardSkillCategorySkeleton = () => {
  return (
    <div
      className="space-y-4 border border-border bg-background p-6"
      aria-hidden="true"
    >
      <div className="h-4 w-1/4 border-b border-border pb-2 skeleton" />
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between border border-border p-3 skeleton"
          >
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-2/3 skeleton skeleton-alt" />
              <div className="h-2.5 w-1/3 skeleton skeleton-alt" />
            </div>
            <div className="flex shrink-0 gap-1">
              <div className="h-6 w-6 skeleton skeleton-alt" />
              <div className="h-6 w-6 skeleton skeleton-alt" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const OverviewHeadSkeleton = () => (
  <div
    className="flex flex-wrap items-end justify-between gap-4"
    aria-hidden="true"
  >
    <div className="space-y-2">
      <div className="h-7 w-40 skeleton" />
      <div className="h-3 w-32 skeleton" />
    </div>
    <div className="h-9 w-40 skeleton" />
  </div>
);

export const OverviewStatsSkeleton = () => (
  <div
    className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4"
    aria-hidden="true"
  >
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 bg-background p-5">
        <div className="h-12 w-12 shrink-0 skeleton" />
        <div className="space-y-2">
          <div className="h-6 w-10 skeleton" />
          <div className="h-2.5 w-16 skeleton" />
        </div>
      </div>
    ))}
  </div>
);

export const OverviewTableSkeleton = () => (
  <div
    className="border border-border bg-background"
    aria-hidden="true"
  >
    <div className="flex items-center gap-2 border-b border-border p-6">
      <div className="mr-auto h-4 w-32 skeleton" />
      <div className="h-7 w-7 skeleton" />
      <div className="h-7 w-7 skeleton" />
    </div>
    <div className="space-y-3 p-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-8 w-8 shrink-0 skeleton" />
          <div className="h-3 flex-1 skeleton" />
          <div className="h-3 w-16 skeleton" />
          <div className="h-4 w-12 skeleton" />
        </div>
      ))}
    </div>
  </div>
);

export const OverviewTodoSkeleton = () => (
  <div className="border border-border bg-background" aria-hidden="true">
    <div className="flex items-center gap-2 border-b border-border p-6">
      <div className="mr-auto h-4 w-16 skeleton" />
      <div className="h-7 w-7 skeleton" />
      <div className="h-7 w-7 skeleton" />
    </div>
    <div className="space-y-3 border-b border-border p-6">
      <div className="h-2.5 w-24 skeleton" />
      <div className="h-1.5 w-full skeleton" />
    </div>
    <div className="space-y-4 p-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-3 w-4/5 skeleton" />
      ))}
    </div>
  </div>
);

export const OverviewTabSkeleton = () => (
  <div
    className="space-y-6 skeleton-scope"
    role="status"
    aria-busy="true"
    aria-label="Loading overview"
  >
    <OverviewStatsSkeleton />
    <OverviewTableSkeleton />
  </div>
);
