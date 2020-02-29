<template>
  <div id="posts">
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
        <router-link
          slot="extra"
          :to="item.path"
        >
          <div
            class="banner"
            :style="{backgroundImage: `url(${item.frontmatter.banner})`}"
          />
        </router-link>
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
          <div
            v-if="$routePage === 'tags'"
            style="height: 22px"
          />
          <router-link
            v-for="(tag, key) in item.frontmatter.tags.slice(0, 1)"
            v-else
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
const paginationDefault = {
  current: 1,
  pageSize: 12,
  pageSizeOptions: ['12', '24', '48', '96'],
}

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
        md: 1,
        lg: 2,
        xl: 2,
        xxl: 2,
      },
    }
  },
  computed: {
    dataSource () {
      if (Object.keys(this.$categories).includes(this.$routePage)) {
        return this.$categories[this.$routePage]
      } else if (Object.keys(this.$tags).includes(this.$routePost)) {
        return this.$tags[this.$routePost]
      } else {
        return this.$posts
      }
    },
  },
  watch: {
    $route (to, from) {
      const { page: toPage, pageSize: toPageSize } = to.query
      const { page: fromPage, pageSize: fromPageSize } = from.query
      if (toPage && toPageSize && fromPage && fromPageSize && (toPage !== fromPage || toPageSize !== fromPageSize) && (this.pagination.current !== Number(toPage) || this.pagination.pageSize !== Number(toPageSize))) {
        // Determine if it is a back operation
        this.pagination.current = Number(toPage)
        this.pagination.pageSize = Number(toPageSize)
        this.$router.push({
          query: {
            page: toPage,
            pageSize: toPageSize,
          },
        }).catch(() => {
          // Make vue-router happy
        })
      } else if (!toPage || !toPageSize) {
        this.pagination.current = paginationDefault.current
        this.pagination.pageSize = paginationDefault.pageSize
        this.$router.replace({
          query: {
            page: String(paginationDefault.current),
            pageSize: String(paginationDefault.pageSize),
          },
        })
      }
    },
  },
  created () {
    this.handleInit()
    this.handleQuery()
  },
  methods: {
    handleInit () {
      this.pagination.showTotal = (total, range) => {
        return `${this.$l('total')} ${total} ${this.$l('posts')}`
      }
      this.locale.emptyText = this.$l('noPosts')

      const { post } = this.$themeConfig
      if (post) {
        const { pageSize, pageSizeOptions } = post
        if (pageSize) {
          this.pagination.pageSize = Number(pageSize)
          paginationDefault.pageSize = Number(pageSize)
        }
        if (pageSizeOptions) {
          this.pagination.pageSizeOptions = pageSizeOptions
          paginationDefault.pageSizeOptions = pageSizeOptions
        }
      }
      if (!this.pagination.pageSizeOptions.includes(this.pagination.pageSize)) {
        this.pagination.pageSize = Number(this.pagination.pageSizeOptions[0])
        paginationDefault.pageSize = Number(this.pagination.pageSizeOptions[0])
      }
    },
    handleQuery () {
      if (!this.hasOwn(this.$route.query, 'page') || !this.hasOwn(this.$route.query, 'pageSize')) {
        this.$router.replace({
          query: {
            page: String(this.pagination.current),
            pageSize: String(this.pagination.pageSize),
          },
        })
      }

      const { page, pageSize } = this.$route.query
      if (page) {
        this.pagination.current = Number(page)
      }
      if (pageSize) {
        this.pagination.pageSize = Number(pageSize)
      }
    },
    pageChange (page, pageSize) {
      this.pagination.current = page
      this.pagination.pageSize = pageSize
      this.$router.push({
        query: {
          page: String(this.pagination.current),
          pageSize: String(this.pagination.pageSize),
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
</style>
