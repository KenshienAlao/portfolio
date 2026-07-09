import { Button } from "@/components/ui/button";
import { NAV_PAGES } from "@/config/navigation.config";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { containerVars, itemVars, hoverTap } from "@/components/animation/ani";

export function Hero({ changePage }: { changePage: (page: string) => void }) {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-73px)] flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
      <div className="container relative z-10 px-4 mx-auto">
        <m.div initial="hidden" animate="show" variants={containerVars} className="mx-auto max-w-3xl text-center">
          <m.div variants={itemVars} className="mb-8 inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
            <span className="relative flex h-2 w-2 mr-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Available for opportunities
          </m.div>
          <m.h1 variants={itemVars} className="mb-4 text-5xl font-extrabold tracking-tight text-text-primary md:text-7xl lg:text-8xl">
            Kenshie Alao
          </m.h1>
          <m.h2 variants={itemVars} className="mb-6 text-xl font-medium text-text-secondary md:text-3xl">
            Building <span className="text-accent">fast</span>, intuitive web experiences.
          </m.h2>
          <m.p variants={itemVars} className="mb-10 text-lg text-text-secondary/80 md:text-xl max-w-2xl mx-auto leading-relaxed">
            Focused on clean, simple user interfaces and smooth web applications.
            I build websites that are easy to use and feel beautifully intentional.
          </m.p>
          <m.div variants={itemVars} className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <m.div {...hoverTap}>
              <Button onClick={() => changePage(NAV_PAGES.LINKS.PROJECTS)} size="lg" className="w-full rounded-full bg-accent px-8 text-white shadow-lg shadow-accent/20 hover:bg-accent/90 sm:w-auto group">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </m.div>
            <m.div {...hoverTap}>
              <Button onClick={() => changePage(NAV_PAGES.LINKS.CONTACT)} size="lg" variant="outline" className="w-full rounded-full border-border/60 bg-surface/30 px-8 text-text-primary backdrop-blur-sm hover:bg-surface sm:w-auto">
                Get in Touch
              </Button>
            </m.div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}