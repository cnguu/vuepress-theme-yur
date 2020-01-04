<template>
  <header id="default-header">
    <div class="container">
      <a-popover
        v-model="visible"
        trigger="click"
        placement="rightBottom"
      >
        <template slot="content">
          <div id="menu-mobile">
            <a-menu
              v-model="currentPage"
              mode="inline"
              class="menu"
            >
              <a-sub-menu
                v-if="navs.length"
                key="category"
              >
                <span slot="title">{{ $l('category') }}</span>
                <a-menu-item-group>
                  <a-menu-item
                    v-for="nav in navs"
                    :key="nav.key"
                    @click="changeVisible"
                  >
                    <router-link :to="nav.link">
                      {{ nav.text }}
                    </router-link>
                  </a-menu-item>
                </a-menu-item-group>
              </a-sub-menu>
              <a-menu-item
                v-if="timeline"
                key="timeline"
                @click="changeVisible"
              >
                <router-link to="/timeline">
                  {{ $l('timeline') }}
                </router-link>
              </a-menu-item>
              <a-menu-item
                v-if="links"
                key="link"
                @click="changeVisible"
              >
                <router-link to="/links">
                  {{ $l('links') }}
                </router-link>
              </a-menu-item>
              <a-menu-item
                v-if="about"
                key="about"
                @click="changeVisible"
              >
                <router-link to="/about">
                  {{ $l('about') }}
                </router-link>
              </a-menu-item>
            </a-menu>
          </div>
        </template>
        <a-icon
          type="align-right"
          class="menu-icon"
        />
      </a-popover>
      <a-row>
        <a-col
          :xxl="4"
          :xl="5"
          :lg="5"
          :md="5"
          :sm="24"
          :xs="24"
        >
          <router-link
            class="logo"
            to="/"
          >
            <img
              :src="logo"
              :alt="title"
            >
            <svg
              v-if="nameplate"
              :width="nameplate.width"
              :height="nameplate.height"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <text
                  v-for="(item, index) in nameplate.text"
                  :key="index"
                  :font-size="item.fontSize"
                  :text-anchor="item.textAnchor"
                  :x="item.x"
                  :y="item.y"
                  :text-transform="item.textTransform"
                  :fill="item.fill"
                  :stroke="item.stroke"
                  :text-shadow="item.textShadow"
                  :stroke-width="item.strokeWidth"
                  :stroke-dasharray="item.strokeDasharray"
                >
                  {{ nameplate.title }}
                  <animate
                    :attributeName="item.animate.attributeName"
                    :begin="item.animate.begin"
                    :dur="item.animate.dur"
                    :from="item.animate.from"
                    :to="item.animate.to"
                    :repeatCount="item.animate.repeatCount"
                  />
                </text>
              </g>
            </svg>
          </router-link>
        </a-col>
        <a-col
          :xxl="20"
          :xl="19"
          :lg="19"
          :md="19"
          :sm="0"
          :xs="0"
        >
          <div class="search">
            <a-icon
              class="search-icon"
              type="search"
            />
            <a-auto-complete
              class="search-input"
              dropdown-class-name="search-dropdown"
              :placeholder="$l('search')"
              :allow-clear="true"
              option-label-prop="value"
              :dropdown-match-select-width="false"
              @search="handleSearch"
            >
              <template
                slot="dataSource"
              >
                <a-select-opt-group
                  v-for="group in searchSource"
                  :key="group.key"
                  class="select-group"
                >
                  <span
                    slot="label"
                    class="group-title"
                  >
                    {{ group.title }}
                  </span>
                  <template v-if="group.title === $l('tags')">
                    <a-select-option
                      v-for="opt in group.children"
                      :key="opt.key"
                      :value="searchKeyword"
                      class="select-option-tag"
                    >
                      <router-link :to="opt.path">
                        <a-tag>
                          {{ opt.title }}
                        </a-tag>
                      </router-link>
                    </a-select-option>
                  </template>
                  <template v-else>
                    <a-select-option
                      v-for="opt in group.children"
                      :key="opt.key"
                      :value="searchKeyword"
                      class="select-option"
                    >
                      <router-link :to="opt.path">
                        {{ opt.title }}
                      </router-link>
                    </a-select-option>
                  </template>
                </a-select-opt-group>
                <a-select-option
                  v-if="searchSource.length === 0"
                  key="v-search-empty"
                  disabled
                  class="search-empty"
                >
                  <a-empty />
                </a-select-option>
                <a-select-option
                  v-if="$route.path.split('/')[1] !== 'search'"
                  key="v-search-more"
                  :value="searchKeyword"
                  class="search-more"
                >
                  <router-link :to="`search/${searchKeyword}`">
                    {{ $l('more') }}
                  </router-link>
                </a-select-option>
              </template>
            </a-auto-complete>
          </div>
        </a-col>
      </a-row>
    </div>
  </header>
</template>

<script>
import { exitItem } from '@theme/utils'

