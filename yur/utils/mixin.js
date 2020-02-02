import Vue from 'vue'

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
      $page () { // Override vuepress defaults
        const { pages } = this.$site
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i]
          if (page.path.toLowerCase() === this.$store.state.routes.path.toLowerCase()) {
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
      isProd () {
        return process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
      },
      isBuild () {
        return process.env.NODE_ENV === 'production' && typeof navigator === 'undefined'
      },
    },
  })
}
