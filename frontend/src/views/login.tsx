"use client";

import { FormEvent, useState } from "react";
import z, { ZodError } from "zod";
import { useLoginMutation } from "@/hooks/use-auth";

const validate = z.object({
  code: z.string().min(1, "Code is required").trim(),
  password: z.string().min(1, "Password is required").trim(),
});

export type TLogin = z.infer<typeof validate>;

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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-24">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div className="gradient-mesh" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md">
        <p className="mb-8 flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-accent sm:text-sm">
          <span className="text-text-secondary">~/auth</span>
          <span className="text-text-secondary">$</span>
          <span>./login --admin</span>
        </p>

        <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft-lg md:p-8">
          <div className="mb-6 flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full bg-accent/40" />
            <span className="h-3 w-3 rounded-full bg-accent/70" />
            <span className="ml-3 font-mono text-xs text-text-secondary">
              login.sh
            </span>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-text-primary md:text-3xl">
            Portfolio Command Center
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            A private workspace to manage my portfolio, projects, and incoming
            feedback.
          </p>

          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="code"
                className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-text-secondary"
              >
                code
              </label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary"
                  aria-hidden="true"
                >
                  <path d="M223.5-423.5Q200-447 200-480t23.5-56.5Q247-560 280-560t56.5 23.5Q360-513 360-480t-23.5 56.5Q313-400 280-400t-56.5-23.5ZM280-240q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
                </svg>
                <input
                  type="text"
                  name="code"
                  id="code"
                  placeholder="enter code here"
                  disabled={isLoadingLogin}
                  aria-invalid={codeError ? "true" : "false"}
                  className={`w-full rounded-md border bg-background py-2.5 pl-10 pr-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/60 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                    codeError
                      ? "border-destructive/60 focus:border-destructive focus:ring-destructive/30"
                      : "border-border focus:border-accent focus:ring-accent/30"
                  }`}
                />
              </div>
              {codeError && (
                <p
                  role="alert"
                  className="mt-1.5 font-mono text-xs text-destructive"
                >
                  {codeError.message}
                </p>
              )}
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block font-mono text-[11px] uppercase tracking-widest text-text-secondary"
                >
                  password
                </label>
              </div>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary"
                  aria-hidden="true"
                >
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  disabled={isLoadingLogin}
                  aria-invalid={passwordError ? "true" : "false"}
                  className={`w-full rounded-md border bg-background py-2.5 pl-10 pr-10 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/60 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                    passwordError
                      ? "border-destructive/60 focus:border-destructive focus:ring-destructive/30"
                      : "border-border focus:border-accent focus:ring-accent/30"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoadingLogin}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && (
                <p
                  role="alert"
                  className="mt-1.5 font-mono text-xs text-destructive"
                >
                  {passwordError.message}
                </p>
              )}
            </div>

            {error && !codeError && !passwordError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 font-mono text-xs text-destructive"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="currentColor"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M508.5-291.5Q520-303 520-320t-11.5-28.5Q497-360 480-360t-28.5 11.5Q440-337 440-320t11.5 28.5Q463-280 480-280t28.5-11.5ZM440-440h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
                <span>{error.message}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoadingLogin}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoadingLogin ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    fill="currentColor"
                    className="h-5 w-5 animate-spin"
                    aria-hidden="true"
                  >
                    <path d="M325-111.5q-73-31.5-127.5-86t-86-127.5Q80-398 80-480.5t31.5-155q31.5-72.5 86-127t127.5-86Q398-880 480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480.5-80Q398-80 325-111.5Z" />
                  </svg>
                  logging in...
                </>
              ) : (
                "log in"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
