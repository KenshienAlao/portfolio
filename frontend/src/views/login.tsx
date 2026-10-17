"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import z, { ZodError } from "zod";
import { useLoginMutation } from "@/hooks/use-auth";
import {
  AlertCircle,
  ChevronLeft,
  Eye,
  EyeOff,
  Loader,
} from "@/components/icons";

const validate = z.object({
  code: z.string().min(1, "Code is required").trim(),
  password: z.string().min(1, "Password is required").trim(),
});

export type TLogin = z.infer<typeof validate>;

const LABEL_CLASS =
  "text-xs font-mono uppercase tracking-wider text-text-secondary";

function inputClass(invalid: boolean) {
  return `w-full border bg-background px-4 py-3 text-sm font-mono text-text-primary transition-colors duration-150 placeholder:text-text-secondary/60 focus:outline-none rounded-lg disabled:cursor-not-allowed disabled:opacity-60 ${
    invalid
      ? "border-destructive focus:border-destructive"
      : "border-border focus:border-text-primary"
  }`;
}

export function Login() {
  const {
    mutate: login,
    isPending: isLoadingLogin,
    error: errorLogin,
  } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isErrorValidate, setIsErrorValidate] = useState<ZodError | null>(null);

  const error = isErrorValidate?.issues[0] || errorLogin;
  const codeError =
    error && "path" in error && error.path[0] === "code" ? error : undefined;
  const passwordError =
    error && "path" in error && error.path[0] === "password"
      ? error
      : undefined;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoadingLogin) return;

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = validate.safeParse(data);

    if (!result.success) {
      setIsErrorValidate(result.error);
      return;
    }
    setIsErrorValidate(null);
    login(result.data);
  };

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 sm:px-6 py-16">
      <div className="w-full max-w-sm">
        <header className="mb-8">
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-text-primary text-balance">
            Log in
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary text-pretty">
            Workspace to manage the portfolio, projects, and messages.
          </p>
        </header>

        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="code" className={LABEL_CLASS}>
              Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              placeholder="Enter access code"
              disabled={isLoadingLogin}
              aria-invalid={codeError ? "true" : "false"}
              aria-describedby={codeError ? "code-error" : undefined}
              className={inputClass(Boolean(codeError))}
            />
            {codeError && (
              <p
                id="code-error"
                role="alert"
                className="text-xs font-mono text-destructive text-pretty"
              >
                {codeError.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className={LABEL_CLASS}>
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                disabled={isLoadingLogin}
                aria-invalid={passwordError ? "true" : "false"}
                aria-describedby={passwordError ? "password-error" : undefined}
                className={`${inputClass(Boolean(passwordError))} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isLoadingLogin}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-text-secondary transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {passwordError && (
              <p
                id="password-error"
                role="alert"
                className="text-xs font-mono text-destructive text-pretty"
              >
                {passwordError.message}
              </p>
            )}
          </div>

          {error && !codeError && !passwordError && (
            <div
              role="alert"
              className="flex items-start gap-2 border border-destructive bg-background px-3 py-2.5 text-xs text-destructive"
            >
              <AlertCircle
                className="mt-px h-3.5 w-3.5 shrink-0"
                aria-hidden="true"
              />
              <span className="text-pretty">{error.message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoadingLogin}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 border border-transparent bg-text-primary px-6 py-3 text-sm font-medium text-background transition-colors hover:opacity-90 rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoadingLogin ? (
              <>
                <Loader className="h-4 w-4 animate-spin" aria-hidden="true" />
                Logging in…
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <p className="mt-8 text-xs font-mono text-text-secondary">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span className="text-pretty">Back to site</span>
          </Link>
        </p>
      </div>
    </main>
  );
}
