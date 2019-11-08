export const state = () => ({
  isLogin: false
})

export const mutations = {
  setLogout(state) {
    state.isLogin = false
  },
  setLogin(state) {
    state.isLogin = true
  }
}
