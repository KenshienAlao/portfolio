"use client";

import { BaseModal, ModalFooter } from "./BaseModal";
import {
  useAddCategory,
  useEditCategory,
  type SetupCategory,
} from "@/hooks/admin/use-setup-admin";
import { FormEvent, useState } from "react";
import { Save, AlertCircle, Loader } from "@/components/icons";
import z, { ZodError } from "zod";
import { Section } from "./Section";
import { FieldError, fieldLabel, inputClass } from "./form-styles";

const categorySchema = z.object({
  category: z
    .string()
    .min(1, "Category name is required")
    .max(100, "Max 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Max 1000 characters"),
});

interface CategoryModalProps {
  categoryForm: Partial<SetupCategory>;
  setCategoryForm: (category: Partial<SetupCategory> | null) => void;
}

export function CategoryModal({
  categoryForm,
  setCategoryForm,
}: CategoryModalProps) {
  const {
    mutate: addCategory,
    isPending: isLoadingAdd,
    error: errorAdd,
  } = useAddCategory();
  const {
    mutate: editCategory,
    isPending: isLoadingEdit,
    error: errorEdit,
  } = useEditCategory();

  const isEdit = typeof categoryForm.id === "number" && categoryForm.id > 0;
  const isLoading = isLoadingAdd || isLoadingEdit;

  const [validateError, setValidateError] = useState<ZodError | null>(null);

  const error = validateError?.issues[0] || errorAdd || errorEdit;
  const categoryError =
    error && "path" in error && error.path[0] === "category"
      ? error
      : undefined;
  const descriptionError =
    error && "path" in error && error.path[0] === "description"
      ? error
      : undefined;
  const hasFieldError = Boolean(categoryError || descriptionError);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const category = (formData.get("category") as string)?.trim() || "";
    const description = (formData.get("description") as string)?.trim() || "";

    const result = categorySchema.safeParse({ category, description });
    if (!result.success) {
      setValidateError(result.error);
      return;
    }

    setValidateError(null);

    if (isEdit && categoryForm.id !== undefined) {
      editCategory({ id: categoryForm.id, data: { category, description } });
    } else {
      addCategory({ category, description });
    }

    setCategoryForm(null);
  };

  return (
    <BaseModal onClose={() => setCategoryForm(null)} maxWidth="max-w-md">
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className="space-y-4 text-text-primary"
      >
        <Section title="Category" />
        <div className="space-y-1.5">
          <label htmlFor="category" className={fieldLabel}>
            Category name
          </label>
          <input
            id="category"
            aria-label="Category Name"
            required
            name="category"
            defaultValue={categoryForm.category || ""}
            disabled={isLoading}
            placeholder="Operating System, Code Editor, Terminal..."
            className={inputClass(Boolean(categoryError))}
          />
          {categoryError && <FieldError>{categoryError.message}</FieldError>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="description" className={fieldLabel}>
            Description
          </label>
          <textarea
            id="description"
            aria-label="Description"
            required
            name="description"
            rows={3}
            defaultValue={categoryForm.description || ""}
            disabled={isLoading}
            placeholder="Describe the category, workflow, or environment..."
            className={`${inputClass(Boolean(descriptionError))} resize-none`}
          />
          {descriptionError && (
            <FieldError>{descriptionError.message}</FieldError>
          )}
        </div>

        {error && !hasFieldError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-destructive"
          >
            <AlertCircle
              className="mt-0.5 h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
            />
            <span>{error.message}</span>
          </div>
        )}

        <ModalFooter
          onCancel={() => setCategoryForm(null)}
          cancelDisabled={isLoading}
        >
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-mono text-sm font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {isEdit ? "Save changes" : "Create category"}
              </>
            )}
          </button>
        </ModalFooter>
      </form>
    </BaseModal>
  );
}
