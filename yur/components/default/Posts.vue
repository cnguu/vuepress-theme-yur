<template>
  <div id="default-posts">
    <a-list
      class="post-list"
      item-layout="vertical"
      :pagination="pagination"
      :data-source="dataSource"
      :grid="postGrid"
      :locale="locale"
    >
      <a-list-item
        slot="renderItem"
        key="item.path"
        slot-scope="item"
      >
        <template slot="actions">
          {{ item.frontmatter.created }}
        </template>
        <img
          slot="extra"
          width="150"
          height="150"
          :alt="item.title"
          :src="item.frontmatter.banner"
        >
        <a-list-item-meta>
          <router-link
            slot="title"
            :to="item.path"
          >
            {{ item.title }}
          </router-link>
        </a-list-item-meta>
        <div
          v-if="item.frontmatter.tags"
          class="tag"
        >
          <router-link
            v-for="(tag, key) in item.frontmatter.tags.slice(0, 1)"
            :key="key"
            :to="`/tags/${ tag }`"
          >
            <a-tag>{{ tag }}</a-tag>
          </router-link>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'Posts',
  data () {
    return {
      pagination: {
        onChange: (page, pageSize) => {
          this.pageChange(page, pageSize)
        },
        onShowSizeChange: (current, size) => {
          this.pageChange(1, size)
        },
        showTotal: (total, range) => {
          return `Total ${total} Posts`
        },
        current: 1,
        pageSize: 12,
        pageSizeOptions: ['12', '24', '48', '96'],
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'small',
        textAlign: 'center',
      },
      locale: {
        emptyText: 'This blogger is really lazy and has not written an article',
      },
      postGrid: {
        gutter: 24,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 3,
      },
    }
  },
  computed: {
    dataSource () {
      if (Object.keys(this.$categories).includes(this.$store.state.routes.page)) {
        return this.$categories[this.$store.state.routes.page]
      } else {
        return this.$posts
      }
    },
  },
  watch: {
    $route (to, from) {
      if (!this.$store.state.routes.post) {
        if (!to.query.page && !to.query.pageSize) {
          this.handleInit()
          this.pagination.current = 1
          this.$router.replace({
            path: `/${this.$store.state.routes.page}/`,
            query: {
              page: this.pagination.current,
              pageSize: this.pagination.pageSize,
            },
          })
        } else {
          this.pagination.current = Number(to.query.page)
          this.pagination.pageSize = Number(to.query.pageSize)
        }
      }
    },
  },
  created () {
    this.handleInit()
    this.handleQuery()
    this.pagination.showTotal = (total, range) => {
      return `${this.$l('total')} ${total} ${this.$l('posts')}`
    }
    this.locale.emptyText = this.$l('noPosts')
  },
  methods: {
    handleInit () {
      const { post } = this.$themeConfig
      if (post) {
        const { pageSize, pageSizeOptions } = post
        if (pageSize) {
          this.pagination.pageSize = Number(pageSize)
        }
        if (pageSizeOptions) {
          this.pagination.pageSizeOptions = pageSizeOptions
        }
      }
      if (!this.pagination.pageSizeOptions.includes(this.pagination.pageSize)) {
        this.pagination.pageSize = Number(this.pagination.pageSizeOptions[0])
      }
    },
    handleQuery () {
      const { page, pageSize } = this.$route.query
      if (page) {
        this.pagination.current = Number(page)
      }
      if (pageSize) {
        this.pagination.pageSize = Number(pageSize)
      }
      if (!page && !pageSize) {
        this.$router.replace({
          path: `/${this.$store.state.routes.page}/`,
          query: {
            page: this.pagination.current,
            pageSize: this.pagination.pageSize,
          },
        })
      }
    },
    pageChange (page, pageSize) {
      if (Number(this.$route.query.page) !== page || Number(this.$route.query.pageSize) !== pageSize) {
        this.pagination.current = page
        this.pagination.pageSize = pageSize
        this.$router.push({
          path: `/${this.$store.state.routes.page}/`,
          query: { page, pageSize },
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
