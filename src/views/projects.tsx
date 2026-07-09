import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/config/projects";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { m } from "framer-motion";
import { containerVars, itemVars } from "@/components/animation/ani";
import Image from "next/image";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 bg-background overflow-hidden"
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
              Projects
            </h2>
            <div className="mt-4 h-1.5 w-12 bg-accent mx-auto rounded-full" />
            <p className="mt-6 text-lg text-text-secondary max-w-md mx-auto">
              A selection of work showcasing design, engineering, and attention
              to detail.
            </p>
          </m.div>

          <m.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map(
              ({ id, title, description, image, tags, github, demo }) => (
                <m.article
                  key={id}
                  variants={itemVars}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-surface/30 transition-colors hover:border-accent/40 hover:shadow-xl hover:shadow-accent/2"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted/40 border-b border-border/40">
                    <Image
                      src={image}
                      alt={title}
                      width={500}
                      height={500}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-text-primary relative inline-block self-start after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 group-hover:after:w-full after:bg-accent after:transition-all after:duration-300">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary/90 line-clamp-2">
                      {description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 flex gap-3">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-xl border-border/60 text-text-primary hover:bg-surface"
                      >
                        <a
                          href={github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-2"
                        >
                          <FaGithub className="h-4 w-4" /> Code
                        </a>
                      </Button>
                      {demo && (
                        <Button
                          asChild
                          size="sm"
                          className="rounded-xl bg-accent text-white hover:bg-accent/90 shadow-sm shadow-accent/10 group/btn"
                        >
                          <a
                            href={demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-1.5"
                          >
                            Demo{" "}
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </m.article>
              ),
            )}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
