import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  message?: string;
  status: string;
  className?: string;
};

function AuthMessage({ message, status, className }: Props) {
  return (
    message && (
      <section
        className={cn(
          "py-2 px-3 rounded-md",
          status === "success"
            ? "bg-emerald-500/20 text-emerald-500"
            : "bg-red-500/20 text-red-500",
          className
        )}
      >
        <p className="text-sm font-medium">{message}</p>
      </section>
    )
  );
}

export { AuthMessage };
