<script setup>
  import { pageData, usePageFrontmatter } from '@vuepress/client';

  import Wallpaper from '@/yur/components/Wallpaper.vue';
  import Sidebar from '@/yur/components/Sidebar.vue';

  const pageFrontMatter = usePageFrontmatter();

  console.log(pageData.value, pageFrontMatter.value);
</script>

<template>
  <Wallpaper />

  <Sidebar />

  <div class="container">
    <slot name="view" />
  </div>
</template>

<style lang="less">
  .container {
  }
</style>
