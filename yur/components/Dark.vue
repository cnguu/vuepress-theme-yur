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
  created () {
    this.handleInit()
  },
  mounted () {
    if (this.mode === 'dark') {
      this.$nextTick(() => {
        document.getElementsByTagName('body')[0].className = 'dark'
      })
    }
  },
  methods: {
    handleInit () {
      this.mode = this.$store.state.settings.mode
    },
    changeMode (mode) {
      if (mode === 'dark') {
        document.getElementsByTagName('body')[0].className = 'dark'
      } else {
        document.getElementsByTagName('body')[0].className = ''
      }
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
