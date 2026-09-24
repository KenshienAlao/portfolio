import { SetupItem } from "@/service/setup.service";
import { FieldError, fieldLabel, inputClass } from "../form-styles";

interface props {
  itemForm: Partial<SetupItem>;
  downloadError?: { message?: string };
  isLoading: boolean;
}

export function WebsiteUrl({ itemForm, downloadError, isLoading }: props) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="download" className={fieldLabel}>
        Download / website URL
      </label>
      <input
        id="download"
        aria-label="Download / Website URL"
        required
        name="download"
        defaultValue={itemForm.download || ""}
        disabled={isLoading}
        placeholder="https://vscodium.com"
        className={inputClass(Boolean(downloadError))}
      />
      {downloadError && <FieldError>{downloadError.message}</FieldError>}
    </div>
  );
}
