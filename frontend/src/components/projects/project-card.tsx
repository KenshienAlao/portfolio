import Link from "next/link";
import Image from "next/image";
import { type Project } from "@/service/project.service";
import { formatProjectDate } from "@/lib/format-date";

export function ProjectCard({ project }: { project: Project }) {
  const { title, image, description, tags, github, demo, addedAt } = project;

  return (
    <article className="border-b border-border py-8">
      <div className="flex flex-col sm:flex-row gap-6">
        {image && (
          <div className="sm:w-56 md:w-64 shrink-0">
            <Link
              href={demo || github || "#"}
              target={demo || github ? "_blank" : undefined}
              rel={demo || github ? "noopener noreferrer" : undefined}
              className="group block relative aspect-video w-full overflow-hidden border border-border bg-subtle rounded-lg cursor-pointer"
              tabIndex={demo || github ? 0 : -1}
            >
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, 256px"
                className="object-cover"
              />
            </Link>
          </div>
        )}

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
              <h3>
                <Link
                  href={demo || github || "#"}
                  target={demo || github ? "_blank" : undefined}
                  rel={demo || github ? "noopener noreferrer" : undefined}
                  className="text-lg font-bold tracking-tight text-text-primary hover:text-accent transition-colors cursor-pointer"
                >
                  {title}
                </Link>
              </h3>
              {addedAt && (
                <time className="shrink-0 font-mono text-xs text-text-secondary uppercase tracking-wider">
                  {formatProjectDate(addedAt)}
                </time>
              )}
            </div>

            <p className="mt-2 text-sm leading-relaxed text-text-secondary max-w-[65ch] text-pretty">
              {description}
            </p>

            {tags && tags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-secondary">
                {tags.map((tag, idx) => (
                  <span key={tag} className="inline-flex items-center gap-3">
                    <span>{tag}</span>
                    {idx < tags.length - 1 && (
                      <span
                        className="text-border select-none"
                        aria-hidden="true"
                      >
                        /
                      </span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center gap-6 font-mono text-xs">
            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-text-primary underline underline-offset-4 hover:text-accent transition-colors cursor-pointer"
              >
                <span>Source Code</span>
              </Link>
            )}
            {demo && (
              <Link
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-text-primary underline underline-offset-4 hover:text-accent transition-colors cursor-pointer"
              >
                <span>Live Demo</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
