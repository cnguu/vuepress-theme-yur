<template>
  <div
    id="markdown"
    class="markdown-content"
  >
    <Content
      v-show="load.content"
      ref="content"
      :slot-key="`lang:${$store.state.settings.lang}`"
    />
    <Content v-show="load.default" />
  </div>
</template>

<script>
export default {
  name: 'Markdown',
  data () {
    return {
      load: {
        content: true,
        default: false,
      },
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.handleLoad()
    })
  },
  methods: {
    handleLoad () {
      if (this.$refs.content.$el.clientHeight === undefined || this.$refs.content.$el.clientHeight === 0) {
        this.load.content = false
        this.load.default = true
      } else {
        this.load.content = true
        this.load.default = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
