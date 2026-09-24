import { FieldError, fieldLabel, inputClass } from "../form-styles";

interface SkillNameProps {
  defaultValue?: string;
  disabled?: boolean;
  nameError?: { message: string };
}

export function SkillName({
  defaultValue = "",
  disabled = false,
  nameError,
}: SkillNameProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="name" className={fieldLabel}>
        Skill name
      </label>
      <input
        id="name"
        aria-label="Skill name"
        name="name"
        defaultValue={defaultValue}
        disabled={disabled}
        aria-invalid={nameError ? "true" : "false"}
        placeholder="e.g. React, TypeScript, Docker"
        className={inputClass(Boolean(nameError))}
      />
      {nameError && <FieldError>{nameError.message}</FieldError>}
    </div>
  );
}
