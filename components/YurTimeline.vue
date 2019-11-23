<template>
  <div id="yur-timeline">
    <a-timeline
      v-if="this.$posts.length"
      class="timeline"
      mode="alternate"
    >
      <a-timeline-item
        v-for="(post, index) in this.$posts"
        :key="index"
      >
        <router-link
          :to="post.path"
          :style="{color:'inherit'}"
        >
          <p v-if="index % 2 === 0">
            <a-tag color="blue">
              {{ parseDate(post.frontmatter.date) }}
            </a-tag>
            {{ post.title }}
          </p>
          <p v-else>
            {{ post.title }}
            <a-tag
              color="blue"
              :style="{marginLeft:'8px'}"
            >
              {{ parseDate(post.frontmatter.date) }}
            </a-tag>
          </p>
        </router-link>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script>
import { parseDate, getTimeOut } from '../util'

export default {
  components: {},
  props: {},
  data () {
    return {
      parseDate,
    }
  },
  computed: {},
  watch: {},
  beforeCreate () {
  },
  created () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$store.dispatch('changeSetting', {
          key: 'curtain',
          value: false,
        })
        document.getElementsByTagName('body')[0].style.overflow = 'unset'
      }, getTimeOut(this.$store.state.settings.consoleTime))
    })
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
