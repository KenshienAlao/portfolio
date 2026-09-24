import Image from "next/image";
import { ChangeEvent, RefObject } from "react";
import { ImagePlus } from "@/components/icons";
import { FieldError, fieldLabel } from "../form-styles";

interface SkillImageDarkProps {
  darkPreview: string | null;
  darkFileName: string | null;
  darkInputRef: RefObject<HTMLInputElement | null>;
  disabled?: boolean;
  imageDarkError?: { message: string };
  onDarkImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveDarkImage: () => void;
}

export function SkillImageDark({
  darkPreview,
  darkFileName,
  darkInputRef,
  disabled = false,
  imageDarkError,
  onDarkImageChange,
  onRemoveDarkImage,
}: SkillImageDarkProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="imageDark" className={fieldLabel}>
        Image (dark mode){" "}
        <span className="normal-case text-text-secondary/50">— optional</span>
      </label>
      <label
        htmlFor="imageDark"
        className={`flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-dashed bg-input/40 px-3 py-4 text-center transition-colors ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-accent/60"
        } ${imageDarkError ? "border-destructive/60" : "border-border"}`}
      >
        {darkPreview ? (
          <div className="relative h-20 w-full overflow-hidden rounded">
            <Image
              src={darkPreview}
              alt={darkFileName || "Dark mode preview"}
              fill
              sizes="(max-width: 640px) 100vw, 448px"
              unoptimized={darkPreview.startsWith("blob:")}
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
              Click to upload a dark-mode icon (optional)
            </span>
          </>
        )}
      </label>
      <input
        ref={darkInputRef}
        id="imageDark"
        aria-label="Logo / Icon (Dark Mode)"
        type="file"
        name="imageDark"
        accept="image/*"
        onChange={onDarkImageChange}
        disabled={disabled}
        aria-invalid={imageDarkError ? "true" : "false"}
        className="hidden"
      />
      {darkPreview && (
        <div className="flex items-center justify-between font-mono text-xs text-text-secondary">
          <span className="truncate">{darkFileName ?? "Current image"}</span>
          <button
            type="button"
            onClick={onRemoveDarkImage}
            disabled={disabled}
            className="text-destructive hover:underline disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:no-underline"
          >
            Remove
          </button>
        </div>
      )}
      {imageDarkError && <FieldError>{imageDarkError.message}</FieldError>}
    </div>
  );
}
