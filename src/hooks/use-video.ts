"use client";

import { CODES } from "@/constants";
import { videoReducer } from "@/reducers/video-reducer";
import { RefObject, useCallback, useReducer } from "react";

const videoState: VideoState = {
  currentTime: 0,
  duration: 0,
  volume: 1,
  playbackRate: 1,
  isPlaying: false,
  isFullscreen: false,
  isPictureInPicture: false,
  isSubtitlesEnabled: false,
};

function useVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  const [state, dispatch] = useReducer(videoReducer, videoState);
  let lastVolume = 0;

  const handleTogglePause = useCallback(
    () =>
      state.isPlaying ? videoRef.current?.pause() : videoRef.current?.play(),
    [state.isPlaying]
  );

  const handleToggleFullscreen = useCallback(
    () =>
      state.isFullscreen
        ? document.exitFullscreen()
        : videoRef.current?.requestFullscreen(),
    [state.isFullscreen]
  );

  const handleTogglePictureInPicture = useCallback(
    () =>
      state.isPictureInPicture
        ? document.exitPictureInPicture()
        : videoRef.current?.requestPictureInPicture(),
    [state.isPictureInPicture]
  );

  const handleChangingPlaybackRate = useCallback(
    (playbackRate: string) => {
      if (videoRef.current)
        videoRef.current.playbackRate = parseFloat(playbackRate);
    },
    [state.playbackRate]
  );

  const handleChangingVolume = useCallback(
    (volume: number[]) => {
      if (videoRef.current) videoRef.current.volume = volume[0] / 100;
    },
    [state.volume]
  );

  const handleChangingCurrentTime = useCallback(
    (currentTime: number[]) => {
      if (videoRef.current) videoRef.current.currentTime = currentTime[0];
    },
    [state.volume]
  );

  const handleFullscreenChange = () => {
    if (videoRef.current)
      dispatch({
        type: "SET_IS_FULLSCREEN",
        payload: {
          isFullscreen: videoRef.current === document.fullscreenElement,
        },
      });
  };

  const handlePictureInPictureChange = () => {
    if (videoRef.current)
      dispatch({
        type: "SET_IS_PICTURE_IN_PICTURE",
        payload: {
          isPictureInPicture:
            videoRef.current === document.pictureInPictureElement,
        },
      });
  };

  const handleSettingDuration = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      dispatch({ type: "SET_DURATION", payload: { duration } });
    }
  };

  const handleKeyEvent = (e: KeyboardEvent) => {
    if (!videoRef.current) return;
    const { code } = e;
    if (CODES.includes(code)) e.preventDefault();

    switch (code) {
      case "Space":
        videoRef.current.paused
          ? videoRef.current.play()
          : videoRef.current.pause();
        break;
      case "KeyK":
        videoRef.current.paused
          ? videoRef.current.play()
          : videoRef.current.pause();
        break;
      case "KeyJ":
        videoRef.current.currentTime -= 10;
        break;
      case "KeyL":
        videoRef.current.currentTime += 10;
        break;
      case "KeyF":
        videoRef.current === document.fullscreenElement
          ? document.exitFullscreen()
          : videoRef.current.requestFullscreen();
        break;
      case "KeyM":
        if (videoRef.current.volume > 0) {
          lastVolume = videoRef.current.volume;

          videoRef.current.volume = 0;
        } else if (videoRef.current.volume === 0) {
          lastVolume > 0
            ? (videoRef.current.volume = lastVolume)
            : (videoRef.current.volume = 1);
        }
        break;
      case "KeyI":
        videoRef.current === document.pictureInPictureElement
          ? document.exitPictureInPicture()
          : videoRef.current.requestPictureInPicture();
        break;
      case "ArrowUp":
        videoRef.current.volume > 0.9
          ? (videoRef.current.volume = 1)
          : (videoRef.current.volume += 0.1);
        break;
      case "ArrowDown":
        videoRef.current.volume < 0.1
          ? (videoRef.current.volume = 0)
          : (videoRef.current.volume -= 0.1);
        break;
      case "ArrowRight":
        videoRef.current.currentTime += 10;
        break;
      case "ArrowLeft":
        videoRef.current.currentTime -= 10;
        break;
      case "Home":
        videoRef.current.currentTime = 0;
        break;
      case "End":
        videoRef.current.currentTime = videoRef.current.duration;
    }
  };

  const initialize = () => {
    if (!videoRef.current) return;

    videoRef.current.addEventListener(
      "fullscreenchange",
      () => handleFullscreenChange
    );
    videoRef.current.addEventListener(
      "enterpictureinpicture",
      () => handlePictureInPictureChange
    );
    videoRef.current.addEventListener(
      "leavepictureinpicture",
      handlePictureInPictureChange
    );
  };

  const deinitialize = () => {
    if (!videoRef.current) return;
    videoRef.current.removeEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );
    videoRef.current.removeEventListener(
      "enterpictureinpicture",
      handlePictureInPictureChange
    );
    videoRef.current.removeEventListener(
      "leavepictureinpicture",
      handlePictureInPictureChange
    );
  };

  return {
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
  };
}

export { useVideo };
