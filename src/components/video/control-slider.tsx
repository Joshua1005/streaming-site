"use client";

import React, { memo } from "react";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";

type Props = {
  value: number[];
  max: number;
  handler: (value: number[]) => void;
  className?: string;
};

const ControlSlider = memo(({ value, max, handler, className }: Props) => {
  return (
    <Slider
      className={cn(
        "cursor-pointer w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-red-500 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-red-500 [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform",
        className
      )}
      value={value}
      onValueChange={handler}
      max={max}
    />
  );
});

export { ControlSlider };
