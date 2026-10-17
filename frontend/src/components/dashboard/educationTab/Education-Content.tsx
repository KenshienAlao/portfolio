import { Education } from "@/service/education.service";
import { Dispatch, SetStateAction } from "react";
import { ExternalLink, MapPin, Trash, Edit, Loader } from "@/components/icons";
import {
  btnDanger,
  btnGhost,
  btnSecondary,
} from "@/components/dashboard/modals/form-styles";

interface props {
  sortedEducation: Education[] | undefined;
  setEducationForm: Dispatch<SetStateAction<Partial<Education | null>>>;
  confirmDeleteId: number | null;
  setConfirmDeleteId: Dispatch<SetStateAction<number | null>>;
  isDeletingEducation: boolean;
  deletingEducationId: number | undefined;
  deleteEducation: (id: number) => void;
}

export function Content({
  sortedEducation,
  setEducationForm,
  confirmDeleteId,
  setConfirmDeleteId,
  isDeletingEducation,
  deletingEducationId,
  deleteEducation,
}: props) {
  return (
    <div className="space-y-4">
      {sortedEducation?.map((item) => {
        const isPendingCreate = item.id < 0;
        const isDeletingThis =
          isDeletingEducation && deletingEducationId === item.id;
        const isConfirmingDelete = confirmDeleteId === item.id;
        const actionsDisabled = isPendingCreate || isDeletingThis;

        return (
          <div
            key={item.id}
            className={`flex flex-col justify-between gap-4 border border-border bg-background p-5 transition-colors hover:bg-subtle md:flex-row ${
              isPendingCreate ? "opacity-60" : ""
            }`}
          >
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-bold text-text-primary">
                  {item.school}
                </h4>
                <span className="rounded-lg border border-border bg-subtle px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-text-secondary">
                  {item.yearStart} - {item.yearEnd}
                </span>
              </div>
              <p className="text-sm font-medium text-text-primary">
                {item.degree}
              </p>
              <p className="max-w-3xl text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
              {item.location && (
                <a
                  href={item.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary underline underline-offset-4 transition-colors hover:text-accent"
                >
                  <MapPin className="h-3 w-3" /> Map Location{" "}
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              )}
            </div>
            <div className="flex shrink-0 items-end justify-start gap-1 md:flex-col">
              {isConfirmingDelete ? (
                <div className="flex flex-col gap-2">
                  <span className="text-center font-mono text-xs uppercase tracking-wider text-text-secondary">
                    Are you sure?
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        deleteEducation(item.id);
                        setConfirmDeleteId(null);
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-transparent bg-destructive px-4 py-2.5 text-sm font-medium text-background transition-colors hover:opacity-90"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(null)}
                      className={btnSecondary}
                    >
                      No
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setEducationForm(item)}
                    disabled={actionsDisabled}
                    className={btnGhost}
                  >
                    <Edit className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(item.id)}
                    disabled={actionsDisabled}
                    className={btnDanger}
                  >
                    {isDeletingThis ? (
                      <>
                        <Loader className="h-3.5 w-3.5 animate-spin" />{" "}
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash className="h-3.5 w-3.5" /> Delete
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
