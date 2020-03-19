<template>
  <div class="wrape">
    <div class="account-block">
      <div v-if="isLogin" class="hw--btn">
        <div @click="closeMobileMenu()" class="link-wrape">
          <nuxt-link to="/thisIsSleep/account/logout">
            Account
          </nuxt-link>
        </div>
      </div>
      <div v-else class="hw--btn">
        <div @click="closeMobileMenu()" class="link-wrape">
          <nuxt-link to="/thisIsSleep/account/login">
            Log in
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="cart-block">
      <div @click="chekCart()">
        <i class="fas fa-shopping-cart" />
        {{ shoppingCart }}
        <!-- <i class="fas fa-cart-plus" />
        <i class="fas fa-cart-arrow-down" /> -->
      </div>
    </div>
    <div v-if="shoppingCart" class="shopping-list">
      shipping list {{ shoppingCart }}
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
    ...mapState('account', ['isLogin']),
    ...mapState('cart', ['shoppingCart'])
  },
  methods: {
    ...mapMutations({ close: 'headerBar/closeMobileMenu' }),
    // ...mapMutations({ login: 'account/setLogin' }),
    // ...mapMutations({ logout: 'account/setLogout' }),
    closeMobileMenu() {
      this.close()
    },
    // setLogin() {
    //   this.login()
    // },
    // setLogout() {
    //   this.logout()
    // }
    chekCart() {
      this.$store.commit('cart/setShoppingCart', !this.shoppingCart)
    }
  }
}
</script>
<style lang="scss">
.link-wrape {
  width: 5rem;
  text-align: center;
}
.account-block {
  display: none;
  @media (min-width: 976px) {
    display: block;
  }
}
.cart-block {
  cursor: pointer;
}
//shopping list
.shopping-list {
  position: absolute;
  top: 0;
  right: 0;
  width: 10rem;
  height: 20rem;
  margin-top: 4rem;
  background-color: white;
  border: 1px solid red;
  color: black;
  padding: 1rem;
}
</style>
