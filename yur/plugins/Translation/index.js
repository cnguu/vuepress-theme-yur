import Cookies from 'js-cookie'

export default function translation (Vue) {
  const languages = {
    en: require('./locales/en.js'),
    'zh-CN': require('./locales/zh-CN.js'),
  }

  Vue.mixin({
    computed: {
      getTranslation () {
        const langDefault = this.$store.state.settings.lang
        const langCookie = Cookies.get('lang') || langDefault
        const langConfig = this.$themeConfig.locales[langCookie]
        this.$store.dispatch('changeSetting', {
          key: 'lang',
          value: langCookie,
        })
        return { ...languages[langCookie], ...langConfig }
      },
    },
    methods: {
      $l (key) {
        return this.getTranslation[key] || key
      },
    },
  })
}
