<template lang="pug">
  div.main-wrape
    div.container-fluid
        div.row
            level2SlotsComponent
                template(v-slot:leve1)
                    div.slot-wrape.level1-wrape
                        div.title
                            h5 Login
                            nuxt-link(to="/")
                                div.h7 return to Home
                template(v-slot:leve2)
                    div.slot-wrape.level2-wrape
                          div.reset-meg(v-if="isResetPass")
                              h6 Reset your password
                              div.h7 We will send you an email to reset your password.
                          form(@submit.prevent="loginCheck" novalidate)
                              div(v-if="loginErrors.length")
                                p.error-title 入力項目を確認してください。
                                ul
                                  li(v-for="(loginError, indexError) in loginErrors" :key="indexError")
                                    p.error-msg {{ loginError}}
                              div.email-enter
                                  label.label
                                      div.h7 Email
                                  input.input(v-model="email" type="email" placeholder="Email" required :style="{ background: errorBg.emailBg }" )
                              div.password-enter(v-if="!isResetPass")
                                  label.label
                                      div.h7 Password
                                  input.input(v-model="password" type="text" placeholder="Password" required :style="{ background: errorBg.passwordBg }")
                              button.submit-button(type="submit")
                                  div(v-if="!isResetPass")
                                      div.h7 SING IN
                                  div(v-else)
                                      div.h7 SUBMIT
                          div.auth(v-if="!isResetPass")
                              nuxt-link( to="/thisIsSleep/account/registration")
                                  div.h7 Create account
                              div.h7( @click="{isResetPass = true}") Forgot your password?
                          div.auth(v-if="isResetPass")
                              div.h7( @click="{isResetPass = false}") Cancel
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { GET_REGISTORY } from '~/store/actionTypes'
import firebase from '@/plugins/firebase'
import level2SlotsComponent from '~/components/layouts/levelSlots/level2SlotsComponent.vue'
export default {
  layout: 'layout3Parts',
  components: {
    level2SlotsComponent
  },
  data() {
    return {
      email: null,
      password: null,
      displayName: null,
      isResetPass: false
    }
  },
  computed: {
    ...mapState(['regstar']),
    ...mapGetters(['isAuthenticated']),
    ...mapState('account', ['loginErrors']),
    ...mapState('account', ['errorBg'])
  },
  mounted() {
    this.$store.commit('account/clearLoginError')
    this.$store.commit('account/clearErrorBg', '#e3f2fd')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.email = user.email
        // this.displayName = user.displayName
        const loginUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }
        this.$store.commit('setUser', loginUser)
        this.$store.dispatch(GET_REGISTORY, loginUser)
        // setTimeout(() => {
        //   console.log('setTimeout: ' + this.user.email) // ここだと取得できる
        //   // なにかしらの処理
        // })
      } else {
        this.email = null
        this.displayName = null
        this.$store.commit('setUser', null)
      }
    })
  },
  methods: {
    ...mapMutations({ setLogin: 'account/setLogin' }),
    accountLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          // const lp = '/about'
          // this.link_commit(lp)
          // this.isWaiting = false
          this.setLogin()
          this.$router.push({ path: '/' })
        })
        .catch((e) => {
          // console.log('login error：' + e.code)
          // console.log('login error：' + e)
          let eMessage = 'エラーが発生しました。'
          let eEmail = '#e3f2fd'
          let ePass = '#e3f2fd'
          switch (e.code) {
            case 'auth/email-already-in-use':
              eMessage = 'メールアドレスまたはパスワードが違います'
              eEmail = '#f8bbd0'
              ePass = '#f8bbd0'
              break
            case 'auth/invalid-email':
              eMessage = 'メールアドレスの形式が正しくありません'
              eEmail = '#f8bbd0'
              break
            case 'auth/user-disabled':
              eMessage = 'サービスの利用が停止されています'
              break
            case 'auth/user-not-found':
              eMessage = 'メールアドレスまたはパスワードが違います'
              eEmail = '#f8bbd0'
              ePass = '#f8bbd0'
              break
            case 'auth/user-mismatch':
              eMessage = 'メールアドレスまたはパスワードが違います'
              eEmail = '#f8bbd0'
              ePass = '#f8bbd0'
              break
            case 'auth/weak-password':
              eMessage = 'パスワードは6文字以上にしてください'
              ePass = '#f8bbd0'
              break
            case 'auth/wrong-password':
              eMessage = 'パスワードが違います'
              ePass = '#f8bbd0'
              break
            case 'auth/requires-recent-login':
              eMessage = '認証の有効期限が切れています'
              break
            default:
              eMessage =
                'エラーが発生しました。しばらく時間をおいてお試しください'
          }
          // this.isWaiting = false
          this.$store.commit('account/setLoginError', eMessage)
          this.$store.commit('account/setEmailBg', eEmail)
          this.$store.commit('account/setPasswordBg', ePass)
        })
    },
    validEmail: (email) => {
      /* eslint-disable */
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      /* eslint-disable */
      return re.test(email)
    },
    loginCheck(e) {
      this.$store.commit('account/clearLoginError')
      this.$store.commit('account/clearErrorBg', '#e3f2fd')
      if (!this.password) {
        this.$store.commit('account/setLoginError', 'パスワードは必須です。')
        this.$store.commit('account/setPasswordBg', '#f8bbd0')
      } else if (this.password.length < 8) {
        this.$store.commit(
          'account/setLoginError',
          'パスワードは８文字以上です。'
        )
        this.$store.commit('account/setPasswordBg', '#f8bbd0')
      }
      if (!this.email) {
        this.$store.commit('account/setLoginError', 'メールは必須です。')
        this.$store.commit('account/setEmailBg', '#f8bbd0')
      } else if (!this.validEmail(this.email)) {
        this.$store.commit('account/setLoginError', '無効なメール形式です。')
        this.$store.commit('account/setEmailBg', '#f8bbd0')
      }
      if (this.loginErrors.length) {
        // alert('error')
      } else {
        // alert('normal')
        this.accountLogin()
      }
      e.preventDefault()
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrape {
  margin-top: $header-height;
  overflow: hidden;
  width: 100%;
}
.slot-wrape {
  padding: 2rem 2rem 1.2rem 2rem;
  @media (min-width: 768px) {
    padding: 10rem 1.2rem;
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  a {
    color: black;
  }
}
// .level1-wrape {
//   //   border: 1px dotted;
// }
// .level2-wrape {
//   //   border: 1px dotted;
// }
// .email-enter {
//   //   border: 1px dotted red;
// }

.title {
  h5 {
    font-weight: 600;
  }
  .h7 {
    color: $grey;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
}
.error-title {
  color: $red;
}
.error-msg {
  background-color: $grey-light;
  padding: 0.5rem;
  color: $black;
}
.reset-meg {
  margin-bottom: 2rem;
  h6 {
    margin-bottom: 1rem;
  }
}
form {
  width: 100%;
}
.label {
  margin: 0.5rem 0;
  color: $grey;
  display: block;
  .h7 {
    font-weight: 300;
  }
}
.input {
  display: block;
  color: $black;
  font-size: $size-6;
  font-weight: $weight-normal;
  background-color: $white-ter;
  border-radius: 3.2rem;
  max-width: 100%;
  width: 100%;
  height: 2.6rem;
  padding-left: 0.5rem;
  border-style: solid;
  border-color: gray;
  border-width: 1px;
  box-shadow: 1px $black;
  outline: 0;
  &:hover,
  &:active,
  &:focus {
    border-color: $grey-light;
    border-style: solid;
    border-color: $grey-darker;
    border-width: 1px;
    box-shadow: 1px $black;
  }
}
.submit-button {
  display: block;
  color: $white;
  font-size: $size-6;
  font-weight: $weight-normal;
  background-color: $black-ter;
  border-radius: 2.6rem;
  max-width: 100%;
  width: 100%;
  height: 2.6rem;
  text-align: center;
  // padding-top: 0.6rem;
  border-style: solid;
  border-color: gray;
  border-width: 1px;
  box-shadow: 1px $black;
  outline: 0;
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    border-color: $grey-light;
    border-style: solid;
    border-color: $grey-darker;
    border-width: 1px;
    box-shadow: 1px $black;
  }
  margin: 2rem 0;
}
.auth {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .h7 {
    margin-right: 1rem;
    color: $grey;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
