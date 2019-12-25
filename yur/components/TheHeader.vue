<template>
  <header>
    {{ $l('posts') }}
    <router-link to="/1">
      1
    </router-link>
    <router-link to="/2">
      2
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data () {
    return {}
  },
  mounted () {
  },
}
</script>

<style lang="less" scoped>
</style>
