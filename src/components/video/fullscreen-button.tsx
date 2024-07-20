"use client";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import React, { memo } from "react";
import { MaximizeIcon } from "../icons/maximize-icon";
import { MinimizeIcon } from "../icons/minimize-icon";
import { Button } from "../ui/button";

type Props = {
  isFullscreen: boolean;
  handler: () => void;
};

const FullScreenButton = memo(({ isFullscreen, handler }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type={"button"}
          size="icon"
          variant="ghost"
          className="w-9 h-9 hover:bg-black/50 rounded-full"
          onClick={() => handler()}
        >
          {isFullscreen ? (
            <MinimizeIcon className="w-6 h-6 fill-white" />
          ) : (
            <MaximizeIcon className="w-6 h-6 fill-white" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</p>
      </TooltipContent>
    </Tooltip>
  );
});

export { FullScreenButton };
