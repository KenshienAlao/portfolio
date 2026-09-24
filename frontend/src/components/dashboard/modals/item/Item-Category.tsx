import { SetupCategory } from "@/service/setup.service";
import { FieldError, fieldLabel, inputClass } from "../form-styles";

interface props {
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
  isLoading: boolean;
  categoryError?: { message?: string };
  categories: SetupCategory[];
}

export function Category({
  selectedCategoryId,
  setSelectedCategoryId,
  isLoading,
  categoryError,
  categories,
}: props) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="category" className={fieldLabel}>
        Category
      </label>
      <select
        id="category"
        aria-label="Category"
        required
        name="categoryId"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
        disabled={isLoading}
        className={inputClass(Boolean(categoryError))}
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.category}
          </option>
        ))}
      </select>
      {categoryError && <FieldError>{categoryError.message}</FieldError>}
    </div>
  );
}
