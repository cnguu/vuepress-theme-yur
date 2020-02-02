<template>
  <div id="timeline">
    <div
      v-if="this.$timeline.length"
      class="wrapper"
    >
      <a-timeline
        v-for="(item, index) in this.$timeline"
        :key="item.created"
        mode="left"
      >
        <a-timeline-item :color="item.color">
          <a-icon
            v-if="index === 0"
            slot="dot"
            type="pushpin"
            :style="{
              color: 'inherit',
              borderColor: 'inherit',
            }"
          />
          <a-icon
            v-else
            slot="dot"
            type="pushpin"
            :style="{
              color: item.color,
              borderColor: item.color,
            }"
          />
          <a-tag :color="item.color">
            {{ item.created }}
          </a-tag>
        </a-timeline-item>
        <a-timeline-item
          v-for="post in item.posts"
          :key="post.key"
          :color="item.color"
        >
          <a-tag :color="item.color">
            {{ getDay(post.frontmatter.created) }}
          </a-tag>
          <router-link
            :to="post.path"
            :style="{color:'inherit'}"
          >
            {{ post.title }}
          </router-link>
        </a-timeline-item>
      </a-timeline>
    </div>
    <a-empty
      v-else
      :description="$l('noPosts')"
    />
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  data () {
    return {}
  },
  methods: {
    getDay (time) {
      const date = time ? new Date(time) : new Date()
      let day = date.getDate()
      if (day >= 1 && day <= 9) {
        day = `0${day}`
      }
      return day
    },
  },
}
</script>

<style lang="less" scoped>
</style>
