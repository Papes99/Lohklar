import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[transform,background-color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-fg hover:bg-primary-hover",
        secondary:
          "bg-surface text-ink shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
        ghost: "text-ink hover:bg-bg-subtle",
        danger: "bg-danger text-danger-fg hover:opacity-90",
        link: "text-primary underline-offset-4 hover:underline h-auto px-0",
      },
      size: {
        sm: "min-h-11 px-3 text-sm rounded-[var(--radius-sm)]",
        md: "min-h-11 px-4 text-base rounded-[var(--radius-md)]",
        lg: "min-h-12 px-5 text-base rounded-[var(--radius-lg)]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...(asChild ? {} : { type: "button" })}
      {...props}
    />
  );
}
