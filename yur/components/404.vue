<template>
  <div id="page-404">
    <section class="error-container">
      <span class="four"><span class="screen-reader-text">4</span></span>
      <span class="zero"><span class="screen-reader-text">0</span></span>
      <span class="four"><span class="screen-reader-text">4</span></span>
    </section>
    <div class="link-container">
      <router-link
        to="/"
      >
        <a-button type="primary">
          {{ $l('backToHomepage') }}
        </a-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  mounted () {
    document.title = `${this.$l('404')} - ${this.$l('title')}`
  },
}
</script>

<style lang="less" scoped>
</style>
