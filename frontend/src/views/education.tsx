import { SectionHeader } from "@/components/section-header";
import Link from "next/link";
import { type Education as EducationType } from "@/service/education.service";

export function Education({
  education,
}: {
  education?: EducationType[] | null;
}) {
  const sortedEducation = Array.isArray(education)
    ? education.toSorted((a, b) => {
        const getYear = (year: string) =>
          year === "Present" ? Infinity : Number.parseInt(year, 10) || 0;

        const endDiff = getYear(b.yearEnd) - getYear(a.yearEnd);

        return endDiff || getYear(b.yearStart) - getYear(a.yearStart);
      })
    : [];

  return (
    <section
      id="education"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        <SectionHeader
          path="~/education"
          command="git log --reverse"
          title="Education"
          description="My academic journey and the milestones that shaped my path in technology."
        />

        {!sortedEducation || sortedEducation.length === 0 ? (
          <div className="mt-14 flex flex-col items-center justify-center py-12 text-center rounded-2xl border border-dashed border-border bg-surface/50">
            <h3 className="font-mono text-base font-bold text-text-primary">
              No education history
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Check back later for updates to this section.
            </p>
          </div>
        ) : (
          <ol className="relative mt-14 ml-3 space-y-8 border-l border-border">
            {sortedEducation.map((item) => (
              <li key={`${item.id}-${item.school}`} className="relative pl-8">
                <Link
                  href={item.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -left-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-accent"
                  aria-label={`View location for ${item.school}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M536.5-503.5Q560-527 560-560t-23.5-56.5Q513-640 480-640t-56.5 23.5Q400-593 400-560t23.5 56.5Q447-480 480-480t56.5-23.5ZM480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                  </svg>
                </Link>

                <Link
                  href={item.location}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rounded-2xl border border-border bg-surface p-5 hover:border-accent/40">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-base font-bold text-text-primary">
                        {item.school}
                      </h3>
                      <span className="w-fit shrink-0 rounded-md bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent">
                        {item.yearStart} — {item.yearEnd}
                      </span>
                    </div>

                    <p className="mt-1 font-mono text-sm font-semibold text-text-secondary">
                      {item.degree}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
