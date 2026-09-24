import Image from "next/image";
import { ChangeEvent, RefObject } from "react";
import { ImagePlus } from "@/components/icons";
import { FieldError, fieldLabel } from "../form-styles";

interface SkillImageLightProps {
  lightPreview: string | null;
  lightFileName: string | null;
  lightInputRef: RefObject<HTMLInputElement | null>;
  disabled?: boolean;
  imageLightError?: { message: string };
  onLightImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveLightImage: () => void;
}

export function SkillImageLight({
  lightPreview,
  lightFileName,
  lightInputRef,
  disabled = false,
  imageLightError,
  onLightImageChange,
  onRemoveLightImage,
}: SkillImageLightProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="imageLight" className={fieldLabel}>
        Image (light mode)
      </label>
      <label
        htmlFor="imageLight"
        className={`flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-dashed bg-input/40 px-3 py-4 text-center transition-colors ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-accent/60"
        } ${imageLightError ? "border-destructive/60" : "border-border"}`}
      >
        {lightPreview ? (
          <div className="relative h-20 w-full overflow-hidden rounded">
            <Image
              src={lightPreview}
              alt={lightFileName || "Light mode preview"}
              fill
              sizes="(max-width: 640px) 100vw, 448px"
              unoptimized={lightPreview.startsWith("blob:")}
              className="object-contain"
            />
          </div>
        ) : (
          <>
            <ImagePlus
              className="h-5 w-5 text-text-secondary"
              aria-hidden="true"
            />
            <span className="font-mono text-xs text-text-secondary">
              Click to upload a light-mode icon (max 25MB)
            </span>
          </>
        )}
      </label>
      <input
        ref={lightInputRef}
        id="imageLight"
        aria-label="Logo / Icon (Light Mode)"
        type="file"
        name="imageLight"
        accept="image/*"
        onChange={onLightImageChange}
        disabled={disabled}
        aria-invalid={imageLightError ? "true" : "false"}
        className="hidden"
      />
      {lightPreview && (
        <div className="flex items-center justify-between font-mono text-xs text-text-secondary">
          <span className="truncate">{lightFileName ?? "Current image"}</span>
          <button
            type="button"
            onClick={onRemoveLightImage}
            disabled={disabled}
            className="text-destructive hover:underline disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:no-underline"
          >
            Remove
          </button>
        </div>
      )}
      {imageLightError && <FieldError>{imageLightError.message}</FieldError>}
    </div>
  );
}
