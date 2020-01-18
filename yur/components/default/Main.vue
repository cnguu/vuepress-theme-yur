<template>
  <main id="default-main">
    <Home v-if="$store.state.routes.page === '/'" />
    <Posts v-else-if="$store.state.routes.page === 'posts'" />
    <Categories v-else-if="Object.keys($categories).includes($store.state.routes.page)" />
    <Tags v-else-if="$store.state.routes.page === 'tags'" />
    <Timeline v-else-if="$store.state.routes.page === 'timeline'" />
    <Links v-else-if="$store.state.routes.page === 'links'" />
    <About v-else-if="$store.state.routes.page === 'about'" />
    <Search v-else-if="$store.state.routes.page === 'search'" />
    <None v-else />
    <a-back-top class="back-top" />
  </main>
</template>

<script>
import Home from '@theme/components/default/Home'
import Posts from '@theme/components/default/Posts'
import Categories from '@theme/components/default/Categories'
import Tags from '@theme/components/default/Tags'
import Timeline from '@theme/components/default/Timeline'
import Links from '@theme/components/default/Links'
import About from '@theme/components/default/About'
import Search from '@theme/components/default/Search'
import None from '@theme/components/default/None'

export default {
  name: 'Main',
  components: { Home, Posts, Categories, Tags, Timeline, Links, About, Search, None },
  data () {
    return {}
  },
}
</script>

<style lang="less" scoped>
</style>
