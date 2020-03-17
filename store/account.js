export const state = () => ({
  isLogin: false,
  loginErrors: [],
  errorBg: {
    emailBg: '#e3f2fd',
    passwordBg: '#e3f2fd',
    fNameBg: '#e3f2fd',
    lNameBg: '#e3f2fd',
    phoneBg: '#e3f2fd',
    mailMessageBg: '#e3f2fd'
  },
  loginUser: {
    uid: null,
    email: null,
    displayName: null,
    registration: false
  }
})

export const mutations = {
  setLogout(state) {
    state.isLogin = false
  },
  setLogin(state) {
    state.isLogin = true
  },
  setLoginError(state, payload) {
    state.loginErrors.push(payload)
  },
  clearLoginError(state) {
    state.loginErrors.splice(0)
  },
  setPasswordBg(state, payload) {
    state.errorBg.passwordBg = payload
  },
  setEmailBg(state, payload) {
    state.errorBg.emailBg = payload
  },
  setFNameBg(state, payload) {
    state.errorBg.fNameBg = payload
  },
  setLNameBg(state, payload) {
    state.errorBg.lNameBg = payload
  },
  setPhoneBg(state, payload) {
    state.errorBg.phoneBg = payload
  },
  setMailMessage(state, payload) {
    state.errorBg.mailMessageBg = payload
  },
  clearErrorBg(state, payload) {
    state.errorBg.emailBg = payload
    state.errorBg.passwordBg = payload
    state.errorBg.fNameBg = payload
    state.errorBg.lNameBg = payload
    state.errorBg.phoneBg = payload
    state.errorBg.mailMessageBg = payload
  },
  setLoginUser(state, payload) {
    state.loginUser = payload
  }
}

// export const getters = {
//   getRegistration(state) {
//     return state.regstar
//   }
//   // getRegistrationByUid: (state) => (id) => {
//   //   console.log('getRegistrationByUid')
//   //   console.log(id)
//   //   // return state.todos.find(todo => todo.id === id)
//   //   return id
//   // }
//   // getRegistrationByUid: (state, getters) => {
//   //   console.log('getRegistrationByUid')
//   //   console.log(getters)
//   //   return getters
//   // }
//   //   console.log('getRegistrationByUid: ' + getters.email)
//   //   return true
//   // }
//   // getRegistrationByUid(state, getters) {
//   //   // state.regstar.forEach((reg) => {
//   //   //   if (reg.uid === payload.uid) {
//   //   //     return reg
//   //   //   }
//   //   // })
//   //   console.log('getRegistrationByUid: ' + getters.email)
//   //   return true
//   // }
// }
