import { Skill } from "@/service/skill.service";
import Image from "next/image";
import { Edit, Loader, Trash } from "@/components/icons";
import {
  btnDanger,
  btnGhost,
  panel,
} from "@/components/dashboard/modals/form-styles";

interface props {
  groupedSkills: Record<string, Skill[]>;
  setSkillForm: (skill: Partial<Skill>) => void;
  deleteSkill: (skillId: number) => void;
  isDeletingSkill: boolean;
  deletingSkillId: number | undefined;
  confirmDeleteId: number | null;
  setConfirmDeleteId: (id: number | null) => void;
}

export function Content({
  groupedSkills,
  setSkillForm,
  deleteSkill,
  isDeletingSkill,
  deletingSkillId,
  confirmDeleteId,
  setConfirmDeleteId,
}: props) {
  return (
    <div className="space-y-8">
      {Object.entries(groupedSkills).map(([category, list]) => (
        <div
          key={category}
          className={`${panel} space-y-4`}
        >
          <h3 className="border-b border-border pb-2 text-sm font-bold text-text-primary capitalize">
            {category}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {list.map((skill) => {
              const isPendingCreate = skill.id < 0;
              const isDeletingThis =
                isDeletingSkill && deletingSkillId === skill.id;
              const isConfirmingDelete = confirmDeleteId === skill.id;
              const actionsDisabled = isPendingCreate || isDeletingThis;

              return (
                <div
                  key={skill.id}
                  className={`flex items-center justify-between border p-3 transition-colors ${
                    isPendingCreate
                      ? "border-accent bg-subtle"
                      : "border-border bg-background hover:bg-subtle"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isPendingCreate ? "animate-pulse opacity-70" : ""
                    }`}
                  >
                    {skill.imageLight ? (
                      <div
                        className={`relative h-4 w-4 shrink-0 ${skill.imageDark ? "dark:hidden" : ""}`}
                      >
                        <Image
                          src={skill.imageLight as string}
                          alt={skill.name}
                          fill
                          sizes="16px"
                          priority
                          unoptimized={String(skill.imageLight).startsWith(
                            "blob:",
                          )}
                          className="object-contain"
                        />
                      </div>
                    ) : null}
                    {skill.imageDark ? (
                      <div className="relative h-4 w-4 shrink-0 hidden dark:block">
                        <Image
                          src={skill.imageDark as string}
                          alt={skill.name}
                          fill
                          sizes="16px"
                          priority
                          unoptimized={String(skill.imageDark).startsWith(
                            "blob:",
                          )}
                          className="object-contain"
                        />
                      </div>
                    ) : null}
                    <span className="block font-mono text-xs font-bold text-text-primary">
                      {skill.name}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {isPendingCreate ? (
                      <span className="flex items-center gap-1 font-mono text-xs font-medium text-accent">
                        <Loader className="h-3 w-3 animate-spin" />
                        Saving
                      </span>
                    ) : isConfirmingDelete ? (
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-center font-mono text-xs font-semibold text-destructive">
                          Sure?
                        </span>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              deleteSkill(skill.id);
                              setConfirmDeleteId(null);
                            }}
                            className="rounded-lg bg-destructive px-2 py-1 font-mono text-xs font-semibold text-background transition-colors hover:opacity-80"
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-lg border border-border bg-background px-2 py-1 font-mono text-xs text-text-secondary transition-colors hover:border-text-primary hover:text-text-primary"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setSkillForm(skill)}
                          disabled={actionsDisabled}
                          className={`${btnGhost} hover:bg-subtle`}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(skill.id)}
                          disabled={actionsDisabled}
                          className={`${btnDanger} hover:bg-subtle`}
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
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
