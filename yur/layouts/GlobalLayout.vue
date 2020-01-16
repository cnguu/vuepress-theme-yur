<template>
  <a-locale-provider :locale="locale">
    <div id="yur-app">
      <keep-alive>
        <IcarusApp v-if="layout==='icarus'" />
        <DefaultApp v-else />
      </keep-alive>
    </div>
  </a-locale-provider>
</template>

<script>
import DefaultApp from '@theme/components/default/Index.vue'
import IcarusApp from '@theme/components/icarus/Index.vue'
import enGB from 'ant-design-vue/lib/locale-provider/en_GB'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'ThemeYur',
  components: {
    DefaultApp,
    IcarusApp,
  },
  data () {
    return {
      layout: 'default',
    }
  },
  computed: {
    locale () {
      if (this.$store.state.settings.lang === 'zh-CN') {
        return zhCN
      } else {
        return enGB
      }
    },
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      const { layout } = this.$themeConfig
      if (layout) {
        this.layout = layout
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
