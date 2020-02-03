export default function curtain (store, siteData) {
  const { curtain } = siteData.themeConfig
  if (curtain) {
    store.dispatch('changeSetting', {
      key: 'curtain',
      value: true,
    })
  }
}
