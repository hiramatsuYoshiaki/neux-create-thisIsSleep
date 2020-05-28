<template lang="pug">
  div.main-wrape
    div.container-fluid
        div.row
            level2SlotsComponent
                template(v-slot:leve1)
                    div.slot-wrape.level1-wrape
                        div.title
                            h5 My Account
                            div.h7 {{getDisplayName}}
                              //- span( v-for="regstarItem of regstar" :key="regstarItem.key" )
                              //-   span.account-name {{regstarItem.displayName}}
                template(v-slot:leve2)
                    //- div( v-for="regstarItem of regstar" :key="regstarItem.key" )
                    //-   div.slot-wrape(v-if="regstarItem.registration")
                    //-     button.submit-button(@click="accountLogout()")
                    //-         div.h7 SING OUT
                    //-   div.slot-wrape(v-else)
                    //-     button.submit-button(@click="registration()")
                    //-         div.h7 Registration
                    //-     div.h7 登録完了していません。
                    //-     div.h7 Registrationボタンを押してください。
                    div.slot-wrape
                          button.submit-button(@click="accountLogout()")
                            div.h7 SING OUT

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
      isError: false
      // userEmail: null,
      // userName: null
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['regstar']),
    // ...mapGetters(['isAuthenticated'])
    ...mapGetters(['getRegistration']),
    ...mapGetters(['getDisplayName'])
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const loginUser = {
          uid: user.uid,
          email: user.email,
          displayName: null
        }
        this.$store.commit('setUser', loginUser)
        this.$store.dispatch(GET_REGISTORY, loginUser)
        // setTimeout(() => {
        // なにかしらの処理
        // console.log('setTimeout email: ' + this.user.email) // ここだと取得できる
        // console.log('setTimeout displayName: ' + this.user.displayName) // ここだと取得できる
        // console.log(this.regstar) // ここだと取得できる
        // })
      } else {
        // this.email = null
        // this.displayName = null
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
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // this.email = null
          // this.displayName = null
          // this.password = null
          console.log('logout firebase')
          this.setLogout()
          this.$store.commit('setUser', null)
          this.$router.push({ path: '/' })
        })
        .catch((error) => {
          console.log('logout error: ' + error)
          this.$router.push({ path: '/' })
        })
    },
    accountLogout() {
      this.logout()
    },
    registration() {
      alert('registration')
      this.$router.push({ path: '/thisIsSleep/account/createAccount' })
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
    padding: 20rem 1.2rem;
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
    color: $grey-light;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
  .account-name {
    margin: 0 0.5rem;
    color: $grey;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
}
.error-msg {
  background-color: $grey-light;
  padding: 0.5rem;
  color: $black;
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
</style>
