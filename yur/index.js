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
    extendMarkdown: md => {
      md.use(require('markdown-it-sub'))
      md.use(require('markdown-it-sup'))
      md.use(require('markdown-it-imsize'))
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
      ['@vuepress/medium-zoom', {
        selector: '.markdown-content img',
      }],
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
      const { _content, _strippedContent, frontmatter, path } = $page

      if (_strippedContent && _content) {
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
