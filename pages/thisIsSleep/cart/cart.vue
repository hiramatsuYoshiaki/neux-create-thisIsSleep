<template lang="pug">
    div.main-wrape
        div.container
          div.row
            div.cart-header
              div.left-title
                //- div test display -------------------------------------
                //- div {{uid}}
                //- div {{selectedId}}
                //- div {{items}}
                h6 Shopping Cart
                div.h7
                  span {{loginUser}}
                  //- span {{loginUser}} - {{loginUid}}
                //- div {{items}}
                //- div all cart
                //- div(v-for="(cartItem, index) in this.cartItems" :key="cartItem.orderKey")
                //- div(v-for="(cartItem, index) in this.items" :key="cartItem.orderKey")
                //-   div {{index + 1}}:{{cartItem.loginUid}}
              div.right-title
                h6.quantity-title Quantity
                h5.center-title Shopping Cart
                h6.total-title Total

            //- div.cart-detail(v-for="(item, index) in this.cartItems" :key="item.orderKey")
            div.cart-detail(v-for="(item, index) in this.items" :key="item.orderKey")
              div.cart-detail-product
                div.cart-detail-product-img
                   nuxt-link(:to="'/thisIsSleep/buy/puroducts/' + item.id")
                    //- img(:src="item.img" alt="product image" )
                    img(:src="getUrl(item.id)" alt="product image")
                div.cart-detail-product-name
                  div.h7
                    span.tour-date {{item.id}}
                    span.tour-date {{item.tourDate.date}}
                    span.tour-date {{item.timeZone.zone}}
                  nuxt-link(:to="'/thisIsSleep/buy/puroducts/' + item.id")
                    h6 {{item.title}}
                    div.h7 {{item.subTitle}}
                  div.h7 {{item.price}}
                    span
                  div.h7.remove(@click="remove(item, index)") remove
                  //- br
                  //- div data---------------
                  //- div {{item}}

              div.cart-detail-quantity
                //- quantity
                h6 {{item.quantity}}
                  //- input.component--input.cart-detail-quantity-input( v-model.number="quantity[index]" type="number")
                  //- input.component--input.cart-detail-quantity-input( v-model.number="quantity[index]" type="number")

                //- total price
                h6 {{item.productTotal}}
                  //- input.compon}}

            div.cart-footer
              div.cart-footer-half
                div.h7 Shipping & taxes calculated at checkout
                div.cart-footer-subtotal
                    h5
                      span Subtotal
                      //- subtotal
                      //- span {{total}}
                      span {{userTotal}}
                div.cart-footer-button
                  //- button.component--btn.cart-footer-button-width  update cart
                  button.component--btn.cart-footer-button-width(@click="checkout()") check out

