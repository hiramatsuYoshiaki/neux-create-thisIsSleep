<template lang="pug">
  div.main-wrape
    div.container-fluid
        div.row
            level2SlotsComponent
                template(v-slot:leve1)
                    div.slot-wrape.level1-wrape
                        div.title
                            h5 Pass Reset
                            //- nuxt-link(to="/")
                            //-     div.h7 return to Home
                template(v-slot:leve2)
                    div.slot-wrape

                        //- form(@submit.prevent="passResetLogin" novalidate)
                        //-   div(v-if="loginErrors.length")
                        //-     p.error-title 入力項目を確認してください。
                        //-     ul
                        //-       li(v-for="(loginError, indexError) in loginErrors" :key="indexError")
                        //-         p.error-msg {{ loginError}}
                        //-   div.email-enter
                        //-       label.label
                        //-           div.h7 Email
                        //-       input.input(v-model="email" type="email" placeholder="Email" required :style="{ background: errorBg.emailBg }" )
                        //- button.submit-button(type="submit")
                        //-     div.h7 RESET PASS START
                        //-   div.auth(v-if="!isResetPass")
                        //-       nuxt-link( to="/thisIsSleep/account/registration")
                        //-           div.h7 Create account
                        //-       div.h7( @click="{isResetPass = true}") Forgot your password?
                        //-   div.auth(v-if="isResetPass")
                        //-       div.h7( @click="{isResetPass = false}") Cancel
                        //-   div

                        div.pass-reset(v-if="isStart")
                            div パスワードをリセットします。
                            div STARTボタンを押してください。
                            button.submit-button(@click="passResetLogin")
                                        div.h7 START(login)
                        div.pass-reset(v-if="isCreate")
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
                                button.submit-button(type="submit")
                                            div.h7 SET NAME
                            div {{uid}}
                            div {{email}}
                            div {{displayName}}
                        div.pass-reset(v-if="isDone")
                            button.submit-button(@click="passReset")
                                        div.h7 RESET
                        div.pass-reset(v-if="isClose")
                            nuxt-link( to="/thisIsSleep/account/login")
                                    button.submit-button
                                        div.h7 CLOSE
                        ul
                            li(v-for="(msg, index) in resetMessage" :key="index")
                                p.guid-msg {{ msg }}

