import { FieldError, fieldLabel, inputClass } from "../form-styles";

const SKILL_CATEGORIES = [
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Platforms",
];

interface SkillCategoryProps {
  defaultValue?: string;
  disabled?: boolean;
  categoryError?: { message: string };
}

export function SkillCategory({
  defaultValue = "",
  disabled = false,
  categoryError,
}: SkillCategoryProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="category" className={fieldLabel}>
        Category
      </label>
      <select
        id="category"
        aria-label="Category"
        name="category"
        defaultValue={defaultValue}
        disabled={disabled}
        aria-invalid={categoryError ? "true" : "false"}
        className={inputClass(Boolean(categoryError))}
      >
        <option value="" disabled>
          Select category
        </option>
        {SKILL_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {categoryError && <FieldError>{categoryError.message}</FieldError>}
    </div>
  );
}
