const path = require('path')
module.exports = (opts, ctx) => {
  const { sep } = path
  const { themeConfig, siteConfig, sourceDir } = ctx
  return {
    name: 'vuepress-theme-yur',
    chainWebpack (config, isServer) {
      config.module
        .rule('less')
        .oneOf('normal')
        .use('less-loader')
        .options({ javascriptEnabled: true })
        .end()
        .end()
        .oneOf('modules')
        .use('less-loader')
        .options({ javascriptEnabled: true })
    },
    alias () {
      const isAlgoliaSearch = (themeConfig.algolia || Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(base => themeConfig.locales[base].algolia))
      return {
        '@AlgoliaSearchBox': isAlgoliaSearch
          ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
          : path.resolve(__dirname, 'noopModule.js'),
        '@us': `${sourceDir}${sep}.vuepress${sep}styles`,
      }
    },
    plugins: [
      ['container', {
        type: 'primary',
        defaultTitle: '',
      }],
      ['container', {
        type: 'primaryLong',
        defaultTitle: '',
      }],
      ['container', {
        type: 'success',
        defaultTitle: '',
      }],
      ['container', {
        type: 'successLong',
        defaultTitle: '',
      }],
      ['container', {
        type: 'tip',
        defaultTitle: '',
      }],
      ['container', {
        type: 'tipLong',
        defaultTitle: '',
      }],
      ['container', {
        type: 'warning',
        defaultTitle: '',
      }],
      ['container', {
        type: 'warningLong',
        defaultTitle: '',
      }],
      ['container', {
        type: 'error',
        defaultTitle: '',
      }],
      ['container', {
        type: 'errorLong',
        defaultTitle: '',
      }],
      'serve',
    ],
  }
}
