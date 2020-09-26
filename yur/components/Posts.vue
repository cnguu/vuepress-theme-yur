<template>
  <a-row :gutter="[30, 30]">
    <template v-if="dataSource.length > 0">
      <a-col
        v-for="post in dataSource"
        :key="post.key"
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 8 }"
        :xl="{ span: 6 }"
        :xxl="{ span: 6 }"
      >
        <a-card class="yur-card" :bordered="false" size="small">
          <div
            slot="cover"
            class="background-image"
            :style="{
              height: '140px',
              backgroundImage: `url(${post.frontmatter.banner})`
            }"
          />
          <a-card-meta :title="post.title" />
        </a-card>
      </a-col>
      <a-col :span="24" :style="{ textAlign: 'center' }">
        <pagination
          :current="current"
          :page-size="pageSize"
          :total="sPosts.length"
          @change="onChangePagination"
        />
      </a-col>
    </template>
    <template v-else>
      <a-empty />
    </template>
  </a-row>
</template>

<script>
import Pagination from "@theme/components/Pagination";

export default {
  components: { Pagination },
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    const pageSize = 2;
    return {
      sPosts: this.posts,
      current: 1,
      pageSize,
      dataSource: [...this.posts].splice(0, pageSize)
    };
  },
  watch: {
    posts(nv) {
      this.sPosts = nv;

      this.current = 1;
      this.onChangePagination(this.current);
    }
  },
  methods: {
    onChangePagination(page) {
      this.current = page;
      this.dataSource = this.splitPosts();
    },
    splitPosts() {
      let posts = [...this.sPosts];
      if (posts.length > (this.current - 1) * this.pageSize) {
        posts = posts.splice((this.current - 1) * this.pageSize, this.pageSize);
      }
      return posts;
    }
  }
};
</script>
