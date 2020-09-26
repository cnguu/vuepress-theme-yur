<template>
  <div id="categories">
    <posts :posts="posts" />
  </div>
</template>

<script>
import Posts from "@theme/components/Posts";

export default {
  components: { Posts },
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
      this.posts = this._postsByUpdated.filter(
        post => post.id === this.$route.meta.id
      );
    }
  }
};
</script>
