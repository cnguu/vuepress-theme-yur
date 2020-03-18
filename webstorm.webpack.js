/**
 * 本文件对项目无任何作用，仅作为 WebStorm 识别别名用
 * This file has no effect on the project and is only used as a WebStorm identifying alias
 * WebStorm preferences -> Language & Framework -> JavaScript -> Webpack
 **/

'use strict'

const resolve = dir => require('path').join(__dirname, dir)

module.exports = {
  resolve: {
    alias: {
      '@theme': resolve('yur'),
      '@us': resolve('docs/.vuepress/styles'),
    },
  },
}
