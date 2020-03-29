<template lang="pug">
    div.main-wrape
        div.container
          div.row
            div.cart-header
              h5.left-title Shopping Cart
              div.right-title
                h6.quantity-title Quantity
                h5.center-title Shopping Cart
                h6.total-title Total
            div.cart-detail(v-for="(item, index) in this.items" :key="item.id")
              div.cart-detail-product
                div.cart-detail-product-img
                  nuxt-link(to="/")
                    img(:src="item.img" alt="product image" )
                div.cart-detail-product-name
                  nuxt-link(to="/")
                   h6 {{item.title}}
                  div.h7 {{item.subTitle}}
                  div.h7(@click="remove(item)") remove
              div.cart-detail-quantity
                h6
                  input.component--input.cart-detail-quantity-input( v-model.number="quantity[index]" type="number")
                h6 Total
            div.cart-footer
              div.cart-footer-half
                div.h7 Shipping & taxes calculated at checkout
                div.cart-footer-subtotal
                    h5
                      span Subtotal
                      span 1000
                div.cart-footer-button
                  button.component--btn.cart-footer-button-width  update cart
                  button.component--btn.cart-footer-button-width check out

</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'layout3Parts',

  data() {
    return {
      quantity: [1, 2, 3, 4]
    }
  },
  computed: {
    ...mapState('products', {
      items: 'all'
    })
  },
  methods: {
    remove(item) {
      alert('remove' + item.title)
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
  .left-title {
    display: block;
    font-weight: $weight-bold;
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
  justify-content: space-between;
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
