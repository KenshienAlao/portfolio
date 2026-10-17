import { GraduationCap, Plus } from "@/components/icons";
import { Education } from "@/hooks/admin/use-education-admin";
import { btnPrimary } from "@/components/dashboard/modals/form-styles";

interface props {
  setEducationForm: (education: Partial<Education>) => void;
}

export function Empty({ setEducationForm }: props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-border bg-background px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center border border-border bg-subtle">
        <GraduationCap className="h-6 w-6 text-text-secondary" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-text-primary">
          No education yet
        </h3>
      </div>
      <button
        type="button"
        onClick={() => setEducationForm({})}
        className={`mt-2 ${btnPrimary}`}
      >
        <Plus className="h-4 w-4" /> Add Education
      </button>
    </div>
  );
}
