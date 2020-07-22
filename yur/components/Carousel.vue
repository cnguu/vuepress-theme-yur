<template>
  <div id="carousel">
    <div>
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
            <h2>{{ carousel.title }}</h2>
            <a-button @click="$router.push(carousel.path)" ghost>
              {{ $l("read") }}
              <a-icon type="arrow-right" />
            </a-button>
          </div>
        </div>
      </a-carousel>

      <div v-if="notice.title" class="notice">
        <a-icon
          type="bell"
          class="notice-bell"
          @click="notice.visible = true"
        />
        <a-modal
          v-model="notice.visible"
          :title="notice.title"
          centered
          width="auto"
          :footer="null"
          @ok="notice.visible = false"
        >
          <Content slot-key="notice" />
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notice: {
        title: "",
        visible: false
      },
      carousels: []
    };
  },
  created() {
    this.handleInit();
  },
  methods: {
    handleInit() {
      const { notice } = this.$frontmatter;
      const { carousel = 3 } = this.$themeConfig;

      if (notice) {
        this.notice.title = notice;
      }

      this.carousels = this._postsByUpdated.slice(0, carousel);
    }
  }
};
</script>
