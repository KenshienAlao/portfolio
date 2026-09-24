"use client";

import { BaseModal, ModalFooter } from "./BaseModal";
import {
  Education,
  useAddEducation,
  useEditEducation,
} from "@/hooks/admin/use-education-admin";
import { FormEvent, useState } from "react";
import z, { ZodError } from "zod";
import { getYears } from "@/lib/year";
import { Save, AlertCircle, Loader, MapPin } from "@/components/icons";
import { Section } from "./Section";
import { FieldError, fieldLabel, inputClass } from "./form-styles";

const educationFormSchema = z.object({
  school: z.string().min(1, "School is required"),
  degree: z.string().min(1, "Degree is required"),
  yearStart: z.string().min(1, "Start year is required"),
  yearEnd: z.string().min(1, "End year is required"),
  description: z.string().min(1, "Description is required"),
  location: z.url("Invalid URL").min(1, "Location is required"),
});

interface EducationModalProps {
  educationForm: Partial<Education>;
  education: Education[];
  setEducationForm: (education: Partial<Education> | null) => void;
}

export function EducationModal({
  educationForm,
  education,
  setEducationForm,
}: EducationModalProps) {
  const {
    mutate: addEducation,
    isPending: isLoadingAdd,
    error: errorAdd,
  } = useAddEducation();

  const {
    mutate: editEducation,
    isPending: isLoadingEdit,
    error: errorEdit,
  } = useEditEducation();

  const [validateError, setValidateError] = useState<ZodError | null>(null);
  const years = getYears();

  const error = validateError?.issues[0] || errorAdd || errorEdit;
  const schoolError =
    error && "path" in error && error.path[0] === "school" ? error : undefined;
  const degreeError =
    error && "path" in error && error.path[0] === "degree" ? error : undefined;
  const yearStartError =
    error && "path" in error && error.path[0] === "yearStart"
      ? error
      : undefined;
  const yearEndError =
    error && "path" in error && error.path[0] === "yearEnd" ? error : undefined;
  const descriptionError =
    error && "path" in error && error.path[0] === "description"
      ? error
      : undefined;
  const locationError =
    error && "path" in error && error.path[0] === "location"
      ? error
      : undefined;

  const hasFieldError = Boolean(
    schoolError ||
    degreeError ||
    yearStartError ||
    yearEndError ||
    descriptionError ||
    locationError,
  );

  const isEdit =
    educationForm.id && education.some((e) => e.id === educationForm.id);

  const handleSubmitEducation = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoadingAdd || isLoadingEdit) return;

    const formData = new FormData(e.currentTarget);
    const dataToValidate = Object.fromEntries(formData.entries());
    const result = educationFormSchema.safeParse(dataToValidate);

    if (!result.success) {
      setValidateError(result.error);
      return;
    }

    setValidateError(null);

    if (isEdit && educationForm.id !== undefined) {
      formData.append("id", String(educationForm.id));
      editEducation({ id: educationForm.id, data: formData });
    } else {
      addEducation(formData);
    }

    setEducationForm(null);
  };

  return (
    <BaseModal onClose={() => setEducationForm(null)} maxWidth="max-w-lg">
      <form
        onSubmit={handleSubmitEducation}
        noValidate
        autoComplete="off"
        className="space-y-4 text-text-primary"
      >
        <Section title="School" />
        <div className="space-y-1.5">
          <label htmlFor="school" className={fieldLabel}>
            School / institution
          </label>
          <input
            id="school"
            aria-label="School / Institution"
            name="school"
            defaultValue={educationForm.school}
            disabled={isLoadingAdd || isLoadingEdit}
            aria-invalid={schoolError ? "true" : "false"}
            placeholder="e.g. Polytechnic University of the Philippines"
            className={inputClass(Boolean(schoolError))}
          />
          {schoolError && <FieldError>{schoolError.message}</FieldError>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="degree" className={fieldLabel}>
            Degree / course
          </label>
          <input
            id="degree"
            aria-label="Degree / Course"
            name="degree"
            defaultValue={educationForm.degree}
            disabled={isLoadingAdd || isLoadingEdit}
            aria-invalid={degreeError ? "true" : "false"}
            placeholder="e.g. Bachelor of Science in Computer Science"
            className={inputClass(Boolean(degreeError))}
          />
          {degreeError && <FieldError>{degreeError.message}</FieldError>}
        </div>

        <Section title="Duration" />
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label htmlFor="yearStart" className={fieldLabel}>
              Start year
            </label>
            <select
              id="yearStart"
              aria-label="Start Year"
              name="yearStart"
              defaultValue={educationForm.yearStart || ""}
              disabled={isLoadingAdd || isLoadingEdit}
              aria-invalid={yearStartError ? "true" : "false"}
              className={inputClass(Boolean(yearStartError))}
            >
              <option value="" disabled>
                Select year
              </option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {yearStartError && <FieldError>{yearStartError.message}</FieldError>}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="yearEnd" className={fieldLabel}>
              End year
            </label>
            <select
              id="yearEnd"
              aria-label="End Year"
              name="yearEnd"
              defaultValue={educationForm.yearEnd || "Present"}
              disabled={isLoadingAdd || isLoadingEdit}
              aria-invalid={yearEndError ? "true" : "false"}
              className={inputClass(Boolean(yearEndError))}
            >
              <option value="Present">Present</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {yearEndError && <FieldError>{yearEndError.message}</FieldError>}
          </div>
        </div>

        <Section title="Details" />
        <div className="space-y-1.5">
          <label htmlFor="description" className={fieldLabel}>
            Description
          </label>
          <textarea
            id="description"
            aria-label="Description"
            name="description"
            rows={3}
            defaultValue={educationForm.description}
            disabled={isLoadingAdd || isLoadingEdit}
            aria-invalid={descriptionError ? "true" : "false"}
            className={`${inputClass(Boolean(descriptionError))} resize-none`}
          />
          {descriptionError && (
            <FieldError>{descriptionError.message}</FieldError>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="location" className={fieldLabel}>
            Google Maps location link
          </label>
          <div className="relative">
            <MapPin
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <input
              id="location"
              aria-label="Google Maps Location Link"
              type="url"
              name="location"
              defaultValue={educationForm.location}
              placeholder="https://maps.app.goo.gl/..."
              disabled={isLoadingAdd || isLoadingEdit}
              aria-invalid={locationError ? "true" : "false"}
              className={`${inputClass(Boolean(locationError))} pl-9`}
            />
          </div>
          {locationError && <FieldError>{locationError.message}</FieldError>}
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
          onCancel={() => setEducationForm(null)}
          cancelDisabled={isLoadingAdd || isLoadingEdit}
        >
          <button
            type="submit"
            disabled={isLoadingAdd || isLoadingEdit}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-mono text-sm font-semibold text-on-accent transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoadingAdd || isLoadingEdit ? (
              <>
                <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
                Saving...
              </>
            ) : isEdit ? (
              <>
                <Save className="h-4 w-4" /> Save changes
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Add education
              </>
            )}
          </button>
        </ModalFooter>
      </form>
    </BaseModal>
  );
}
