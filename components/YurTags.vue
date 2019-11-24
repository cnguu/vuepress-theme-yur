<template>
  <div id="yur-tags">
    <div class="tags">
      <a-tabs
        v-if="Object.keys($tags).length"
        :active-key="activeKey"
        tab-position="top"
        @tabClick="tabClick"
      >
        <a-tab-pane
          v-for="(posts, tag) in $tags"
          :key="tag"
          :tab="tag"
        >
          <a-list
            class="post-list"
            item-layout="vertical"
            :pagination="pagination"
            :data-source="posts"
            :grid="postGrid"
            :locale="locale"
          >
            <a-list-item
              slot="renderItem"
              key="item.path"
              slot-scope="item"
            >
              <template slot="actions">
                {{ item.frontmatter.date ? fromNow(item.frontmatter.date) : '' }}
              </template>
              <img
                slot="extra"
                width="150"
                height="143"
                :alt="item.title"
                :src="$withBase(item.frontmatter.banner)"
              >
              <a-list-item-meta>
                <router-link
                  slot="title"
                  :to="item.path"
                >
                  {{ item.title }}
                </router-link>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { parseDate, getTimeOut } from '../util'

export default {
  components: {},
  props: {},
  data () {
    return {
      activeKey: Object.keys(this.$tags).shift(),
      loading: true,
      parseDate,
      pagination: {
        onChange: (page, pageSize) => {
          this.pageChange(page, pageSize)
        },
        onShowSizeChange: (current, size) => {
          this.pageChange(1, size)
        },
        showTotal: (total, range) => {
          return `总共 ${total} 条文章`
        },
        current: 1,
        pageSize: 12,
        pageSizeOptions: ['12', '24', '48', '96'],
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'small',
        textAlign: 'center',
      },
      postGrid: {
        gutter: 24,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 2,
        xl: 2,
        xxl: 2,
      },
      locale: {
        emptyText: '没有找到相关文章',
      },
    }
  },
  computed: {},
  watch: {
    $route (to, from) {
      this.activeKey = to.query.type
      this.pagination.current = Number(to.query.page)
      this.pagination.pageSize = Number(to.query.pageSize)
    },
  },
  beforeCreate () {
  },
  created () {
    if (this.$route.query.type) {
      this.activeKey = this.$route.query.type
    }
    if (this.$route.query.page) {
      this.pagination.current = Number(this.$route.query.page)
    }
    if (this.$route.query.pageSize) {
      this.pagination.pageSize = Number(this.$route.query.pageSize)
    }
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
    fromNow (date) {
      return this.$moment(date).fromNow()
    },
    pageChange (page, pageSize) {
      if (Number(this.$route.query.page) !== page || Number(this.$route.query.pageSize) !== pageSize) {
        this.pagination.current = page
        this.pagination.pageSize = pageSize
        this.$router.push(`/tags/?type=${this.activeKey}&page=${page}&pageSize=${pageSize}`)
      }
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
    tabClick (val) {
      if (this.$route.query.type !== val) {
        this.$router.push(`/tags/?type=${val}&page=1&pageSize=${this.pagination.pageSize}`)
      }
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
  },
}

</script>

<style lang="less" scoped>
</style>
