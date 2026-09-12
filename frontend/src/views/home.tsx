import { Button } from "@/components/ui/button";
import Link from "next/link";
const CAPABILITIES = [
  {
    label: "Develop",
    path: "M240-280 40-480l200-200 56 56-143 144 143 144-56 56Zm178 132-76-24 200-640 76 24-200 640Zm302-132-56-56 143-144-143-144 56-56 200 200-200 200Z",
  },
  {
    label: "Design",
    path: "M480-118 120-398l66-50 294 228 294-228 66 50-360 280Zm0-202L120-600l360-280 360 280-360 280Zm0-280Zm0 178 230-178-230-178-230 178 230 178Z",
  },
  {
    label: "Optimize",
    path: "m520-120 40-280H319l321-440h40l-40 280h241L560-120h-40ZM120-240v-80h348l-12 80H120ZM80-440v-80h228l-58 80H80Zm80-200v-80h294l-58 80H160Z",
  },
  {
    label: "Accessible",
    path: "M423.5-743.5Q400-767 400-800t23.5-56.5Q447-880 480-880t56.5 23.5Q560-833 560-800t-23.5 56.5Q513-720 480-720t-56.5-23.5ZM360-80v-520H120v-80h720v80H600v520h-80v-240h-80v240h-80Z",
  },
] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div
        className="glow-accent pointer-events-none absolute -top-24 left-1/2 h-105 w-105 -translate-x-1/2 opacity-70"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <p className="flex items-center gap-2 font-mono text-xs text-accent sm:text-sm">
            <span className="text-text-secondary">~/kenshien</span>
            <span className="text-text-secondary">$</span>
            <span>whoami</span>
          </p>

          <h1 className="mt-4 text-5xl font-extrabold leading-[0.95] tracking-tight text-text-primary text-balance sm:text-6xl md:text-7xl">
            Kenshien
            <br />
            <span className="text-accent">Alao</span>
          </h1>

          <p className="mt-5 font-mono text-sm text-text-secondary sm:text-base">
            Web Developer | Helping Businesses Grow Online
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
            I help businesses grow their online presence by building modern web
            applications and high-converting landing pages that are fast,
            responsive, and designed to turn visitors into customers.
          </p>

          <p className="mt-6 font-mono text-sm text-accent">
            <span>&gt; building for the web</span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full bg-accent px-8 font-semibold text-on-accent hover:bg-accent/90 active:scale-95 sm:w-auto"
            >
              <Link href="/projects">
                View Projects
                <svg
                  className="ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 -960 960 960"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                </svg>
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

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border/60 pt-6">
            {CAPABILITIES.map(({ path, label }) => (
              <div key={label} className="flex items-center gap-2">
                <svg
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                  className="h-4 w-4 text-accent"
                  aria-hidden="true"
                >
                  <path d={path} />
                </svg>
                <span className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
