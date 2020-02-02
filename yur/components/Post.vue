<template>
  <div id="post">
    <div
      class="information"
      :style="{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${$page.frontmatter.banner})`
      }"
    >
      <div class="content">
        <router-link
          v-if="$page.categoryText"
          :to="`/${$page.category}/`"
          class="category"
        >
          {{ $page.categoryText }}
        </router-link>
        <p>{{ $page.title }}</p>
      </div>
    </div>
    <div class="wrapper">
      <Markdown />
      <Discuss />
    </div>
  </div>
</template>

<script>
import Markdown from '@theme/components/Markdown'
import Discuss from '@theme/components/Discuss'

export default {
  name: 'Post',
  components: { Markdown, Discuss },
  data () {
    return {
      reward: [],
    }
  },
  created () {
    this.handleInit()
    console.log(this.$page)
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
