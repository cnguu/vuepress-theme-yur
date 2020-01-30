<template>
  <div id="default-about">
    <div
      ref="author"
      class="author"
    >
      <div class="wrapper">
        <img
          :src="avatar"
          :alt="$l('title')"
        >
        <h1>{{ author }}</h1>
        <div
          v-if="Object.keys(social).length"
          class="social"
        >
          <span
            v-for="(v, k) in social"
            :key="k"
          >
            <a
              :href="v"
              target="_blank"
              rel="noopener noreferrer"
            >
              <a-icon :type="k" />
            </a>
          </span>
        </div>
      </div>
    </div>
    <div class="readme">
      <div
        ref="readmeWrapper"
        class="wrapper"
      >
        <a-icon
          type="caret-down"
          theme="filled"
          @click="handleReadme"
        />
      </div>
      <Markdown
        v-show="readme"
        ref="markdown"
      />
    </div>
    <Discuss />
  </div>
</template>

<script>
import Markdown from '@theme/components/default/Markdown'
import Discuss from '@theme/components/default/Discuss'

export default {
  name: 'About',
  components: { Markdown, Discuss },
  data () {
    return {
      readme: true,
      avatar: require('@theme/assets/logo144.png'),
      author: 'cnguu',
      authorLink: 'https://github.com/cnguu/',
      social: {},
    }
  },
  created () {
    this.handleInit()
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.handleLoad()
      }, 300)
    })
  },
  methods: {
    handleInit () {
      const { avatar, author, authorLink, social } = this.$themeConfig
      if (avatar) {
        this.avatar = this.$withBase(avatar)
      }
      if (author) {
        this.author = author
      }
      if (authorLink) {
        this.authorLink = authorLink
      }
      if (social) {
        this.social = social
      }
    },
    handleLoad () {
      if (this.$refs.markdown.$el.clientHeight === undefined || this.$refs.markdown.$el.clientHeight === 0) {
        this.$refs.readmeWrapper.style.display = 'none'
      } else {
        this.$refs.readmeWrapper.style.display = 'block'
      }
      this.$refs.readmeWrapper.style.visibility = 'visible'
      this.readme = false
    },
    handleReadme () {
      this.$refs.author.style.display = 'block'
      this.$refs.author.style.minHeight = 'auto'
      this.$refs.readmeWrapper.style.display = 'none'
      this.readme = true
    },
  },
}
</script>

<style lang="less" scoped>
</style>
