<template>
  <div id="yur-tag-cloud">
    <section v-if="tags.length">
      <div
        v-if="isHome && piano"
        class="header"
      >
        <a-icon
          type="customer-service"
          @click="handleClick"
        />
      </div>
      <Router-link
        v-for="(tag,index) in tags"
        :key="index"
        :to="`/tags/?type=${ tag }&page=1&pageSize=12`"
      >
        <a-tag
          @mouseover="handleMouseOver"
          @mouseout="handleMouseOut"
        >
          {{ tag }}
        </a-tag>
      </Router-link>
      <template v-if="piano">
        <YurPiano ref="yurPiano" />
      </template>
    </section>
    <a-tag v-else>
      暂无标签
    </a-tag>
  </div>
</template>

<script>
import YurPiano from '@theme/components/YurPiano'

export default {
  components: { YurPiano },
  props: {
    tagList: {
      type: Array,
      default: undefined,
    },
    isHome: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      piano: false,
    }
  },
  computed: {
    tags () {
      return this.tagList ? this.tagList : Object.keys(this.$tags)
    },
  },
  watch: {},
  beforeCreate () {
  },
  created () {
    this.initConfig()
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
      const { piano } = this.$themeConfig
      if (piano) {
        this.piano = true
      }
    },
    handleMouseOver () {
      if (this.piano) {
        this.$refs.yurPiano.handleMouseOver()
      }
    },
    handleMouseOut () {
      if (this.piano) {
        this.$refs.yurPiano.handleMouseOut()
      }
    },
    handleClick () {
      if (this.piano) {
        this.$refs.yurPiano.playSheet()
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
