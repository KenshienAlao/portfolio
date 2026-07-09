import { Button } from "@/components/ui/button";
import { Mail, ExternalLink, MessageSquare } from "lucide-react";
import { CONTACT_LINKS } from "@/config/contanct";
import { m } from "framer-motion";
import { containerVars, itemVars } from "@/components/animation/ani";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVars}
          className="space-y-16"
        >
          <m.div variants={itemVars} className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Get in Touch
            </h2>
            <div className="mt-4 h-1.5 w-12 bg-accent mx-auto rounded-full" />
            <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your visions.
            </p>
          </m.div>

          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            <div className="flex flex-col justify-center gap-4">
              {CONTACT_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <m.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVars}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="group flex items-center gap-5 rounded-2xl border border-border/40 bg-surface/30 p-5 transition-colors hover:border-accent/40 hover:bg-surface/60 hover:shadow-xl hover:shadow-accent/1"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-text-secondary/60 mb-0.5">
                        {link.label}
                      </p>
                      <p className="text-lg font-bold text-text-primary truncate transition-colors duration-300 group-hover:text-accent">
                        {link.value}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-text-secondary/40 transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </m.a>
                );
              })}
            </div>

            <m.div
              variants={itemVars}
              className="flex flex-col justify-center items-center rounded-3xl border border-border/40 bg-surface/10 p-8 sm:p-10 text-center transition-colors hover:border-accent/30 shadow-xs"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <MessageSquare className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-text-primary tracking-tight">
                Available for Opportunities
              </h3>
              <p className="mb-8 text-text-secondary/90 leading-relaxed text-base max-w-sm">
                I&apos;m currently looking for freelance projects, full-time
                roles, and exciting collaborations. Let&apos;s build something
                amazing together.
              </p>

              <m.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-xl bg-accent text-white shadow-lg shadow-accent/10 hover:bg-accent/90 transition-all gap-2 px-8 group"
                >
                  <a
                    href="mailto:kenshienworkacc@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                    <span className="font-semibold tracking-wide">
                      Send me an Email
                    </span>
                  </a>
                </Button>
              </m.div>
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
