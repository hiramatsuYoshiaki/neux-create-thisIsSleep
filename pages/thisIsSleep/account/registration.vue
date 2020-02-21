<template lang="pug">
  div.main-wrape
    div.container-fluid
        div.row
            level2SlotsComponent
                template(v-slot:leve1)
                    div.slot-wrape.level1-wrape
                        div.title
                            h5 Create Account
                            nuxt-link(to="/")
                                div.h7 return to Home
                template(v-slot:leve2)
                    div.slot-wrape.level2-wrape
                        form(@submit.prevent="createCheck" novalidate)
                            div(v-if="loginErrors.length")
                              p.error-title 入力項目を確認してください。
                              ul
                                li(v-for="(loginError, indexError) in loginErrors" :key="indexError")
                                  p.error-msg {{ loginError}}
                            div.first-name
                                label.label
                                    div.h7 Name
                                input.input(v-model="fName" type="text" placeholder="Name"  required :style="{ background: errorBg.fNameBg }")
                            //- div.last-name
                            //-     label.label
                            //-         div.h7 Last Name
                            //-     input.input(v-model="lName" type="text" placeholder="Last Name"  required :style="{ background: errorBg.lNameBg }")
                            div.email-enter
                                label.label
                                    div.h7 Email
                                input.input(v-model="email" type="email" placeholder="Email" required :style="{ background: errorBg.emailBg }")
                            div.password-enter
                                label.label
                                    div.h7 Password
                                input.input(v-model="password" type="text" placeholder="Password" required :style="{ background: errorBg.passwordBg }")
                            div.subscription
                                input#checkbox(type="checkbox" v-model="checked")
                                label.label-checkbox(for="checkbox")
                                    div.h7 Subscribe for bedtime reading, interesting thoughts and new product launches.
                            button.submit-button(type="submit")
                                div
                                    div.h7 CREATE
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { ADD_REGISTORY } from '~/store/actionTypes'
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
      fName: null,
      lName: null,
      checked: false
    }
  },
  computed: {
    ...mapState('account', ['loginErrors']),
    ...mapState('account', ['errorBg'])
  },
  mounted() {
    this.$store.commit('account/clearLoginError')
    this.$store.commit('account/clearErrorBg', '#e3f2fd')
  },
  methods: {
    ...mapMutations({ setLogin: 'account/setLogin' }),
    accountCreate() {
      // alert('accountCreate')
      // console.log('signin')
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          // console.log('createUserWithEmailAndPassword')
          const user = firebase.auth().currentUser
          // console.log('uid: ' + user.uid)
          // console.log('email: ' + user.email)
          // console.log('displayName: ' + this.displayName)
          return user
        })
        .then((user) => {
          firebase.auth().languageCode = 'jp'
          const actionCodeSettings = {
            url: 'http://' + window.location.host + '/createAccount',
            handleCodeInApp: false
          }
          user.sendEmailVerification(actionCodeSettings)
          return user
        })
        .then((user) => {
          // const myName = this.fName + this.lName
          const myName = this.fName
          this.$store.dispatch(ADD_REGISTORY, {
            uid: user.uid,
            email: user.email,
            displayName: myName,
            registration: false
          })
        })
        .then((user) => {
          // const lp = '/about'
          // this.link_commit(lp)
          // this.isWaiting = false
          // this.setLogin()
          // this.$router.push({ path: '/' })
          this.isWaiting = false
        })
        .catch((e) => {
          let eMessage = 'エラーが発生しました。'
          let eEmail = '#e3f2fd'
          let ePass = '#e3f2fd'
          switch (e.code) {
            case 'auth/email-already-in-use':
              eMessage = 'この電子メールアドレスは、すでに使われています'
              eEmail = '#f8bbd0'
              // ePass = '#f8bbd0'
              break
            case 'auth/invalid-email':
              eMessage = '電子メールアドレスが有効ではありません'
              eEmail = '#f8bbd0'
              // ePass = '#f8bbd0'
              break
            case 'auth/weak-password':
              eMessage = 'パスワードの強度が十分ではありません'
              // eEmail = '#f8bbd0'
              ePass = '#f8bbd0'
              break
            default:
              eMessage = 'エラーが発生しました。'
          }
          this.$store.commit('account/setLoginError', eMessage)
          this.$store.commit('account/setEmailBg', eEmail)
          this.$store.commit('account/setPasswordBg', ePass)
          // this.isWaiting = false
          // this.$store.commit('setAuthError', error)
        })
    },
    validEmail: (email) => {
      /* eslint-disable */
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      /* eslint-disable */
      return re.test(email)
    },
    createCheck(e) {
      alert('createCheck')
      this.$store.commit('account/clearLoginError')
      this.$store.commit('account/clearErrorBg', '#e3f2fd')
      if (!this.fName) {
        this.$store.commit('account/setLoginError', '名前は必須です。')
        this.$store.commit('account/setFNameBg', '#f8bbd0')
      } else if (this.fName.length > 40) {
        this.$store.commit('account/setLoginError', '名前は40文字以下です。')
        this.$store.commit('account/setFNameBg', '#f8bbd0')
      }
      // if (!this.lName) {
      //   this.$store.commit('account/setLoginError', '苗字は必須です。')
      //   this.$store.commit('account/setLNameBg', '#f8bbd0')
      // } else if (this.lName.length > 40) {
      //   this.$store.commit('account/setLoginError', '名前は40文字以下です。')
      //   this.$store.commit('account/setLNameBg', '#f8bbd0')
      // }
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
        alert('error')
      } else {
        alert('normal create account')
        this.accountCreate()
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

form {
  width: 100%;
}
.error-msg {
  background-color: $grey-light;
  padding: 0.5rem;
  color: $black;
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
.subscription {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .label-checkbox {
    margin-left: 1rem;
    margin-top: -0.3rem;
  }
}
</style>
