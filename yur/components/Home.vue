<template>
  <div id="home">
    <search @change="onChangeSearch" />
    <div class="home-container">
      <template v-if="_menuCategories && _menuCategories.length">
        <div class="home-container-category">
          <div class="home-container-category-lists">
            <a-row :gutter="[30, 30]">
              <template v-for="post in posts">
                <a-col
                  :key="post.key"
                  :xs="{ span: 24 }"
                  :sm="{ span: 12 }"
                  :md="{ span: 12 }"
                  :lg="{ span: 8 }"
                >
                  <a-card :bordered="false">
                    <div
                      slot="cover"
                      class="background-image"
                      :style="{
                        backgroundImage: `url(${post.frontmatter.banner})`
                      }"
                    />
                    <a-card-meta :title="post.title" />
                  </a-card>
                </a-col>
              </template>
            </a-row>
          </div>
        </div>
      </template>
      <template v-else>
        <a-empty />
      </template>
    </div>
  </div>
</template>

<script>
import Search from "@theme/components/Search";

export default {
  components: { Search },
  data() {
    return {
      posts: []
    };
  },
  created() {
    this.handleInit();
    console.log(this._menuCategories);
    console.log(this._postsByUpdated);
  },
  methods: {
    handleInit() {
      this.posts = this._postsByUpdated;
    },
    onChangeSearch(posts) {
      this.posts = posts;
    }
  }
};
</script>
