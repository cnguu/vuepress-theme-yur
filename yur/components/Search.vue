<template>
  <div id="search">
    <img :src="banner" :alt="$l('title')" />
    <div class="search">
      <a-input-search
        class="search-input"
        enter-button
        allow-clear
        @search="onSearch"
      >
        <a-select slot="addonBefore" default-value="posts">
          <a-select-option value="posts">
            {{ $l("posts") }}&nbsp;&nbsp;
          </a-select-option>
          <a-select-option value="tags">
            {{ $l("tags") }}&nbsp;&nbsp;
          </a-select-option>
        </a-select>
      </a-input-search>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner:
        "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/6f6ca5b0cb3bc43e5895911cc40a343d.jpg"
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
      console.log(value);
    }
  }
};
</script>
