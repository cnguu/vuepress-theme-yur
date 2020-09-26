<template>
  <div id="home">
    <search @change="onChangeSearch" />
    <div class="home-container">
      <template v-if="_menuCategories && _menuCategories.length">
        <div class="home-container-category">
          <posts :posts="posts" />
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
import Posts from "@theme/components/Posts";

export default {
  components: { Search, Posts },
  data() {
    return {
      posts: []
    };
  },
  created() {
    this.handleInit();
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
