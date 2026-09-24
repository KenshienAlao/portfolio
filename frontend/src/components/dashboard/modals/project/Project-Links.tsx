import { FieldError, fieldLabel, inputClass } from "../form-styles";

interface ProjectLinksProps {
  githubDefault?: string;
  demoDefault?: string;
  disabled?: boolean;
  githubError?: { message: string };
  demoError?: { message: string };
}

export function ProjectLinks({
  githubDefault = "",
  demoDefault = "",
  disabled = false,
  githubError,
  demoError,
}: ProjectLinksProps) {
  return (
    <>
      <div className="space-y-1.5">
        <label htmlFor="github" className={fieldLabel}>
          GitHub repository URL
        </label>
        <input
          id="github"
          aria-label="GitHub repository URL"
          type="url"
          name="github"
          defaultValue={githubDefault}
          disabled={disabled}
          aria-invalid={githubError ? "true" : "false"}
          placeholder="https://github.com/kenshien/..."
          className={inputClass(Boolean(githubError))}
        />
        {githubError && <FieldError>{githubError.message}</FieldError>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="demo" className={fieldLabel}>
          Live demo URL
        </label>
        <input
          id="demo"
          aria-label="Live demo URL"
          type="url"
          name="demo"
          defaultValue={demoDefault}
          disabled={disabled}
          aria-invalid={demoError ? "true" : "false"}
          placeholder="https://..."
          className={inputClass(Boolean(demoError))}
        />
        {demoError && <FieldError>{demoError.message}</FieldError>}
      </div>
    </>
  );
}