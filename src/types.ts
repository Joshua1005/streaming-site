type VideoState = {
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isPlaying: boolean;
  isFullscreen: boolean;
  isPictureInPicture: boolean;
  isSubtitlesEnabled: boolean;
};

type Actions =
  | { type: "SET_DURATION"; payload: { duration: number } }
  | { type: "SET_CURRENT_TIME"; payload: { currentTime: number } }
  | { type: "SET_VOLUME"; payload: { volume: number } }
  | { type: "SET_PLAYBACK_RATE"; payload: { playbackRate: number } }
  | { type: "SET_IS_PLAYING"; payload: { isPlaying: boolean } }
  | { type: "SET_IS_FULLSCREEN"; payload: { isFullscreen: boolean } }
  | {
      type: "SET_IS_PICTURE_IN_PICTURE";
      payload: { isPictureInPicture: boolean };
    };
