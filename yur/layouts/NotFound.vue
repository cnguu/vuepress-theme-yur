<template>
  <a-skeleton
    active
    :loading="loading"
  >
    <div
      id="yur-not-found"
      :style="{
        backgroundImage: `url(${backgroundImage})`,
      }"
    >
      <section>
        <h1>404</h1>
        <p>
          页面不翼而飞
          <router-link to="/">
            回到主页
          </router-link>
        </p>
      </section>
    </div>
  </a-skeleton>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      loading: true,
      backgroundImage: require('../media/images/NotFound.jpg'),
    }
  },
  computed: {},
  watch: {},
  beforeCreate () {
  },
  created () {
    this.initConfig()
  },
  beforeMount () {
  },
  mounted () {
    this.loading = false
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
      const { notFound } = this.$themeConfig
      if (notFound) {
        this.backgroundImage = this.$withBase(notFound)
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
