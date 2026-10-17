import { SectionHeader } from "@/components/section-header";
import Link from "next/link";

const WHAT_I_DO = [
  {
    label: "API Development",
    description:
      "Building REST APIs with input validation, authentication, and error handling.",
  },
  {
    label: "Algorithms",
    description:
      "Using Big O notation to understand how code performs as data grows.",
  },
  {
    label: "Database Design",
    description:
      "Designing tables, using indexes, and improving database queries.",
  },
  {
    label: "Caching & Load Balancing",
    description:
      "Learning how to reduce server workload and handle more incoming requests.",
  },
  {
    label: "Security",
    description:
      "Working with authentication, permissions, and safe data handling.",
  },
  {
    label: "Backend Architecture",
    description:
      "Organizing code into clear, manageable parts as an application grows.",
  },
];

const HOW_I_WORK = [
  "Keep code simple and readable.",
  "Choose the right tools for the problem.",
  "Check inputs and handle errors properly.",
  "Keep data consistent and secure.",
  "Test code before relying on it.",
  "Look for ways to improve performance.",
];

export function About() {
  return (
    <section className="container max-w-5xl mx-auto py-24 px-4 sm:px-6">
      <SectionHeader
        title="About"
        description="I'm a backend developer focused on engineering server-side architecture."
      />

      <div className="mt-12 space-y-5 text-base leading-relaxed text-text-secondary max-w-[65ch]">
        <p>
          I&apos;m{" "}
          <span className="text-text-primary font-medium">Kenshien Alao</span>,
          a backend developer from Marikina, Philippines. I enjoy working on the
          backend, especially APIs, databases, and understanding how to make
          applications faster, safer, and easier to maintain.
        </p>
      </div>

      <div className="mt-20">
        <h3 className="text-xl font-bold tracking-tight text-text-primary">
          What I do
        </h3>
        <ul className="mt-6 border-t border-border">
          {WHAT_I_DO.map(({ label, description }) => (
            <li
              key={label}
              className="border-b border-border py-6 grid grid-cols-1 sm:grid-cols-[16rem_1fr] gap-2 sm:gap-6 items-baseline"
            >
              <span className="text-sm font-mono font-medium text-text-primary">
                {label}
              </span>
              <p className="text-sm leading-relaxed text-text-secondary m-0 text-pretty">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20">
        <h3 className="text-xl font-bold tracking-tight text-text-primary">
          How I work
        </h3>
        <ul className="mt-6 border-t border-border">
          {HOW_I_WORK.map((principle, index) => (
            <li
              key={principle}
              className="border-b border-border py-4 flex items-center gap-4 text-sm text-text-primary"
            >
              <span className="font-mono text-xs text-text-secondary shrink-0">
                0{index + 1}
              </span>
              <span className="text-pretty">{principle}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20">
        <h3 className="text-xl font-bold tracking-tight text-text-primary">
          Current focus
        </h3>
        <p className="mt-4 text-base leading-relaxed text-text-secondary max-w-[65ch] text-pretty">
          Currently learning FastAPI, PostgreSQL, and backend system design,
          while improving my understanding of security, database performance,
          and scalability.
        </p>
      </div>

      <div className="mt-20 border-t border-border pt-12">
        <h3 className="text-xl font-bold tracking-tight text-text-primary">
          Have a project or system in mind?
        </h3>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 bg-background text-text-primary font-medium text-sm border border-border transition-colors hover:border-text-primary rounded-lg"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-text-primary text-background font-medium text-sm border border-transparent transition-colors hover:opacity-90 rounded-lg"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
