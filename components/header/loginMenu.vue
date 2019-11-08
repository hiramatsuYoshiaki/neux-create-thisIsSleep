<template>
  <div class="wrape">
    <div v-if="isLogin" class="hw--btn" @click="setLogout()">
      <div class="link-wrape" @click="closeMobileMenu()">
        <nuxt-link to="/thisIsSleep/account/logout">
          Log out
        </nuxt-link>
      </div>
    </div>
    <div v-else class="hw--btn" @click="setLogin()">
      <div class="link-wrape" @click="closeMobileMenu()">
        <nuxt-link to="/thisIsSleep/account/login">
          Log in
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrape {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.hw--btn {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  p {
    text-align: center;
  }
}
</style>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  // data() {
  //   return {
  //     isLogin: false
  //   }
  // },
  computed: {
    ...mapState('headerBar', ['isOpenMobileMenu']),
    ...mapState('account', ['isLogin'])
  },
  methods: {
    ...mapMutations({ close: 'headerBar/closeMobileMenu' }),
    ...mapMutations({ login: 'account/setLogin' }),
    ...mapMutations({ logout: 'account/setLogout' }),
    closeMobileMenu() {
      this.close()
    },
    setLogin() {
      this.login()
    },
    setLogout() {
      this.logout()
    }
  }
}
</script>
<style lang="scss">
.link-wrape {
  width: 5rem;
  text-align: center;
}
</style>
