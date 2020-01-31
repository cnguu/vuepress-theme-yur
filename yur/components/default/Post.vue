<template>
  <div id="default-post">
    post
  </div>
</template>

<script>
export default {
  name: 'Post',
  data () {
    return {
      reward: [],
    }
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      const { reward } = this.$themeConfig
      if (reward) {
        this.reward = reward
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
