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
                            br
                            div.h7 demo login
                            h6 mail: hworksdemo@gmail.com
                            h6 pass: hworksdemo1111
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
                                      div.h7 RESET PASS
                          div.auth(v-if="!isResetPass")
                              nuxt-link( to="/thisIsSleep/account/registration")
                                  div.h7 Create account
                              div.h7( @click="forgetPass()") Forgot your password?
                          div.auth(v-if="isResetPass")
                              div.h7( @click="cansel()") Cancel
                          div.messege
                            ul
                                li(v-for="(msg, index) in message" :key="index")
                                    p.guid-msg {{ msg }}
</template>
<script>
import firebase from '@/plugins/firebase'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { GET_REGISTORY } from '~/store/actionTypes'
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
      // isSendMail: false
    }
  },
  computed: {
    ...mapState(['regstar']),
    ...mapGetters(['isAuthenticated']),
    ...mapState('account', ['loginErrors']),
    ...mapState('account', ['errorBg']),
    ...mapState(['message'])
  },
  mounted() {
    this.$store.commit('account/clearLoginError')
    this.$store.commit('account/clearErrorBg', '#e3f2fd')
    this.$store.commit('clearMessage')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email
        this.displayName = user.displayName

        const loginUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }
        this.$store.commit('setUser', loginUser)
        this.$store.dispatch(GET_REGISTORY, loginUser)
        // this.$router.push({ path: '/thisIsSleep/account/logout' })
        // setTimeout(() => {
        //   console.log('setTimeout: ' + this.user.email) // ここだと取得できる
        //   // なにかしらの処理
        // })
      } else {
        this.email = null
        this.displayName = null
        // this.$store.commit('setUser', null)
        const loginUser = {
          uid: null,
          email: null,
          displayName: null
        }
        this.$store.commit('setUser', loginUser)
        this.$store.dispatch(GET_REGISTORY, loginUser)
      }
    })
  },
  methods: {
    ...mapMutations({ setLogin: 'account/setLogin' }),
    mailLink() {
      // ログオフ状態の場合は、メールリンクでログインしてからパスをリセットする。
      console.log('mail link: ' + this.email)
      alert('mail link: ' + this.email)
      const actionCodeSettings = {
        url:
          'http://' +
          window.location.host +
          '/thisIsSleep/account/passResetLogin',
        handleCodeInApp: true
      }
      const emaiUrl = this.email
      firebase
        .auth()
        .sendSignInLinkToEmail(emaiUrl, actionCodeSettings)
        .then((res) => {
          window.localStorage.setItem('emailForSignIn', emaiUrl)
          // this.isWaiting = true
          console.log('success')
          this.$store.commit('setMessage', 'メールを送信しました。')
          this.$store.commit(
            'setMessage',
            'メールの「h-works デモチーム にログイン」をクリックしてください。'
          )
          this.isResetPass = false
        })
        .catch((error) => {
          console.log('sendSignInLinkToEmail error: ' + error)
          // this.isWaiting = true
        })
    },
    passReset() {
      // ログイン状態の場合はパスをリセットできる。
      alert('passRest:' + this.email)
      console.log('passReset:' + this.email)
      this.isSendMail = false
      const user = firebase.auth().currentUser
      if (user) {
        console.log(user.uid)
        console.log(user.displayName)
        console.log(user.email)
        const isOk = window.confirm('パスワードをリセットしますか？')
        if (isOk) {
          // const emailAddress = user.email
          const emailAddress = this.email
          firebase
            .auth()
            .sendPasswordResetEmail(emailAddress)
            .then(() => {
              console.log('pass reset ')
              this.$store.commit('setMessage', 'メールを送信しました。')
              this.$store.commit(
                'setMessage',
                'メールリンクからパスワードを再設定してください。'
              )
              this.isResetPass = false
            })
            // .then(() => {
            // console.log('pass reset loginEmail go to')
            // this.link_commit('loginEmail')
            // })
            .catch((err) => {
              console.log('firebase auth error' + err)
            })
        }
      } else {
        // ログオフ状態の場合は、パスリセットするとエラーになるためメールリンクでログインしてからパスをリセットする。

        console.log('user null')
        console.log('mail link login')
        // パスなしでメールリンクからログインさせる。
        this.mailLink()
      }
    },
    accountLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          // this.isWaiting = false
          // this.setLogin()
          // this.$router.push({ path: '/' })
          const user = firebase.auth().currentUser
          const userEmailVerified = firebase.auth().currentUser.emailVerified
          if (userEmailVerified) {
            console.log('lverify')
            this.setLogin()
            this.$router.push({ path: '/' })
          } else {
            console.log('not verify')
            // console.log('sendEmailVerification')
            firebase.auth().languageCode = 'jp'
            const actionCodeSettings = {
              url:
                'http://' +
                window.location.host +
                '/thisIsSleep/account/createAccount',
              handleCodeInApp: false
            }
            user.sendEmailVerification(actionCodeSettings)
            this.$store.commit('setMessage', 'メールを送信しました。')
            this.$store.commit(
              'setMessage',
              'メールリンクからアカウント登録を完了してください。'
            )
          }
          // if (user) {
          //   const loginUser = {
          //     uid: user.uid,
          //     email: user.email,
          //     displayName: user.displayName
          //   }
          //   this.$store.commit('setUser', loginUser)
          //   this.$store.dispatch(GET_REGISTORY, loginUser)
          //   console.warn('regstar: ')
          //   console.warn(this.regstar)
          //   const reg = this.regstar

          //   for (const key in reg) {
          //     console.info('for')
          //     console.info(reg['.key'])
          //     console.info(reg[key].registration)
          //   }

          //   console.warn('registration: ' + this.getRegistration)
          // }
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
      this.$store.commit('clearMessage')

      if (!this.isResetPass) {
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
      }
      if (!this.email) {
        this.$store.commit('account/setLoginError', 'メールは必須です。')
        this.$store.commit('account/setEmailBg', '#f8bbd0')
      } else if (!this.validEmail(this.email)) {
        this.$store.commit('account/setLoginError', '無効なメール形式です。')
        this.$store.commit('account/setEmailBg', '#f8bbd0')
      }
      if (!this.loginErrors.length) {
        if (this.isResetPass) {
          this.passReset()
        } else {
          this.accountLogin()
        }
      }
      e.preventDefault()
    },
    forgetPass() {
      this.$store.commit('clearMessage')
      this.$store.commit('account/clearLoginError')
      this.$store.commit('account/clearErrorBg', '#e3f2fd')
      this.isResetPass = true
    },
    cansel() {
      this.$store.commit('clearMessage')
      this.$store.commit('account/clearLoginError')
      this.$store.commit('account/clearErrorBg', '#e3f2fd')
      this.isResetPass = false
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
  margin-top: 1rem;
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
.messege {
  margin-top: 1rem;
}
</style>
