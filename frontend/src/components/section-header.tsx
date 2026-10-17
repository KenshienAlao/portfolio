interface SectionHeaderProps {
  title: string;
  description?: string;
  tag?: string;
}

export function SectionHeader({ title, description, tag }: SectionHeaderProps) {
  return (
    <div className="space-y-2 sm:space-y-3 w-full">
      {tag && (
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-text-secondary">
          <span className="w-1.5 h-1.5 bg-accent shrink-0" />
          <span className="truncate">{tag}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-base text-text-secondary max-w-[60ch] leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
