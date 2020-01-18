<template>
  <main id="default-main">
    <Home v-if="$store.state.routes.page === '/'" />
    <Posts v-else-if="$store.state.routes.page === 'posts' && !$store.state.routes.post" />
    <Categories v-else-if="Object.keys($categories).includes($store.state.routes.page) && !$store.state.routes.post" />
    <Tags v-else-if="$store.state.routes.page === 'tags' && !$store.state.routes.post" />
    <Tag v-else-if="$store.state.routes.page === 'tags' && Object.keys($tags).includes($store.state.routes.post)" />
    <Timeline v-else-if="$store.state.routes.page === 'timeline'" />
    <Links v-else-if="$store.state.routes.page === 'links'" />
    <About v-else-if="$store.state.routes.page === 'about'" />
    <Search v-else-if="$store.state.routes.page === 'search'" />
    <Post v-else-if="$store.state.routes.post" />
    <None v-else />
    <a-back-top class="back-top" />
  </main>
</template>

<script>
import Home from '@theme/components/default/Home'
import Posts from '@theme/components/default/Posts'
import Categories from '@theme/components/default/Categories'
import Tags from '@theme/components/default/Tags'
import Tag from '@theme/components/default/Tag'
import Timeline from '@theme/components/default/Timeline'
import Links from '@theme/components/default/Links'
import About from '@theme/components/default/About'
import Search from '@theme/components/default/Search'
import Post from '@theme/components/default/Post'
import None from '@theme/components/default/None'

export default {
  name: 'Main',
  components: { Home, Posts, Categories, Tags, Tag, Timeline, Links, About, Search, Post, None },
  data () {
    return {}
  },
}
</script>

<style lang="less" scoped>
</style>
