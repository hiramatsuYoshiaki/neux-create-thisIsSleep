<template lang="pug">
    div.solution-content
      div.main-wrape
          div.container-fluid
              div.row
                div.products-contents
                    div.prod-img-box
                      div.prod-img-inner
                        div.bg-circle2
                        div.bg-circle1

                    //- div.prod-img
                    //-         div.prod-img-warpe
                    //-           img(:src="selectProduct.img" alt="selectProduct.title" )
                    div.prod-detail
                      div.prod-menu
                        div.icon-circle(@click="prev()")
                          i.fas.fa-chevron-left
                          div.icon-subscribe prev
                        div.icon-circle(@click="back()")
                          i.fas.fa-undo-alt
                          div.icon-subscribe back
                        div.icon-circle(@click="next()")
                          i.fas.fa-chevron-right
                          div.icon-subscribe next

                        div.icon-circle
                          i.fas.fa-plus
                          div.icon-subscribe add
                        div.icon-circle
                          i.fas.fa-arrow-up
                          div.icon-subscribe update
                        div.icon-circle
                          i.fas.fa-times
                          div.icon-subscribe remove
                          //- div solution/userSolution/_slug
                          //- h1 {{this.$route.params.slug}}
                          //- button
                          //-     nuxt-link( to="/thisIsSleep/solution/userSolution") back
                      div.prod-buy
                        div.prod-buy-title
                          div.prod-buy-title-subtitle
                            h5 {{ selectProduct.subTitle }}
                          div.prod-buy-title-title
                            h3 {{ selectProduct.title }}
                        div.prou-buy-total
                          div.p-subtitle
                           h3 ¥{{ selectProduct.price }}
                        div.prod-type
                          div type sellect
                          div discriptions

                              //- //- p product {{this.$route.params.slug}}
                              //- //- div {{ solProducts}}
                              //- //- div {{ selectProduct}}

                              //- div.p-title {{ selectProduct.title }}
                              //- div.p-subtitle {{ selectProduct.subTitle }}
                              //- div.p-subtitle ¥{{ selectProduct.price }}

                              //- div.prod-type
                              //-     div.h7 type
                              //-     div.prod-type-button
                              //-         div.button-wrape
                              //-             button.component--btn(autoFocus)  Load Bike
                              //-         div.button-wrape
                              //-             button.component--btn  Mountain Bike
                              //-         div.button-wrape
                              //-             button.component--btn  e-Bike
                              //- div.prod-firmless
                              //-     div.h7 firmless
                              //-     //- select.component--select(v-model="selected" @change="onChange()")
                              //-     //-     option Morning Tour
                              //-     //-     option Afternoon Tour
                              //-     //-     option Night Tour
                              //- div.prod-quantity
                              //-     div.h7 Number of people
                              //-     //- input.component--input( v-model.number="quantity" type="number")
                              //- //- div.prod-addcart(v-if="selectProduct.inventory > 0")
                              //- //-     button.component--btn(@click="addProductToCart(selectProduct)")  add cart
                              //- //- div.prod-addcart(v-else)
                              //- //-     button.component--btn.disabl-btn.disabled(@click="addProductToCart(selectProduct)")  out of stock

                              //- div.prud-subscrive
                              //-     div.h7 Our AllergyFree Pillow is the perfect solution for allergy sufferers looking for a good night’s sleep.
                              //-     div.h7 The Amicor® and microfibre filling, with 100% cotton cover, not only prevents dust mites but is luxuriously fluffy, too. It all adds up to you feeling more refreshed, rested and recuperated after every use.
                              //-     ul
                              //-         li Amicor® and microfibre active anti-allergy filling
                              //-         li Recycled materials used throughout
                              //-         li Made with ballfibre clusters for a loftier, comfier feel
                              //-         li 100% cotton cover
                              //-         li 106% pillow-fight superior

                    div.prod-cart(:class="{positionTop: isOpenCart, positionBottom: !isOpenCart}")
                      div.prod-cart-header
                        div.prod-cart-total
                          div.total-price
                            h6
                              span.total-price-title Your destinetion
                              span  subTotal
                            h4
                              i.fas.fa-yen-sign
                              span 2,300
                          div.action-icon
                            i.fas.fa-chevron-up(@click="isOpenCart=!isOpenCart")
                        div.prod-cart-detail
                            h5.prod-cart-detail-title Your destinetion
                            div.cart-detail(v-for="(item, index) in products" :key="item.id")
                              div.cart-detail-items
                                h6 {{item.title}}
                                h6 {{item.productTotal}}
                              div.cart-detail-items
                                h6 quantity
                                h6 {{item.quantity}}
                            //-   div.cart-detail-product
                            //-     div.cart-detail-product-img
                            //-       nuxt-link(:to="'/thisIsSleep/buy/puroducts/' + item.id")
                            //-         img(:src="item.img" alt="product image" )
                            //-     div.cart-detail-product-name
                            //-       nuxt-link(to="/")
                            //-       h6 {{item.title}}
                            //-       div.h7 {{item.subTitle}}
                            //-       div.h7(@click="remove(item)") remove
                            //-   div.cart-detail-quantity
                            //-     h6 {{item.quantity}}
                            //-     h6 {{item.productTotal}}

                      div.prod-cart-fotter
                          button.component--btn.cart-footer-button-width.cart-footer-button-color  CHECK OUT
                          button.component--btn.cart-footer-button-width SAVE SOLUTIONS

                    //- div.prod-cart-mobile(v-show="isOpenCart")
                    //-   div your solution
                    //- div.prod-cart-sw
                    //-   span cart
                    //-   i.fas.fa-chevron-up(@click="isOpenCart=!isOpenCart" v-show="!isOpenCart")
                    //-   i.fas.fa-chevron-down(@click="isOpenCart=!isOpenCart"  v-show="isOpenCart")

