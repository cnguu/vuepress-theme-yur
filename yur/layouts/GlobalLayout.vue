<template>
  <a-locale-provider :locale="locale">
    <div id="yur-app">
      <TheHeader />
      <TheMain />
      <TheFooter />
    </div>
  </a-locale-provider>
</template>

<script>
import TheHeader from '@theme/components/TheHeader.vue'
import TheMain from '@theme/components/TheMain.vue'
import TheFooter from '@theme/components/TheFooter.vue'
import enGB from 'ant-design-vue/lib/locale-provider/en_GB'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'ThemeYur',
  components: {
    TheHeader,
    TheMain,
    TheFooter,
  },
  data () {
    return {}
  },
  computed: {
    locale () {
      switch (this.$store.state.settings.lang) {
        case 'en':
          return enGB
        case 'zh-CN':
          return zhCN
        default:
          return enGB
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
