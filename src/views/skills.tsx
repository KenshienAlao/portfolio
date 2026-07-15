"use client";

import { useState } from "react";
import { SkillItem, SKILLS } from "@/config/skills";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Skills() {
  const categories = ["All", ...Object.keys(SKILLS)];
  const [active, setActive] = useState("All");

  return (
    <section
      id="skills"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute top-0 left-1/4 -ml-40 -mt-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -mr-40 -mb-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[60px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-5xl">
        <div className="space-y-16">
          <div className="text-center slide-up stagger-1">
            <h2 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Skills
            </h2>
            <div className="mt-4 h-1.5 w-12 bg-accent mx-auto rounded-full" />
            <p className="mt-6 text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
              Technologies and tools I use to build modern web applications.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-1 border-b border-border pb-0 slide-up stagger-2">
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
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent transition-all duration-300" />
                )}
              </button>
            ))}
          </div>

          <div className="fade-in stagger-3">
            {active === "All" ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(SKILLS).map(([category, items]) => (
                  <div
                    key={category}
                    className="flex flex-col rounded-2xl border border-border bg-surface/10 p-6"
                  >
                    <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-text-primary/90 flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-accent/80" />{" "}
                      {category}
                    </h3>
                    <div className="flex flex-col gap-3">
                      {items.map((skill: SkillItem) => (
                        <div
                          key={skill.name}
                          className="relative flex items-center gap-3 overflow-hidden rounded-xl border border-border bg-background/20 px-4 py-3 text-sm font-semibold"
                        >
                          <div
                            className="absolute inset-y-0 left-0 bg-accent/10 pointer-events-none"
                            style={{ width: `${skill.level}%` }}
                          />
                          <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface/60 p-1 border border-border">
                            <Image
                              src={skill.image.light}
                              alt={`${skill.name} light icon`}
                              width={28}
                              height={28}
                              className="absolute inset-0 m-auto h-[20px] w-[20px] object-contain transition-opacity duration-500 dark:opacity-0"
                            />
                            <Image
                              src={skill.image.dark}
                              alt={`${skill.name} dark icon`}
                              width={28}
                              height={28}
                              className="absolute inset-0 m-auto h-[20px] w-[20px] object-contain opacity-0 transition-opacity duration-500 dark:opacity-100"
                            />
                          </div>
                          <span className="relative z-10 text-text-primary">
                            {skill.name}
                          </span>
                          <span className="relative z-10 ml-auto font-mono text-xs text-text-secondary">
                            {skill.level}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-2xl mx-auto flex flex-col gap-4">
                {(SKILLS[active as keyof typeof SKILLS] || []).map(
                  (skill: SkillItem) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-5 rounded-2xl border border-border bg-surface/10 p-5"
                    >
                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-background/50 border border-border p-2.5">
                        <Image
                          src={skill.image.light}
                          alt={`${skill.name} light icon`}
                          width={56}
                          height={56}
                          className="absolute inset-0 m-auto h-[36px] w-[36px] object-contain transition-opacity duration-700 dark:opacity-0"
                        />
                        <Image
                          src={skill.image.dark}
                          alt={`${skill.name} dark icon`}
                          width={56}
                          height={56}
                          className="absolute inset-0 m-auto h-[36px] w-[36px] object-contain opacity-0 transition-opacity duration-700 dark:opacity-100"
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
                          <div
                            className="h-full bg-accent rounded-full transition-[width] duration-700 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/10 p-8 sm:p-10 slide-up stagger-4">
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
                  most at home with Backend, Springboot, and Node.js, but I also
                  work with databases and frontend frameworks, Docker, and cloud
                  platforms like Vercel and Supabase to ship and scale real
                  products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
