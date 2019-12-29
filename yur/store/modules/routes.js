const state = {
  page: '/',
  post: '',
}

const mutations = {
  CHANGE_ROUTE: (state, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
    }
  },
}

const actions = {
  changeRoute ({ commit }, data) {
    commit('CHANGE_ROUTE', data)
  },
}

export default {
  state,
  mutations,
  actions,
}
