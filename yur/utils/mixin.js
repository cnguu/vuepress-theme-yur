import Vue from 'vue'
import { getCurrentPage, getCurrentPost } from '@theme/utils'

export default () => {
  Vue.mixin({
    components: {},
    data () {
      return {}
    },
    computed: {
      $lang () { // ssr
        const { lang } = this.$themeConfig
        return lang || 'en'
      },
      $title () { // ssr
        return this.$l('title')
      },
      $description () { // ssr
        return this.$l('description')
      },
      $routePath () {
        return this.$route.path
      },
      $routePage () {
        return getCurrentPage(this.$route.path)
      },
      $routePost () {
        return getCurrentPost(this.$route.path)
      },
      $page () { // Override vuepress defaults
        const { pages } = this.$site
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i]
          if (page.path.toLowerCase() === this.$routePath.toLowerCase()) {
            return page
          }
        }
        return {
          path: '',
          frontmatter: {},
        }
      },
    },
    methods: {
      /**
       * Simplified hasOwnProperty()
       * @param obj
       * @param key
       * @returns {boolean}
       */
      hasOwn (obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key)
      },
    },
  })
}
