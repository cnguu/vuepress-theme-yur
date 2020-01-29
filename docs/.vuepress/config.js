const path = require('path')
const head = require('./config/head')
const themeConfig = require('./config/themeConfig')
const plugins = require('./config/plugins')

module.exports = {
  base: '/test/',
  head,
  evergreen: true,
  theme: path.resolve(__dirname, '../../yur'),
  themeConfig,
  plugins,
  markdown: {
    lineNumbers: true,
  },
  host: 'localhost',
  port: 2234,
  dest: 'public',
  extraWatchFiles: [
    '/docs/.vuepress/config.js',
  ],
}
