import { Search } from "lucide-react";
import React, { forwardRef } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    return (
      <section className={"relative flex-1 max-w-md mx-4 flex items-center"}>
        <Search
          className={"absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"}
        />
        <Input
          className={cn(
            "w-full rounded-md bg-muted pl-8 pr-4 py-2 text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      </section>
    );
  }
);

export { SearchBar };
