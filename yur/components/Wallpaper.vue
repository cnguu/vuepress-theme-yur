<script setup>
  import { computed } from 'vue';

  import { useThemeConfig } from '@/yur/hooks/useThemeConfig';

  const {
    theme: { wallpaper },
  } = useThemeConfig();

  const getBlur = computed(() => wallpaper.blur);
  const getOpacity = computed(() => wallpaper.opacity);
</script>

<template>
  <div class="wallpaper">
    <video
      :src="wallpaper.video"
      :poster="wallpaper.img"
      :autoplay="true"
      :loop="true"
      :muted="true"
    />
    <img :src="wallpaper.img" alt="" />
  </div>
</template>

<style lang="less">
  .wallpaper {
    position: absolute;
    top: calc(v-bind(getBlur) * -2);
    right: calc(v-bind(getBlur) * -2);
    bottom: calc(v-bind(getBlur) * -2);
    left: calc(v-bind(getBlur) * -2);
    filter: blur(v-bind(getBlur));
    pointer-events: none;

    > img,
    > video {
      position: relative;
      opacity: v-bind(getOpacity);
      width: 100%;
      height: 100%;
      object-fit: cover;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    > video {
      z-index: 1;
    }
  }
</style>
