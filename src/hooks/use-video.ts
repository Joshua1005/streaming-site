"use client";

import { VIDEO_KEY_CODES } from "@/constants";
import { videoReducer } from "@/reducers/video-reducer";
import { RefObject, useReducer } from "react";

const videoState: VideoState = {
  duration: 0,
  volume: 1,
  playbackRate: 1,
  currentTime: 0,
  isPlaying: false,
  isFullscreen: false,
  isPictureInPicture: false,
  isSubtitlesEnabled: false,
  isBuffering: false,
};

function useVideo() {
  const [state, dispatch] = useReducer(videoReducer, videoState);

  const setDuration = (duration: number) =>
    dispatch({ type: "SET_DURATION", payload: { duration } });

  const setCurrentTime = (currentTime: number) =>
    dispatch({ type: "SET_CURRENT_TIME", payload: { currentTime } });

  const setPlaybackRate = (playbackRate: number) =>
    dispatch({ type: "SET_PLAYBACK_RATE", payload: { playbackRate } });

  const setVolume = (volume: number) =>
    dispatch({ type: "SET_VOLUME", payload: { volume } });

  const setIsPlaying = (isPlaying: boolean) =>
    dispatch({ type: "SET_IS_PLAYING", payload: { isPlaying } });

  const setIsFullscreen = (isFullscreen: boolean) =>
    dispatch({ type: "SET_IS_FULLSCREEN", payload: { isFullscreen } });

  const setIsPictureInPicture = (isPictureInPicture: boolean) =>
    dispatch({
      type: "SET_IS_PICTURE_IN_PICTURE",
      payload: { isPictureInPicture },
    });

  const setIsBuffering = (isBuffering: boolean) =>
    dispatch({ type: "SET_IS_BUFFERING", payload: { isBuffering } });

  type VideoRef = RefObject<HTMLVideoElement>;
  type ContainerRef = RefObject<HTMLDivElement>;

  const changeCurrentTime = (videoRef: VideoRef, currentTime: number) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = currentTime;
  };

  const changePlaybackRate = (videoRef: VideoRef, playbackRate: number) => {
    if (!videoRef.current) return;

    videoRef.current.playbackRate = playbackRate;
  };

  const changeVolume = (videoRef: VideoRef, volume: number) => {
    if (!videoRef.current) return;

    videoRef.current.volume = volume;
  };

  const changeIsPlaying = (videoRef: VideoRef) => {
    if (!videoRef.current) return;

    !videoRef.current.paused
      ? videoRef.current.pause()
      : videoRef.current.play();
  };

  const changeIsFullscreen = (containerRef: ContainerRef) => {
    if (!containerRef.current) return;

    document.fullscreenElement
      ? document.exitFullscreen()
      : containerRef.current.requestFullscreen();
  };

  const changePictureInPicture = (videoRef: VideoRef) => {
    if (!videoRef.current) return;

    document.pictureInPictureElement
      ? document.exitPictureInPicture()
      : videoRef.current.requestPictureInPicture();
  };

  const initialize = (videoRef: VideoRef, containerRef: ContainerRef) => {
    if (!videoRef.current) return;
    if (!containerRef.current) return;

    const isFullscreen = containerRef.current === document.fullscreenElement;
    const isPictureInPicture =
      videoRef.current === document.pictureInPictureElement;

    setDuration(videoRef.current.duration || 0);

    containerRef.current.addEventListener("fullscreenchange", () =>
      setIsFullscreen(isFullscreen)
    );

    videoRef.current.addEventListener("enterpictureinpicture", () =>
      setIsPictureInPicture(isPictureInPicture)
    );
    videoRef.current.addEventListener("leavepictureinpicture", () =>
      setIsPictureInPicture(isPictureInPicture)
    );
  };

  const deinitialize = (videoRef: VideoRef, containerRef: ContainerRef) => {
    if (!videoRef.current) return;
    if (!containerRef.current) return;

    const isFullscreen = containerRef.current === document.fullscreenElement;
    const isPictureInPicture =
      videoRef.current === document.pictureInPictureElement;

    containerRef.current.removeEventListener("fullscreenchange", () =>
      setIsFullscreen(isFullscreen)
    );
    videoRef.current.removeEventListener("enterpictureinpicture", () =>
      setIsPictureInPicture(isPictureInPicture)
    );
    videoRef.current.removeEventListener("leavepictureinpicture", () =>
      setIsPictureInPicture(isPictureInPicture)
    );
  };

  const keyEvent = (
    e: KeyboardEvent,
    videoRef: VideoRef,
    containerRef: ContainerRef
  ) => {
    if (!videoRef.current) return;
    if (!containerRef.current) return;
    const { code } = e;

    if (VIDEO_KEY_CODES.includes(code)) e.preventDefault();

    switch (code) {
      case "Space":
        changeIsPlaying(videoRef);
        break;
      case "KeyK":
        changeIsPlaying(videoRef);
        break;
      case "KeyJ":
        changeCurrentTime(videoRef, (videoRef.current.currentTime -= 10));
        break;
      case "KeyF":
        changeIsFullscreen(containerRef);
        break;
      case "KeyL":
        changeCurrentTime(videoRef, (videoRef.current.currentTime += 10));
        break;
      case "KeyI":
        changePictureInPicture(videoRef);
        break;
      case "ArrowUp":
        videoRef.current.volume >= 0.9
          ? (videoRef.current.volume = 1)
          : (videoRef.current.volume += 0.1);
        break;
      case "ArrowDown":
        videoRef.current.volume <= 0.1
          ? (videoRef.current.volume = 0)
          : (videoRef.current.volume -= 0.1);
        break;
      case "ArrowLeft":
        changeCurrentTime(videoRef, (videoRef.current.currentTime -= 10));
        break;
      case "ArrowRight":
        changeCurrentTime(videoRef, (videoRef.current.currentTime += 10));
        break;
      default:
        break;
    }
  };

  return {
    state,
    setDuration,
    setCurrentTime,
    setPlaybackRate,
    setVolume,
    setIsPlaying,
    setIsFullscreen,
    setIsPictureInPicture,
    setIsBuffering,
    changeCurrentTime,
    changePlaybackRate,
    changeVolume,
    changeIsPlaying,
    changeIsFullscreen,
    changePictureInPicture,
    initialize,
    deinitialize,
    keyEvent,
  };
}

export { useVideo };
