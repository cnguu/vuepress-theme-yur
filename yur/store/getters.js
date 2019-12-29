const getters = {
  lang: state => state.lang, // Current lang
  curtain: state => state.curtain,
  consoleTime: state => state.consoleTime, // Site first load time statistics
  page: state => state.page, // Current page
}
export default getters
