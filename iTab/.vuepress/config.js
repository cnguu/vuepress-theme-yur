const { path } = require('@vuepress/utils');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  base: '/',
  lang: 'zh-CN',
  title: 'vuepress-theme-yur',
  description: 'VuePress Theme - Yur',
  head: [['link', { rel: 'icon', href: '/logo64.png' }]],
  locales: {},
  theme: resolve('../../yur/index.js'),
  themeConfig: {
    a: 1,
  },
  bundler: '@vuepress/bundler-webpack',
  bundlerConfig: {},
  dest: resolve('../dist'),
  temp: resolve('.temp'),
  cache: resolve('.cache'),
  public: resolve('public'),
  debug: false,
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'],
  host: 'localhost',
  port: 9394,
  open: false,
  shouldPreload: true,
  shouldPrefetch: false,
  markdown: {},
};
