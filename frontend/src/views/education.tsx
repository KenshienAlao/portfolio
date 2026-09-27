"use client";

import { SectionHeader } from "@/components/section-header";
import { EducationCardSkeleton } from "@/components/ui/skeleton";
import { ArrowUpRight } from "@/components/icons";
import { useEducation, type Education } from "@/hooks/use-public-data";
import Link from "next/link";

function getYearValue(year: string) {
  return year === "Present" ? Infinity : Number.parseInt(year, 10) || 0;
}

function sortByMostRecent(education: Education[]): Education[] {
  return education.toSorted((a, b) => {
    const endDiff = getYearValue(b.yearEnd) - getYearValue(a.yearEnd);
    return endDiff || getYearValue(b.yearStart) - getYearValue(a.yearStart);
  });
}

function EducationEntry({ item }: { item: Education }) {
  return (
    <li className="relative pl-8">
      <span
        aria-hidden="true"
        className="absolute -left-3 top-5 flex h-6 w-6 items-center justify-center"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      </span>

      <div className="rounded-2xl border border-border bg-surface p-5 hover:border-accent/40">
        <h3 className="break-words text-base font-bold text-text-primary">
          {item.school}
        </h3>

        <p className="mt-1 font-mono text-xs text-text-secondary">
          {item.degree} · {item.yearStart} — {item.yearEnd}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          {item.description}
        </p>

        <Link
          href={item.location}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-medium text-accent transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          View location
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only"> for {item.school} on Google Maps</span>
        </Link>
      </div>
    </li>
  );
}

function EducationTimeline({ items }: { items: Education[] }) {
  return (
    <ol className="relative mt-14 ml-3 space-y-8 border-l border-border">
      {items.map((item) => (
        <EducationEntry key={`${item.id}-${item.school}`} item={item} />
      ))}
    </ol>
  );
}

export function Education() {
  const { data: education, isLoading } = useEducation();
  const sortedEducation = Array.isArray(education) ? sortByMostRecent(education) : [];

  return (
    <section
      id="education"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        <SectionHeader
          path="~/education"
          command="cat education.md"
          title="Education"
          description="My academic background and learning journey."
        />

        {isLoading ? (
          <ol
            className="relative mt-14 ml-3 space-y-8 border-l border-border"
            role="status"
            aria-busy="true"
            aria-label="Loading education timeline"
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <EducationCardSkeleton key={i} />
            ))}
          </ol>
        ) : sortedEducation.length === 0 ? (
          <div className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 py-12 text-center">
            <h3 className="font-mono text-base font-bold text-text-primary">
              No education entries available yet.
            </h3>
          </div>
        ) : (
          <EducationTimeline items={sortedEducation} />
        )}
      </div>
    </section>
  );
}
