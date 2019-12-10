<template>
  <div id="yur-search">
    <a-icon type="search" />
    <span class="search-autocomplete">
      <a-dropdown :trigger="['hover']">
        <a-input
          placeholder="搜索"
          autocomplete="off"
          :value="query"
          @input="query = $event.target.value"
          @keyup.enter="go(focusIndex)"
          @keyup.up="onUp"
          @keyup.down="onDown"
        />
        <a-menu
          v-if="showSuggestions"
          slot="overlay"
          @mouseleave="unfocus"
        >
          <template
            v-for="(s, i) in suggestions"
          >
            <a-menu-item
              v-if="isCurrentPage(s.path)"
              :key="i"
              @mousedown="go(i)"
              @mouseenter="focus(i)"
            >
              <router-link :to="s.path">
                <span>{{ s.title || s.path }}</span>
                <span v-if="s.header">#{{ s.header.title }}</span>
              </router-link>
            </a-menu-item>
          </template>
        </a-menu>
      </a-dropdown>
    </span>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      query: '',
      focusIndex: 0,
    }
  },
  computed: {
    showSuggestions () {
      return (
        this.suggestions &&
          this.suggestions.length
      )
    },
    suggestions () {
      const query = this.query.trim().toLowerCase()
      if (!query) {
        return
      }
      const { pages } = this.$site
      // eslint-disable-next-line no-undef
      const max = SEARCH_MAX_SUGGESTIONS
      const localePath = this.$localePath
      const matches = item => (
        item.title &&
          item.title.toLowerCase().indexOf(query) > -1
      )
      const res = []
      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break
        const p = pages[i]
        if (this.getPageLocalePath(p) !== localePath) {
          continue
        }
        if (!this.isSearchable(p)) {
          continue
        }
        if (matches(p)) {
          res.push(p)
        } else if (p.headers) {
          for (let j = 0; j < p.headers.length; j++) {
            if (res.length >= max) break
            const h = p.headers[j]
            if (matches(h)) {
              res.push(Object.assign({}, p, {
                path: p.path + '#' + h.slug,
                header: h,
              }))
            }
          }
        }
      }
      return res
    },
  },
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
  methods: {
    getPageLocalePath (page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
          return localePath
        }
      }
      return '/'
    },
    isSearchable (page) {
      // eslint-disable-next-line no-undef
      let searchPaths = SEARCH_PATHS
      if (searchPaths === null) {
        return true
      }
      searchPaths = Array.isArray(searchPaths) ? searchPaths : new Array(searchPaths)
      return searchPaths.filter(path => {
        return page.path.match(path)
      }).length > 0
    },
    onUp () {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--
        } else {
          this.focusIndex = this.suggestions.length - 1
        }
      }
    },
    onDown () {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++
        } else {
          this.focusIndex = 0
        }
      }
    },
    go (i) {
      if (!this.showSuggestions) {
        return
      }
      this.$router.push(this.suggestions[i].path)
      this.query = ''
      this.focusIndex = 0
    },
    focus (i) {
      this.focusIndex = i
    },
    unfocus () {
      this.focusIndex = -1
    },
    isCurrentPage (path) {
      const index = path.indexOf('#')
      if (index === -1) {
        return path !== this.$route.path
      } else {
        return path.substring(0, index) !== this.$route.path
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
