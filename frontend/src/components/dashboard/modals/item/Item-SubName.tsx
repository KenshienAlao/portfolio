import { SetupItem } from "@/service/setup.service";
import { fieldLabel, inputClass } from "../form-styles";

interface props {
  itemForm: Partial<SetupItem>;
  isLoading: boolean;
}

export function SubName({ itemForm, isLoading }: props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <label htmlFor="subValue" className={fieldLabel}>
          Sub-button text{" "}
          <span className="normal-case text-text-secondary/50">(optional)</span>
        </label>
        <input
          id="subValue"
          aria-label="Sub-Button Text"
          name="subValue"
          defaultValue={itemForm.subValue || ""}
          disabled={isLoading}
          placeholder="Download my Config"
          className={inputClass()}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="subDownload" className={fieldLabel}>
          Sub-button URL{" "}
          <span className="normal-case text-text-secondary/50">(optional)</span>
        </label>
        <input
          id="subDownload"
          aria-label="Sub-Button URL"
          name="subDownload"
          defaultValue={itemForm.subDownload || ""}
          disabled={isLoading}
          placeholder="https://github.com/..."
          className={inputClass()}
        />
      </div>
    </div>
  );
}
