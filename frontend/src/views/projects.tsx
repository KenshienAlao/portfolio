import { SectionHeader } from "@/components/section-header";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectSort } from "@/components/projects/project-sort";
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

export function Projects({
  projects,
  sort = "latest",
}: {
  projects?: Project[] | null;
  sort?: "latest" | "oldest";
}) {
  const projectList = Array.isArray(projects) ? projects : [];
  const sortedProjects = sortProjects(projectList, sort);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <SectionHeader
          path="~/projects"
          command="ls -la"
          title="Projects"
          description="Selected work showcasing full-stack development, UI design, and problem solving."
        />

        {projectList.length > 0 && <ProjectSort />}

        {sortedProjects.length === 0 ? (
          <div className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 py-12 text-center">
            <h3 className="font-mono text-base font-bold text-text-primary">
              No projects available
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Check back later for updates to this section.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                priority={idx === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
