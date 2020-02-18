const throttle = require('./throttle')
const resize = (callback, delay) => {
  window.addEventListener('resize', throttle(callback, delay))
}

export default resize
