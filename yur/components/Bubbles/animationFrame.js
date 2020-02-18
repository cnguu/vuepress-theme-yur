/**
 * @desc AnimationFrame 简单兼容 hack
 */
const animationFrame = () => {
  if (typeof window !== 'undefined') {
    window.cancelAnimationFrame = (function () {
      return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        function (id) {
          return window.clearTimeout(id)
        }
    })()
    window.requestAnimationFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 1000 / 60)
        }
      )
    }())
  }
}

module.exports = animationFrame
