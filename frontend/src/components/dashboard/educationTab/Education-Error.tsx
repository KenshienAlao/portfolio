import { AlertCircle } from "@/components/icons";
import { btnSecondary } from "@/components/dashboard/modals/form-styles";

interface props {
  educationError: Error;
  refetchEducation: () => void;
}
export function FetchError({ educationError, refetchEducation }: props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border border-border bg-background px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center border border-border bg-subtle">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-text-primary">
          Couldn&apos;t load education
        </h3>
        <p className="max-w-xs text-xs text-text-secondary">
          {educationError.message || "Something went wrong. Please try again."}
        </p>
      </div>
      <button
        type="button"
        onClick={() => refetchEducation()}
        className={`mt-2 ${btnSecondary}`}
      >
        Retry
      </button>
    </div>
  );
}
