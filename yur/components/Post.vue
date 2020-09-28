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
      <div class="post-banner-content">todo</div>
    </div>
    <Content />
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
