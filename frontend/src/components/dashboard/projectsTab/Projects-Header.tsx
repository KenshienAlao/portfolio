import { Project } from "@/service/project.service";
import { Plus } from "@/components/icons";
import { btnPrimary } from "../modals/form-styles";

interface props {
  projects: Project[] | undefined;
  hasProjects: boolean;
  sortOrder: "latest" | "oldest";
  setSortOrder: (order: "latest" | "oldest") => void;
  setProjectForm: (project: Partial<Project>) => void;
}

export function Header({
  projects,
  hasProjects,
  sortOrder,
  setSortOrder,
  setProjectForm,
}: props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <h2 className="flex items-center gap-2 text-sm font-bold text-text-primary">
          {projects?.length !== 1 ? "Totals" : "Total"}
          {hasProjects && (
            <span className="font-mono text-xs font-normal text-text-secondary">
              ({projects?.length})
            </span>
          )}
        </h2>

        {hasProjects && (
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <label
              htmlFor="dashboard-sort-projects"
              className="text-xs font-mono uppercase tracking-wider text-text-secondary"
            >
              Sort:
            </label>
            <select
              id="dashboard-sort-projects"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "latest" | "oldest")
              }
              className="cursor-pointer rounded-lg border border-border bg-background px-2 py-1 text-xs text-text-primary transition-colors hover:border-text-primary"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setProjectForm({})}
        className={btnPrimary}
      >
        <Plus className="h-4 w-4" /> Add Project
      </button>
    </div>
  );
}
