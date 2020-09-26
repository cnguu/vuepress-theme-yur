<template>
  <a-row :gutter="[30, 30]">
    <template v-if="posts.length > 0">
      <a-col
        v-for="post in posts"
        :key="post.key"
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 8 }"
      >
        <a-card class="yur-card" :bordered="false" size="small">
          <div
            slot="cover"
            class="background-image"
            :style="{
              height: '160px',
              backgroundImage: `url(${post.frontmatter.banner})`
            }"
          />
          <a-card-meta :title="post.title" />
        </a-card>
      </a-col>
    </template>
    <template v-else>
      <a-empty />
    </template>
  </a-row>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  }
};
</script>
