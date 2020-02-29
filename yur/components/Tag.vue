<template>
  <div id="tag">
    <div class="wrapper">
      <a-breadcrumb separator=">">
        <a-breadcrumb-item>
          <Router-link to="/tags/">
            <a-icon type="tags" />
          </Router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          <span>{{ $routePost }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <Posts />
  </div>
</template>

<script>
import Posts from '@theme/components/Posts'

export default {
  name: 'Tag',
  components: { Posts },
}
</script>

<style lang="less" scoped>
</style>
