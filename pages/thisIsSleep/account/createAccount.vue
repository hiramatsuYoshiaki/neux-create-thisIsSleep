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
                    div(v-if="!getRegistration")
                        div.slot-wrape(v-for="user in regstar" :key="user.uid")
                            form(@submit.prevent="accountCreate" novalidate)
                                //- div(v-if="loginErrors.length")
                                //-     p.error-title 入力項目を確認してください。
                                //-     ul
                                //-         li(v-for="(loginError, indexError) in loginErrors" :key="indexError")
                                //-         p.error-msg {{ loginError}}
                                div.first-name
                                    label.label
                                        div.h7 Name
                                    input.input(v-model="user.displayName" type="text" placeholder="First Name"  required  readonly)
                                //- div.last-name
                                //-     label.label
                                //-         div.h7 Last Name
                                //-     input.input(v-model="lName" type="text" placeholder="Last Name"  required :style="{ background: errorBg.lNameBg }")
                                div.email-enter
                                    label.label
                                        div.h7 Email
                                    input.input(v-model="user.email" type="email" placeholder="Email" required  readonly)
                                //- div.password-enter
                                //-     label.label
                                //-         div.h7 Password
                                //-     input.input(v-model="password" type="text" placeholder="Password" required :style="{ background: errorBg.passwordBg }" readonly)
                                //- div.subscription
                                //-     input#checkbox(type="checkbox" v-model="checked")
                                //-     label.label-checkbox(for="checkbox")
                                //-         div.h7 Subscribe for bedtime reading, interesting thoughts and new product launches.

                                //- div(v-if="!isUpdate")
                                button.submit-button(type="submit")
                                    div
                                        div.h7 CREATE

                                div.h7 この内容で登録を完了する。
                                div.h7 Createボタンをおしてください。
                                //- div(v-else)
                                //-     button.submit-button
                                //-         div
                                //-             div.h7 CLOSE
                                //-     div
                                //-         ul
                                //-             li(v-for="(msg, index) in message" :key="index")
                                //-                 p.guid-msg {{ msg }}
                    div.slot-wrape(v-else)
                        button.submit-button(@click="close")
                            div
                                div.h7 CLOSE
                        div
                            ul
                                li(v-for="(msg, index) in message" :key="index")
                                    p.guid-msg {{ msg }}
</template>
<script>
import firebase from '@/plugins/firebase'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { GET_REGISTORY, UPDATEDANE_REGISTORY } from '~/store/actionTypes'
import level2SlotsComponent from '~/components/layouts/levelSlots/level2SlotsComponent.vue'
export default {
  layout: 'layout3Parts',
  components: {
    level2SlotsComponent
  },
  data() {
    return {
      uid: null,
      email: null,
      password: null
      //   fName: null,
      //   lName: null,
      //   checked: false
      //   isUpdate: false

      //   displayName: null
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['regstar']),
    ...mapState(['message']),
    ...mapGetters(['getDisplayName']),
    ...mapGetters(['getRegistration'])
  },
  mounted() {
    this.$store.commit('clearMessage')
    // this.$store.commit('setMessage', 'アカウント登録は完了しています。')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid
        this.email = user.email

        // console.log('mounted user.uid: ' + user.uid)
        // console.log('mounted user.uid: ' + user.email)
        // console.log('mounted user.displayNmae: ' + user.displayName)
        const loginUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }
        this.$store.commit('setUser', loginUser)
        this.$store.dispatch(GET_REGISTORY, loginUser)
        this.displayName = this.getDisplayName
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
        // this.setLogout()
        // this.$router.push({ path: '/thisIsSleep/account/login' })
      }
    })
  },
  methods: {
    ...mapMutations({ setLogout: 'account/setLogout' }),
    // ...mapMutations({ setLogin: 'account/setLogin' }),
    accountCreate() {
      this.$store.commit('clearMessage')
      // console.log('accountCreate')
      // console.log('displayName---> ' + this.getDisplayName)

      const user = firebase.auth().currentUser
      if (user) {
        user
          .updateProfile({ displayName: this.getDisplayName })
          .then((result) => {
            let userkey = null
            for (const regItem of this.regstar) {
              userkey = regItem['.key']
            }
            this.$store.dispatch(UPDATEDANE_REGISTORY, {
              uid: user.uid,
              email: user.email,
              displayName: this.getDisplayName,
              key: userkey,
              registration: true
            })
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
    },
    close() {
      this.$router.push({ path: '/' })
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
