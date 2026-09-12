import { type SetupCategory, type SetupItem } from "@/service/setup.service";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import Link from "next/link";

export function Setup({ setups }: { setups?: SetupCategory[] | null }) {
  const categories = Array.isArray(setups) ? setups : [];

  return (
    <section
      id="setup"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-4xl px-4">
        <SectionHeader
          path="~/setup"
          command="cat .config"
          title="Setup"
          description="The tools I use for development, design, and productivity."
        />

        <div className="mt-14">
          {categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 py-12 text-center">
              <h3 className="font-mono text-base font-bold text-text-primary">
                No setup items available
              </h3>

              <p className="mt-1 text-sm text-text-secondary">
                Check back later for updates to this section.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {categories.map((category) => {
                const items = category.items ?? [];

                return (
                  <div
                    key={category.id}
                    className="group flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
                  >
                    <div className="space-y-3">
                      <span className="font-mono text-xs font-bold text-accent">
                        {category.category}
                      </span>

                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        {items.map((tool: SetupItem, index) => (
                          <span
                            key={tool.id}
                            className="inline-flex items-center gap-1.5"
                          >
                            {tool.imageLight && (
                              <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
                                <Image
                                  src={tool.imageLight}
                                  alt=""
                                  width={20}
                                  height={20}
                                  className={`object-contain ${
                                    tool.imageDark ? "dark:hidden" : ""
                                  }`}
                                />

                                {tool.imageDark && (
                                  <Image
                                    src={tool.imageDark}
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="hidden object-contain dark:block"
                                  />
                                )}
                              </span>
                            )}

                            {tool.download ? (
                              <Link
                                href={tool.download}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-0.5 text-base font-bold tracking-tight text-text-primary transition-colors hover:text-accent"
                              >
                                {tool.value}

                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 -960 960 960"
                                  fill="currentColor"
                                  className="h-4 w-4 text-text-secondary"
                                  aria-hidden="true"
                                >
                                  <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                                </svg>
                              </Link>
                            ) : (
                              <span className="text-base font-bold tracking-tight text-text-primary">
                                {tool.value}
                              </span>
                            )}

                            {index < items.length - 1 && (
                              <span
                                className="ml-1 select-none text-border"
                                aria-hidden="true"
                              >
                                /
                              </span>
                            )}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm leading-relaxed text-text-secondary">
                        {category.description}
                      </p>
                    </div>

                    {items.some(
                      (tool) => tool.subValue && tool.subDownload,
                    ) && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {items
                          .filter((tool) => tool.subValue && tool.subDownload)
                          .map((tool) => (
                            <Button
                              key={tool.id}
                              type="button"
                              asChild
                              size="sm"
                              className="self-start rounded-lg bg-accent font-mono text-xs text-on-accent hover:bg-accent/90"
                            >
                              <Link
                                href={tool.subDownload!}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {tool.subValue}
                              </Link>
                            </Button>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
