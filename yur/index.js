const path = require('path')
const SHA256 = require('crypto-js/sha256')
const Base64 = require('crypto-js/enc-base64')
const { slugify } = require('transliteration')

module.exports = (opts, ctx) => {
  const { sep } = path
  const { themeConfig, siteConfig, sourceDir } = ctx
  const { lang } = themeConfig
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
    extendPageData ($page) {
      // const { _filePath, _computed, _content, _strippedContent, key, frontmatter, regularPath, path } = $page
      const { _content, frontmatter, path } = $page

      if (_content) {
        $page.wordCount = _content.length
      }

      if (lang === 'zh-CN') {
        $page.path = decodeURIComponent(path).split('/')
          .map(str => slugify(str, {
            lowercase: true,
            separator: '-',
            ignore: ['/', '.'],
          }))
          .join('/')
      }

      let pwd = '52yur'
      if (themeConfig) {
        const { password } = themeConfig
        if (password) {
          pwd = password
        }
      }
      if (frontmatter) {
        const { password } = frontmatter
        if (password) {
          if (typeof password !== 'boolean') {
            pwd = password
          }
          delete frontmatter.password
          $page.password = Base64.stringify(SHA256(pwd))
        }
      }
    },
  }
}
