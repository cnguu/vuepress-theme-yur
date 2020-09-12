<template>
  <div id="search">
    <img :src="banner" :alt="$l('title')" />
    <div class="search">
      <a-input-search
        class="search-input"
        :loading="loading"
        :disabled="disabled"
        enter-button
        allow-clear
        @search="onSearch"
      >
        <a-icon slot="addonBefore" type="fire" />
      </a-input-search>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner:
        "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/6f6ca5b0cb3bc43e5895911cc40a343d.jpg",
      loading: false,
      disabled: false,
      posts: []
    };
  },
  created() {
    this.handleInit();
  },
  methods: {
    handleInit() {
      const { banner } = this.$page;
      if (banner) {
        this.banner = banner;
      }
    },
    onSearch(value) {
      this.loading = true;
      this.disabled = true;

      if (value) {
        value = value.trim().toLowerCase();
        console.log(value);
        console.log(this._postsByUpdated);
      } else {
        this.posts = [];
      }

      this.$emit("change", this.posts);
      this.loading = false;
      this.disabled = false;
    }
  }
};
</script>
