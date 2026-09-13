import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-mono text-[11px] px-2.5 py-1 border transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-border dark:border-dark-border text-text-dim dark:text-dark-text-dim bg-surface-2/60 dark:bg-dark-surface-2/60",
        primary:
          "border-primary/30 dark:border-dark-primary/30 text-primary dark:text-dark-primary bg-primary/[0.06] dark:bg-dark-primary/[0.08]",
        secondary:
          "border-secondary/30 dark:border-dark-secondary/30 text-secondary dark:text-dark-secondary bg-secondary/[0.06] dark:bg-dark-secondary/[0.08]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export default function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
