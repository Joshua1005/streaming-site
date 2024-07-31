import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VideoContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const VideoContainer = forwardRef<HTMLDivElement, VideoContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative w-full max-w-xl overflow-hidden rounded-lg aspect-video bg-primary grid place-items-center",
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoProps>(
  ({ className, src, ...props }, ref) => {
    return (
      <video
        ref={ref}
        className={cn("w-full h-full cursor-pointer", className)}
        {...props}
      >
        <source src={src} />
        Your browser does not support video element.
      </video>
    );
  }
);

interface VideoControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

const VideoControls = forwardRef<HTMLDivElement, VideoControlsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 grid gap-2 bg-gradient-to-b from-transparent to-black/50 p-4",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-3 [&_svg]:text-white">
          {children}
        </div>
      </div>
    );
  }
);

interface VideoSliderProps
  extends React.ComponentPropsWithoutRef<typeof Slider> {}

const VideoSlider = forwardRef<
  React.ElementRef<typeof Slider>,
  VideoSliderProps
>(({ className, ...props }, ref) => {
  return (
    <Slider
      className={cn(
        "cursor-pointer [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-red-500 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-red-500 [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

interface VideoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state: boolean;
  trueIcon: React.ReactNode;
  falseIcon: React.ReactNode;
}

const VideoButton = forwardRef<HTMLButtonElement, VideoButtonProps>(
  ({ className, title, state, trueIcon, falseIcon, ...props }, ref) => {
    const tooltipContent = title?.split(":");

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type={"button"}
              variant={"ghost"}
              size={"icon"}
              className={cn("rounded-full hover:bg-black/50", className)}
              ref={ref}
              {...props}
            >
              {state ? trueIcon : falseIcon}
            </Button>
          </TooltipTrigger>
          {tooltipContent ? (
            <TooltipContent>
              {state ? tooltipContent[0] : tooltipContent[1]}
            </TooltipContent>
          ) : null}
        </Tooltip>
      </TooltipProvider>
    );
  }
);

interface VideoTimeProps extends React.HTMLAttributes<HTMLDivElement> {}

const VideoTime = forwardRef<HTMLDivElement, VideoTimeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn("text-sm text-center text-white", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

VideoContainer.displayName = "VideoContainer";
VideoPlayer.displayName = "VideoPlayer";
VideoControls.displayName = "VideoControls";
VideoSlider.displayName = "VideoSlider";
VideoTime.displayName = "VideoTime";

export {
  VideoContainer,
  VideoPlayer,
  VideoControls,
  VideoSlider,
  VideoButton,
  VideoTime,
};
