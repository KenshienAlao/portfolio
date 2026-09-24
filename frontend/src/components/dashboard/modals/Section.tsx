export function Section({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 pt-2 first:pt-0">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
      <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-text-primary">
        {title}
      </span>
    </div>
  );
}