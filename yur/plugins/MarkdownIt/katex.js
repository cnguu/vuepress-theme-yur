const katex = require('katex')

const isValidDelimiter = (state, pos) => {
  const prevChar = pos > 0 ? state.src.charCodeAt(pos - 1) : -1
  const nextChar = pos + 1 <= state.posMax ? state.src.charCodeAt(pos + 1) : -1
  const res = {
    canOpen: true,
    canClose: true,
  }

  if (prevChar === 0x20/* " " */ || prevChar === 0x09/* \t */ ||
    (nextChar >= 0x30/* "0" */ && nextChar <= 0x39/* "9" */)) {
    res.canClose = false
  }
  if (nextChar === 0x20/* " " */ || nextChar === 0x09/* \t */) {
    res.canOpen = false
  }

  return res
}

const mathInline = (state, silent) => {
  if (state.src[state.pos] !== '$') {
    return false
  }

  let res = isValidDelimiter(state, state.pos)
  if (!res.canOpen) {
    if (!silent) {
      state.pending += '$'
    }
    state.pos += 1
    return true
  }

  const start = state.pos + 1
  let match = state.pos + 1
  let pos

  while ((match = state.src.indexOf('$', match)) !== -1) {
    pos = match - 1
    while (state.src[pos] === '\\') {
      pos -= 1
    }

    if (((match - pos) % 2) === 1) {
      break
    }
    match += 1
  }

  if (match === -1) {
    if (!silent) {
      state.pending += '$'
    }
    state.pos = start
    return true
  }

  if (match - start === 0) {
    if (!silent) {
      state.pending += '$$'
    }
    state.pos = start + 1
    return true
  }

  res = isValidDelimiter(state, match)
  if (!res.canClose) {
    if (!silent) {
      state.pending += '$'
    }
    state.pos = start
    return true
  }

  if (!silent) {
    const token = state.push('mathInline', 'math', 0)
    token.markup = '$'
    token.content = state.src.slice(start, match)
  }

  state.pos = match + 1
  return true
}

const mathBlock = (state, start, end, silent) => {
  let pos = state.bMarks[start] + state.tShift[start]
  let max = state.eMarks[start]
  let firstLine
  let lastLine
  let next
  let lastPos
  let found = false

  if (pos + 2 > max || state.src.slice(pos, pos + 2) !== '$$') {
    return false
  }
  if (silent) {
    return true
  }

  pos += 2
  firstLine = state.src.slice(pos, max)

  if (firstLine.trim().slice(-2) === '$$') {
    firstLine = firstLine.trim().slice(0, -2)
    found = true
  }

  for (next = start; !found;) {
    next++

    if (next >= end) {
      break
    }

    pos = state.bMarks[next] + state.tShift[next]
    max = state.eMarks[next]

    if (pos < max && state.tShift[next] < state.blkIndent) {
      break
    }

    if (state.src.slice(pos, max).trim().slice(-2) === '$$') {
      lastPos = state.src.slice(0, max).lastIndexOf('$$')
      lastLine = state.src.slice(pos, lastPos)
      found = true
    }
  }

  state.line = next + 1

  const token = state.push('mathBlock', 'math', 0)
  token.block = true
  token.content = (firstLine && firstLine.trim() ? firstLine + '\n' : '') +
    state.getLines(start + 1, next, state.tShift[start], true) +
    (lastLine && lastLine.trim() ? lastLine : '')
  token.map = [start, state.line]
  token.markup = '$$'
  return true
}

module.exports = (md, options) => {
  options = options || {}

  const katexInline = latex => {
    options.displayMode = false
    try {
      return katex.renderToString(latex, options)
    } catch (error) {
      if (options.throwOnError) {
        console.log(error)
      }
      return latex
    }
  }

  const katexBlock = latex => {
    options.displayMode = true
    try {
      return `<p>${katex.renderToString(latex, options)}</p>`
    } catch (error) {
      if (options.throwOnError) {
        console.log(error)
      }
      return latex
    }
  }

  md.inline.ruler.after('escape', 'mathInline', mathInline)
  md.block.ruler.after('blockquote', 'mathBlock', mathBlock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  })
  md.renderer.rules.mathInline = (tokens, idx) => {
    return katexInline(tokens[idx].content)
  }
  md.renderer.rules.mathBlock = (tokens, idx) => {
    return katexBlock(tokens[idx].content) + '\n'
  }
}
