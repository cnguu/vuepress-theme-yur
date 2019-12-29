export function getCurrentPage (path) {
  let page = '/'
  path = path.split('/')[1]
  if (path) {
    page = path.split('.')[0]
  }
  return page
}

export function getCurrentPost (path) {
  let post = ''
  if (path.split('/').length === 3) {
    path = path.split('/')[2]
  } else {
    path = path.split('/')[1]
  }
  if (path) {
    post = path.split('.')[0]
  }
  return post
}
