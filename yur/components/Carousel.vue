<template>
  <div id="carousel">
    <a-carousel
      class="carousel-container"
      :autoplay="true"
      :autoplaySpeed="3300"
      effect="fade"
    >
      <div
        v-for="carousel in carousels"
        :key="carousel.key"
        class="carousel-item"
        :style="{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${carousel.frontmatter.banner})`
        }"
      >
        <div class="content">
          <router-link :to="carousel.path">
            {{ carousel.title }}
          </router-link>
        </div>
      </div>
    </a-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  data() {
    return {
      carousels: []
    };
  },
  created() {
    this.handleInit();
  },
  methods: {
    handleInit() {
      const { carousel = 3 } = this.$themeConfig;
      this.carousels = this._postsByUpdated.slice(0, carousel);
    }
  }
};
</script>