</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  layout: 'layout2Parts',
  data() {
    return {
      paramId: this.$route.params.slug,
      isOpenCart: false
    }
  },
  computed: {
    ...mapState('solutions', ['solProducts']),
    ...mapGetters('buy', {
      selectProduct: 'selectProduct'
    }),
    ...mapGetters('cart', {
      products: 'cartProducts', // cartItems
      total: 'cartTotalPrice'
    })
  },
  async created() {
    await this.$store.commit('buy/setSelectedId', this.paramId)
  },
  methods: {
    back() {
      this.$router.push('/thisIsSleep/solution/userSolution')
    },
    prev() {
      this.$router.push(
        `/thisIsSleep/solution/userSolution/${this.setNextPid()}`
      )
    },
    next() {
      this.$router.push(
        `/thisIsSleep/solution/userSolution/${this.setNextPid()}`
      )
    },
    setNextPid() {
      let i = 0
      this.solProducts.forEach((value, idx) => {
        if (Number(this.$route.params.slug) === value.pid) {
          if (this.solProducts.length > idx + 1) {
            i = idx + 1
          } else {
            i = 0
          }
        }
      })
      return this.solProducts[i].pid
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  border: 1px dotted grey;
}

.solution-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: $buycolor;
}
.products-contents {
  position: relative;
  width: 100%;
  height: calc(100vh - #{$header-height});
}
.prod-img-box {
  position: absolute;
  width: 100%;
  height: calc(100vh - #{$header-height});
  background-color: cadetblue;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
}
.prod-img-inner {
  position: relative;
  width: 100;
}
.bg-circle1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16rem;
  height: 16rem;
  border: 1px solid $white;
  border-radius: 100%;
  background-color: cadetblue;
  @media (min-width: 768px) {
    width: 20rem;
    height: 20rem;
  }
}
.bg-circle2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 10%);
  width: 40rem;
  height: 40rem;
  border: 1px solid $white;
  border-radius: 100%;
  @media (min-width: 768px) {
    width: 50rem;
    height: 50rem;
  }
}