</template>
<script>
import firebase from '@/plugins/firebase'
import { mapState, mapGetters } from 'vuex'
export default {
  layout: 'layout3Parts',

  data() {
    return {
      quantity: [1, 2, 3, 4],
      quan: [],
      loginUid: null,
      loginUser: null,
      logoutUid: 'guestUid',
      items: null,
      userTotal: 0
    }
  },
  computed: {
    // ...mapState(['user']),
    ...mapState(['uid']),
    // ...mapState('buy', ['selectedId']),
    // ...mapState('buy', ['selectedInventory']),
    // ...mapState('buy', ['selectedProductBuy']),
    // ...mapState('cart', ['cartItems']),
    ...mapGetters('cart', {
      cartItems: 'cartProducts', // cartItems
      total: 'cartTotalPrice',
      userItems: 'getUserCart',
      userCartTotal: 'getUserCartTotal'
    }),
    ...mapGetters({ getUrl: 'getProductsImgUrl' })
  },
  async mounted() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginUid = user.uid
        this.loginUser = user.displayName
      } else {
        this.loginUid = this.logoutUid
        this.loginUser = 'Guest User'
      }
      this.$store.commit('setLoginUid', this.loginUid)
      this.items = this.userItems(this.loginUid) // 'cart/getUserCart'
      // this.$store.commit('cart/setUserCarts', this.items)
      this.userTotal = this.userCartTotal(this.loginUid)
    })
  },
  methods: {
    remove(item, index) {
      // alert('remove' + item.title)
      // const removeId = {
      //   id: item.id,
      //   key: index
      // }
      // this.$store.dispatch('cart/removeProductToAction', removeId)
      const removeItem = {
        loginUid: item.loginUid,
        id: item.id,
        orderKey: item.orderKey
      }
      console.log(removeItem)
      this.$store.dispatch('cart/removeUserCart', removeItem)
      this.items = this.userItems(this.loginUid)
      this.userTotal = this.userCartTotal(this.loginUid)
    },
    checkout() {
      // alert('check out ')
      this.$store.dispatch('cart/checkout', this.items)
      this.items = this.userItems(this.loginUid)
      this.userTotal = this.userCartTotal(this.loginUid)
    }
  }
}
</script>
<style lang="scss" scoped>
// * {
//   border: 1px solid gray;
// }
.main-wrape {
  margin-top: $header-height;
  overflow: hidden;
  width: 100%;
}
.cart-header {
  width: 100%;
  // height: 4rem;
  padding: 3rem 1rem 2rem 1rem;
  margin-bottom: 2rem;
  border-bottom: none;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  .left-title h6 {
    font-weight: $weight-bold;
  }
  .left-title div.h7 {
    margin-top: 0.5rem;
  }
  .right-title {
    display: none;
  }
  .quantity-title {
    display: none;
  }
  .center-title {
    display: none;
    font-weight: $weight-bold;
  }
  .total-title {
    display: none;
  }
  @media (min-width: 768px) {
    border-bottom: 1px solid $grey-lighter;
    .left-title {
      display: none;
    }
    .right-title {
      display: block;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
    .quantity-title {
      display: block;
    }
    .center-title {
      display: block;
    }
    .total-title {
      display: block;
    }
  }
  @media (min-width: 992px) {
    flex-direction: row;
    .left-title {
      display: block;
      width: 60%;
    }
    .right-title {
      display: block;
      width: 40%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
    }
    .quantity-title {
      display: block;
    }
    .center-title {
      display: none;
    }
    .total-title {
      display: block;
    }
  }
}

.cart-detail {
  width: 100%;
  // height: 10rem;
  padding: 0rem 1rem 0rem 1rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  .cart-detail-product {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    width: 70%;
  }
  .cart-detail-quantity {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column-reverse;
    width: 30%;
    padding: 0;
  }
  @media (min-width: 768px) {
    flex-direction: column;
    .cart-detail-product {
      width: 100%;
    }
    .cart-detail-quantity {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      padding: 2rem 0;
    }
  }
  @media (min-width: 992px) {
    flex-direction: row;
    .cart-detail-product {
      width: 60%;
    }
    .cart-detail-quantity {
      width: 40%;
      flex-direction: row;
      justify-content: space-between;
      padding: 0;
    }
  }
}
.cart-detail a {
  color: $black;
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    opacity: 1;
  }
}
.cart-detail-product-img {
  width: 30%;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
}
.cart-detail-product-name {
  width: 70%;
  padding-left: 1rem;
  h6,
  div {
    margin-bottom: 0.5rem;
  }
  .remove {
    color: $red;
    cursor: pointer;
  }
  .tour-date {
    margin-right: 0.5rem;
    font-weight: $weight-medium;
  }
}
.cart-detail-quantity-input {
  width: 6rem;
}
.cart-footer {
  width: 100%;
  padding: 2rem 1rem 2rem 1rem;
  margin-top: 2rem;
  border-top: 1px solid $grey-lighter;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
}
.cart-footer-half {
  width: 100%;
  div {
    margin-bottom: 1rem;
  }
  @media (min-width: 768px) {
    width: 50%;
  }
}
.cart-footer-subtotal {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  span {
    margin-left: 2rem;
  }
}
.cart-footer-button {
  display: flex;
  // justify-content: space-between;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
}
.cart-footer-button-width {
  width: 8rem;
}

//-----break point-----------------------------------------------------------
// @media (min-width: 576px) {
//   .container {
//     max-width: 540px;
//     max-width: 100%;
//   }
// }
// @media (min-width: 768px) {
//   .container {
//     width: 720px;
//     max-width: 100%;
//   }
// }
// @media (min-width: 992px) {
//   .container {
//     // width: 960px;
//     width: 880px;
//     max-width: 100%;
//   }
// }
// @media (min-width: 1200px) {
//   .container {
//     // width: 1140px;
//     width: 1100px;
//     max-width: 100%;
//   }
// }
</style>
