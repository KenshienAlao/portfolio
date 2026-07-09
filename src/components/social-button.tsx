"use client";

import { CONTACT_LINKS } from "@/config/contanct";
import { m } from "framer-motion";

export function SocialButton() {
  return (
    <m.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative flex h-12 w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-background shadow-sm transition-all duration-300 hover:border-border hover:shadow-md"
    >
      <m.span
        variants={{
          rest: { y: 0, opacity: 1 },
          hover: { y: -40, opacity: 0 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute flex h-full w-full items-center justify-center text-sm font-medium tracking-wide text-muted-foreground"
      >
        Social
      </m.span>

      <m.div
        variants={{
          rest: { y: 40 },
          hover: { y: 0 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="absolute flex h-full w-full items-center justify-center gap-2"
      >
        {CONTACT_LINKS.map(({ value, href, icon: Icon }, i) => (
          <m.a
            key={`${value}-${href}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              rest: { opacity: 0, scale: 0.5 },
              hover: {
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                  delay: i * 0.05,
                },
              },
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label={value}
          >
            <Icon className="h-5 w-5" />
          </m.a>
        ))}
      </m.div>
    </m.div>
  );
}
