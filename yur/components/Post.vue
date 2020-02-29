<template>
  <div id="post">
    <div
      class="information"
      :style="{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${$page.frontmatter.banner})`
      }"
    >
      <div class="content">
        <div class="main">
          <router-link
            v-if="$page.categoryText"
            :to="`/${$page.category}/`"
            class="category"
          >
            {{ $page.categoryText }}
          </router-link>
          <p>{{ $page.title }}</p>
        </div>
        <div class="fringe">
          <a-tooltip
            v-if="$lang === 'zh-CN'"
            placement="top"
            class="word-count"
          >
            <template slot="title">
              <span>{{ $l('wordCount') }}{{ $page.wordCount }}</span>
            </template>
            <a-icon type="clock-circle" />
            {{ getReadingTime }}
          </a-tooltip>
        </div>
      </div>
      <Bubbles
        v-if="isBubbles"
        :options="bubbles"
      />
    </div>
    <div class="wrapper">
      <Markdown />
      <div class="end">
        <div
          v-if="reward.length"
          class="reward"
        >
          <a-popover
            placement="top"
            trigger="click"
            :overlay-style="{'width':'auto'}"
          >
            <template slot="content">
              <div id="reward">
                <img
                  v-for="(item, index) in reward"
                  :key="index"
                  :src="$withBase(item)"
                >
              </div>
            </template>
            <a-button
              shape="circle"
              size="large"
            >
              <a-icon type="money-collect" />
            </a-button>
          </a-popover>
        </div>
        <div class="copyright">
          <a-tooltip
            placement="topRight"
            style="float: left"
          >
            <template slot="title">
              <span>{{ getCopyright }}</span>
            </template>
            <a-button type="link">
              <a-icon type="copyright" />
              {{ $l('copyright') }}
            </a-button>
          </a-tooltip>
          <a-tooltip
            placement="topLeft"
            style="float: right"
          >
            <template slot="title">
              <span>{{ $l('created') }}<br>{{ $page.frontmatter.created }}<br>{{ $l('updated') }}<br>{{ $page.frontmatter.updated }}</span>
            </template>
            <a-button type="link">
              <a-icon type="calendar" />
              {{ $page.frontmatter.updated }}
            </a-button>
          </a-tooltip>
        </div>
        <TagCloud :tag-list="$page.frontmatter.tags" />
      </div>
      <Discuss />
    </div>
    <div
      v-if="getCatalogs.length"
      class="catalog"
    >
      <a-button
        type="primary"
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
        @close="catalog.visible = false"
      >
        <a-anchor
          :affix="false"
          :bounds="200"
          :wrapper-style="{maxHeight: 'auto'}"
        >
          <a-anchor-link
            v-for="(catalog, index) in getCatalogs"
            :key="index"
            :href="`#${catalog.slug}`"
            :title="catalog.title"
          >
            <template v-if="hasOwn(catalog, 'children') && catalog.children.length">
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
import Markdown from '@theme/components/Markdown'
import Discuss from '@theme/components/Discuss'
import TagCloud from '@theme/components/TagCloud'
import Bubbles from '@theme/components/Bubbles'

export default {
  name: 'Post',
  components: { Markdown, Discuss, TagCloud, Bubbles },
  data () {
    return {
      catalog: {
        visible: false,
      },
      reward: [],
      isBubbles: false,
      bubbles: {},
    }
  },
  computed: {
    getCatalogs () {
      const headers = this.$page.headers
      const catalog = []
      if (headers && headers.length > 0) {
        headers.forEach(header => {
          if (header.level === 2) {
            catalog.push(header)
          } else {
            const catalogsLen = catalog.length
            if (catalogsLen > 0) {
              if (!this.hasOwn(catalog[catalogsLen - 1], 'children')) {
                catalog[catalogsLen - 1].children = []
              }
              if (catalog[catalogsLen - 1].children.length > 0) {
                let canPush = true
                catalog[catalogsLen - 1].children.forEach(e => {
                  if (e.slug === header.slug) {
                    canPush = false
                  }
                })
                if (canPush) {
                  catalog[catalogsLen - 1].children.push(header)
                }
              } else {
                catalog[catalogsLen - 1].children.push(header)
              }
            }
          }
        })
      }
      return catalog
    },
    getReadingTime () {
      const wordCount = this.$page.wordCount
      if (wordCount < 600) {
        return `${this.$l('wordCountMin')}${this.$l('wordCountUnit')}`
      } else {
        return `${this.$l('wordCountMax')}${Math.ceil(wordCount / 600)}${this.$l('wordCountUnit')}`
      }
    },
    getCopyright () {
      return this.$page.copyright || this.$l('copyrightStatement')
    },
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      const { reward, post } = this.$themeConfig
      if (reward) {
        this.reward = reward
      }
      if (post) {
        const { bubbles } = post
        if (bubbles) {
          this.isBubbles = true
          if (typeof bubbles === 'object') {
            this.bubbles = bubbles
          }
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
