import { cn } from "@/lib/utils";
import * as VisuallyHiddenPrimatives from "@radix-ui/react-visually-hidden";
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from "react";

const VisuallyHidden = forwardRef<
  React.ElementRef<typeof VisuallyHiddenPrimatives.Root>,
  VisuallyHiddenPrimatives.VisuallyHiddenProps
>(({ className, children, ...props }, ref) => {
  return (
    <VisuallyHiddenPrimatives.Root
      className={cn(className)}
      {...props}
      ref={ref}
    >
      {children}
    </VisuallyHiddenPrimatives.Root>
  );
});

export { VisuallyHidden };
