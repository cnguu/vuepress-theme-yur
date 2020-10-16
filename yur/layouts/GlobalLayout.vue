<template>
  <a-config-provider :locale="locale">
    <scrollbar ref="scrollbar">
      <div id="yur">
        <header id="header">
          <div class="header-container">
            <div class="header-container-logo">
              <router-link to="/">
                <img v-if="logo" :src="logo" :alt="$l('title')" />
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
                      :x="item.x"
                      :y="item.y"
                      :font-size="item.fontSize"
                      :text-anchor="item.textAnchor"
                      :text-transform="item.textTransform"
                      :text-shadow="item.textShadow"
                      :fill="item.fill"
                      :stroke="item.stroke"
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
            </div>
            <a-menu
              class="header-container-menu"
              :selectedKeys="menu"
              mode="horizontal"
            >
              <a-sub-menu
                v-if="menuCategories.length"
                class="header-container-menu-item"
                key="categories"
                popupClassName="header-container-menu-sub"
              >
                <span slot="title">
                  <span>
                    {{ $l("categories") }}
                    <a-icon
                      type="caret-down"
                      class="header-container-menu-sub-icon"
                    />
                  </span>
                </span>
                <a-menu-item
                  v-for="menuCategory in _menuCategories"
                  :key="menuCategory.link"
                >
                  <a
                    v-if="
                      $route.path === `/${menuCategory.link}/` ||
                        $page.pid === menuCategory.link
                    "
                    href="javascript:;"
                  >
                    {{ menuCategory.text }}
                  </a>
                  <router-link v-else :to="`/${menuCategory.link}/`">
                    {{ menuCategory.text }}
                  </router-link>
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item
                class="header-container-menu-item"
                v-if="links"
                key="links"
              >
                <router-link to="/links.html">
                  {{ $l("links") }}
                </router-link>
              </a-menu-item>
              <a-menu-item
                class="header-container-menu-item"
                v-if="about"
                key="about"
              >
                <router-link to="/about.html">
                  {{ $l("about") }}
                </router-link>
              </a-menu-item>
            </a-menu>
            <div class="header-container-menu-mobile" ref="menu-mobile">
              <a-popover
                v-model="visible"
                trigger="click"
                placement="leftTop"
                :getPopupContainer="() => $refs['menu-mobile']"
                overlayClassName="header-container-menu-mobile-popover"
              >
                <template slot="content">
                  <a-menu :selectedKeys="menu" mode="inline">
                    <a-menu-item
                      v-if="links"
                      key="links"
                      @click="changeVisible"
                    >
                      <router-link to="/links.html">
                        {{ $l("links") }}
                      </router-link>
                    </a-menu-item>
                    <a-menu-item
                      v-if="about"
                      key="about"
                      @click="changeVisible"
                    >
                      <router-link to="/about.html">
                        {{ $l("about") }}
                      </router-link>
                    </a-menu-item>
                  </a-menu>
                </template>
                <a-icon type="align-right" />
              </a-popover>
            </div>
          </div>
        </header>
        <main id="main">
          <transition name="fade-transform" mode="out-in">
            <component :is="layout" />
          </transition>
        </main>
        <footer id="footer">
          <div class="footer-container">
            <div class="content">
              <a-popover>
                <template slot="content">
                  Designed&nbsp;by
                  <a
                    href="https://github.com/cnguu/vuepress-theme-yur"
                    target="_blank"
                  >
                    cnguu
                  </a>
                </template>
                &copy;&nbsp;2019-{{ new Date().getFullYear() }}&nbsp;
                {{ $l("title") }}
              </a-popover>
            </div>
            <template v-if="beiAn">
              <a
                class="bei-an"
                href="http://beian.miit.gov.cn/"
                target="_blank"
              >
                {{ beiAn }}
              </a>
            </template>
          </div>
        </footer>
      </div>
    </scrollbar>
  </a-config-provider>
</template>

