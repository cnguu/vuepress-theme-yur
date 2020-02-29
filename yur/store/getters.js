const getters = {
  mode: state => state.mode, // Current mode
  curtain: state => state.curtain,
  consoleTime: state => state.consoleTime, // Site first load time statistics
  path: state => state.path, // Current path
  page: state => state.page, // Current page
  post: state => state.post, // Current post
}
export default getters
