export function ThinkingIndicator() {
  return (
    <span className="inline-flex gap-2 items-center py-1 text-text-secondary">
      <span className="text-xs sm:text-[13px]">Thinking</span>
      <span className="inline-flex gap-1 items-center" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:0.2s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-accent/70 animate-bounce [animation-delay:0.4s]" />
      </span>
    </span>
  );
}
