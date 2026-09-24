"use client";

import { useMemo, useRef, useState } from "react";
import { Plus, X } from "@/components/icons";
import { FieldError, fieldLabel } from "./form-styles";

interface TagInputProps {
  name: string;
  label: string;
  defaultValue?: string[];
  suggestions?: string[];
  placeholder?: string;
  disabled?: boolean;
  error?: { message?: string };
}

export function TagInput({
  name,
  label,
  defaultValue = [],
  suggestions = [],
  placeholder = "Add a tag",
  disabled = false,
  error,
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(defaultValue);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const normalized = useMemo(
    () => Array.from(new Set(tags.map((t) => t.trim()).filter(Boolean))),
    [tags],
  );

  const selected = useMemo(
    () => new Set(normalized.map((t) => t.toLowerCase())),
    [normalized],
  );

  const visibleSuggestions = useMemo(() => {
    const query = draft.trim().toLowerCase();
    return suggestions
      .filter((s) => !selected.has(s.toLowerCase()))
      .filter((s) => s.toLowerCase().includes(query))
      .slice(0, 6);
  }, [suggestions, selected, draft]);

  const addTag = (raw: string) => {
    const value = raw.trim();
    if (!value) return;
    setTags((prev) =>
      selected.has(value.toLowerCase()) ? prev : [...prev, value],
    );
  };

  const addSuggestion = (suggestion: string) => {
    addTag(suggestion);
    setDraft("");
    inputRef.current?.focus();
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(draft);
      setDraft("");
    } else if (e.key === "Backspace" && draft === "" && normalized.length) {
      removeTag(normalized[normalized.length - 1]);
    }
  };

  const value = normalized.join(", ");

  return (
    <div className="space-y-1.5">
      <label htmlFor={`${name}-input`} className={fieldLabel}>
        {label}
      </label>

      <div
        className={`flex cursor-text flex-wrap items-center gap-1.5 rounded-lg border bg-input/40 px-2 py-1.5 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25 ${
          error ? "border-destructive/60" : "border-border"
        } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
        onClick={() => inputRef.current?.focus()}
      >
        {normalized.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-mono text-xs font-medium text-on-accent"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              disabled={disabled}
              aria-label={`Remove ${tag}`}
              className="rounded-full p-0.5 opacity-70 transition-opacity hover:opacity-100 disabled:cursor-not-allowed"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          id={`${name}-input`}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (draft.trim()) {
              addTag(draft);
              setDraft("");
            }
          }}
          disabled={disabled}
          placeholder={normalized.length ? "Add another…" : placeholder}
          className="min-w-[8rem] flex-1 bg-transparent px-1.5 py-1 font-mono text-sm text-text-primary outline-none placeholder:text-text-secondary/50 disabled:cursor-not-allowed"
        />
      </div>

      <input type="hidden" name={name} value={value} />

      {error && <FieldError>{error.message}</FieldError>}

      {visibleSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {visibleSuggestions.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => addSuggestion(s)}
              disabled={disabled}
              className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1 font-mono text-xs text-text-secondary transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus className="h-3 w-3" aria-hidden="true" />
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}