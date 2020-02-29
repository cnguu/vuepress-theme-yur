<template>
  <div id="search">
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
        v-model="tab"
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
export default {
  name: 'Search',
  data () {
    return {
      keyword: '',
      tab: 'posts',
      search: {
        type: 'default',
      },
      posts: [],
      tags: [],
    }
  },
  watch: {
    $route (to, from) {
      const { tab: toTab, keyword: toKeyword } = to.query
      const { tab: fromTab, keyword: fromKeyword } = from.query
      if (toTab !== fromTab || toKeyword !== fromKeyword) {
        this.posts = []
        this.tags = []
        this.tab = toTab
        this.keyword = toKeyword
        if (toKeyword) {
          this.onSearch()
        }
      }
    },
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
      }
    },
    handleQuery () {
      const { tab, keyword } = this.$route.query
      if (tab && ['posts', 'tags'].includes(tab)) {
        this.tab = tab
      }
      if (keyword) {
        this.keyword = keyword
      }
      if (!this.hasOwn(this.$route.query, 'tab') || !this.hasOwn(this.$route.query, 'keyword')) {
        this.$router.replace({
          query: {
            tab: this.tab,
            keyword: this.keyword,
          },
        })
      }
    },
    onSearch (value) {
      if (value) {
        value = value.trim().toLowerCase()
        if (value === this.$route.query.keyword) {
          return false
        }
        this.$router.push({
          query: {
            tab: this.tab,
            keyword: this.keyword,
          },
        })
      } else {
        this.keyword = this.keyword.trim().toLowerCase()
      }
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
              if (matchTag(tag) && !tags.find(item => item.title === tag)) {
                tags.push({
                  title: tag,
                  path: `/tags/${tag}`,
                })
              }
            })
          }
        }
        this.posts = posts
        this.tags = tags
      }
    },
    changeTab () {
      this.posts = []
      this.tags = []
      this.$router.push({
        query: {
          tab: this.tab,
          keyword: this.keyword,
        },
      })
      this.onSearch()
    },
  },
}
</script>

<style lang="less" scoped>
</style>
