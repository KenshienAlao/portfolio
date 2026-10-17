export default function DashboardMessagesLoading() {
  return (
    <div
      className="space-y-6 skeleton-scope"
      role="status"
      aria-busy="true"
      aria-label="Loading messages"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
        <div className="space-y-2">
          <div className="h-6 w-36 skeleton" />
          <div className="h-4 w-60 skeleton" />
        </div>
        <div className="h-8 w-24 skeleton" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-4 border border-border bg-background p-4"
          >
            <div className="h-4 w-4 skeleton rounded-full shrink-0 mt-1" />
            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="h-4 w-32 skeleton" />
                <div className="h-3 w-20 skeleton" />
              </div>
              <div className="h-3 w-48 skeleton" />
              <div className="h-3 w-full skeleton pt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
