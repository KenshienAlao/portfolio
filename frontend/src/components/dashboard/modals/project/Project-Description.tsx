import { FieldError, fieldLabel, inputClass } from "../form-styles";

interface ProjectDescriptionProps {
  defaultValue?: string;
  disabled?: boolean;
  descriptionError?: { message: string };
}

export function ProjectDescription({
  defaultValue = "",
  disabled = false,
  descriptionError,
}: ProjectDescriptionProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="description" className={fieldLabel}>
        Description
      </label>
      <textarea
        id="description"
        aria-label="Description"
        name="description"
        rows={3}
        defaultValue={defaultValue}
        disabled={disabled}
        aria-invalid={descriptionError ? "true" : "false"}
        placeholder="What does this project do, and what did you build?"
        className={`${inputClass(Boolean(descriptionError))} resize-none`}
      />
      {descriptionError && <FieldError>{descriptionError.message}</FieldError>}
    </div>
  );
}
