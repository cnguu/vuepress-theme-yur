<script setup>
  import { computed } from 'vue';

  import { useThemeConfig } from '@/yur/hooks/useThemeConfig';

  const { sidebar } = useThemeConfig();

  const getWidth = computed(() => sidebar.width);
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-body">
      <div class="sidebar-avatar">
        <img :src="sidebar.logo" alt="" />
      </div>

      <div class="sidebar-group">
        <div class="sidebar-group-item active">
          <a href="/">主页</a>
        </div>
        <div class="sidebar-group-item">
          <a href="/c">// TODO</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: v-bind(getWidth);
    z-index: 2;

    &-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 100%;
      text-align: center;
      backdrop-filter: blur(6px);
      background-color: rgba(255, 255, 253, 0.5);
      color: rgba(34, 34, 34, 0.6);
      font-size: 12px;
    }

    &-avatar {
      margin-top: 16px;
      margin-bottom: 16px;
      padding: 8px;
      border-radius: 50%;

      > img {
        object-fit: cover;
        height: 100%;
      }
    }

    &-group {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;

      &-item {
        height: 56px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s;

        &:hover {
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.1);
        }

        &.active {
          background-color: rgba(255, 255, 255, 0.15);
        }
      }
    }
  }
</style>
