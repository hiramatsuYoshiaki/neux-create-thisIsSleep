export const state = () => ({
  isOpenMobileMenu: false
})

export const mutations = {
  setOpenMobileMenu(state) {
    state.isOpenMobileMenu = !state.isOpenMobileMenu
  },
  closeMobileMenu(state) {
    state.isOpenMobileMenu = false
  }
}
