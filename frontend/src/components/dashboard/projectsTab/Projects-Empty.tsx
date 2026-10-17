import { Project } from "@/hooks/admin/use-project-admin";
import { FolderOpen, Plus } from "@/components/icons";
import { btnPrimary } from "../modals/form-styles";

interface props {
  setProjectForm: (project: Partial<Project>) => void;
}

export function Empty({ setProjectForm }: props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-border bg-background px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center border border-border bg-subtle">
        <FolderOpen className="h-6 w-6 text-text-secondary" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-text-primary">
          No projects yet
        </h3>
      </div>
      <button
        type="button"
        onClick={() => setProjectForm({})}
        className={`mt-2 ${btnPrimary}`}
      >
        <Plus className="h-4 w-4" /> Add Project
      </button>
    </div>
  );
}
