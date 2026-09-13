import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogTitle = RadixDialog.Title;
export const DialogDescription = RadixDialog.Description;
export const DialogClose = RadixDialog.Close;

export function DialogContent({
  className,
  children,
  showClose = true,
  ...props
}: RadixDialog.DialogContentProps & { showClose?: boolean }) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm data-[state=open]:animate-fade-in" />
      <RadixDialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-[101] w-[92vw] max-w-2xl max-h-[85vh] overflow-y-auto glass-strong rounded-2xl p-6 md:p-8 focus:outline-none data-[state=open]:animate-dialog-in",
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <RadixDialog.Close
            className="absolute top-4 right-4 rounded-full p-2 text-text-dim dark:text-dark-text-dim hover:text-text-primary dark:hover:text-dark-text-primary hover:bg-surface-2 dark:hover:bg-dark-surface-2 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}
