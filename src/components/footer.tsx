import { m } from "framer-motion";
import { footerVars, itemVars } from "./animation/ani";
import { SocialButton } from "./social-button";

export function Footer() {
  return (
    <m.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={footerVars}
      className="relative border-t border-border/40 bg-background/30 backdrop-blur-xl py-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-to-t from-accent/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center gap-6 relative z-10">
        <div className="flex items-center gap-3">
          <SocialButton />
        </div>

        <m.div
          variants={itemVars}
          className="flex flex-col items-center gap-1.5 text-center"
        >
          <p className="text-sm font-semibold tracking-tight text-text-primary/90">
            Built with dedication and attention to detail.
          </p>
          <p
            className="text-xs text-text-secondary/70 tracking-wide"
            suppressHydrationWarning
          >
            &copy; {new Date().getFullYear()}{" "}
            <span className="relative inline-block text-text-primary font-bold after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-accent after:transition-all after:duration-300 cursor-default">
              Kenshien Alao
            </span>
            . All rights reserved.
          </p>
        </m.div>
      </div>
    </m.footer>
  );
}
