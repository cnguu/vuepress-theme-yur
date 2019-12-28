<template>
  <div id="default-app">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from '@theme/components/default/Header.vue'
import Main from '@theme/components/default/Main.vue'
import Footer from '@theme/components/default/Footer.vue'

export default {
  name: 'DefaultApp',
  components: {
    Header,
    Main,
    Footer,
  },
  data () {
    return {}
  },
}
</script>

<style lang="less" scoped>
</style>
