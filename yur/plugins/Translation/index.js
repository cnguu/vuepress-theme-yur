import Cookies from 'js-cookie'

export default function translation (Vue) {
  const languages = {
    en: require('./locales/en.js'),
    'zh-CN': require('./locales/zh-CN.js'),
  }

  Vue.mixin({
    computed: {
      getTranslation () {
        const { locales } = this.$config
        const lang = this.getLang()
        this.$store.dispatch('changeSetting', {
          key: 'lang',
          value: lang,
        })
        return { ...languages[lang], ...locales }
      },
    },
    created () {
      this.handleLang(this.getLang())
    },
    methods: {
      getLang () {
        const { lang } = this.$themeConfig
        return Cookies.get('lang') || lang || this.$store.state.settings.lang
      },
      handleLang (lang) {
        this.$store.dispatch('changeSetting', {
          key: 'lang',
          value: lang,
        })
        Vue.prototype.$config || (Vue.prototype.$config = Object.prototype.hasOwnProperty.call(this.$themeConfig, lang) ? this.$themeConfig[lang] : this.$themeConfig)
      },
      $l (key) {
        return this.getTranslation[key] || ''
      },
    },
  })
}
