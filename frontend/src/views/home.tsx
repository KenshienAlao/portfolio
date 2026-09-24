import { Button } from "@/components/ui/button";
import {
  Accessibility,
  Bolt,
  ChevronRight,
  Code,
  Layers,
  type IconProps,
} from "@/components/icons";
import Link from "next/link";
import { type ComponentType } from "react";

const ICON_STYLE = "h-4 w-4 text-accent";
const CAPABILITIES: Array<{ label: string; Icon: ComponentType<IconProps> }> = [
  { label: "Develop", Icon: Code },
  { label: "Design", Icon: Layers },
  { label: "Optimize", Icon: Bolt },
  { label: "Accessible", Icon: Accessibility },
];

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

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border/60 pt-6">
            {CAPABILITIES.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className={ICON_STYLE} aria-hidden="true" />
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
