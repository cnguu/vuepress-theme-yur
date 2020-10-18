<template>
  <div id="links">
    <div id="markdown">
      <Content />
    </div>
    <div class="links">
      <a-row :gutter="[30, 30]">
        <a
          v-for="(link, index) in links"
          :key="index"
          :href="link.link"
          target="_blank"
        >
          <a-col
            :xs="{ span: 12 }"
            :sm="{ span: 8 }"
            :md="{ span: 6 }"
            :lg="{ span: 4 }"
            :xl="{ span: 4 }"
            :xxl="{ span: 4 }"
          >
            <a-card class="links-card" size="small">
              <div class="links-card-cover" slot="cover">
                <img :src="link.logo" :alt="link.link" />
              </div>
              <a-card-meta class="links-card-title" :title="link.title">
                <div slot="description" class="links-card-description">
                  {{ link.subtitle }}
                </div>
              </a-card-meta>
            </a-card>
          </a-col>
        </a>
      </a-row>
    </div>
  </div>
</template>

<script>
import mixinHash from "@theme/utils/mixinHash";

export default {
  mixins: [mixinHash],
  data() {
    return {
      links: []
    };
  },
  created() {
    this.handleInit();
  },
  methods: {
    handleInit() {
      const { links = [] } = this.$themeConfig;
      this.links = links;
    }
  }
};
</script>
