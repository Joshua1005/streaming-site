"use client";

import React, { memo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { AirplayIcon } from "../icons/air-play-icon";
import { Button } from "../ui/button";

type Props = {
  playbackRate: number;
  handler: (playbackRate: string) => void;
};

const PlaybackSpeedButton = memo(({ playbackRate, handler }: Props) => {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              type={"button"}
              size="icon"
              variant="ghost"
              className="w-9 h-9 hover:bg-black/50 rounded-full"
            >
              <AirplayIcon className="w-6 h-6 fill-white" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Playback speed</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuRadioGroup
          value={`${playbackRate}`}
          onValueChange={(playbackRate) => handler(playbackRate)}
        >
          <DropdownMenuRadioItem value={"0.5"}>0.5x</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"1"}>Normal</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"1.5"}>1.5x</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"1.75"}>1.75x</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"2"}>2x</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export { PlaybackSpeedButton };
