"use client";

import { SectionHeader } from "@/components/section-header";
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
    <li className="border-b border-border py-8">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 sm:gap-4">
        <h3 className="text-lg font-bold tracking-tight text-text-primary">
          {item.school}
        </h3>
        <span className="shrink-0 font-mono text-xs text-text-secondary uppercase tracking-wider">
          {item.yearStart} — {item.yearEnd}
        </span>
      </div>

      <p className="mt-1 text-sm font-medium text-text-primary">
        {item.degree}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-text-secondary max-w-[65ch] text-pretty">
        {item.description}
      </p>

      {item.location && (
        <div className="mt-4">
          <Link
            href={item.location}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-text-primary underline underline-offset-4 hover:text-accent transition-colors"
          >
            <span>View location</span>
          </Link>
        </div>
      )}
    </li>
  );
}

export function Education() {
  const { data: education, isLoading } = useEducation();
  const sortedEducation = Array.isArray(education)
    ? sortByMostRecent(education)
    : [];

  return (
    <section className="container max-w-5xl mx-auto py-24 px-4 sm:px-6">
      <SectionHeader
        title="Education"
        description="My academic background and learning journey."
      />

      {isLoading ? (
        <div
          className="mt-12 border-t border-border"
          role="status"
          aria-busy="true"
          aria-label="Loading education"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-b border-border py-8">
              <div className="h-5 w-48 bg-subtle" />
              <div className="mt-3 h-4 w-32 bg-subtle" />
              <div className="mt-2 h-4 w-full max-w-md bg-subtle" />
            </div>
          ))}
        </div>
      ) : sortedEducation.length === 0 ? (
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm font-mono text-text-secondary">
            No education entries found.
          </p>
        </div>
      ) : (
        <ul className="mt-12 border-t border-border">
          {sortedEducation.map((item) => (
            <EducationEntry key={`${item.id}-${item.school}`} item={item} />
          ))}
        </ul>
      )}
    </section>
  );
}
