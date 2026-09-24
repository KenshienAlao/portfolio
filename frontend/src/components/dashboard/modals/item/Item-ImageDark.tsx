import Image from "next/image";
import { ChangeEvent } from "react";
import { ImagePlus } from "@/components/icons";
import { FieldError, fieldLabel } from "../form-styles";

interface props {
  imageDarkError?: { message?: string };
  isLoading: boolean;
  handleDarkImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveDarkImage: () => void;
  darkInputRef: React.RefObject<HTMLInputElement | null>;
  darkPreview: string | null;
  darkFileName: string | null;
}

export function ImageDark({
  imageDarkError,
  isLoading,
  handleDarkImageChange,
  handleRemoveDarkImage,
  darkInputRef,
  darkPreview,
  darkFileName,
}: props) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="itemImageDark" className={fieldLabel}>
        Logo / icon (dark mode){" "}
        <span className="normal-case text-text-secondary/50">— optional</span>
      </label>
      <label
        htmlFor="itemImageDark"
        className={`flex flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-dashed bg-input/40 px-3 py-3 text-center transition-colors ${
          isLoading
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-accent/60"
        } ${imageDarkError ? "border-destructive/60" : "border-border"}`}
      >
        {darkPreview ? (
          <div className="relative h-14 w-full overflow-hidden rounded">
            <Image
              src={darkPreview}
              alt={darkFileName || "Dark mode preview"}
              fill
              sizes="(max-width: 640px) 100vw, 448px"
              unoptimized={
                darkPreview.startsWith("blob:") ||
                darkPreview.startsWith("http")
              }
              className="object-contain"
            />
          </div>
        ) : (
          <>
            <ImagePlus
              className="h-4 w-4 text-text-secondary"
              aria-hidden="true"
            />
            <span className="font-mono text-xs text-text-secondary">
              Click to upload dark icon (optional)
            </span>
          </>
        )}
      </label>
      <input
        ref={darkInputRef}
        id="itemImageDark"
        aria-label="Logo / Icon (Dark Mode)"
        type="file"
        name="imageDark"
        accept="image/*"
        onChange={handleDarkImageChange}
        disabled={isLoading}
        className="hidden"
      />
      {darkPreview && (
        <div className="flex items-center justify-between font-mono text-xs text-text-secondary">
          <span className="truncate">{darkFileName ?? "Current image"}</span>
          <button
            type="button"
            onClick={handleRemoveDarkImage}
            disabled={isLoading}
            className="text-destructive hover:underline disabled:cursor-not-allowed disabled:opacity-60"
          >
            Remove
          </button>
        </div>
      )}
      {imageDarkError && <FieldError>{imageDarkError.message}</FieldError>}
    </div>
  );
}
