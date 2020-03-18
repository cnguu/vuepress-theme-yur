const path = require('path')
const SHA256 = require('crypto-js/sha256')
const Base64 = require('crypto-js/enc-base64')
const { slugify } = require('transliteration')

module.exports = (opts, ctx) => {
  const { sep } = path
  const { themeConfig, sourceDir } = ctx
  const { baiDu, cdn } = themeConfig
  return {
    name: 'vuepress-theme-yur',
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceApp.js'),
    ],
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

      if (cdn && process.env.NODE_ENV === 'production') {
        config.output
          .publicPath(cdn)
      }
    },
    extendMarkdown: md => {
      md.use(require('markdown-it-sub'))
      md.use(require('markdown-it-sup'))
      md.use(require('markdown-it-imsize'))
      md.use(require('./plugins/MarkdownIt/katex'))
      md.use(require('./plugins/MarkdownIt/mermaid'))
    },
    alias () {
      return {
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
    ],
    extendPageData ($page) {
      // const { _filePath, _computed, _content, _strippedContent, key, frontmatter, regularPath, path } = $page
      const { _content, _strippedContent, frontmatter, path } = $page

      if (_strippedContent && _content) {
        $page.wordCount = _content.length
      }

      if (baiDu) {
        const { pinYin } = baiDu
        if (pinYin) {
          $page.path = decodeURIComponent(path).split('/')
            .map(str => slugify(str, {
              lowercase: true,
              separator: '-',
              ignore: ['/', '.'],
            }))
            .join('/')
        }
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
          pwd += ''
          delete frontmatter.password
          $page.password = Base64.stringify(SHA256(pwd))
        }
      }
    },
  }
}