.prod-detail {
  position: relative;
  width: 100%;
  height: calc(100vh - #{$header-height} - 5rem);
  border: 5px solid black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: $white;
  @media (min-width: 768px) {
    height: calc(100vh - #{$header-height});
  }

  flex-direction: row;
}
.prod-buy {
  position: relative;
  border: 1px solid white;
  width: 100%;
  height: calc(100vh - #{$header-height} - 6rem);
  padding: 0.5rem;
  @media (min-width: 768px) {
    max-width: 380px;
    height: calc(100vh - #{$header-height});
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }
}

.prod-buy-title {
  position: absolute;
  width: 100%;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (min-width: 768px) {
    position: relative;
    top: 0;
    left: 0;
    transform: translate(0, 0);
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid red;
}

.prou-buy-total {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  @media (min-width: 768px) {
    position: relative;
    top: 0;
    left: 0;
    transform: translate(0, 0);
  }
}
.prod-type {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  // transform: translate(-50%, 0);
  @media (min-width: 768px) {
    display: block;
    position: relative;
  }
}
.prod-menu {
  position: absolute;
  width: 100%;
  height: 7rem;
  bottom: 0;
  right: 0;
  // transform: translateX(-50%);
  padding: 0 1rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  @media (min-width: 768px) {
    width: 400px;
  }
  border: 2px solid blue;
}
.icon-circle {
  position: relative;
  width: 3rem;
  height: 3rem;
  border: 1px solid $white;
  border-radius: 100%;
  margin-right: 1rem;
  i {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: $size-4;
    color: $white;
  }
  .icon-subscribe {
    display: block;
    position: absolute;
    bottom: -60%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: $size-7;
    color: $white;
  }
}

.prod-cart {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid purple;
  background-color: $white-ter;
  @media (min-width: 768px) {
    max-width: 380px;
    background-color: transparent;
    color: $white;
  }
}
.positionTop {
  transition: all 0.5s;
  transition: all 0.5s;
}
.positionBottom {
  transform: translateY(calc(100% - 5rem));
  transition: all 0.5s;
  @media (min-width: 768px) {
    transform: translateY(0);
    transition: all 0.5s;
  }
}
.prod-cart-header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: column-reverse;
  }
}
.prod-cart-total {
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: space-around;
}
.total-price {
  width: 80%;
  .total-price-title {
    display: inline;
    @media (min-width: 768px) {
      display: none;
    }
  }
}
.action-icon {
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  padding-right: 1rem;
  opacity: 1;
  @media (min-width: 768px) {
    opacity: 0;
  }
}
.prod-cart-detail {
  width: 100%;
  margin-bottom: 1rem;
  .prod-cart-detail-title {
    display: none;
    @media (min-width: 768px) {
      display: block;
    }
  }
}
.cart-detail-items {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.prod-cart-fotter {
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.cart-footer-button-width {
  width: 100%;
  max-width: 20rem;
  margin-bottom: 0.5rem;
}
.cart-footer-button-color {
  background-color: $your-solution;
  border: none;
}
// .prod-cart-sw {
//   display: block;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 3rem;
//   border: 1px solid purple;
//   background-color: $white-ter;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   flex-direction: row;
//   span {
//     margin: 0 0.5rem;
//   }
//   @media (min-width: 768px) {
//     display: none;
//   }
// }
// .prod-right-warpe {
//   width: 100%;
//   max-width: 512px;

//   border: 1px solid red;
// }
// .prod-detail-wrape {
//   position: relative;
//   width: 100%;
// }

// .prod-img {
//   width: 100%;
//   // height: 50vh;
//   position: relative;
//   // top: 50%;
//   // left: 50%;
//   // transform: translate(-50%, -50%);
//   overflow: hidden;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   @media (min-width: 768px) {
//     position: absolute;
//     width: 100%;
//     height: calc(100vh - #{$header-height});
//   }
//   border: 1px solid green;
// }
// .prod-img-warpe {
//   border: 1px solid blue;
//   width: 50%;
//   img {
//     width: 50%;
//     height: auto;
//   }
// }
// img {
//   width: 70%;
//   height: 70%;
//   // opacity: 0.5;
//   border-radius: 100%;
//   border: 3px solid $grey;
//   @media (min-width: 768px) {
//     width: 50%;
//   }
// }

// .pro-detail {
//   width: 100%;
//   height: 100%;
//   padding: 1rem 1rem;
//   @media (min-width: 768px) {
//     padding: 1rem 3rem;
//     width: 50%;
//   }
// }
// .pro-menu {
//   width: 100%;
//   height: 100%;
// }

// .prod-right-warpe {
//   max-width: 512px;
// }
// .p-title {
//   font-size: $size-3;
//   font-weight: 700;
//   line-height: 1.5;
// }
// .p-subtitle {
//   font-size: $size-5;
//   font-weight: 7400;
//   line-height: 1.5;
//   margin-bottom: 1rem;
// }
</style>
