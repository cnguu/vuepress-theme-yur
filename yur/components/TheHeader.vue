<template>
  <header>
    {{ $l('posts') }}
    <div>
      <a-button type="primary">
        Primary
      </a-button>
      <a-button>Default</a-button>
      <a-button type="dashed">
        Dashed
      </a-button>
      <a-button type="danger">
        Danger
      </a-button>
      <a-config-provider :auto-insert-space-in-button="false">
        <a-button type="primary">
          按钮
        </a-button>
      </a-config-provider>
      <a-button type="primary">
        按钮
      </a-button>
      <a-button type="link">
        Link
      </a-button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data () {
    return {}
  },
  created () {
  },
}
</script>

<style lang="less" scoped>
</style>
