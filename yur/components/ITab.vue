<script setup>
  import { pageData, usePageFrontmatter } from '@vuepress/client';

  import Wallpaper from '@/yur/components/Wallpaper.vue';

  const pageFrontMatter = usePageFrontmatter();

  console.log(pageData.value, pageFrontMatter.value);
</script>

<template>
  <Wallpaper />

  <div class="sidebar">导航</div>
  <div class="container">
    <slot name="view" />
  </div>
</template>

<style lang="less">
  .sidebar {
  }

  .container {
  }
</style>
