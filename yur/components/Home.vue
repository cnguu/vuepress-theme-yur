<template>
  <div id="home">
    <div class="banner">
      <div class="img-wrapper">
        <img
          :src="banner"
          :alt="$l('title')"
        >
      </div>
      <div class="text-wrapper">
        <div class="title-line-wrapper">
          <div class="title-line" />
        </div>
        <h1 class="title">
          {{ $l('title') }}
        </h1>
        <p class="description-wrapper">
          <span id="ityped">{{ description }}</span>
        </p>
        <div
          v-if="buttons.length"
          class="banner-btn-group"
        >
          <router-link
            v-for="(item, index) in buttons"
            :key="index"
            :to="item.link"
          >
            <a-button :type="item.type">
              {{ item.text }}
            </a-button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="post">
      <div class="wrapper">
        <h2>
          <span>{{ $l('newest') }}</span>
        </h2>
        <a-row
          v-if="$postsByUpdated.length"
          class="row"
        >
          <a-col
            v-for="{path,frontmatter,title} in $postsByUpdated.slice(0, 3)"
            :key="path"
            :xs="24"
            :md="8"
          >
            <router-link :to="path">
              <div class="banner">
                <div
                  class="img"
                  :style="{backgroundImage: `url(${frontmatter.banner})`}"
                />
              </div>
              <h3>
                <span>{{ title }}</span>
              </h3>
            </router-link>
          </a-col>
        </a-row>
      </div>
    </div>
    <TagCloud />
  </div>
</template>

<script>
import TagCloud from '@theme/components/TagCloud'
import { init } from 'ityped'

export default {
  name: 'Home',
  components: { TagCloud },
  data () {
    return {
      banner: require('@theme/assets/banner.png'),
      buttons: [
        { text: 'Read', link: '/posts', type: 'primary' },
        { text: 'About', link: '/about', type: 'default' },
      ],
      description: '',
      ityped: null,
    }
  },
  created () {
    this.handleInit()
  },
  mounted () {
    this.handleITyped()
  },
  methods: {
    handleInit () {
      const { ityped, banner, buttons } = this.$themeConfig
      if (banner) {
        this.banner = this.$withBase(banner)
      }
      if (buttons) {
        this.buttons = buttons
      }
      if (ityped) {
        this.ityped = ityped
      }
    },
    handleITyped () {
      if (this.ityped) {
        this.ityped.strings = [this.$l('description')]
        init('#ityped', this.ityped)
      } else {
        this.description = this.$l('description')
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
