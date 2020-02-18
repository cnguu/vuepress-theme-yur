<template>
  <canvas
    id="bubbles"
    ref="canvas"
  />
</template>
<script>
// https://github.com/chenxuan0000/vue-canvas-effect
import resize from './resize'

require('./animationFrame')()

export default {
  name: 'Bubbles',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data () {
    return {
      opt: {
        color: 'random', // rgba(225, 225, 225, 0.5)
        radius: 15,
        density: 0.3, // 数值越大，气泡越密集（建议 <=1）
        clearOffset: 0.2, // 气泡消失距离[0-1] 数值越大，消失越晚
      },
      requestAniId: null,
    }
  },
  created () {
    this.handleInit()
  },
  mounted () {
    let width
    let height
    let canvas
    let ctx
    const circles = []
    const settings = this.opt
    const that = this
    initContainer()

    function initContainer () {
      canvas = that.$refs.canvas
      width = canvas.parentNode.clientWidth
      height = canvas.parentNode.clientHeight
      canvas.width = width
      canvas.height = height
      ctx = canvas.getContext('2d')
      for (let x = 0; x < width * settings.density; x++) {
        circles.push(new Circle())
      }
      animate()
    }

    function animate () {
      cancelAnimationFrame(self.requestAniId)
      ctx.clearRect(0, 0, width, height)
      for (const i in circles) {
        circles[i].draw()
      }
      self.requestAniId = requestAnimationFrame(animate)
    }

    function Circle () {
      const self = this
      this.pos = {}
      init()

      function init () {
        self.pos.x = Math.random() * width
        self.pos.y = height + Math.random() * 100
        self.alpha = 0.1 + Math.random() * settings.clearOffset
        self.scale = 0.1 + Math.random() * 0.3
        self.speed = Math.random()
        self.color = settings.color === 'random' ? that.randomColor() : settings.color
      }

      this.draw = function () {
        if (self.alpha <= 0) {
          init()
        }
        self.pos.y -= self.speed
        self.alpha -= 0.0005
        ctx.beginPath()
        ctx.arc(self.pos.x, self.pos.y, self.scale * settings.radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = self.color
        ctx.fill()
        ctx.closePath()
      }
    }

    resize(() => {
      width = canvas.parentNode.clientWidth
      height = canvas.parentNode.clientHeight
      canvas.width = width
      canvas.height = height
    })
  },
  beforeDestroy () {
    cancelAnimationFrame(this.requestAniId)
  },
  methods: {
    randomColor () {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      const alpha = Math.random().toPrecision(2)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    },
    handleInit () {
      this.opt = Object.assign({}, this.opt, this.options)
    },
  },
}
</script>

<style lang="less" scoped>
</style>
