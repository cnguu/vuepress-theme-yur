<template>
  <div id="tag-cloud">
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
  props: {
    tagList: {
      type: Array,
      default: undefined,
    },
  },
  computed: {
    tags () {
      const { tagSize = 60 } = this.$themeConfig
      if (this.tagList) {
        return this.tagList
      } else {
        if (this.$routePage === 'tags') {
          return shuffle(Object.keys(this.$tags))
        } else {
          return shuffle(Object.keys(this.$tags).slice(0, tagSize))
        }
      }
    },
  },
}
</script>
