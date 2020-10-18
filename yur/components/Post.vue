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
    <div class="post-footer">
      <div v-if="reward.length > 0" class="post-footer-reward">
        <a-popover
          placement="top"
          trigger="click"
          :overlay-style="{ width: 'auto' }"
        >
          <a-button shape="circle" size="large">
            <a-icon type="money-collect" />
          </a-button>
          <template slot="content">
            <div id="reward">
              <img
                v-for="(item, index) in reward"
                :key="index"
                :src="$withBase(item)"
                :alt="$l('title')"
              />
            </div>
          </template>
        </a-popover>
      </div>
      <div class="post-footer-copyright">
        <a-popover placement="topLeft" style="float: left">
          <span>
            <a-icon type="copyright" />
            {{ $l("copyright") }}
          </span>
          <template slot="content">
            <span>{{ getCopyright }}</span>
          </template>
        </a-popover>
        <a-popover placement="topRight" style="float: right">
          <span>
            <a-icon type="calendar" />
            {{ $page.frontmatter.updated }}
          </span>
          <template slot="content">
            <span>
              {{ $l("created") }}<br />
              {{ $page.frontmatter.created }}<br />
              {{ $l("updated") }}<br />
              {{ $page.frontmatter.updated }}
            </span>
          </template>
        </a-popover>
      </div>
      <div
        v-if="$page.frontmatter.tags && $page.frontmatter.tags.length > 0"
        class="post-footer-tag"
      >
        <a-tag
          v-for="(tag, index) in $page.frontmatter.tags"
          :key="index"
          class="tag"
        >
          {{ tag }}
        </a-tag>
      </div>
    </div>

    <div v-if="getCatalogs.length > 0" class="post-catalog">
      <a-button
        shape="circle"
        icon="ordered-list"
        size="large"
        @click="catalog.visible = true"
      />
      <a-drawer
        placement="right"
        :title="$page.title"
        :closable="false"
        :visible="catalog.visible"
        wrapClassName="yur-post-drawer"
        @close="catalog.visible = false"
      >
        <a-anchor
          :affix="false"
          :bounds="200"
          :wrapper-style="{ maxHeight: 'auto' }"
        >
          <a-anchor-link
            v-for="(catalog, index) in getCatalogs"
            :key="index"
            :href="`#${catalog.slug}`"
            :title="catalog.title"
          >
            <template
              v-if="hasOwn(catalog, 'children') && catalog.children.length"
            >
              <a-anchor-link
                v-for="(child, index) in catalog.children"
                :key="index"
                :href="`#${child.slug}`"
                :title="child.title"
              />
            </template>
          </a-anchor-link>
        </a-anchor>
      </a-drawer>
    </div>
  </div>
</template>

<script>
import mixinHash from "@theme/utils/mixinHash";

export default {
  mixins: [mixinHash],
  data() {
    return {
      catalog: {
        visible: false
      },
      reward: []
    };
  },
  computed: {
    getCatalogs() {
      const headers = this.$page.headers;
      const catalog = [];
      if (headers && headers.length > 0) {
        headers.forEach(header => {
          if (header.level === 2) {
            catalog.push(header);
          } else {
            const catalogsLen = catalog.length;
            if (catalogsLen > 0) {
              if (!this.hasOwn(catalog[catalogsLen - 1], "children")) {
                catalog[catalogsLen - 1].children = [];
              }
              if (catalog[catalogsLen - 1].children.length > 0) {
                let canPush = true;
                catalog[catalogsLen - 1].children.forEach(e => {
                  if (e.slug === header.slug) {
                    canPush = false;
                  }
                });
                if (canPush) {
                  catalog[catalogsLen - 1].children.push(header);
                }
              } else {
                catalog[catalogsLen - 1].children.push(header);
              }
            }
          }
        });
      }
      return catalog;
    },
    getCopyright() {
      return this.$frontmatter.copyright || this.$l("copyrightStatement");
    }
  },
  created() {
    this.handleInit();
  },
  methods: {
    handleInit() {
      const { reward = [] } = this.$themeConfig;
      this.reward = reward;
    }
  }
};
</script>
