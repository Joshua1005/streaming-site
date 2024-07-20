"use client";

import { memo } from "react";
import { CaptionsIcon } from "../icons/captions-icon";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {
  isSubtitlesEnabled: boolean;
};

const CaptionsButton = memo(({ isSubtitlesEnabled }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type={"button"}
          size="icon"
          variant="ghost"
          className="w-9 h-9 hover:bg-black/50 rounded-full"
        >
          {isSubtitlesEnabled ? (
            <CaptionsIcon className="w-6 h-6 fill-red-500" />
          ) : (
            <CaptionsIcon className="w-6 h-6 fill-white" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isSubtitlesEnabled ? "Disable Subtitles" : "Enable Subtitles"}</p>
      </TooltipContent>
    </Tooltip>
  );
});

export { CaptionsButton };
