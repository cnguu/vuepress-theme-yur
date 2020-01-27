<template>
  <div id="default-tag">
    <div class="wrapper">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          <Router-link to="/tags/">
            <a-icon type="tags" />
          </Router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <span>{{ $store.state.routes.post }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <Posts />
  </div>
</template>

<script>
import Posts from '@theme/components/default/Posts'

export default {
  name: 'Tag',
  components: { Posts },
  data () {
    return {}
  },
}
</script>

<style lang="less" scoped>
</style>
