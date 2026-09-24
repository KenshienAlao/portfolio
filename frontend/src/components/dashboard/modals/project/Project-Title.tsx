import {
  FieldError,
  fieldLabel,
  inputClass,
} from "../form-styles";

interface ProjectTitleProps {
  defaultValue?: string;
  disabled?: boolean;
  titleError?: { message: string };
}

export function ProjectTitle({
  defaultValue = "",
  disabled = false,
  titleError,
}: ProjectTitleProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="title" className={fieldLabel}>
        Title
      </label>
      <input
        id="title"
        aria-label="Title"
        name="title"
        defaultValue={defaultValue}
        disabled={disabled}
        aria-invalid={titleError ? "true" : "false"}
        placeholder="e.g. Portfolio Website"
        className={inputClass(Boolean(titleError))}
      />
      {titleError && <FieldError>{titleError.message}</FieldError>}
    </div>
  );
}
