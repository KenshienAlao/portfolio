import { Dispatch, SetStateAction } from "react";
import { Skill } from "@/hooks/admin/use-skill-admin";
import { Plus, Zap } from "@/components/icons";
import { btnPrimary } from "@/components/dashboard/modals/form-styles";

interface props {
  setSkillForm: Dispatch<SetStateAction<Partial<Skill> | null>>;
}

export function Empty({ setSkillForm }: props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-background px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center border border-border bg-subtle">
        <Zap className="h-6 w-6 text-text-secondary" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-text-primary">No skills yet</h3>
      </div>
      <button
        type="button"
        onClick={() => setSkillForm({})}
        className={`${btnPrimary} mt-2`}
      >
        <Plus className="h-4 w-4" /> Add Skill
      </button>
    </div>
  );
}
