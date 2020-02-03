<template>
  <a-locale-provider :locale="locale">
    <div id="yur">
      <Curtain v-show="$store.state.settings.curtain" />
      <Header />
      <div id="main">
        <transition
          name="fade-transform"
          mode="out-in"
        >
          <component :is="layout" />
        </transition>
      </div>
      <Footer />
      <a-back-top class="back-top" />
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
import Back from '@theme/components/Back'
import Page404 from '@theme/components/404'
import enGB from 'ant-design-vue/lib/locale-provider/en_GB'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'Yur',
  components: { Curtain, Header, Home, Posts, Tags, Tag, Search, Timeline, Links, About, Categories, Post, Password, Footer, Back, Page404 },
  computed: {
    locale () {
      if (this.$store.state.settings.lang === 'zh-CN') {
        return zhCN
      } else {
        return enGB
      }
    },
    layout () {
      const { password } = this.$page
      const { page, post } = this.$store.state.routes
      const categories = Object.keys(this.$categories)
      const tags = Object.keys(this.$tags)
      if (page === '/') {
        return 'Home'
      } else if (page === 'posts' && !post) {
        return 'Posts'
      } else if (page === 'tags') {
        if (!post) {
          return 'Tags'
        } else if (tags.includes(post)) {
          return 'Tag'
        }
      } else if (['search', 'timeline', 'links', 'about', 'back'].includes(page)) {
        return `${page.charAt(0).toUpperCase()}${page.slice(1)}`
      } else if (categories.includes(page)) {
        if (post) {
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
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$store.dispatch('changeSetting', {
          key: 'curtain',
          value: false,
        })
      }, this.getTimeOut())
    })
  },
  methods: {
    getTimeOut () {
      const endTime = new Date().getTime()
      const diffTime = endTime - this.$store.state.settings.consoleTime
      return Math.ceil((diffTime > 23000000 ? 0 : 23000000 - diffTime) / 10000)
    },
  },
}
</script>

<style lang="less" scoped>
</style>
