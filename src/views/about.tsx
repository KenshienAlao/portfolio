import { HIGHLIGHTS } from "@/config/highlights";

export function About() {
  return (
    <section
      id="about"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="mb-16 text-center slide-up stagger-1">
          <h2 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            About Me
          </h2>
          <div className="mt-6 h-1.5 w-16 bg-accent mx-auto rounded-full" />
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-text-secondary slide-up stagger-2">
            <p>
              As a 19-year-old BSIT student and aspiring full-stack developer,
              my world revolves around code—often dedicating 12+ hours a day to
              honing my craft. I&apos;m driven by a passion for building
              scalable, globally accessible web applications that solve real
              problems.
            </p>
            <p>
              My current focus is mastering{" "}
              <strong className="font-semibold text-text-primary">
                Next.js and TypeScript
              </strong>
              , bridging the gap between clean, intuitive user interfaces and
              robust backend architectures.
            </p>
            <p>
              I believe great software is the intersection of technical
              excellence and thoughtful user experience—software that feels{" "}
              <span className="font-semibold text-accent italic">crafted</span>{" "}
              rather than just assembled.
            </p>
          </div>

          <div className="mt-20 grid gap-4 sm:gap-6 sm:grid-cols-3 fade-in stagger-3">
            {HIGHLIGHTS.STATS.map(({ label, value }, i) => {
              const Icon = HIGHLIGHTS.ICONS[i];
              return (
                <div
                  key={label}
                  className="group relative flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-surface/30 p-8 text-center transition-transform hover:-translate-y-1 hover:border-accent/40 hover:bg-surface/60 hover:shadow-lg hover:shadow-accent/3"
                >
                  {Icon && (
                    <div className="mb-4 rounded-xl bg-accent/10 p-3 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent/20">
                      <Icon className="h-6 w-6" />
                    </div>
                  )}
                  <div className="text-4xl font-extrabold text-text-primary mb-1">
                    {value}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-secondary/80">
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
