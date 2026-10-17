"use client";

import { SectionHeader } from "@/components/section-header";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectSortDropdown } from "@/components/projects/project-sort-dropdown";
import { useProjects } from "@/hooks/use-public-data";
import { type Project } from "@/service/project.service";

function sortProjects(
  projects: Project[],
  order: "latest" | "oldest",
): Project[] {
  return [...projects].sort((a, b) => {
    const timeA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
    const timeB = b.addedAt ? new Date(b.addedAt).getTime() : 0;

    if (timeA && timeB && timeA !== timeB) {
      return order === "latest" ? timeB - timeA : timeA - timeB;
    }
    return order === "latest"
      ? (b.id ?? 0) - (a.id ?? 0)
      : (a.id ?? 0) - (b.id ?? 0);
  });
}

export function Projects({ sort = "latest" }: { sort?: "latest" | "oldest" }) {
  const { data: projects, isLoading } = useProjects();
  const projectList = Array.isArray(projects) ? projects : [];
  const sortedProjects = sortProjects(projectList, sort);

  return (
    <section className="container max-w-5xl mx-auto py-24 px-4 sm:px-6">
      <SectionHeader
        title="Projects"
        description="A collection of projects I've built."
      />

      {projectList.length > 0 && (
        <div className="mt-8 flex justify-end">
          <ProjectSortDropdown />
        </div>
      )}

      {isLoading ? (
        <div
          className="mt-12 border-t border-border skeleton-scope"
          role="status"
          aria-busy="true"
          aria-label="Loading projects"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="border-b border-border py-8 flex flex-col sm:flex-row gap-6"
            >
              <div className="aspect-video w-full sm:w-56 md:w-64 shrink-0 skeleton border border-border" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-48 skeleton" />
                <div className="h-4 w-full max-w-[65ch] skeleton" />
                <div className="h-4 w-3/4 max-w-[40ch] skeleton" />
              </div>
            </div>
          ))}
        </div>
      ) : sortedProjects.length === 0 ? (
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-sm font-mono text-text-primary">
            No projects yet.
          </p>
          <p className="mt-1 text-sm text-text-secondary text-pretty">
            Projects will appear here once they&apos;re added.
          </p>
        </div>
      ) : (
        <div className="mt-12 border-t border-border">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
