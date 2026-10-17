import Image from "next/image";
import { Trash, Edit, Loader } from "@/components/icons";
import { Project } from "@/hooks/admin/use-project-admin";
import { btnGhost, btnDanger } from "../modals/form-styles";

interface props {
  projects: Project[];
  isDeletingProject: boolean;
  deletingProjectId: number | undefined;
  confirmDeleteId: number | null;
  setProjectForm: (project: Partial<Project>) => void;
  setConfirmDeleteId: (id: number | null) => void;
  deleteProject: (id: number) => void;
}

export function Content({
  projects,
  isDeletingProject,
  deletingProjectId,
  confirmDeleteId,
  setProjectForm,
  setConfirmDeleteId,
  deleteProject,
}: props) {
  const MAX_VISIBLE_TAGS = 3;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects?.map((project) => {
        const isPendingCreate = project.id < 0;
        const isDeletingThis =
          isDeletingProject && deletingProjectId === project.id;
        const isConfirmingDelete = confirmDeleteId === project.id;
        const actionsDisabled = isPendingCreate || isDeletingThis;

        return (
          <article
            key={project.id}
            className="flex flex-col overflow-hidden border border-border bg-background transition-colors"
          >
            <div className="relative aspect-video overflow-hidden border-b border-border bg-subtle">
              {project.image ? (
                <div className="w-full h-full relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="640px"
                    priority
                    unoptimized={project.image.startsWith("blob:")}
                    className={`object-cover ${isPendingCreate ? "opacity-50 grayscale-50" : ""}`}
                  />
                  {isPendingCreate && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                      <Loader className="h-6 w-6 text-accent animate-spin" />
                    </div>
                  )}
                </div>
              ) : isPendingCreate ? (
                <div className="w-full h-full bg-subtle animate-pulse flex items-center justify-center">
                  <Loader className="h-6 w-6 text-accent animate-spin opacity-50" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-secondary font-mono text-xs">
                  No image
                </div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col gap-3">
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-text-primary">
                    {project.title}
                  </h3>
                  {project.addedAt && (
                    <span className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                      {project.addedAt}
                    </span>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  {isConfirmingDelete ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          deleteProject(project.id);
                          setConfirmDeleteId(null);
                        }}
                        className="rounded-lg bg-destructive px-2 py-1 font-mono text-[10px] font-semibold text-background transition-opacity hover:opacity-90"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="rounded-lg border border-border px-2 py-1 font-mono text-[10px] text-text-secondary transition-colors hover:border-text-primary hover:text-text-primary"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setProjectForm(project)}
                        disabled={actionsDisabled}
                        aria-label="Edit project"
                        className={`${btnGhost} disabled:hover:text-text-secondary`}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(project.id)}
                        disabled={actionsDisabled}
                        aria-label="Delete project"
                        className={`${btnDanger} disabled:hover:text-text-secondary`}
                      >
                        {isDeletingThis ? (
                          <Loader className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-auto">
                {project.tags.slice(0, MAX_VISIBLE_TAGS).map((t, idx) => (
                  <span
                    key={`${t}-${idx}`}
                    className="rounded-lg border border-border bg-subtle px-2 py-0.5 font-mono text-[10px] text-text-secondary"
                  >
                    {t}
                  </span>
                ))}
                {project.tags.length > MAX_VISIBLE_TAGS && (
                  <span className="rounded-lg border border-border bg-subtle px-2 py-0.5 font-mono text-[10px] text-text-secondary">
                    +{project.tags.length - MAX_VISIBLE_TAGS}
                  </span>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
