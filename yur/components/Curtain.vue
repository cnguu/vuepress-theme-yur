<template>
  <div id="curtain">
    <p
      :style="{
        textShadow: `0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ffffff, 0 0 20px ${textShadow}, 0 0 35px ${textShadow}, 0 0 40px ${textShadow}, 0 0 50px ${textShadow}, 0 0 75px ${textShadow}`,
      }"
    >
      {{ $l('title') }}
    </p>
    <a-spin
      class="spin"
      :tip="tip"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      tip: 'Loading...',
      textShadow: '#e91e63',
    }
  },
  created () {
    this.initConfig()
  },
  methods: {
    initConfig () {
      const { curtain } = this.$themeConfig
      if (curtain) {
        const { tip, textShadow } = curtain
        if (tip) {
          this.tip = tip
        }
        if (textShadow) {
          this.textShadow = textShadow
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