<script>
import enGB from "ant-design-vue/lib/locale-provider/en_GB";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  name: "Yur",
  data() {
    return {
      logo: "",
      nameplate: {
        title: "Yur",
        width: "36px",
        height: "26px",
        text: [
          {
            fontSize: "20",
            textAnchor: "middle",
            x: "50%",
            y: "75%",
            textTransform: "uppercase",
            fill: "none",
            stroke: "#3498db",
            textShadow: "0 0 1px #3498db",
            strokeWidth: "1px",
            strokeDasharray: "90 310",
            animate: {
              attributeName: "stroke-dashoffset",
              begin: "-1.5s",
              dur: "6s",
              from: "0",
              to: "-400",
              repeatCount: "indefinite"
            }
          },
          {
            fontSize: "20",
            textAnchor: "middle",
            x: "50%",
            y: "75%",
            textTransform: "uppercase",
            fill: "none",
            stroke: "#f39c12",
            textShadow: "0 0 1px #f39c12",
            strokeWidth: "1px",
            strokeDasharray: "90 310",
            animate: {
              attributeName: "stroke-dashoffset",
              begin: "-3s",
              dur: "6s",
              from: "0",
              to: "-400",
              repeatCount: "indefinite"
            }
          },
          {
            fontSize: "20",
            textAnchor: "middle",
            x: "50%",
            y: "75%",
            textTransform: "uppercase",
            fill: "none",
            stroke: "#e74c3c",
            textShadow: "0 0 1px #e74c3c",
            strokeWidth: "1px",
            strokeDasharray: "90 310",
            animate: {
              attributeName: "stroke-dashoffset",
              begin: "-4.5s",
              dur: "6s",
              from: "0",
              to: "-400",
              repeatCount: "indefinite"
            }
          },
          {
            fontSize: "20",
            textAnchor: "middle",
            x: "50%",
            y: "75%",
            textTransform: "uppercase",
            fill: "none",
            stroke: "#9b59b6",
            textShadow: "0 0 1px #9b59b6",
            strokeWidth: "1px",
            strokeDasharray: "90 310",
            animate: {
              attributeName: "stroke-dashoffset",
              begin: "-6s",
              dur: "6s",
              from: "0",
              to: "-400",
              repeatCount: "indefinite"
            }
          }
        ]
      },
      menuCategories: [],
      links: false,
      about: false,
      visible: false,
      beiAn: ""
    };
  },
  computed: {
    locale() {
      if (this.$lang === "zh-CN") {
        return zhCN;
      } else {
        return enGB;
      }
    },
    layout() {
      const { path } = this.$page;
      const { layout } = this.$frontmatter;
      if (path && path === "/") {
        return () => import("@theme/components/Home");
      }
      if (!layout || !path || layout === "FrontmatterPagination") {
        return "NotFound";
      }
      return () => import(`@theme/components/${layout}`);
    },
    menu() {
      let menu = "/";
      const { path, pid } = this.$page;
      const { layout } = this.$frontmatter;
      if (layout) {
        if (layout === "Categories") {
          menu = path.split("/")[1];
        } else if (layout === "Post") {
          menu = pid;
        } else if (["Links", "About"].includes(layout)) {
          menu = layout.toLocaleLowerCase();
        }
      } else if (path.length > 1) {
        menu = layout.toLocaleLowerCase();
      }
      return [menu];
    }
  },
  created() {
    this.handleInit();
  },
  methods: {
    handleInit() {
      const {
        logo,
        nameplate,
        links,
        about,
        menuCategories,
        beiAn
      } = this.$themeConfig;
      if (logo) {
        this.logo = this.$withBase(logo);
      }
      if (nameplate) {
        this.nameplate = Object.assign({}, this.nameplate, nameplate);
      } else {
        this.nameplate = null;
      }
      if (links) {
        this.links = true;
      }
      if (about) {
        this.about = true;
      }
      if (menuCategories) {
        this.menuCategories = menuCategories;
      }
      if (beiAn) {
        this.beiAn = beiAn;
      }
    },
    changeVisible() {
      this.visible = false;
    }
  }
};
</script>
