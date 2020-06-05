<template lang="pug">
    div.wrape
      div.account-block
        div(v-if="isLogin").hw--btn
          div.link-wrape(@click="closeMobileMenu()")
            nuxt-link(to="/thisIsSleep/account/logout") Account

        div.hw--btn(v-else)
          div.link-wrape(@click="closeMobileMenu()")
            nuxt-link(to="/thisIsSleep/account/login")  Log-in

      div.cart-block
        div(@click="checkCart()")
          i.fas.fa-shopping-cart

      div.cart-block
        nuxt-link(to="/thisIsSleep/cart/cart") cart

      div.shopping-list(v-if="shoppingCart")
        //- div test display ---------------
        //- div {{uid}}
        //- div {{items}}
        h5 Your Cart test
        //- p(v-show="!CtProducts.length")
        //-   span Please add products to cart.
        div.cart-items
          //- li( v-for="product in CtProducts" :key="product.id")
          div.h7.cart-item-lelment( v-for="product in getMyCart()" :key="product.id")
              span {{ product.title }}
              i.fas.fa-yen-sign
              span {{ product.price }} X
              i.fas.fa-user
              span {{ product.quantity }}
        p.cart-total
          //- span Total: {{ total }}
          span Total: {{ getMyCartTotal() }}

        p
          button( :disabled="!CtProducts.length" @click="checkout(CtProducts)")
            span Checkout
</template>

<script>
// import firebase from '@/plugins/firebase'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      loginUid: null,
      loginUser: null,
      logoutUid: 'guestUid',
      items: null,
      userTotal: 0
    }
  },
  computed: {
    ...mapState(['uid']),
    ...mapState('headerBar', ['isOpenMobileMenu']),
    ...mapState('account', ['isLogin']),
    ...mapState('cart', ['shoppingCart']),
    ...mapState('cart', {
      checkoutStatus: 'checkoutStatus'
    }),
    ...mapState('cart', ['cartItems']),
    ...mapGetters('cart', {
      CtProducts: 'cartProducts',
      total: 'cartTotalPrice',
      userItems: 'getUserCart',
      userCartTotal: 'getUserCartTotal'
    })
  },
  mounted() {
    console.log('mounted loginMenu')
  },
  methods: {
    ...mapMutations({ close: 'headerBar/closeMobileMenu' }),
    getMyCart() {
      return this.userItems(this.uid)
    },
    getMyCartTotal() {
      return this.userCartTotal(this.uid)
    },
    closeMobileMenu() {
      this.close()
    },
    checkCart() {
      this.$store.commit('cart/setShoppingCart', !this.shoppingCart)
    },
    checkout(products) {
      this.$store.dispatch('cart/checkout', products)
    },
    setClearProducts() {
      this.$store.commit('cart/setClearProducts')
    }
  }
}
</script>
<style lang="scss">
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
  margin-right: 0.5rem;
}
//shopping list
.shopping-list {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 4rem;
  background-color: whitesmoke;
  border: 1px solid lightgray;
  color: black;
  padding: 1rem;
  width: 100vw;
  height: 100vh;
  margin-right: 0;
  padding: 1rem;
  overflow-y: scroll;
  @media (min-width: 414px) {
    width: calc(400px - 2rem);
    height: 60vh;
    // margin-right: 1rem;
    // margin-left: 1rem;
  }
}
.cart-items {
  margin: 1rem 0;
}
.cart-item-lelment {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .fa-yen-sign,
  .fa-user {
    margin-left: 0.5rem;
    // margin-right: -0.3rem;
    color: gray;
    font-size: 1rem;
  }
}
.cart-total {
  margin-bottom: 0.5rem;
}
</style>
