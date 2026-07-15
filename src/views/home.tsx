import { Button } from "@/components/ui/button";
import { NAV_PAGES } from "@/config/navigation.config";
import { ArrowRight } from "lucide-react";

export function Hero({ changePage }: { changePage: (page: string) => void }) {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-73px)] flex items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
      <div className="container relative z-10 px-4 mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent slide-up stagger-1">
            <span className="relative flex h-2 w-2 mr-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Available for opportunities
          </div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-text-primary md:text-7xl lg:text-8xl slide-up stagger-2">
            Kenshie Alao
          </h1>
          <h2 className="mb-6 text-xl font-medium text-text-secondary md:text-3xl slide-up stagger-3">
            Building <span className="text-accent">fast</span>, intuitive web
            experiences.
          </h2>
          <p className="mb-10 text-lg text-text-secondary/80 md:text-xl max-w-2xl mx-auto leading-relaxed slide-up stagger-4">
            Focused on clean, simple user interfaces and smooth web
            applications. I build websites that are easy to use and feel
            beautifully intentional.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center slide-up stagger-5">
            <Button
              onClick={() => changePage(NAV_PAGES.LINKS.PROJECTS)}
              size="lg"
              className="w-full rounded-full bg-accent px-8 text-white shadow-lg shadow-accent/20 hover:bg-accent/90 active:scale-95 sm:w-auto group transition-transform"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              onClick={() => changePage(NAV_PAGES.LINKS.CONTACT)}
              size="lg"
              variant="outline"
              className="w-full rounded-full border-border/60 bg-surface/30 px-8 text-text-primary active:scale-95 hover:bg-surface sm:w-auto transition-transform"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
