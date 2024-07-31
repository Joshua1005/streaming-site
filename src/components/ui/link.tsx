import { cn } from "@/lib/utils";
import * as LinkPrimitives from "next/link";
import { forwardRef } from "react";

interface AProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
}

const Link = forwardRef<HTMLAnchorElement, AProps>(
  ({ className, children, href, ...props }, ref) => {
    return (
      <LinkPrimitives.default
        className={cn(
          "text-sm font-medium text-muted-foreground hover:text-foreground flex justify-center items-center",
          className
        )}
        href={href}
        ref={ref}
        {...props}
      >
        {children}
      </LinkPrimitives.default>
    );
  }
);

export { Link };
