"use client";

import { SETUP_ITEMS } from "@/config/setup";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Setup() {
  return (
    <section
      id="setup"
      className="relative py-24 bg-background overflow-hidden md:py-32"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-accent/5 blur-[60px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <div className="space-y-16">
          <div className="text-center slide-up stagger-1">
            <h2 className="text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Setup
            </h2>
            <div className="mt-4 h-1.5 w-12 bg-accent mx-auto rounded-full" />
            <p className="mt-6 text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
              The precision tools powering my workflow.
            </p>
          </div>

          <div className="space-y-4 fade-in stagger-2">
            {SETUP_ITEMS.map((item) => {
              const values = Array.isArray(item.value)
                ? item.value
                : [item.value];
              const downloads = Array.isArray(item.download)
                ? item.download
                : [item.download];

              const lightImages = Array.isArray(item.image.light)
                ? item.image.light
                : [item.image.light];
              const darkImages = Array.isArray(item.image.dark)
                ? item.image.dark
                : [item.image.dark];

              return (
                <div
                  key={item.category}
                  className="group relative rounded-2xl border border-border/40 bg-surface/20 p-6 sm:p-8 transition-colors hover:border-accent/40"
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
                          >
                            {downloads[i] ? (
                              <a
                                href={downloads[i]!}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link relative flex items-center gap-1 text-2xl font-bold tracking-tight text-text-primary hover:text-accent transition-colors duration-200"
                              >
                                {v}
                                <ArrowUpRight className="w-4 h-4 text-text-secondary/40 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-accent" />
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
                          className="mt-5 rounded-xl bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors duration-200 shadow-xs"
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

                    <div className="flex items-center gap-1.5 shrink-0">
                      {lightImages.map((src, idx) => (
                        <div
                          key={`${src.length}-${idx}`}
                          className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-surface border border-border/50 shadow-xs flex items-center justify-center p-2"
                        >
                          <Image
                            src={src}
                            alt="Tool icon"
                            width={32}
                            height={32}
                            className="absolute inset-0 m-auto h-[24px] w-[24px] object-contain transition-opacity duration-500 dark:opacity-0"
                          />
                          {darkImages[idx] && (
                            <Image
                              src={darkImages[idx]}
                              alt="Tool icon"
                              width={32}
                              height={32}
                              className="absolute inset-0 m-auto h-[24px] w-[24px] object-contain opacity-0 transition-opacity duration-500 dark:opacity-100"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
