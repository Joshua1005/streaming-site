type DispatchType = typeof dispatchType;

const dispatchType = {
  setDuration: "SET_DURATION",
  setCurrentTime: "SET_CURRENT_TIME",
  setVolume: "SET_VOLUME",
  setPlaybackRate: "SET_PLAYBACK_RATE",
  setIsPlaying: "SET_IS_PLAYING",
  setIsFullscreen: "SET_IS_FULLSCREEN",
  setIsPictureInPicture: "SET_IS_PICTURE_IN_PICTURE",
  setIsBuffering: "SET_IS_BUFFERING",
} as const;

type Actions = {
  type: DispatchType[keyof DispatchType];
  payload: Partial<VideoState>;
};

function videoReducer(state: VideoState, { type, payload }: Actions) {
  const {
    duration,
    volume,
    playbackRate,
    currentTime,
    isPlaying,
    isFullscreen,
    isPictureInPicture,
    isSubtitlesEnabled,
    isBuffering,
  } = payload;

  switch (type) {
    case dispatchType.setDuration:
      return duration !== undefined ? { ...state, duration } : state;
    case dispatchType.setCurrentTime:
      return currentTime !== undefined ? { ...state, currentTime } : state;
    case dispatchType.setVolume:
      return volume !== undefined ? { ...state, volume } : state;
    case dispatchType.setPlaybackRate:
      return playbackRate !== undefined ? { ...state, playbackRate } : state;
    case dispatchType.setIsPlaying:
      return isPlaying !== undefined ? { ...state, isPlaying } : state;
    case dispatchType.setIsFullscreen:
      return isFullscreen !== undefined ? { ...state, isFullscreen } : state;
    case dispatchType.setIsPictureInPicture:
      return isPictureInPicture !== undefined
        ? { ...state, isPictureInPicture }
        : state;
    case dispatchType.setIsBuffering:
      return isBuffering !== undefined ? { ...state, isBuffering } : state;
    default:
      throw new Error("Unrecognized dispatch type.");
  }
}

export { videoReducer };
