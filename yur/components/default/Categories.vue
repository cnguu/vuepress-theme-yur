<template>
  <div id="default-categories">
    <Posts />
  </div>
</template>

<script>
import Posts from '@theme/components/default/Posts'

export default {
  name: 'Categories',
  components: { Posts },
  data () {
    return {}
  },
}
</script>

<style lang="less" scoped>
</style>
