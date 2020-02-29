<template>
  <footer id="footer">
    <div class="container">
      <div class="footer-wrap">
        <a-row>
          <a-col
            v-if="footer.one && footer.one.length"
            :xs="24"
            :sm="24"
            :md="8"
          >
            <div class="footer-center">
              <h2>
                <img
                  :src="footer.icon"
                  :alt="$l('title')"
                >
                <span>{{ $l('footerColOne') }}</span>
              </h2>
              <div
                v-for="(item, index) in footer.one"
                :key="index"
              >
                <a
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{{ item.title }}</span>
                </a>
                <span>&nbsp;-&nbsp;</span>
                <span>{{ item.subtitle }}</span>
              </div>
            </div>
          </a-col>
          <a-col
            v-if="footer.two && footer.two.length"
            :xs="24"
            :sm="24"
            :md="8"
          >
            <div class="footer-center">
              <h2>
                <span>{{ $l('footerColTwo') }}</span>
              </h2>
              <div
                v-for="(item, index) in footer.two"
                :key="index"
              >
                <a
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <a-icon
                    :type="item.type"
                    :theme="item.theme"
                  />
                  <span>{{ item.title }}</span>
                </a>
              </div>
            </div>
          </a-col>
          <a-col
            v-if="footer.three && footer.three.length"
            :xs="24"
            :sm="24"
            :md="8"
          >
            <div class="footer-center">
              <h2>
                <span>{{ $l('footerColThree') }}</span>
              </h2>
              <div
                v-for="(item, index) in footer.three"
                :key="index"
              >
                <a
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <a-icon
                    :type="item.type"
                    :theme="item.theme"
                  />
                  <span>{{ item.title }}</span>
                </a>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
      <div class="bottom-bar">
        {{ $l('madeWith') }}
        <span class="heart" />
        {{ $l('by') }}
        <a
          :href="authorLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{{ author }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      author: 'cnguu',
      authorLink: 'https://github.com/cnguu/',
      footer: {
        icon: require('@theme/assets/footer.png'),
      },
    }
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      const { author, authorLink, footer } = this.$themeConfig
      if (author) {
        this.author = author
      }
      if (authorLink) {
        this.authorLink = authorLink
      }
      if (footer) {
        if (this.hasOwn(footer, 'icon')) {
          footer.icon = this.$withBase(footer.icon)
        }
        this.footer = Object.assign({}, this.footer, footer)
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
