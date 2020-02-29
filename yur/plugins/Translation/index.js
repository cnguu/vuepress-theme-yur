export default function translation (Vue) {
  const languages = {
    en: require('./locales/en.js'),
    'zh-CN': require('./locales/zh-CN.js'),
  }

  Vue.mixin({
    computed: {
      getTranslation () {
        const { locales } = this.$themeConfig
        const lang = this.getLang()
        return { ...languages[lang], ...locales }
      },
    },
    methods: {
      getLang () {
        const { lang } = this.$themeConfig
        return lang || 'en'
      },
      $l (key) {
        return this.getTranslation[key] || ''
      },
    },
  })
}
