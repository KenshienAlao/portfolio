import Link from "next/link";

const EXPERIENCE_START_YEAR = 2024;
const yearsOfExperience = new Date().getFullYear() - EXPERIENCE_START_YEAR;

const facts = [
  { label: "Location", value: "Marikina, Philippines" },
  { label: "Experience", value: `${yearsOfExperience}+ Years` },
];

export function Hero() {
  return (
    <section className="container max-w-5xl mx-auto pt-20 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6">
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-secondary max-w-[24ch] text-balance">
        Hi, I&apos;m{" "}
        <span className="text-text-primary font-semibold">Kenshien Alao</span>,
        a backend developer.
      </h1>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 bg-text-primary text-background font-medium text-sm border border-transparent transition-colors hover:opacity-90 rounded-lg"
        >
          Get in touch
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center justify-center px-6 py-3 bg-background text-text-primary font-medium text-sm border border-border transition-colors hover:border-text-primary rounded-lg"
        >
          View projects
        </Link>
      </div>

      <dl className="mt-20 border-t border-border pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl">
        {facts.map((fact) => (
          <div key={fact.label} className="border-l border-border pl-4">
            <dt className="text-xs font-mono uppercase tracking-wider text-text-secondary mb-1">
              {fact.label}
            </dt>
            <dd className="text-sm font-medium text-text-primary font-mono truncate">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
