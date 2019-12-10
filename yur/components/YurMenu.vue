<template>
  <div id="yur-menu">
    <a-menu
      v-model="current"
      mode="horizontal"
      class="menu"
    >
      <a-sub-menu
        v-if="userLinks.length"
        key="category"
      >
        <span
          slot="title"
          class="submenu-title-wrapper"
        >
          分类
          <a-icon
            type="caret-down"
            class="category"
          />
        </span>
        <a-menu-item-group>
          <a-menu-item
            v-for="userLink in userLinks"
            :key="userLink.key"
          >
            <router-link :to="userLink.link">
              {{ userLink.text }}
            </router-link>
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item
        v-if="timeline"
        key="timeline"
      >
        <router-link to="/timeline">
          时间线
        </router-link>
      </a-menu-item>
      <a-menu-item
        v-if="link"
        key="link"
      >
        <router-link to="/link">
          友人帐
        </router-link>
      </a-menu-item>
      <a-menu-item
        v-if="about"
        key="about"
      >
        <router-link to="/about">
          关于我
        </router-link>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    currentPage: {
      type: String,
      required: true,
    },
    userLinks: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      current: ['/'],
      timeline: false,
      link: false,
      about: false,
    }
  },
  computed: {},
  watch: {
    $route: 'handleRoute',
  },
  beforeCreate () {
  },
  created () {
    this.initConfig()
    this.handleRoute()
  },
  beforeMount () {
  },
  mounted () {
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  methods: {
    initConfig () {
      const { timeline, link, about } = this.$themeConfig
      if (timeline) {
        this.timeline = true
      }
      if (link) {
        this.link = true
      }
      if (about) {
        this.about = true
      }
    },
    handleRoute () {
      this.current = [this.currentPage]
    },
  },
}
</script>

<style lang="less" scoped>
</style>
