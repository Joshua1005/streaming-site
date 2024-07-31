import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {}

const Header = forwardRef<HTMLHeadElement, HeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <header
        className={cn(
          "flex h-16 items-center justify-between px-4 md:px-6 absolute top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        )}
        ref={ref}
        {...props}
      >
        {children}
      </header>
    );
  }
);

export { Header };
