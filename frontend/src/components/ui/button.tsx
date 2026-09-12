import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium outline-none transition-colors disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring/40",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        outline:
          "border border-border bg-card text-foreground hover:border-accent hover:bg-accent/10 hover:text-accent",

        secondary:
          "border border-transparent bg-secondary text-secondary-foreground hover:border-border hover:bg-muted",

        ghost: "text-foreground hover:bg-accent-light hover:text-accent",

        link: "p-0 font-semibold text-accent underline-offset-4 hover:underline",
      },

      size: {
        default: "h-11 px-5 py-2.5",

        sm: "h-9 rounded-md px-3.5 text-xs",

        lg: "h-13 rounded-xl px-7 text-base tracking-tight",

        icon: "size-11 rounded-lg",

        "icon-sm": "size-9 rounded-md",

        "icon-lg": "size-13 rounded-xl",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
