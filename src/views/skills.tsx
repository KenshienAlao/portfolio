"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { SkillItem, SKILLS } from "@/config/skills";
import { m, AnimatePresence } from "framer-motion";
import { containerVars, itemVars } from "@/components/animation/ani";
import { cn } from "@/lib/cn";
import Image from "next/image";

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.3 },
};

export default function Skills() {
  const { resolvedTheme } = useTheme();
  const categories = ["All", ...Object.keys(SKILLS)];
  const [active, setActive] = useState("All");

  return (
    <section
      id="skills"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute top-0 left-1/4 -ml-40 -mt-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -mr-40 -mb-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

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
              Skills
            </h2>
            <div className="mt-4 h-1.5 w-12 bg-accent mx-auto rounded-full" />
            <p className="mt-6 text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
              Technologies and tools I use to build modern web applications.
            </p>
          </m.div>

          <m.div
            variants={itemVars}
            className="flex flex-wrap justify-center gap-1 border-b border-border pb-0"
          >
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "relative px-5 py-3 text-sm font-semibold transition-colors",
                  active === cat
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                {cat}
                {active === cat && (
                  <m.div
                    layoutId="skillUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </m.div>

          <AnimatePresence mode="wait">
            {active === "All" ? (
              <m.div
                key="grid"
                {...fade}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {Object.entries(SKILLS).map(([category, items]) => (
                  <div
                    key={category}
                    className="flex flex-col rounded-2xl border border-border bg-surface/10 p-6 backdrop-blur-md hover:border-accent/30 transition-colors"
                  >
                    <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-text-primary/90 flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-accent/80" />{" "}
                      {category}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {items.map((skill: SkillItem) => (
                        <div
                          key={skill.name}
                          className="group/item relative flex items-center gap-3 overflow-hidden rounded-xl border border-border bg-background/20 px-4 py-3 text-sm font-semibold hover:border-accent/20 transition-colors"
                        >
                          <m.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="absolute inset-y-0 left-0 bg-accent/10 pointer-events-none"
                          />
                          <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface/60 p-1 border border-border">
                            <Image
                              src={
                                resolvedTheme === "dark"
                                  ? skill.image.dark
                                  : skill.image.light
                              }
                              alt={skill.name}
                              width={500}
                              height={500}
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          </div>
                          <span className="relative z-10 text-text-primary">
                            {skill.name}
                          </span>
                          <span className="relative z-10 ml-auto font-mono text-xs text-text-secondary group-hover/item:text-accent transition-colors">
                            {skill.level}%
                          </span>
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/10">
                            <m.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2 }}
                              className="h-full bg-accent/40 group-hover/item:bg-accent transition-colors"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </m.div>
            ) : (
              <m.div
                key="list"
                {...fade}
                className="max-w-2xl mx-auto flex flex-col gap-4"
              >
                {(SKILLS[active as keyof typeof SKILLS] || []).map(
                  (skill: SkillItem) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-5 rounded-2xl border border-border bg-surface/10 p-5 backdrop-blur-md hover:border-accent/30 transition-colors"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-background/50 border border-border p-2.5">
                        <Image
                          src={
                            resolvedTheme === "dark"
                              ? skill.image.dark
                              : skill.image.light
                          }
                          alt={skill.name}
                          width={500}
                          height={500}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-text-primary text-lg">
                            {skill.name}
                          </span>
                          <span className="font-mono text-xs font-bold text-accent">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-border/20 rounded-full overflow-hidden">
                          <m.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-accent rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </m.div>
            )}
          </AnimatePresence>

          <m.div
            variants={itemVars}
            className="relative overflow-hidden rounded-3xl border border-border bg-surface/10 p-8 sm:p-10 backdrop-blur-md"
          >
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-text-primary">
                  Core Expertise
                </h3>
                <p className="text-base leading-relaxed text-text-secondary/90">
                  I build fast, reliable web apps from front to back. I&apos;m
                  most at home with React, Next.js, and Node.js, but I also work
                  with databases, Docker, and cloud platforms like Vercel and
                  Supabase to ship and scale real products.
                </p>
              </div>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
