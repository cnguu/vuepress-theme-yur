<template>
  <div id="yur-piano">
    <audio
      v-for="n in 9"
      :key="n"
      :ref="`audio${n}`"
      :class="`piano-${n}`"
      preload
    >
      <source
        :src="require(`../media/piano/mp3/${n}.mp3`)"
        type="audio/mp3"
      >
      <source
        :src="require(`../media/piano/ogg/${n}.ogg`)"
        type="audio/ogg"
      >
    </audio>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      key: 0,
      piano: '1:0-1:13-5:13-5:13-6:15-6:13-5:12-4:29-4:14-3:14-3:12-2:14-2:13-1:14-5:27-5:12-4:14-4:13-3:14-3:13-2:14-5:27-5:14-4:14-4:13-3:14-3:12-2:15-1:29-1:13-5:14-5:14-6:15-6:15-5:15-4:29-4:16-3:13-3:16-2:15-2:17-1:17',
      sheet: [],
      timer: [],
    }
  },
  computed: {},
  watch: {},
  beforeCreate () {
  },
  created () {
    this.initConfig()
  },
  beforeMount () {
  },
  mounted () {
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
    this.clearTimer()
  },
  methods: {
    initConfig () {
      const { piano } = this.$themeConfig
      if (piano && typeof piano !== 'boolean') {
        this.piano = piano
      }
    },
    currentAudio () {
      return 'audio' + this.key
    },
    currentAudioDom () {
      return this.$refs[this.currentAudio()][0]
    },
    getAudioDuration () { // 音频总时长
      return this.currentAudioDom().duration
    },
    handlePlay () { // 播放音频
      this.currentAudioDom().play()
    },
    handlePause () { // 暂停音频
      this.currentAudioDom().pause()
    },
    setCurrentTime (time) { // 音频已播放时长
      this.currentAudioDom().currentTime = time
    },
    randomKey () { // 随机音频 1-9
      return Math.floor(Math.random() * 9 + 1)
    },
    handleSheet () {
      this.sheet = []
      const piano = this.piano.split('-')
      if (piano.length) {
        piano.forEach(item => {
          const arr = item.split(':')
          if (arr.length === 2) {
            this.sheet.push({
              key: parseInt(arr[0]),
              millisecond: parseInt(arr[1]),
            })
          }
        })
      }
    },
    handleMouseOver () {
      if (!this.key && !this.timer.length) {
        this.key = this.randomKey()
        this.handlePlay()
      }
    },
    handleMouseOut () {
      if (this.key && !this.timer.length) {
        this.key = 0
      }
    },
    playSheet () {
      if (this.timer.length) {
        this.clearTimer()
      } else {
        this.handleSheet()
        const len = this.sheet.length
        let timeout = 0
        for (let i = 0; i < len; i++) {
          timeout += this.sheet[i].millisecond * 50
          this.timer.push(setTimeout(() => {
            if (i !== 0) {
              this.handlePause()
              this.setCurrentTime(0)
            }
            this.key = this.sheet[i].key
            this.handlePlay()
          }, timeout))
        }
      }
    },
    clearTimer () {
      if (this.timer.length) {
        this.timer.forEach(item => {
          if (item) {
            clearTimeout(item)
          }
        })
        this.timer = []
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
