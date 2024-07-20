function videoReducer(state: VideoState, { type, payload }: Actions) {
  switch (type) {
    case "SET_DURATION":
      return { ...state, duration: payload.duration };
    case "SET_CURRENT_TIME":
      return { ...state, currentTime: payload.currentTime };
    case "SET_VOLUME":
      return { ...state, volume: payload.volume };
    case "SET_PLAYBACK_RATE":
      return { ...state, playbackRate: payload.playbackRate };
    case "SET_IS_PLAYING":
      return { ...state, isPlaying: payload.isPlaying };
    case "SET_IS_FULLSCREEN":
      return { ...state, isFullscreen: payload.isFullscreen };
    case "SET_IS_PICTURE_IN_PICTURE":
      return { ...state, isPictureInPicture: payload.isPictureInPicture };
    default:
      throw new Error("Unrecognized dispatch type.");
  }
}

export { videoReducer };
