<template>
  <div id="links">
    <div class="content">
      <div
        v-for="(item, index) in links"
        :key="index"
        class="wrapper"
      >
        <div
          v-show="index !== 0"
          class="hr"
        />
        <div class="name">
          <section />
          <section>{{ item.name }}</section>
          <section />
          <section />
        </div>
        <a-row>
          <a-col
            v-for="list in item.lists"
            :key="list.link"
            class="col"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
          >
            <div
              class="card"
              :style="{
                borderTop: `3px solid ${list.color}`,
              }"
            >
              <a
                :href="list.link"
                class="title"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ list.title }}
              </a>
              <div class="subtitle">
                {{ list.subtitle }}
              </div>
              <a
                :href="list.link"
                class="logo"
                target="_blank"
                rel="noopener noreferrer"
                :style="{
                  backgroundImage: `url(${ list.logo })`,
                  backgroundColor: list.color,
                }"
              />
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <Markdown />
    <Discuss />
  </div>
</template>

<script>
import Markdown from '@theme/components/Markdown'
import Discuss from '@theme/components/Discuss'

export default {
  name: 'Links',
  components: { Markdown, Discuss },
  data () {
    return {
      links: [
        {
          name: 'Blog',
          lists: [
            {
              title: '凉风有信',
              subtitle: '责难无以成事',
              link: 'https://blog.cnguu.cn/',
              logo: 'https://static.xmt.cn/cc50c217cbe342ce951324583f2c6139.png',
              color: '#9a69ec',
            },
          ],
        },
      ],
    }
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      const { links } = this.$themeConfig
      if (links && links.length) {
        this.links = links
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
