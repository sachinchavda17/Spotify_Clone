
export const secondsToHms = (seconds) => {
  if (seconds === 0) return "00:00";

  let duration = seconds;
  let hours = duration / 3600;
  duration = duration % 3600;

  let min = parseInt(duration / 60);
  duration = duration % 60;

  let sec = parseInt(duration);

  if (sec < 10) {
    sec = `0${sec}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }

  if (parseInt(hours, 10) > 0) {
    return `${parseInt(hours, 10)}h ${min}m ${sec}s`;
  } else if (min === 0) {
    return `00m ${sec}s`;
  } else {
    return `${min}:${sec}`;
  }
};
