const { path } = require('@vuepress/utils');

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = (options, app) => {
  return {
    name: 'vuepress-theme-yur',
    alias: {
      '@/yur': resolve('../yur'),
    },
    clientAppEnhanceFiles: resolve('clientAppEnhance.js'),
    layouts: {
      Layout: resolve('layouts/Layout.vue'),
      404: resolve('layouts/404.vue'),
    },
    plugins: [],
    templateBuild: resolve('templates/index.build.html'),
    templateDev: resolve('templates/index.dev.html'),
  };
};
