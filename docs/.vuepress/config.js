const path = require('path')
const head = require('./config/head')
const themeConfig = require('./config/themeConfig')
module.exports = {
  base: '/test/',
  title: 'VuePress theme yur',
  description: 'Write your life by vuepress',
  head,
  evergreen: true,
  theme: path.resolve(__dirname, '../../yur'),
  themeConfig,
  host: 'localhost',
  port: 2234,
  dest: 'public',
  extraWatchFiles: [
    '/docs/.vuepress/config.js',
  ],
}
