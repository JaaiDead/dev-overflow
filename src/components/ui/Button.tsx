import { forwardRef, useRef, MouseEvent as ReactMouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { usePrefersReducedMotion } from "../../hooks";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 font-mono font-medium tracking-wide rounded-full select-none transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary dark:bg-dark-primary text-white dark:text-dark-bg shadow-lg shadow-primary/20 dark:shadow-glow-primary hover:brightness-110 dark:hover:shadow-glow-primary-lg",
        outline:
          "border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary bg-transparent hover:border-primary/60 dark:hover:border-dark-primary/60 hover:text-primary dark:hover:text-dark-primary",
        ghost:
          "text-text-dim dark:text-dark-text-dim hover:text-text-primary dark:hover:text-dark-text-primary",
      },
      size: {
        sm: "text-xs px-4 py-2",
        md: "text-sm px-6 py-3",
        lg: "text-base px-8 py-4",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  magnetic?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = true, children, ...props }, forwardedRef) => {
    const innerRef = useRef<HTMLButtonElement | null>(null);
    const reducedMotion = usePrefersReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

    const active = magnetic && !reducedMotion;

    const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
      if (!active || !innerRef.current) return;
      const rect = innerRef.current.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.button
        ref={(node) => {
          innerRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={cn(buttonVariants({ variant, size }), className)}
        data-magnetic={active ? "true" : undefined}
        style={active ? { x: springX, y: springY } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  },
);
Button.displayName = "Button";

export default Button;
