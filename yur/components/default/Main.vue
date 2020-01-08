<template>
  <main id="default-main">
    <Content />
  </main>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {}
  },
  created () {
    console.log(this.$config)
  },
}
</script>

<style lang="less" scoped>
</style>
