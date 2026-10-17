"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Tabs } from "./ui/vercel-tabs";
import { ThemeTogglerButton } from "./theme-toggle";
import { AnimatedHamburger } from "./ui/animated-hamburger";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
  { label: "Education", href: "/education" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const tabs = NAV_ITEMS.map((item) => ({
    id: item.href,
    label: item.label,
  }));

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsMounted(true);
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsMounted(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container max-w-5xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
        <Link
          href="/login"
          className="text-sm font-mono font-bold tracking-tight text-text-primary hover:text-accent transition-colors"
          aria-label="Kenshien Alao — Home"
        >
          Kenshien Alao
        </Link>

        <nav
          className="hidden md:flex items-center gap-x-6"
          aria-label="Main navigation"
        >
          <Tabs
            tabs={tabs}
            activeTab={pathname}
            onTabChange={(tabId) => router.push(tabId)}
          />
          <div className="pl-2 border-l border-border">
            <ThemeTogglerButton />
          </div>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeTogglerButton />
          <button
            onClick={handleToggle}
            className="p-2 border border-border bg-background text-text-primary hover:bg-subtle transition-colors rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <AnimatedHamburger isOpen={isOpen} />
          </button>
        </div>
      </div>

      {isMounted && (
        <div
          onAnimationEnd={handleAnimationEnd}
          className={`absolute top-full left-0 right-0 md:hidden border-b border-border bg-background px-6 py-6 ${
            isOpen ? "mobile-nav-enter" : "mobile-nav-exit"
          }`}
        >
          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map(({ label, href }) => {
                const isActive =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={handleClose}
                      className={`block text-xs font-mono uppercase tracking-wider transition-colors py-1.5 border-b border-border/50 pb-3 ${
                        isActive
                          ? "text-text-primary font-bold"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
