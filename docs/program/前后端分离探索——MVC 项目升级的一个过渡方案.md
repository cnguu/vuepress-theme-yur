---

title: 前后端分离探索——MVC 项目升级的一个过渡方案

meta:
  - name: description
    content: 前后端分离探索——MVC 项目升级的一个过渡方案
  - name: keywords
    content: 前后端分离，探索，MVC，项目，升级，过渡，方案

created: 2019/11/11

updated: 2020/11/11
 
tags:
  - PHP
  - Vue
  - Phalcon

password: 111

---

## 前言

### 项目环境

- 后端框架：Phalcon
- 前端框架：Bootstrap + jQuery

### 什么是前后端分离？

传统项目大多数是 MVC 架构，直接使用 PHP 等后端语言渲染 HTML 模板，返回给浏览器

现在，前后端分离不需要后端渲染模板，而是交由浏览器 Javascript 渲染，后端只需要返回前端渲染所需要的数据即可

::: tip
前后端分离的本质：

- 路由分离
- 模板分离
:::

### 前后端伪分离？

传统 MVC 项目直接升级到前后端分离需要大量的时间与人力，在业务多变的阶段并不适合，所以便有了本文的过渡方案探索

1. 路由先不分离，仍然采用 PHP 提供的路由
2. 模板部分分离，在原 PHP 模板中，引入 Vue 编译后的模板，为此需要约定

## 示例

新建控制器 `TestController.php`

```php
<?php

namespace App\Controller;

class TestController
{
    public function indexAction()
    {
    }
}
```

新建模板 `test/index.volt`

```html
<div id="app">
    <!-- 约定 一个页面对应一个 Vue 组件 -->
    <index-view></index-view>
</div>
<!-- 约定 一个页面对应一个前端控制器 -->
<script src="/mix/dist/js/test/index.js?v={{ time() }}"></script>
```

::: tip
暂时找不到很好解决缓存的方案，所以统一不缓存
:::

新建前端控制器 `public/mix/resources/js/test/index.js`

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import IndexView from '@views/test/index.vue';
import Mixin from '@utils/mixin';

Vue.use(ElementUI);
Vue.use(Mixin); // 全局组件、方法、计算属性等

new Vue({
    el: '#app',
    components: { IndexView },
});
```

新建 Vue 组件 `public/mix/resources/views/test/index.vue`

```js
<template>
    <div>
        Hello Vue!
    </div>
</template>
<script>
    export default {
        components: {},
        props: {},
        data() {
            return {};
        },
        beforeCreate() {
        },
        created() {
            console.log('Created');
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        watch: {},
        computed: {},
        methods: {},
    };
</script>
<style lang="scss" scoped>
</style>
```

## 前后端伪分离

- 后端框架：Phalcon + Hyperf
- 前端框架：Bootstrap + jQuery + Vue

前端编译使用 [Laravel Mix](https://laravel-mix.com/) 工具，这会节省大量前端配置时间

根目录新建文件 `webpack.mix.js`

```js
const fs = require('fs');
const mix = require('laravel-mix');

const rs_root = 'public/mix/resources';  // 资源 源目录
const rs_output = 'public/mix/dist';     // 资源 打包目录
const js_entry = `${ rs_root }/js`;      // js 源目录
const js_output = `${ rs_output }/js`;   // js 打包目录
const css_entry = `${ rs_root }/css`;    // css 源目录
const css_output = `${ rs_output }/css`; // css 打包目录

mix.webpackConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, rs_root),
            '@api': path.resolve(__dirname, `${ rs_root }/api`),
            '@components': path.resolve(__dirname, `${ rs_root }/components`),
            '@utils': path.resolve(__dirname, `${ rs_root }/utils`),
            '@views': path.resolve(__dirname, `${ rs_root }/views`),
        },
    },
});

// 按照约定，编译对应的资源
fs.readdirSync(path.resolve(__dirname, js_entry)).forEach(dir => {
    fs.readdirSync(path.resolve(__dirname, `${ js_entry }/${ dir }`)).forEach(file => {
        mix.js(`${ js_entry }/${ dir }/${ file }`, `${ js_output }/${ dir }/${ file }`);
    });
});

mix.sass(`${ css_entry }/app.scss`, `${ css_output }/app.css`); // 公共 CSS
mix.setPublicPath(rs_output);
mix.setResourceRoot('/mix/dist/');
```

### 流程

1. 按照示例配置一个页面
2. Yarn 安装前端依赖
3. Yarn 前端编译，此时，PHP 模板中已正确引入 Vue
4. 访问路由，PHP 渲染模板，返回给浏览器
5. 浏览器加载 Vue，交由 Vue 渲染页面

### 局限

- 不能做到全局自动加载组件
- 编译后的文件大小可能会很大

### 优势

- 可以更好地编写复杂的页面
- 更好的维护性

## 后记

目前仍在不断地探索中
