import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavProps extends React.HTMLAttributes<HTMLElement> {}

const Nav = forwardRef<HTMLDivElement, NavProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav className={cn("flex gap-4", className)} {...props} ref={ref}>
        {children}
      </nav>
    );
  }
);

export { Nav };
