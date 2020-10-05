<template>
  <div id="post">
    <div class="post-banner">
      <div
        class="background-image"
        :style="{
          height: '280px',
          backgroundImage: `url(${$frontmatter.banner})`
        }"
      />
    </div>
    <div class="post-content">
      <div class="post-content-header">
        <h1>
          {{ $frontmatter.title }}
        </h1>
      </div>
      <div id="markdown">
        <Content />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.handleInit();
  },
  methods: {
    handleInit() {
      console.log(this.$page);
      console.log(this.$frontmatter);
    }
  }
};
</script>
