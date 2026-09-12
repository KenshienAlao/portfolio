import { SectionHeader } from "@/components/section-header";
const STACK = ["React", "Next.js", "TypeScript", "Spring Boot", "PostgreSQL"];

export function About({ projectCount = 0 }: { projectCount?: number }) {
  const STATS = [
    {
      label: "Years of Experience",
      value: `${Math.max(1, new Date().getFullYear() - 2024)}+`,
      path: "m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z",
    },
    {
      label: "Projects Completed",
      value: projectCount,
      path: "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H447l-80-80H160v480l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Zm84-80h516l72-240H316l-72 240Zm0 0 72-240-72 240Zm-84-400v-80 80Z",
    },
    {
      label: "Tech Stack Focus",
      value: "NextJS",
      path: "M480-118 120-398l66-50 294 228 294-228 66 50-360 280Zm0-202L120-600l360-280 360 280-360 280Zm0-280Zm0 178 230-178-230-178-230 178 230 178Z",
    },
  ] as const;

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <SectionHeader
          path="~/about"
          command="cat about.md"
          title="About Me"
          description="A developer who cares about clean interfaces, reliable backends, and software that solves real problems."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
              <div className="mb-6 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-destructive/70" />
                <span className="h-3 w-3 rounded-full bg-accent/40" />
                <span className="h-3 w-3 rounded-full bg-accent/70" />
                <span className="ml-3 font-mono text-xs text-text-secondary">
                  about.md
                </span>
              </div>
              <div className="space-y-5 text-base leading-relaxed text-text-secondary">
                <p>
                  I&apos;m a web developer passionate about building modern web
                  applications.
                </p>

                <p>
                  I focus on creating responsive user interfaces, reliable
                  backend systems, and clean, maintainable code.
                </p>
              </div>
              <div className="mt-8">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                  core stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {STACK.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-background px-3 py-1 font-mono text-xs font-medium text-text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
            {STATS.map(({ label, value, path }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 hover:border-accent/40"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <svg
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d={path} />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-text-primary">
                    {value}
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
