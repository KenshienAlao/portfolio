import { Plus } from "@/components/icons";
import { Dispatch, SetStateAction } from "react";
import { Skill } from "@/hooks/admin/use-skill-admin";
import { btnPrimary } from "@/components/dashboard/modals/form-styles";

interface props {
  categoryCount: number;
  hasSkills: boolean;
  setSkillForm: Dispatch<SetStateAction<Partial<Skill> | null>>;
}

export function Header({ categoryCount, hasSkills, setSkillForm }: props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="flex items-center gap-2 text-sm font-bold text-text-primary">
          {categoryCount !== 1 ? "Categories" : "Category"}
          {hasSkills && (
            <span className="font-mono text-xs font-normal text-text-secondary">
              ({categoryCount})
            </span>
          )}
        </h2>
      </div>
      <button
        type="button"
        onClick={() => setSkillForm({})}
        className={btnPrimary}
      >
        <Plus className="h-4 w-4" /> Add Skill
      </button>
    </div>
  );
}
