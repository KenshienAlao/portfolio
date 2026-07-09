const sp = { type: "spring" as const, stiffness: 400, damping: 28 };

// Page section stagger
export const containerVars = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
} as const;

export const itemVars = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ...sp, stiffness: 300, damping: 24 } },
} as const;

export const hoverTap = { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } } as const;

// Mobile nav menu
export const menuVars = {
  initial: { opacity: 0, scaleY: 0.96 },
  animate: { opacity: 1, scaleY: 1, transition: { ...sp, staggerChildren: 0.06, delayChildren: 0.02 } },
  exit: { opacity: 0, scaleY: 0.98, transition: { ...sp, staggerChildren: 0.04, staggerDirection: -1 } },
};

export const linkVars = {
  initial: { opacity: 1, y: 12 },
  animate: { opacity: 1, y: 0, transition: sp },
  exit: { opacity: 1, x: -10, transition: { duration: 0.12 } },
} as const;

// Footer 
export const footerVars = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
      staggerChildren: 0.06,
    }
  }
} as const;