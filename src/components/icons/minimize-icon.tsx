import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface Props extends React.SVGProps<SVGSVGElement> {}

const MinimizeIcon = forwardRef<SVGSVGElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        className={cn(className)}
        ref={ref}
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 3v3a2 2 0 0 1-2 2H3" />
        <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
        <path d="M3 16h3a2 2 0 0 1 2 2v3" />
        <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
      </svg>
    );
  }
);

export { MinimizeIcon };
