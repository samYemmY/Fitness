class Time {
  static timestampToSeconds(timestamp)
  {
    let seconds = 0
    let times   = timestamp.split(":")
    seconds += 3600 * parseInt(times[0], 10) + 60 * parseInt(times[1], 10) + parseInt(times[2], 10)
    return seconds
  }

  static secondsToTimestamp(time)
  {
    let rest    = null
    let hours   = ~~(time / 3600)
    rest        = time % 3600
    let seconds = rest % 60
    let minutes = (rest - seconds) / 60
    return this.fillTwoDigits(hours.toString()) + ":" + this.fillTwoDigits(minutes.toString()) + ":" + this.fillTwoDigits(~~(seconds).toString())
  }

  static getAverageTimeInSeconds(arrayOfSeconds)
  {
    const average = arrayOfSeconds.reduce((accumulator, currentVal) => accumulator + currentVal) / arrayOfSeconds.length
    return average
  }

  static fillTwoDigits(digitString)
  {
    if (digitString.length > 2)
    {
      throw new Error("Value is too big!")
    }
    else
    {
      return ("0" + digitString).slice(-2)
    }
  }
}

export { Time }