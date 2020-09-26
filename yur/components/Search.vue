<template>
  <div id="search">
    <a-row :gutter="[30, 30]">
      <a-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 18, offset: 3 }"
        :md="{ span: 12, offset: 6 }"
        :lg="{ span: 12, offset: 6 }"
      >
        <img :src="banner" :alt="$l('title')" />
      </a-col>
      <a-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 20, offset: 2 }"
        :md="{ span: 14, offset: 5 }"
        :lg="{ span: 14, offset: 5 }"
      >
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
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner:
        "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/6f6ca5b0cb3bc43e5895911cc40a343d.jpg",
      loading: false,
      disabled: false
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

      let posts = [];

      if (value) {
        value = value.trim().toLowerCase();

        const matchTitle = item =>
          item.title && item.title.toLowerCase().indexOf(value) > -1;
        const matchHeader = item => {
          return item.find(
            header =>
              header.title && header.title.toLowerCase().indexOf(value) > -1
          );
        };
        const matchTag = item => {
          return item.find(tag => tag.toLowerCase().indexOf(value) > -1);
        };

        for (let i = 0; i < this._postsByUpdated.length; i++) {
          const p = this._postsByUpdated[i];

          if (
            matchTitle(p) ||
            (p.headers && p.headers.length > 0 && matchHeader(p.headers)) ||
            (p.frontmatter &&
              p.frontmatter.tags &&
              p.frontmatter.tags.length > 0 &&
              matchTag(p.frontmatter.tags))
          ) {
            posts.push(p);
          }
        }
      } else {
        posts = this._postsByUpdated;
      }

      this.$emit("change", posts);
      this.loading = false;
      this.disabled = false;
    }
  }
};
</script>
