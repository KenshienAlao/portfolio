import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { Check, ChevronRight } from "@/components/icons";
import Link from "next/link";

const WHAT_I_DO = [
  {
    label: "Websites",
    description: "Fast, responsive websites that help businesses grow online.",
  },
  {
    label: "Landing Pages",
    description:
      "Focused pages designed to present your offer and drive action.",
  },
  {
    label: "Web Applications",
    description:
      "Practical web apps built around real workflows and everyday needs.",
  },
];

const HOW_I_WORK = [
  "Simple and maintainable code",
  "Responsive by default",
  "Performance-focused",
  "Practical solutions over unnecessary complexity",
];

const INTRO = [
  "I'm Kenshien, a web developer focused on building modern, responsive websites and web applications.",
  "I build practical digital experiences for businesses and individuals, with a focus on clean interfaces, reliable functionality, and good performance.",
];

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-3xl px-4">
        <SectionHeader
          path="~/about"
          command="cat about.md"
          title="About Me"
          description="I'm a web developer focused on building modern, responsive websites and web applications."
        />

        <div className="mt-14 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <div className="mb-6 flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full bg-accent/40" />
            <span className="h-3 w-3 rounded-full bg-accent/70" />
            <span className="ml-3 font-mono text-xs text-text-secondary">
              about.md
            </span>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-text-secondary md:text-xl">
            {INTRO.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
            What I Do
          </h3>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {WHAT_I_DO.map(({ label, description }) => (
              <div key={label} className="border-t border-border/60 pt-4">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
            How I Work
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {HOW_I_WORK.map((principle) => (
              <div key={principle} className="flex items-start gap-3">
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <span className="text-base leading-relaxed text-text-primary">
                  {principle}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-l-2 border-accent pl-5">
          <h3 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
            Current Focus
          </h3>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Currently focused on building practical web applications and
            improving my skills across frontend and backend development.
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center text-center">
          <h3 className="text-2xl font-extrabold tracking-tight text-text-primary md:text-3xl">
            Have a project in mind?
          </h3>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full bg-accent px-8 font-semibold text-on-accent hover:bg-accent/90 active:scale-95 sm:w-auto"
            >
              <Link href="/projects">
                View Projects
                <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full border-border bg-transparent px-8 font-semibold text-text-primary hover:border-accent/50 hover:bg-surface active:scale-95 sm:w-auto"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
