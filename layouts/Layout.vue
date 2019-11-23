<template>
  <a-locale-provider :locale="zh_CN">
    <div id="VuePress-theme-yur">
      <YurCurtain v-show="getCurtain" />
      <YurHeader :current-page="currentPage" />
      <YurContent
        :current-page="currentPage"
        :current-post="currentPost"
      />
      <YurFooter />
    </div>
  </a-locale-provider>
</template>

<script>
import YurCurtain from '@theme/components/YurCurtain'
import YurHeader from '@theme/components/YurHeader'
import YurContent from '@theme/components/YurContent'
import YurFooter from '@theme/components/YurFooter'
import { isPro } from '../util'

export default {
  components: {
    YurCurtain,
    YurHeader,
    YurContent,
    YurFooter,
  },
  props: {},
  data () {
    return {
      zh_CN: this.$zh_CN,
      currentPage: '/',
      currentPost: '',
      vl: false,
    }
  },
  computed: {
    getCurtain () {
      return this.$store.state.settings.curtain
    },
  },
  watch: {
    $route: 'handleRoute',
  },
  beforeCreate () {
    for (const post of this.$posts) {
      if (!Object.prototype.hasOwnProperty.call(post.frontmatter, 'banner')) {
        post.frontmatter.banner = require('../media/images/default.jpg')
      }
    }
    for (const tag in this.$tags) {
      for (const post of this.$tags[tag]) {
        if (!Object.prototype.hasOwnProperty.call(post.frontmatter, 'banner')) {
          post.frontmatter.banner = require('../media/images/default.jpg')
        }
      }
    }
  },
  created () {
    this.initConfig()
    this.handleRoute()
  },
  beforeMount () {
  },
  mounted () {
    if (this.vl) {
      this.initValine()
    }
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  methods: {
    initConfig () {
      const { comment } = this.$themeConfig
      if (comment && isPro() && this.handleComment()) {
        if (comment === 'valine' && Object.prototype.hasOwnProperty.call(this.$themeConfig, 'valine')) {
          this.vl = true
        }
      }
    },
    handleRoute (to, from) {
      const path = this.$route.path.split('/')
      const pathPop = path.pop()
      const pathPopPop = path.pop()
      this.currentPage = '/'
      this.currentPost = ''
      if (pathPop.length > 0) {
        if (pathPopPop.length > 0) {
          this.currentPage = pathPopPop
          this.currentPost = pathPop.split('.').shift()
        } else {
          this.currentPage = pathPop.split('.').shift()
        }
      } else if (pathPopPop.length > 0) {
        this.currentPage = pathPopPop
      }
      if (to && from && to.path !== from.path) {
        this.initValine()
      }
    },
    handleComment () {
      const { frontmatter } = this.$page
      if (frontmatter) {
        const { comment } = frontmatter
        if (comment === false) {
          return false
        }
      }
      return true
    },
    initValine () {
      if (this.vl) {
        this.$nextTick(() => {
          setTimeout(() => {
            const Valine = require('valine')
            const AV = require('leancloud-storage')
            if (typeof window !== 'undefined') {
              this.window = window
              window.AV = AV
            }
            // eslint-disable-next-line no-new
            new Valine(Object.assign({}, this.$themeConfig.valine, {
              el: '#yur-valine',
              path: window.location.pathname,
            }))
          }, 300)
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
