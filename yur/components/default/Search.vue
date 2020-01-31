<template>
  <div id="default-search">
    <div class="search">
      <a-input-search
        v-model="keyword"
        :placeholder="$l('search')"
        :allow-clear="true"
        enter-button
        @search="onSearch"
      />
    </div>
    <div class="wrapper">
      <a-tabs
        :default-active-key="tab"
        :animated="false"
        @change="changeTab"
      >
        <a-tab-pane
          v-if="search.type === 'algolia'"
          key="algolia"
        >
          <span slot="tab">
            <a-icon type="search" />
            {{ $l('algolia') }}
          </span>
          <div v-if="algolias.length">
            algolias search is under development
          </div>
          <a-empty
            v-else
            :description="$l('noSearch')"
          />
        </a-tab-pane>
        <a-tab-pane key="posts">
          <span slot="tab">
            <a-icon type="file-search" />
            {{ $l('posts') }}
          </span>
          <div v-if="posts.length">
            <a-list
              size="small"
              :data-source="posts"
            >
              <a-list-item
                slot="renderItem"
                slot-scope="{title, path}"
                class="list-item"
              >
                <router-link :to="path">
                  {{ title }}
                </router-link>
              </a-list-item>
            </a-list>
          </div>
          <a-empty
            v-else
            :description="$l('noSearch')"
          />
        </a-tab-pane>
        <a-tab-pane key="tags">
          <span slot="tab">
            <a-icon type="tags" />
            {{ $l('tags') }}
          </span>
          <div v-if="tags.length">
            <Router-link
              v-for="{title, path} in tags"
              :key="title"
              :to="path"
            >
              <a-tag class="tag">
                {{ title }}
              </a-tag>
            </Router-link>
          </div>
          <a-empty
            v-else
            :description="$l('noSearch')"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { exitItem } from '@theme/utils'

export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      tab: 'posts',
      selectedTab: 'posts',
      search: {
        type: 'default',
      },
      posts: [],
      tags: [],
      algolias: [],
    }
  },
  created () {
    this.handleInit()
    this.handleQuery()
    if (this.keyword) {
      this.onSearch()
    }
  },
  methods: {
    handleInit () {
      const { search } = this.$themeConfig
      if (search) {
        this.search = Object.assign({}, this.search, search)
        if (this.search.type === 'algolia') {
          this.tab = 'algolia'
          this.selectedTab = 'algolia'
        }
      }
    },
    handleQuery () {
      const { tab, keyword } = this.$route.query
      if (tab && ['posts', 'tags'].includes(tab)) {
        this.tab = tab
        this.selectedTab = tab
      }
      if (keyword) {
        this.keyword = keyword
      }
      this.refreshQuery()
    },
    refreshQuery () {
      const { tab, keyword } = this.$route.query
      if (this.selectedTab !== tab || this.keyword !== keyword) {
        this.$router.replace({
          query: {
            tab: this.selectedTab,
            keyword: this.keyword,
          },
        })
      }
    },
    onSearch () {
      this.keyword = this.keyword.trim().toLowerCase()
      this.refreshQuery()
      if (!this.keyword) {
        this.posts = []
        this.tags = []
        return false
      }

      if (this.tab === 'algolia') {

      } else {
        const posts = []
        const tags = []
        const { pages } = this.$site
        const matchTitle = item => (
          item.title && item.title.toLowerCase().indexOf(this.keyword) > -1
        )
        const matchTag = item => (
          item.toLowerCase().indexOf(this.keyword) > -1
        )

        for (let i = 0; i < pages.length; i++) {
          const p = pages[i]
          if (matchTitle(p)) {
            posts.push({
              title: p.title,
              path: p.path,
            })
          } else if (p.headers) {
            for (let j = 0; j < p.headers.length; j++) {
              const h = p.headers[j]
              if (matchTitle(h)) {
                posts.push({
                  title: `${p.title} #${h.title}`,
                  path: `${p.path}#${h.slug}`,
                })
              }
            }
          }

          if (p.frontmatter && p.frontmatter.tags && p.frontmatter.tags.length) {
            p.frontmatter.tags.forEach(tag => {
              if (matchTag(tag) && !exitItem(tags, 'title', tag)) {
                tags.push({
                  title: tag,
                  path: encodeURI(`/tags/${tag}`),
                })
              }
            })
          }
        }
        this.posts = posts
        this.tags = tags
      }
    },
    changeTab (value) {
      this.posts = []
      this.tags = []
      this.selectedTab = value
      this.onSearch()
    },
  },
}
</script>

<style lang="less" scoped>
</style>
