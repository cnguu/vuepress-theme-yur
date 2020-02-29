<template>
  <div id="discuss">
    <Vssue
      v-if="discuss === 'vssue'"
      :title="$page.path"
    />
    <div
      v-else-if="discuss === 'valine'"
      id="valine"
    />
    <div v-else />
  </div>
</template>

<script>
export default {
  name: 'Discuss',
  data () {
    return {
      discuss: '',
    }
  },
  watch: {
    discuss () {
      if (this.discuss === 'valine') {
        this.$nextTick(() => {
          this.createValine()
        })
      }
    },
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      const { discuss } = this.$themeConfig
      if (discuss && this.handleSwitch()) {
        this.discuss = discuss
      }
    },
    handleSwitch () {
      const { frontmatter: { discuss } } = this.$page
      return !(discuss && discuss === false)
    },
    createValine () {
      const Valine = require('valine')
      const AV = require('leancloud-storage')
      if (typeof window !== 'undefined') {
        this.window = window
        window.AV = AV
      }
      // eslint-disable-next-line no-new
      new Valine(Object.assign({}, this.$themeConfig.valine, {
        el: '#valine',
        path: this.$page.path,
      }))
    },
  },
}
</script>

<style lang="less" scoped>
</style>
