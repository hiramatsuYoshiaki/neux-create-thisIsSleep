export const state = () => ({
  solutions: {},
  solProducts: []
})
export const mutations = {
  clearAns(state) {
    state.solutions = {}
  },
  setSolutions(state, solutionUser) {
    state.solutions = solutionUser
  },
  setAns(state, answer) {
    state.solutions.answers.push(answer)
  },
  setSolProducts(state, payload) {
    state.solProducts = payload
  }
}
