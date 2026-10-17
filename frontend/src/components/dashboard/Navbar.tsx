"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, Search, X } from "@/components/icons";
import { ThemeTogglerButton } from "@/components/theme-toggle";
import { useDismiss } from "@/hooks/use-dismiss";
import { useLogout } from "@/hooks/use-logout";

const iconButton =
  "flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-background text-text-secondary transition-colors duration-150 hover:border-text-primary hover:text-text-primary rounded-full cursor-pointer";

export function Navbar() {
  const { logout } = useLogout();
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useDismiss(navRef, () => setMenu(false), menu);

  const closeMenu = () => setMenu(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div ref={navRef} className="flex h-14 items-center gap-1.5 px-3 sm:px-6">
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <form
            onSubmit={(event) => event.preventDefault()}
            className="hidden items-center border border-border bg-background md:flex rounded-lg"
          >
            <input
              type="search"
              name="q"
              placeholder="Search…"
              aria-label="Search dashboard"
              className="h-8 w-40 bg-transparent px-3 text-xs font-mono text-text-primary placeholder:text-text-secondary/60 focus:outline-none lg:w-52 rounded-lg"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex h-8 w-8 items-center justify-center border-l border-border text-text-secondary transition-colors duration-150 hover:text-text-primary rounded-full cursor-pointer"
            >
              <Search className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </form>

          <button
            type="button"
            onClick={() => setSearchOpen((value) => !value)}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            className={`${iconButton} md:hidden`}
          >
            {searchOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Search className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <ThemeTogglerButton />

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menu}
              aria-label="Account menu"
              className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-text-primary font-mono text-xs font-bold text-background transition-opacity hover:opacity-90 rounded-full cursor-pointer"
            >
              K
            </button>

            {menu && (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 w-72 border border-border bg-background p-4 rounded-lg shadow-none"
              >
                <div className="flex flex-col items-center border-b border-border pb-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center border border-border bg-text-primary font-mono text-base font-bold text-background mb-3 rounded-full">
                    K
                  </div>
                  <p className="text-sm font-bold text-text-primary tracking-tight">
                    Kenshien Alao
                  </p>
                  <p className="mt-0.5 font-mono text-xs text-text-secondary">
                    kenshienalao@gmail.com
                  </p>
                </div>
                <div className="mt-3 space-y-1.5">
                  <Link
                    href="/?clear=session"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center gap-2 border border-border bg-background px-3 py-2 font-mono text-xs text-text-primary transition-colors hover:bg-subtle rounded-lg cursor-pointer"
                  >
                    <span>View Public Site</span>
                    <ExternalLink className="h-3.5 w-3.5 text-text-secondary" />
                  </Link>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      closeMenu();
                      logout();
                    }}
                    className="flex w-full items-center justify-center gap-2 border border-transparent bg-subtle px-3 py-2 font-mono text-xs text-text-primary transition-colors hover:bg-border/40 rounded-lg cursor-pointer"
                  >
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {searchOpen && (
        <form
          onSubmit={(event) => event.preventDefault()}
          className="border-t border-border p-3 md:hidden"
        >
          <div className="flex items-center border border-border bg-background rounded-lg">
            <input
              type="search"
              name="q"
              placeholder="Search…"
              aria-label="Search dashboard"
              autoFocus
              className="h-9 w-full bg-transparent px-3 text-sm font-mono text-text-primary placeholder:text-text-secondary/60 focus:outline-none rounded-lg"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex h-9 w-9 shrink-0 items-center justify-center border-l border-border text-text-secondary transition-colors duration-150 hover:text-text-primary rounded-lg cursor-pointer"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      )}
    </header>
  );
}
