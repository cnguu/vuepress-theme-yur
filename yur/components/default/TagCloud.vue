<template>
  <div id="default-tag-cloud">
    <div class="wrapper">
      <div v-if="tags.length">
        <Router-link
          v-for="(tag, index) in tags"
          :key="index"
          :to="`/tags/${ tag }`"
        >
          <a-tag class="tag">
            {{ tag }}
          </a-tag>
        </Router-link>
      </div>
      <a-tag
        v-else
        class="tag no-tag"
      >
        {{ $l('noTags') }}
      </a-tag>
    </div>
  </div>
</template>

<script>
import { shuffle } from '@theme/utils'

export default {
  name: 'TagCloud',
  data () {
    return {
      tags: [],
    }
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      const { tagSize } = this.$themeConfig
      if (this.$store.state.routes.page === 'tags') {
        this.tags = shuffle(Object.keys(this.$tags))
      } else {
        this.tags = shuffle(Object.keys(this.$tags).slice(0, tagSize || 60))
      }
    },
  },
}
</script>
