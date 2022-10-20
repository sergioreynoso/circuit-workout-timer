function padTo2Digits(num: number): string {
  return num.toString().padStart(2, "0");
}

export const formatTime = (ms: number): string => {
  //https://bobbyhadz.com/blog/javascript-convert-milliseconds-to-hours-and-minutes
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  minutes = minutes % 60;
  return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
};
