"use client";

import { CONTACT_LINKS } from "@/config/contanct";

export function SocialButton() {
  return (
    <div className="flex items-center gap-1.5">
      {CONTACT_LINKS.map(({ value, href, icon: Icon }, i) => (
        <a
          key={`${value}-${href}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`fade-in stagger-${(i % 10) + 1} flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background text-muted-foreground shadow-sm transition-transform hover:scale-110 active:scale-95 active:bg-accent active:text-foreground`}
          aria-label={value}
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}
