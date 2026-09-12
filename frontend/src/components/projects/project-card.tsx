import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type Project } from "@/service/project.service";
import { formatProjectDate } from "@/lib/format-date";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const { title, description, image, tags, github, demo, addedAt } = project;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface hover:border-accent/40">
      <div className="relative aspect-video overflow-hidden border-b border-border">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-mono text-base font-bold text-text-primary">
            {title}
          </h3>
          {addedAt && (
            <span className="shrink-0 font-mono text-[11px] text-text-secondary">
              {formatProjectDate(addedAt)}
            </span>
          )}
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-2 pt-2">
          <Button
            type="button"
            asChild
            size="sm"
            variant="outline"
            className="rounded-lg border-border text-text-primary hover:border-accent/50 hover:bg-background"
          >
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
              aria-label={`View ${title} on GitHub`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="h-4 w-4"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>{" "}
              Code
            </Link>
          </Button>
          {demo && (
            <Button
              type="button"
              asChild
              size="sm"
              className="rounded-lg bg-accent text-on-accent hover:bg-accent/90"
            >
              <Link
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-1.5"
                aria-label={`View ${title} demo`}
              >
                Demo{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                </svg>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
