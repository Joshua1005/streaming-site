"use client";

import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { PlayPauseButton } from "./play-pause-button";
import { formatTime } from "@/lib/format-time";
import { FullScreenButton } from "./fullscreen-button";
import { CaptionsButton } from "./captions-button";
import { PlaybackSpeedButton } from "./playback-speed-button";
import { PictureInPictureButton } from "./picture-in-picture-button";
import { ControlSlider } from "./control-slider";
import { videoReducer } from "@/reducers/video-reducer";
import { CODES } from "@/constants";
import { useVideo } from "@/hooks/use-video";

type Props = {
  src: string;
  enableKeyEvent?: boolean;
};

const VideoPlayer = ({ src, enableKeyEvent }: Props) => {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    state,
    dispatch,
    handleTogglePause,
    handleToggleFullscreen,
    handleTogglePictureInPicture,
    handleChangingPlaybackRate,
    handleChangingVolume,
    handleChangingCurrentTime,
    handleSettingDuration,
    handleKeyEvent,
    initialize,
    deinitialize,
  } = useVideo(videoRef);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const handleLoadedData = () => {
      handleSettingDuration();
      initialize();
    };

    handleLoadedData();
    videoElement.addEventListener("loadeddata", handleLoadedData);

    if (!enableKeyEvent) return;
    document.addEventListener("keydown", handleKeyEvent);

    return () => {
      videoElement.removeEventListener("loadeddata", handleLoadedData);
      if (!enableKeyEvent) return;
      document.removeEventListener("keydown", handleKeyEvent);
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-lg aspect-video bg-gray-900 text-white">
      <video
        onClick={handleTogglePause}
        onRateChange={(e) =>
          dispatch({
            type: "SET_PLAYBACK_RATE",
            payload: { playbackRate: e.currentTarget.playbackRate },
          })
        }
        onPlay={() =>
          dispatch({ type: "SET_IS_PLAYING", payload: { isPlaying: true } })
        }
        onPause={() =>
          dispatch({ type: "SET_IS_PLAYING", payload: { isPlaying: false } })
        }
        onVolumeChange={(e) =>
          dispatch({
            type: "SET_VOLUME",
            payload: { volume: e.currentTarget.volume },
          })
        }
        onTimeUpdate={(e) =>
          dispatch({
            type: "SET_CURRENT_TIME",
            payload: { currentTime: e.currentTarget.currentTime },
          })
        }
        ref={videoRef}
        className="w-full"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support video element.
      </video>
      <div className="absolute inset-x-0 bottom-0 grid gap-2 bg-gradient-to-b from-transparent to-black/50 p-4">
        <div className="flex items-center gap-3 [&_svg]:text-white">
          <PlayPauseButton
            handler={handleTogglePause}
            isPlaying={state.isPlaying}
          />
          <ControlSlider
            className={"flex-1"}
            value={[state.currentTime]}
            handler={handleChangingCurrentTime}
            max={state.duration}
          />
          <div className="text-sm">
            {formatTime(state.currentTime)}/{formatTime(state.duration)}
          </div>
          <ControlSlider
            value={useMemo(() => [state.volume * 100], [state.volume])}
            handler={handleChangingVolume}
            max={100}
          />
          <FullScreenButton
            isFullscreen={state.isFullscreen}
            handler={handleToggleFullscreen}
          />
          <CaptionsButton isSubtitlesEnabled={state.isSubtitlesEnabled} />
          <PlaybackSpeedButton
            playbackRate={state.playbackRate}
            handler={handleChangingPlaybackRate}
          />
          <PictureInPictureButton
            isPictureInPicture={state.isPictureInPicture}
            handler={handleTogglePictureInPicture}
          />
        </div>
      </div>
    </div>
  );
};

export { VideoPlayer };
