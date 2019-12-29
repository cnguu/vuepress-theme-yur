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
        />
      </a-row>
    </div>
  </header>
</template>

<script>
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
  },
}
</script>

<style lang="less" scoped>
</style>
