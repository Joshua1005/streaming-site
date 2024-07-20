import { padNumber } from "./pad-number";

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
  } else if (minutes > 0) {
    return `${minutes}:${padNumber(remainingSeconds)}`;
  } else {
    return `0:${padNumber(remainingSeconds)}`;
  }
}

export { formatTime };
