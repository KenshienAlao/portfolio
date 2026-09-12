import { Project } from "@/service/project.service";
import { FaPlus } from "react-icons/fa";

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
        <h2 className="flex items-center gap-2 text-lg font-bold text-text-primary">
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
              className="text-[11px] text-text-muted"
            >
              Sort:
            </label>
            <select
              id="dashboard-sort-projects"
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "latest" | "oldest")
              }
              className="cursor-pointer rounded-lg border border-border bg-surface px-2 py-1 text-xs text-text-primary transition-colors hover:border-accent/50 focus:border-accent focus:outline-none"
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
        className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-on-accent hover:opacity-90 font-mono transition-opacity"
      >
        <FaPlus className="h-4 w-4" /> Add Project
      </button>
    </div>
  );
}