export default {
  name: 'Header',
  data () {
    return {
      visible: false,
      navs: [],
      title: 'VuePress Theme Yur',
      logo: require('@theme/assets/logo64.png'),
      nameplate: {
        title: 'Yur', // 凉风有信
        width: '42px', // 86px
        height: '32px', // 32px
        text: [
          {
            fontSize: '20',
            textAnchor: 'middle',
            x: '50%',
            y: '50%',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: '#3498db',
            textShadow: '0 0 1px #3498db',
            strokeWidth: '1px',
            strokeDasharray: '90 310',
            animate: {
              attributeName: 'stroke-dashoffset',
              begin: '-1.5s',
              dur: '6s',
              from: '0',
              to: '-400',
              repeatCount: 'indefinite',
            },
          },
          {
            fontSize: '20',
            textAnchor: 'middle',
            x: '50%',
            y: '50%',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: '#f39c12',
            textShadow: '0 0 1px #f39c12',
            strokeWidth: '1px',
            strokeDasharray: '90 310',
            animate: {
              attributeName: 'stroke-dashoffset',
              begin: '-3s',
              dur: '6s',
              from: '0',
              to: '-400',
              repeatCount: 'indefinite',
            },
          },
          {
            fontSize: '20',
            textAnchor: 'middle',
            x: '50%',
            y: '50%',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: '#e74c3c',
            textShadow: '0 0 1px #e74c3c',
            strokeWidth: '1px',
            strokeDasharray: '90 310',
            animate: {
              attributeName: 'stroke-dashoffset',
              begin: '-4.5s',
              dur: '6s',
              from: '0',
              to: '-400',
              repeatCount: 'indefinite',
            },
          },
          {
            fontSize: '20',
            textAnchor: 'middle',
            x: '50%',
            y: '50%',
            textTransform: 'uppercase',
            fill: 'none',
            stroke: '#9b59b6',
            textShadow: '0 0 1px #9b59b6',
            strokeWidth: '1px',
            strokeDasharray: '90 310',
            animate: {
              attributeName: 'stroke-dashoffset',
              begin: '-6s',
              dur: '6s',
              from: '0',
              to: '-400',
              repeatCount: 'indefinite',
            },
          },
        ],
      },
      timeline: false,
      links: false,
      about: false,
      searchKeyword: '',
      searchSource: [],
      search: {
        type: 'default',
        size: 10,
      },
    }
  },
  computed: {
    currentPage () {
      return [this.$store.state.routes.page]
    },
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      const { title } = this.$site
      const { navs, logo, nameplate, timeline, links, about } = this.$config
      if (title) {
        this.title = title
      }
      if (navs) {
        navs.forEach(nav => {
          nav.key = nav.link.split('/')[1]
        })
        this.navs = navs
      }
      if (logo) {
        this.logo = this.$withBase(logo)
      }
      if (nameplate) {
        this.nameplate = Object.assign({}, this.nameplate, nameplate)
      } else {
        this.nameplate = null
      }
      if (timeline) {
        this.timeline = true
      }
      if (links) {
        this.links = true
      }
      if (about) {
        this.about = true
      }
    },
    changeVisible () {
      this.visible = false
    },
    handleSearch (value) {
      this.searchKeyword = ''
      this.searchSource = []
      value = value.trim().toLowerCase()
      if (!value) {
        return false
      }
      this.searchKeyword = value

      const { pages } = this.$site
      const { search } = this.$config
      if (search) {
        this.search = Object.assign({}, this.search, search)
      }
      const { size } = this.search
      const matchTitle = item => (
        item.title && item.title.toLowerCase().indexOf(value) > -1
      )
      const matchTag = item => (
        item.toLowerCase().indexOf(value) > -1
      )
      const res = []
      const posts = {
        title: this.$l('posts'),
        key: 'v-group-posts',
        children: [],
      }
      const tags = {
        title: this.$l('tags'),
        key: 'v-group-tags',
        children: [],
      }
      for (let i = 0; i < pages.length; i++) {
        if (posts.children.length >= size) break

        const p = pages[i]
        if (this.isCurrentPage(p.path)) continue

        if (matchTitle(p)) {
          posts.children.push({
            title: p.title,
            path: p.path,
            key: `v-${i}-${p.title}`,
          })
        } else if (p.headers) {
          for (let j = 0; j < p.headers.length; j++) {
            if (posts.children.length >= size) break

            const h = p.headers[j]
            if (matchTitle(h)) {
              posts.children.push({
                title: `${p.title} #${h.title}`,
                path: `${p.path}#${h.slug}`,
                key: `v-${j}-${p.title}#${h.title}`,
              })
            }
          }
        }

        if (p.frontmatter && p.frontmatter.tags && p.frontmatter.tags.length) {
          p.frontmatter.tags.forEach(tag => {
            if (matchTag(tag) && !exitItem(tags.children, 'title', tag)) {
              tags.children.push({
                title: tag,
                path: encodeURI(`/tags/${tag}`),
              })
            }
          })
        }
      }
      if (posts.children.length) {
        res.push(posts)
      }
      if (tags.children.length) {
        res.push(tags)
      }
      this.searchSource = res
    },
    isCurrentPage (path) {
      const index = path.indexOf('#')
      if (index === -1) {
        return path === this.$route.path
      } else {
        return path.substring(0, index) === this.$route.path
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
