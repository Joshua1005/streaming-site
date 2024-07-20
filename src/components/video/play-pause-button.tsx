"use client";

import { PauseIcon } from "@/components/icons/pause-icon";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { PlayIcon } from "../icons/play-icon";
import { memo } from "react";

type Props = {
  handler: () => void;
  isPlaying: boolean;
};

const PlayPauseButton = memo(({ handler, isPlaying }: Props) => {
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
          {isPlaying ? (
            <PauseIcon className="w-6 h-6 fill-white" />
          ) : (
            <PlayIcon className="w-6 h-6 fill-white" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isPlaying ? "Pause" : "Play"}</p>
      </TooltipContent>
    </Tooltip>
  );
});

export { PlayPauseButton };
