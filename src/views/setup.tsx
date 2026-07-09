"use client";

import { SETUP_ITEMS } from "@/config/setup";
import { ArrowUpRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { containerVars, itemVars } from "@/components/animation/ani";

const Gallery = ({
  images,
  single,
}: {
  images: string[];
  single: number | null;
}) => {
  return (
    <div className="flex items-center gap-1.5">
      {images.map((src, i) => {
        const isTargeted = single === null || single === i;

        return (
          <m.div
            key={src}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isTargeted ? 1 : 0,
              scale: isTargeted ? 1 : 0.75,
              width: isTargeted ? 48 : 0,
              marginLeft: isTargeted ? 2 : 0,
              marginRight: isTargeted ? 2 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className={cn(
              "relative h-12 shrink-0 overflow-hidden rounded-xl bg-surface border border-border/50 shadow-xs flex items-center justify-center p-2",
              !isTargeted &&
                "pointer-events-none border-transparent bg-transparent shadow-none",
            )}
          >
            <div className="w-8 h-8 relative shrink-0">
              <Image
                src={src}
                alt="Tool icon"
                width={32}
                height={32}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </m.div>
        );
      })}
    </div>
  );
};

export function Setup() {
  const { resolvedTheme } = useTheme();
  const [active, setActive] = useState<string | null>(null);
  const [idx, setIdx] = useState<number | null>(null);

  return (
    <section
      id="setup"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVars}
          className="space-y-16"
        >
          <m.div variants={itemVars} className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Setup
            </h2>
            <div className="mt-4 h-1.5 w-12 bg-accent mx-auto rounded-full" />
            <p className="mt-6 text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
              The precision tools powering my workflow.
            </p>
          </m.div>

          <m.div className="space-y-4">
            {SETUP_ITEMS.map((item) => {
              const values = Array.isArray(item.value)
                ? item.value
                : [item.value];
              const downloads = Array.isArray(item.download)
                ? item.download
                : [item.download];

              const activeThemeImages =
                resolvedTheme === "dark" ? item.image.dark : item.image.light;
              const images = Array.isArray(activeThemeImages)
                ? activeThemeImages
                : [activeThemeImages];
              const isActive = active === item.category;

              return (
                <m.div
                  key={item.category}
                  variants={itemVars}
                  onMouseEnter={() => setActive(item.category)}
                  onMouseLeave={() => {
                    setActive(null);
                    setIdx(null);
                  }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  className={cn(
                    "group relative rounded-2xl border p-6 sm:p-8 transition-colors duration-300 backdrop-blur-xs",
                    isActive
                      ? "border-accent/40 bg-surface/60 shadow-xl shadow-accent/1"
                      : "border-border/40 bg-surface/20 hover:border-accent/40 hover:bg-surface/40",
                  )}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1 min-w-0 md:max-w-[70%]">
                      <span className="text-xs font-bold uppercase tracking-widest text-accent mb-3 block">
                        {item.category}
                      </span>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
                        {values.map((v, i) => (
                          <span
                            key={v}
                            className="inline-flex items-center gap-1.5"
                            onMouseEnter={() => setIdx(i)}
                            onMouseLeave={() => setIdx(null)}
                          >
                            {downloads[i] ? (
                              <a
                                href={downloads[i]!}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link relative flex items-center gap-1 text-2xl font-bold tracking-tight text-text-primary hover:text-accent transition-colors duration-200"
                              >
                                {v}
                                <ArrowUpRight className="w-4 h-4 text-text-secondary/40 group-hover/link:text-accent group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-all duration-200" />
                              </a>
                            ) : (
                              <span className="text-2xl font-bold tracking-tight text-text-primary">
                                {v}
                              </span>
                            )}
                            {i < values.length - 1 && (
                              <span className="ml-2 text-xl text-border/40 select-none">
                                /
                              </span>
                            )}
                          </span>
                        ))}
                      </div>

                      <p className="mt-3 text-base text-text-secondary/90 leading-relaxed">
                        {item.description}
                      </p>

                      {item.subValue && item.subDownload && (
                        <Button
                          asChild
                          size="sm"
                          variant="secondary"
                          className="mt-5 rounded-xl bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-200 shadow-xs"
                        >
                          <a
                            href={item.subDownload}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.subValue}
                          </a>
                        </Button>
                      )}
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:block shrink-0 relative min-w-[64px]">
                      <m.div
                        initial={{ opacity: 0, scale: 0.95, x: 15 }}
                        animate={{
                          opacity: isActive && images.length > 0 ? 1 : 0,
                          scale: isActive && images.length > 0 ? 1 : 0.95,
                          x: isActive && images.length > 0 ? 0 : 15,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 26,
                        }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center p-2.5 rounded-2xl border border-border/40 bg-background/90 shadow-xl shadow-black/5 z-10 pointer-events-none"
                      >
                        <Gallery images={images} single={idx} />
                      </m.div>
                    </div>
                  </div>

                  {/* Mobile */}
                  <AnimatePresence>
                    {isActive && images.length > 0 && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        className="md:hidden overflow-hidden"
                      >
                        <div className="flex flex-wrap p-2 pt-6 border-t border-border/40 mt-4 justify-start">
                          <Gallery images={images} single={idx} />
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              );
            })}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
