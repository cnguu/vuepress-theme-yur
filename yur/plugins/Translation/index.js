export default function translation (Vue) {
  const languages = {
    en: require('./locales/en.js'),
    'zh-CN': require('./locales/zh-CN.js'),
  }

  Vue.mixin({
    computed: {
      getTranslation () {
        const { locales, lang = 'en' } = this.$themeConfig
        return { ...languages[lang], ...locales }
      },
    },
    methods: {
      $l (key) {
        return this.getTranslation[key] || ''
      },
    },
  })
}
