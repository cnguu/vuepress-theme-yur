<template>
  <div id="yur-categories">
    <YurPosts :category="category" />
  </div>
</template>

<script>
import YurPosts from '@theme/components/YurPosts'

export default {
  components: { YurPosts },
  props: {
    category: {
      type: String,
      required: true,
    },
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate () {
  },
  created () {
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
  methods: {},
}
</script>

<style lang="less" scoped>
</style>
