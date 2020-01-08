import Vue from 'vue'

export default () => {
  Vue.mixin({
    components: {},
    data () {
      return {}
    },
    computed: {
      $lang () {
        const { lang } = this.$themeConfig
        return lang || 'en'
      },
      $title () {
        return this.$l('title')
      },
      $description () {
        return this.$l('description')
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
