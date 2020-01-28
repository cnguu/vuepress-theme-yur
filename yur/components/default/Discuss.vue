<template>
  <div id="default-discuss">
    <Vssue
      v-if="discuss === 'vssue'"
      :title="$page.path"
    />
    <div
      v-else-if="discuss === 'valine'"
      ref="valine"
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
      if (this.discuss === 'vssue') {

      } else if (this.discuss === 'valine') {
        this.$nextTick(() => {
          const Valine = require('valine')
          const AV = require('leancloud-storage')
          if (typeof window !== 'undefined') {
            this.window = window
            window.AV = AV
          }
          // eslint-disable-next-line no-new
          new Valine(Object.assign({}, this.$themeConfig.valine, {
            el: `div[${this.$refs.valine.attributes[0].name}]`,
            path: this.$page.path,
          }))
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
  },
}
</script>

<style lang="less" scoped>
</style>
