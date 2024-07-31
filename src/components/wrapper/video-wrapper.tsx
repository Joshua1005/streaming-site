"use client";

import {
  VideoContainer,
  VideoControls,
  VideoSlider,
  VideoButton,
  VideoTime,
  VideoPlayer,
} from "@/components/ui/video";
import { useVideo } from "@/hooks/use-video";
import { useEffect, useRef } from "react";
import {
  Pause,
  Play,
  X,
  PictureInPicture,
  Maximize,
  Minimize,
} from "lucide-react";
import { formatTime } from "@/lib/format-time";

type Props = {
  src: string;
  enableKeyEvent?: boolean;
};

function VideoWrapper({ src, enableKeyEvent }: Props) {
  const video = useVideo();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    video.initialize(videoRef, containerRef);

    const handleKeyEvent = (e: KeyboardEvent) =>
      video.keyEvent(e, videoRef, containerRef);

    if (enableKeyEvent) document.addEventListener("keydown", handleKeyEvent);

    return () => {
      video.deinitialize(videoRef, containerRef);
      if (enableKeyEvent)
        document.removeEventListener("keydown", handleKeyEvent);
    };
  }, []);

  return (
    <VideoContainer ref={containerRef}>
      <VideoPlayer
        onClick={() => video.changeIsPlaying(videoRef)}
        onDoubleClick={() => video.changeIsFullscreen(containerRef)}
        onLoadedData={(e) => video.setDuration(e.currentTarget.duration)}
        onVolumeChange={(e) => video.setVolume(e.currentTarget.volume)}
        onPause={(e) => video.setIsPlaying(!e.currentTarget.paused)}
        onPlay={(e) => video.setIsPlaying(!e.currentTarget.paused)}
        onWaiting={() => video.setIsBuffering(true)}
        onCanPlay={() => video.setIsBuffering(false)}
        onTimeUpdate={(e) => video.setCurrentTime(e.currentTarget.currentTime)}
        onRateChange={(e) =>
          video.setPlaybackRate(e.currentTarget.playbackRate)
        }
        ref={videoRef}
        src={src}
      />
      <VideoControls>
        <VideoButton
          state={video.state.isPlaying}
          trueIcon={<Pause />}
          falseIcon={<Play />}
          title="Pause:Play"
          onClick={() => video.changeIsPlaying(videoRef)}
        />
        <VideoSlider
          className="flex-1"
          max={video.state.duration}
          value={[video.state.currentTime]}
          onValueChange={(currentTimeList) =>
            video.changeCurrentTime(videoRef, currentTimeList[0])
          }
        />
        <VideoTime>
          {formatTime(video.state.currentTime)}/
          {formatTime(video.state.duration)}
        </VideoTime>
        <VideoSlider
          className="w-20"
          max={100}
          value={[video.state.volume * 100]}
          onValueChange={(volumeList) =>
            video.changeVolume(videoRef, volumeList[0] / 100)
          }
        />
        <VideoButton
          state={video.state.isFullscreen}
          trueIcon={<Minimize />}
          falseIcon={<Maximize />}
          onClick={() => video.changeIsFullscreen(containerRef)}
        />
        <VideoButton
          state={video.state.isPictureInPicture}
          trueIcon={<X />}
          falseIcon={<PictureInPicture />}
          title="Exit picture in picture:Enter picture in picture"
          onClick={() => video.changePictureInPicture(videoRef)}
        />
      </VideoControls>
    </VideoContainer>
  );
}

export { VideoWrapper };
