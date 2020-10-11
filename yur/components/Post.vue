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
  </div>
</template>

<script>
export default {
  data() {
    return {
      reward: []
    };
  },
  computed: {
    getCopyright() {
      return this.$page.copyright || this.$l("copyrightStatement");
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

<style lang="less">
#reward {
  img {
    width: 300px;
    height: 300px;
  }
}

@media (max-width: 992px) {
  #reward {
    img {
      width: 200px;
      height: 200px;
    }
  }
}

@media (max-width: 767px) {
  #reward {
    width: min-content;
  }
}
</style>
