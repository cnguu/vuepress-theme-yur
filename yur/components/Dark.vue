<template>
  <div id="dark">
    <a-button
      type="primary"
      shape="circle"
      icon="skin"
      size="large"
      @click="changeMode(mode === 'light' ? 'dark' : 'light')"
    />
  </div>
</template>

<script>
export default {
  name: 'Dark',
  data () {
    return {
      mode: 'light',
    }
  },
  mounted () {
    this.$nextTick(() => {
      const mode = localStorage.getItem('mode') || this.$store.state.settings.mode
      if (mode === 'dark') {
        document.getElementsByTagName('body')[0].className = 'dark'
      } else {
        document.getElementsByTagName('body')[0].className = ''
      }
      localStorage.setItem('mode', mode)
      this.mode = mode
    })
  },
  methods: {
    changeMode (mode) {
      if (mode === 'dark') {
        document.getElementsByTagName('body')[0].className = 'dark'
      } else {
        document.getElementsByTagName('body')[0].className = ''
      }
      localStorage.setItem('mode', mode)
      this.mode = mode
      this.$store.dispatch('changeSetting', {
        key: 'mode',
        value: mode,
      })
    },
  },
}
</script>

<style lang="less" scoped>
</style>
