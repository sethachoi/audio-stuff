const convertToTimeString = (time: number): string => {
  let minutes = Math.floor(time / 60).toString()
  let seconds = (time % 60).toFixed(0).toString()
  if (minutes.length < 2) {
    minutes = `0${minutes}`
  }
  if (seconds.length < 2) {
    seconds = `0${seconds}`
  }
  return `${minutes}:${seconds}`
}

export default convertToTimeString
