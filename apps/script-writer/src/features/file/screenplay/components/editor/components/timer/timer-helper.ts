export const calculateWordsCount = (str: string) => {
  const arrLength = str.length > 0 ? str.split(/\s+/).length : 0;
  return arrLength === 0 ? 0 : arrLength - 1;
};

function padZero(value: number) {
  return (value < 10 ? '0' : '') + value;
}

export const secondsToHHMMSS = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(secs)}`;
};
