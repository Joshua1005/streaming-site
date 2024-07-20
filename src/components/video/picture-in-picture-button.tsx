"use client";

import React, { memo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { PictureInPictureIcon } from "../icons/picture-in-picture-icon";
import { XIcon } from "../icons/x-icon";
import { Button } from "../ui/button";

type Props = {
  isPictureInPicture: boolean;
  handler: () => void;
};

const PictureInPictureButton = memo(
  ({ isPictureInPicture, handler }: Props) => {
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
            {isPictureInPicture ? (
              <XIcon className="w-6 h-6 fill-white" />
            ) : (
              <PictureInPictureIcon className="w-6 h-6 fill-white" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {isPictureInPicture
              ? "Leave Picture In Picture"
              : "Enter Picture In Picture"}
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }
);

export { PictureInPictureButton };
