<script>
export default {
  functional: true,
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: undefined,
    },
  },
  // eslint-disable-next-line vue/require-render-return
  render (h, { data, props, parent }) {
    if (parent._isMounted) {
      return h('svg', {
        ...data,
        style: {
          fill: props.color,
          fontSize: props.size,
        },
        attrs: { 'aria-hidden': 'true' },
        class: ['icon', `icon-${props.name}`],
      }, [h('use', {
        attrs: { 'xlink:href': `#icon-${props.name}` },
      })])
    } else {
      parent.$once('hook:mounted', () => {
        parent.$forceUpdate()
      })
    }
  },
}
</script>

<style lang="less" scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
