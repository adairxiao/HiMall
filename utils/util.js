const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// debounce
const throttle = (func, delay = 1000) => {
  let timeoutID, self, args
  return function () {
    self = this
    args = arguments

    if (timeoutID) return

    timeoutID = setTimeout(function () {
      func.apply(self, args)
      clearTimeout(timeoutID)
      timeoutID = null
    }, delay)
  }
}

module.exports = {
  formatTime,
  throttle,
}