</template>
<script>
import firebase from '@/plugins/firebase'
import { mapState, mapMutations } from 'vuex'
import { ADD_REGISTORY } from '~/store/actionTypes'
import level2SlotsComponent from '~/components/layouts/levelSlots/level2SlotsComponent.vue'
export default {
  layout: 'layout3Parts',
  components: {
    level2SlotsComponent
  },
  data() {
    return {
      status: 'start',
      start: 'start',
      done: 'done',
      close: 'close',
      create: 'create',
      email: null,
      uid: null,
      displayName: null,
      fName: null
    }
  },
  computed: {
    // ...mapState(['user']),
    // ...mapState(['regstar']),
    ...mapState('account', ['loginErrors']),
    ...mapState('account', ['errorBg']),
    ...mapState(['resetMessage']),
    isStart() {
      return this.startStatus()
    },
    isDone() {
      return this.doneStatus()
    },
    isClose() {
      return this.closeStatus()
    },
    isCreate() {
      return this.createStatus()
    }
  },
  mounted() {
    // this.status = this.start
    console.log('passResetLogin mounted')
    this.$store.commit('account/clearLoginError')
    this.$store.commit('account/clearErrorBg', '#e3f2fd')
    this.$store.commit('clearResetMessage')
    this.$store.commit(
      'setResetMessage',
      'RESET START ボタンを押してください。'
    )
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.uid = user.uid
    //     this.email = user.email
    //     this.displayName = user.displayName
    //     console.log('mounted user.uid: ' + user.uid)
    //     console.log('mounted user.uid: ' + user.email)
    //     console.log('mounted user.displayNmae: ' + user.displayName)
    //     const loginUser = {
    //       uid: user.uid,
    //       email: user.email,
    //       displayName: user.displayName
    //     }
    //     this.$store.commit('setUser', loginUser)
    //     this.$store.dispatch(GET_REGISTORY, loginUser)
    //   } else {
    //     this.email = null
    //     this.displayName = null
    //     this.$store.commit('setUser', null)
    //   }
    // })
  },
  methods: {
    ...mapMutations({ setLogout: 'account/setLogout' }),
    displayNameSet() {
      this.$store.commit('clearResetMessage')
      alert('displayNameSet')
      console.info('ADD_REGISTORY')
      // const myName = this.fName + this.lName
      const myName = this.fName
      //   console.info('displayName: ' + myName)
      //   this.$store.dispatch(ADD_REGISTORY, {
      //     uid: this.uid,
      //     email: this.email,
      //     displayName: myName,
      //     registration: true
      //   })
      const user = firebase.auth().currentUser
      if (user) {
        user
          .updateProfile({ displayName: myName })
          .then((result) => {
            // let userkey = null
            // for (const regItem of this.regstar) {
            //   userkey = regItem['.key']
            // }
            this.$store.dispatch(ADD_REGISTORY, {
              uid: user.uid,
              email: user.email,
              displayName: myName,
              registration: true
            })
            // this.$store.dispatch(UPDATEDANE_REGISTORY, {
            //   uid: user.uid,
            //   email: user.email,
            //   displayName: this.getDisplayName,
            //   key: userkey,
            //   registration: true
            // })
          })
          .then(() => {
            // this.link_commit('/loginEmail')
            console.log('user set ok ')
            this.$store.commit('setMessage', 'アカウント登録が完了しました')
            // this.isUpdate = true
          })
          .catch((error) => {
            console.log('login error' + error)
          })
      } else {
        alert('再ログインしてから、ユーザー情報をしてください。')
        this.email = null
        this.displayName = null
        this.$store.commit('setUser', null)
      }
      this.$store.commit('setResetMessage', 'RESET ボタンを押してください。')
      this.status = this.done
    },
    passReset() {
      this.$store.commit('clearResetMessage')
      // ログイン状態の場合はパスをリセットできる。
      //   alert('passRest:' + this.email)
      //   console.log('passReset:' + this.email)
      //   this.isSendMail = false
      const user = firebase.auth().currentUser
      if (user) {
        console.log(user.uid)
        console.log(user.displayName)
        console.log(user.email)
        const isOk = window.confirm('パスワードをリセットしますか？')
        if (isOk) {
          // const emailAddress = user.email
          const emailAddress = user.email
          firebase
            .auth()
            .sendPasswordResetEmail(emailAddress)
            .then(() => {
              console.log('pass reset ')
              this.$store.commit('setResetMessage', 'メールを送信しました。')
              this.$store.commit(
                'setResetMessage',
                'メールからパスワードを再設定してください。'
              )
              this.status = this.close
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
        // this.$store.commit('/auth', null)
        // this.email = null
        // this.displayName = null
        // this.$store.commit('setUser', null)
        // alert('再ログインしてから、パスの再設定をしてください。')
        // this.$router.push({ path: '/' })
        console.log('user null')
        console.log('mail link login')
        // パスなしでメールリンクからログインさせる。
        // this.mailLink()
      }
    },
    passResetLogin() {
      alert('passResetLogin')
      this.$store.commit('clearResetMessage')
      //   メールリンクで使用するディープリンクの形式は、
      // 帯域外メール アクションで使用される形式
      // （メールアドレスの確認、パスワードのリセット、メールアドレスの変更取り消しなどで使用される形式）と同じです。
      // Firebase Auth は isSignInWithEmailLink API を提供することにより、
      // リンクがメールリンクによるログインかどうかを判断する作業を簡易にします。
      if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn')
        alert('isSignInWithEmailLink: ' + email)
        if (!email) {
          // ユーザにテキストを入力することを促すメッセージを持つダイアログを表示します。
          email = window.prompt('Please provide your email for confirmation')
        }
        // mail link
        // メールリンク ログインを完了する 1.ウェブページでログインを完了する
        // https://firebase.google.com/docs/auth/web/email-link-auth#before_you_begin
        // ログインを完了するには、signInWithEmailLink を呼び出し、
        // ワンタイム コードを含む実際のメールリンクとユーザーのメールアドレスを渡します。
        firebase
          .auth()
          .signInWithEmailLink(email, window.location.href)
          .then((result) => {
            window.localStorage.removeItem('emailForSignIn')
            const singUser = result.user
            const isNewUser = result.additionalUserInfo.isNewUser
            console.log(singUser)
            console.log(result.user.uid)
            console.log(result.user.email)
            console.log(result.user.displayName)
            this.email = result.user.uid
            this.uid = result.user.email
            this.displayName = result.user.displayName

            // const user = firebase.auth().currentUser
            // let nameUser, emailUser, photoUrlUser, uidUser, emailVerifiedUser
            // let nameUser, emailUser
            // if (user != null) {
            //   nameUser = user.displayName
            //   emailUser = user.email
            //   photoUrl = user.photoURL;
            //   emailVerified = user.emailVerified;
            //   uid = user.uid;
            // }
            if (isNewUser) {
              console.log('new--->signIn User email: ')
              this.$store.commit(
                'setResetMessage',
                'このメールアドレスでアカウントを作成しました。'
              )
              this.$store.commit(
                'setResetMessage',
                'SET NAMEボタンを押して名前を入力してください'
              )
              this.status = this.create
              //   console.log('ADD_REGISTORY')
              //   this.$store.dispatch(ADD_REGISTORY, {
              //     uid: result.user.uid,
              //     email: result.user.email,
              //     displayName: result.user,
              //     registration: false
              //   })
            } else {
              console.log('Login User email: ')
              this.$store.commit(
                'setResetMessage',
                'RESET ボタンを押してください。'
              )
              this.status = this.done
              //   this.$router.push({ path: '/thisIsSleep/account/login' })
            }
          })
          //   .then((result) => {
          //     // this.link_commit('/about')
          //   })
          .catch((error) => {
            console.log('signin error: ' + error)
            this.$store.commit('setResetMessage', 'エラーが発生しました。')
          })
      }
    },
    createAccount() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('logout firebase')
          this.setLogout()
          //   this.$store.commit('setUser', null)
          this.$router.push({ path: '/thisIsSleep/account/registration' })
        })
        .catch((error) => {
          alert('logout error: ' + error)
        })
    },
    createCheck(e) {
      console.info('createCheck')
      this.$store.commit('account/clearLoginError')
      this.$store.commit('account/clearErrorBg', '#e3f2fd')
      if (!this.fName) {
        this.$store.commit('account/setLoginError', '名前は必須です。')
        this.$store.commit('account/setFNameBg', '#f8bbd0')
      } else if (this.fName.length > 40) {
        this.$store.commit('account/setLoginError', '名前は40文字以下です。')
        this.$store.commit('account/setFNameBg', '#f8bbd0')
      }
      if (this.loginErrors.length) {
        // alert('error')
      } else {
        // alert('normal create account')
        this.displayNameSet()
      }
      e.preventDefault()
    },

    startStatus() {
      if (this.status === this.start) {
        return true
      } else {
        return false
      }
    },
    doneStatus() {
      if (this.status === this.done) {
        return true
      } else {
        return false
      }
    },
    closeStatus() {
      if (this.status === this.close) {
        return true
      } else {
        return false
      }
    },
    createStatus() {
      if (this.status === this.create) {
        return true
      } else {
        return false
      }
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
// .reset-meg {
//   margin-bottom: 2rem;
//   h6 {
//     margin-bottom: 1rem;
//   }
// }
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
// .auth {
//   display: flex;
//   justify-content: flex-start;
//   align-items: flex-start;
//   .h7 {
//     margin-right: 1rem;
//     color: $grey;
//     cursor: pointer;
//     &:hover {
//       opacity: 0.5;
//     }
//   }
// }
.pass-reset {
  width: 100%;
}
</style>
