<template>
  <a-locale-provider :locale="locale">
    <div id="yur">
      <Curtain v-show="curtain" />
      <Header />
      <div id="main">
        <transition
          name="fade-transform"
          mode="out-in"
        >
          <ClientOnly>
            <component :is="layout" />
          </ClientOnly>
        </transition>
      </div>
      <Footer />
      <a-back-top class="back-top" />
      <Dark v-show="dark" />
    </div>
  </a-locale-provider>
</template>

<script>
import Curtain from '@theme/components/Curtain'
import Header from '@theme/components/Header'
import Home from '@theme/components/Home'
import Posts from '@theme/components/Posts'
import Tags from '@theme/components/Tags'
import Tag from '@theme/components/Tag'
import Search from '@theme/components/Search'
import Timeline from '@theme/components/Timeline'
import Links from '@theme/components/Links'
import About from '@theme/components/About'
import Categories from '@theme/components/Categories'
import Post from '@theme/components/Post'
import Password from '@theme/components/Password'
import Footer from '@theme/components/Footer'
import Dark from '@theme/components/Dark'
import Back from '@theme/components/Back'
import Page404 from '@theme/components/404'
import enGB from 'ant-design-vue/lib/locale-provider/en_GB'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'Yur',
  components: { Curtain, Header, Home, Posts, Tags, Tag, Search, Timeline, Links, About, Categories, Post, Password, Footer, Dark, Back, Page404 },
  data () {
    return {
      curtain: false,
      dark: false,
    }
  },
  computed: {
    locale () {
      if (this.$lang === 'zh-CN') {
        return zhCN
      } else {
        return enGB
      }
    },
    layout () {
      const { password } = this.$page
      const categories = Object.keys(this.$categories)
      const tags = Object.keys(this.$tags)
      if (this.$routePage === '/') {
        return 'Home'
      } else if (this.$routePage === 'posts' && !this.$routePost) {
        return 'Posts'
      } else if (this.$routePage === 'tags') {
        if (!this.$routePost) {
          return 'Tags'
        } else if (tags.includes(this.$routePost)) {
          return 'Tag'
        }
      } else if (['search', 'timeline', 'links', 'about', 'back'].includes(this.$routePage)) {
        return `${this.$routePage.charAt(0).toUpperCase()}${this.$routePage.slice(1)}`
      } else if (categories.includes(this.$routePage)) {
        if (this.$routePost) {
          if (password) {
            return 'Password'
          } else {
            return 'Post'
          }
        } else {
          return 'Categories'
        }
      }
      return 'Page404'
    },
  },
  created () {
    this.handleInit()
  },
  mounted () {
    this.curtain = false
  },
  methods: {
    handleInit () {
      const { dark, curtain } = this.$themeConfig
      if (curtain) {
        this.curtain = true
      }
      if (dark) {
        this.dark = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
