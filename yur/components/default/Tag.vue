<template>
  <div id="default-tag">
    <router-link to="/tags/">
      {{ $store.state.routes.post }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  data () {
    return {}
  },
}
</script>

<style lang="less" scoped>
</style>
