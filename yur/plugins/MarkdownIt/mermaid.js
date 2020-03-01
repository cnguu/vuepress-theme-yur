module.exports = md => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    if (token.info === 'mermaid') {
      return `<mermaid>${token.content}</mermaid>`
    } else {
      const rawCode = fence(...args)
      return `${rawCode}`
    }
  }
}
