import { SetupItem } from "@/service/setup.service";
import { FieldError, fieldLabel, inputClass } from "../form-styles";

interface props {
  itemForm: Partial<SetupItem>;
  valueError?: { message?: string };
  isLoading: boolean;
}

export function Name({ itemForm, valueError, isLoading }: props) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="item" className={fieldLabel}>
        Tool / item name
      </label>
      <input
        id="item"
        aria-label="Tool / Item Name"
        required
        name="value"
        defaultValue={itemForm.value || ""}
        disabled={isLoading}
        placeholder="VS Codium, Arch Linux, Alacritty..."
        className={inputClass(Boolean(valueError))}
      />
      {valueError && <FieldError>{valueError.message}</FieldError>}
    </div>
  );
}
