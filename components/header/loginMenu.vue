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
            Log-in
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="cart-block">
      <div @click="chekCart()">
        <i class="fas fa-shopping-cart" />
      </div>
    </div>
    <div class="cart-block">
      <nuxt-link to="/thisIsSleep/cart/cart">
        cart
      </nuxt-link>
    </div>

    <div v-if="shoppingCart" class="shopping-list">
      <h5>Your Cart</h5>
      <p v-show="!CtProducts.length">
        <i>Please add products to cart.</i>
      </p>
      <ul class="cart-items">
        <li v-for="product in CtProducts" :key="product.id">
          <p>
            {{ product.title }}
            <i class="fas fa-yen-sign" />
            {{ product.price }} X
            <i class="fas fa-user" />
            {{ product.quantity }}
          </p>
        </li>
      </ul>
      <p class="cart-total">
        <span>Total: {{ total }}</span>
      </p>
      <p>
        <button :disabled="!CtProducts.length" @click="checkout(CtProducts)">
          Checkout
        </button>
      </p>
      <!-- <p v-if="checkoutStatus">
        Check Out Status:
        {{ checkoutstatus }}
      </p>-->

      <!-- <p>1.items:{{ cartItems }}</p>
      <p>2.Cartproducts:{{ CtProducts }}</p>
      <p>3.total:{{ total }}</p>
      <button @click="setClearProducts()">
        setClearProducts
      </button>-->
      <!-- <p>productsList:{{ all }}</p> -->
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      // products: []
      // products: [
      //   { id: 1, title: 'iPad 4 Mini', price: 510, inventory: 2 },
      //   { id: 2, title: 'H&M T-Shirt White', price: 12, inventory: 10 },
      //   { id: 3, title: 'Charli XCX - Sucker CD', price: 19, inventory: 5 }
      // ],
      // checkoutStatus: null
      productsList: [
        {
          id: 1001,
          img: require('~/assets/img/img3614.jpg'),
          title: 'Bay Cruse  ',
          subTitle: 'Discover the most amazing spot around the japan',
          price: 800,
          link: 'explore Now',
          to: '/account/registration',
          date: '2019-01-01',
          featured: 100,
          selling: 100,
          inventory: 10
        },
        {
          id: 1002,
          img: require('~/assets/img/img2731.jpg'),
          title: 'safety simulator',
          subTitle: 'Get inspired by the buzz of the Amusement ',
          price: 0,
          link: 'explore Now',
          to: '/contact/countactUs',
          date: '2019-01-02',
          featured: 20,
          selling: 70,
          inventory: 10
        },
        {
          id: 1003,
          img: require('~/assets/img/img3668.jpg'),
          title: 'hotalna',
          subTitle: 'River cruise on a futuristic design ship',
          price: 2000,
          link: 'return to home ',
          to: '/account/registration',
          date: '2019-01-03',
          featured: 90,
          selling: 20,
          inventory: 10
        },
        {
          id: 1004,
          img: require('~/assets/img/img3809.jpg'),
          title: 'fuji tv',
          subTitle: 'Amazing view from the observation deck',
          price: 1200,
          link: 'return to home ',
          to: '/account/registration',
          date: '2019-01-04',
          featured: 50,
          selling: 50,
          inventory: 10
        }
      ]
    }
  },
  computed: {
    ...mapState('headerBar', ['isOpenMobileMenu']),
    ...mapState('account', ['isLogin']),
    ...mapState('cart', ['shoppingCart']),
    ...mapState('cart', ['cartItems']),
    ...mapState('products', ['all']),
    ...mapState('cart', {
      checkoutStatus: 'checkoutStatus'
    }),
    ...mapGetters('cart', {
      CtProducts: 'cartProducts',
      total: 'cartTotalPrice'
    })
  },
  // mounted() {
  //   this.checkoutStatus = null
  // },
  mounted() {
    console.log('mounted')
    // console.log(this.productsList)
    this.$store.commit('cart/setAllProducts', this.productsList)
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
    },
    // total() {
    //   let pay = 0
    //   for (const item of this.items) {
    //     pay += item.price * item.inventory
    //   }
    //   // for (const product of this.products) {
    //   //   pay += product.price * product.inventory
    //   // }
    //   return pay
    // },
    // ...mapMutations({ cOut: 'cart/checkout' }),
    checkout(products) {
      console.log('checkout')
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
  .fa-yen-sign,
  .fa-user {
    margin-left: 0.5rem;
    margin-right: -0.3rem;
    color: gray;
    font-size: 1rem;
  }
}
.cart-total {
  margin-bottom: 0.5rem;
}
</style>
