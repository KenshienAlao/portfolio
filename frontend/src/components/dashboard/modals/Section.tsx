export function Section({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 pt-2 first:pt-0">
      <span className="h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden="true" />
      <span className="text-xs font-mono uppercase tracking-wider text-text-primary">
        {title}
      </span>
    </div>
  );
}
