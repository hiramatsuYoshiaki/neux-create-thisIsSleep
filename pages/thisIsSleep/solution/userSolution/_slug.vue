<template lang="pug">
    div.solution-content
      div.prod-img-wrape
        div.bg-image(:style="{background: `center / contain no-repeat url(${getUrl(selectProduct.id)})`}")
        div.black-filter
      div.main-wrape
          div.container-fluid
              div.row
                div.products-contents
                    //- div.prod-img-box
                    //-   div.prod-img-inner
                    //-     div.bg-circle2
                    //-     div.bg-circle1
                    div.prod-detail
                      div.prod-buy
                          div.prod-buy-title
                            div.prod-buy-title-subtitle
                              h6 {{ selectProduct.subTitle }}
                            div.prod-buy-title-title
                              h3 {{ selectProduct.title }}
                            div.prod-buy-title-title
                              //- h6 inventory : {{ selectProduct.inventory }}
                              h6 inventory : {{getCartInventry(selectProduct)}}

                          div.prou-buy-total
                            div.p-subtitle
                            h3 ¥{{ selectProduct.price }}
                          div.prod-select-grp
                            div.prod-select-inner
                              div.select-box-wrape
                                div.option-select-box(:class="{radiusOn: !isOpenBike, radiusOff:isOpenBike}")
                                  h6 {{ selectedBike }}
                                  div.select-box-arrow
                                    i(v-show="!isOpenBike" @click="isOpenBike=true").fas.fa-chevron-up
                                    i(v-show="isOpenBike" @click="isOpenBike=false").fas.fa-chevron-down
                                //- div.option-select-items(v-show="isOpenBike")
                                //-   div(v-for="itemBike in selectedBikeItems" :key="itemBike.id")
                                //-     h6(@click="selectItemBike(itemBike)") {{itemBike.option}}
                                div.option-select-items(v-show="isOpenBike")
                                  div(v-for="itemBike in selectProduct.bikeType" :key="itemBike.code")
                                    h6(@click="selectItemBike(itemBike)") {{itemBike.type}}
                            div.prod-select-inner
                              div.select-box-wrape
                              div.option-select-box(:class="{radiusOn: !isOpenZone, radiusOff:isOpenZone}")
                                h6 {{ selectedZone }}
                                div.select-box-arrow
                                  i(v-show="!isOpenZone" @click="isOpenZone=true").fas.fa-chevron-up
                                  i(v-show="isOpenZone" @click="isOpenZone=false").fas.fa-chevron-down
                              //- div.option-select-items(v-show="isOpenZone")
                              //-   div(v-for="itemZone in selectedZoneItems" :key="itemZone.id")
                              //-     h6(@click="selectItemZone(itemZone)") {{itemZone.option}}
                              div.option-select-items(v-show="isOpenZone")
                                div(v-for="itemZone in selectProduct.timeZone" :key="itemZone.code")
                                  h6(@click="selectItemZone(itemZone)") {{itemZone.zone}}
                            div.prod-select-inner
                              div.select-box-wrape
                              div.option-select-box(:class="{radiusOn: !isOpenDate, radiusOff:isOpenDate}")
                                h6 {{ selectedDate }}
                                div.select-box-arrow
                                  i(v-show="!isOpenDate" @click="isOpenDate=true").fas.fa-chevron-up
                                  i(v-show="isOpenDate" @click="isOpenDate=false").fas.fa-chevron-down
                              //- div.option-select-items(v-show="isOpenDate")
                              //-   div(v-for="itemDate in selectedDateItems" :key="itemDate.id")
                              //-     h6(@click="selectItemDate(itemDate)") {{itemDate.option}}
                              div.option-select-items(v-show="isOpenDate")
                                div(v-for="itemDate in selectProduct.tourDate" :key="itemDate.code")
                                  h6(@click="selectItemDate(itemDate)") {{itemDate.date}}
                            div.select-box-wrape
                              div.option-quantity-box
                                h6 Quantity laptop
                                div.option-quantity-count
                                  i.fas.fa-minus(@click="quantityMinus(selectProduct)")
                                  h6 {{ quantity }}
                                  i.fas.fa-plus(@click="quantityAdd(selectProduct)")
                            //- div {{selectProduct.id}}
                            //- div {{selectProduct}}

                      div.prod-menu
                        div.prod-menu-laptop
                          div.prod-menu-laptop-inner
                            div.icon-circle(@click="prev()")
                              i.fas.fa-chevron-left
                              div.icon-subscribe prev
                            div.icon-circle(@click="back()")
                              i.fas.fa-undo-alt
                              div.icon-subscribe back
                            div.icon-circle(@click="next()")
                              i.fas.fa-chevron-right
                              div.icon-subscribe next

                            div.icon-circle(@click="addProductToCart(selectProduct)" )
                              i.fas.fa-plus
                              div.icon-subscribe add
                            div.icon-circle(@click="updateProductToCart(selectProduct)")
                              i.fas.fa-arrow-up
                              div.icon-subscribe update
                            div.icon-circle(@click="removeProductToCart(selectProduct)")
                              i.fas.fa-times
                              div.icon-subscribe remove

                        div.prod-menu-mobile
                          div.icon-circle(@click="isOpenOption=!isOpenOption")
                            i.fas.fa-sliders-h
                            div.icon-subscribe option
                          div.icon-circle(@click="back()")
                            i.fas.fa-undo-alt
                            div.icon-subscribe back

                      //- mobile-----------------------
                      div.prod-menu-option(v-show="isOpenOption")
                        div.prod-menu-option-action(@click="isOpenOption=!isOpenOption")
                            i.fas.fa-times
                        div.prod-menu-option-content
                          div.prod-menu-option-select
                            //- select.component--select(v-model="selected" @change="onChange()")
                            //- div.selectWrap
                            //-   select.component--select
                            //-     option Morning Tour
                            //-     option Afternoon Tour
                            //-     option Night Tour
                            div.select-box-wrape
                              div.option-select-box
                                h6 {{ selectedBike }}
                                div.select-box-arrow
                                  i(v-show="!isOpenBike" @click="isOpenBike=true").fas.fa-chevron-up
                                  i(v-show="isOpenBike" @click="isOpenBike=false").fas.fa-chevron-down
                              //- div.option-select-items(v-show="isOpenBike")
                              //-   div(v-for="itemBike in selectedBikeItems" :key="itemBike.id")
                              //-     h6(@click="selectItemBike(itemBike)") {{itemBike.option}}
                              div.option-select-items(v-show="isOpenBike")
                                  div(v-for="itemBike in selectProduct.bikeType" :key="itemBike.code")
                                    h6(@click="selectItemBike(itemBike)") {{itemBike.type}}
                            div.select-box-wrape
                              div.option-select-box
                                h6 {{ selectedZone }}
                                div.select-box-arrow
                                  i(v-show="!isOpenZone" @click="isOpenZone=true").fas.fa-chevron-up
                                  i(v-show="isOpenZone" @click="isOpenZone=false").fas.fa-chevron-down
                              //- div.option-select-items(v-show="isOpenZone")
                              //-   div(v-for="itemZone in selectedZoneItems" :key="itemZone.id")
                              //-     h6(@click="selectItemZone(itemZone)") {{itemZone.option}}
                              div.option-select-items(v-show="isOpenZone")
                                div(v-for="itemZone in selectProduct.timeZone" :key="itemZone.code")
                                  h6(@click="selectItemZone(itemZone)") {{itemZone.zone}}
                            div.select-box-wrape
                              div.option-select-box
                                h6 {{ selectedDate }}
                                div.select-box-arrow
                                  i(v-show="!isOpenDate" @click="isOpenDate=true").fas.fa-chevron-up
                                  i(v-show="isOpenDate" @click="isOpenDate=false").fas.fa-chevron-down
                              //- div.option-select-items(v-show="isOpenDate")
                              //-   div(v-for="itemDate in selectedDateItems" :key="itemDate.id")
                              //-     h6(@click="selectItemDate(itemDate)") {{itemDate.option}}
                              div.option-select-items(v-show="isOpenDate")
                                div(v-for="itemDate in selectProduct.tourDate" :key="itemDate.code")
                                  h6(@click="selectItemDate(itemDate)") {{itemDate.date}}

                            div.select-box-wrape
                              div.option-quantity-box
                                h6 Quantity
                                div.option-quantity-count
                                  i.fas.fa-minus(@click="quantityMinus(selectProduct)")
                                  h6 {{ quantity }}
                                  i.fas.fa-plus(@click="quantityAdd(selectProduct)")

                          div.prod-menu-option-icons
                            div.icon-circle
                              i.fas.fa-plus
                              div.icon-subscribe add
                            div.icon-circle
                              i.fas.fa-arrow-up
                              div.icon-subscribe update
                            div.icon-circle
                              i.fas.fa-times
                              div.icon-subscribe remove

                          div.prod-menu-option-discription
                            div.h7 Our AllergyFree Pillow is the perfect solution for allergy sufferers looking for a good night’s sleep.
                            div.h7 The Amicor® and microfibre filling, with 100% cotton cover, not only prevents dust mites but is luxuriously fluffy, too. It all adds up to you feeling more refreshed, rested and recuperated after every use.
                            ul
                                li Amicor® and microfibre active anti-allergy filling
                                li Recycled materials used throughout
                                li Made with ballfibre clusters for a loftier, comfier feel
                                li 100% cotton cover
                                li 106% pillow-fight superior

                                //- //- p product {{this.$route.params.slug}}
                                //- //- div {{ solProducts}}
                                //- //- div {{ selectProduct}}

                                //- div.p-title {{ selectProduct.title }}
                                //- div.p-subtitle {{ selectProduct.subTitle }}
                                //- div.p-subtitle ¥{{ selectProduct.price }}
                    div.prod-cart(:class="{positionTop: isOpenCart, positionBottom: !isOpenCart}")
                      div.prod-cart-header
                        div.prod-cart-total
                          div.total-price
                            h6
                              span.total-price-title Your destinetion
                              span  subTotal
                            h4
                              i.fas.fa-yen-sign
                              span {{total}}
                          div.action-icon
                            i.fas.fa-chevron-up(@click="isOpenCart=!isOpenCart")
                        div.prod-cart-detail
                            h5.prod-cart-detail-title Your destinetion
                            div.cart-detail(v-for="(item, index) in products" :key="item.orderKey")
                              //- h6 {{ item}}
                              div.cart-detail-items
                                h6 {{item.title}}
                                h6 {{item.productTotal}}

                              div.cart-detail-items-date
                                div.h7 {{item.id}}
                                div.h7 {{item.tourDate.date}}
                                div.h7 {{item.timeZone.zone}}
                              div.cart-detail-items
                                h6 {{item.bikeType.type}}
                              div.cart-detail-items
                                h6 quantity
                                h6 {{item.quantity}}
                      div.prod-cart-fotter
                          button.component--btn.cart-footer-button-width.cart-footer-button-color  CHECK OUT
                          button.component--btn.cart-footer-button-width SAVE SOLUTIONS

</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  layout: 'layout2Parts',
  data() {
    return {
      paramId: this.$route.params.slug,
      isOpenCart: false,
      isOpenOption: false,
      isOpenBike: false,
      isOpenZone: false,
      isOpenDate: false,
      selectedBike: '',
      selectedZone: '',
      selectedDate: '',
      selectedBikeType: null,
      selectedTimeZone: null,
      selectedTourDate: null,
      // selectedBikeItems: [
      //   { id: 1, option: 'e-baike' },
      //   { id: 2, option: 'city-bike' },
      //   { id: 3, option: 'load-bike' }
      // ],
      // selectedZoneItems: [
      //   { id: 1, option: 'Morning Tour' },
      //   { id: 2, option: 'Afternoon Tour' },
      //   { id: 3, option: 'Night Tour' }
      // ],
      // selectedDateItems: [
      //   { id: 1, option: '2020-09-05(sat)' },
      //   { id: 2, option: '2020-09-12(sat)' },
      //   { id: 3, option: '2020-09-19(sat)' },
      //   { id: 4, option: '2020-09-26(sat)' }
      // ],
      // selectedBikeItems: [
      //   { id: 1, option: 'e-baike' },
      //   { id: 2, option: 'city-bike' },
      //   { id: 3, option: 'load-bike' }
      // ],
      // selectedZoneItems: [
      //   { id: 1, option: 'Morning Tour' },
      //   { id: 2, option: 'Afternoon Tour' },
      //   { id: 3, option: 'Night Tour' }
      // ],
      // selectedDateItems: [
      //   { id: 1, option: '2020-09-05(sat)' },
      //   { id: 2, option: '2020-09-12(sat)' },
      //   { id: 3, option: '2020-09-19(sat)' },
      //   { id: 4, option: '2020-09-26(sat)' }
      // ],

      quantity: 1
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
    }),
    ...mapGetters({ getUrl: 'getProductsImgUrl' })
    // quantityError() {
    //   if (this.quantity === 0) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  },
  async created() {
    await this.$store.commit('buy/setSelectedId', this.paramId)
    // this.selectedBike = this.selectedBikeItems[0].option
    // this.selectedZone = this.selectedZoneItems[0].option
    // this.selectedDate = this.selectedDateItems[0].option

    // this.selectedZone=
    // this.selectedDate=
  },
  mounted() {
    this.selectedBike = this.selectProduct.bikeType[0].type
    this.selectedZone = this.selectProduct.timeZone[0].zone
    this.selectedDate = this.selectProduct.tourDate[0].date
    this.selectedBikeType = this.selectProduct.bikeType[0]
    this.selectedTimeZone = this.selectProduct.timeZone[0]
    this.selectedTourDate = this.selectProduct.tourDate[0]
    this.quantity = 1
  },
  methods: {
    ...mapActions('cart', ['addProductToCartAction']),
    getCartInventry(item) {
      let quan = 0
      if (this.total && this.total > 0) {
        const cartValue = this.products.find((product) => {
          return item.id === product.id
        })
        if (cartValue) {
          quan = cartValue.quantity
        } else {
          quan = 0
        }
      } else {
        quan = 0
      }
      return item.inventory - quan - this.quantity
    },
    getCartQuantity(item) {
      let quan = 0
      if (this.total && this.total > 0) {
        const cartValue = this.products.find((product) => {
          return item.id === product.id
        })
        if (cartValue) {
          quan = cartValue.quantity
        } else {
          quan = 0
        }
      } else {
        quan = 0
      }
      return quan
    },
    addProductToCart(item) {
      const product = {
        id: item.id,
        title: item.title,
        subTitle: item.subTitle,
        price: item.price,
        inventory: this.getCartInventry(item),
        img: item.img,
        quantity: this.quantity,

        bikeType: this.selectedBikeType,
        tourDate: this.selectedTourDate,
        timeZone: this.selectedTimeZone
      }

      this.addProductToCartAction(product)
      this.quantity = 1
    },
    updateProductToCart(item) {
      alert('updateProductToCart')
      const product = {
        id: item.id,
        title: item.title,
        subTitle: item.subTitle,
        price: item.price,
        inventory: this.getCartInventry(item),
        img: item.img,
        quantity: this.quantity,
        bikeType: this.selectedBikeType,
        tourDate: this.selectedTourDate,
        timeZone: this.selectedTimeZone
      }
      this.$store.dispatch('cart/updateProductCart', product)
    },
    removeProductToCart(item) {
      const product = {
        id: item.id,
        title: item.title,
        subTitle: item.subTitle,
        price: item.price,
        inventory: this.getCartInventry(item),
        img: item.img,
        quantity: this.quantity,

        bikeType: this.selectedBikeType,
        tourDate: this.selectedTourDate,
        timeZone: this.selectedTimeZone
      }
      this.$store.dispatch('cart/removeProductCart', product)
    },

    quantityAdd(item) {
      if (this.getCartInventry(item) > 0) {
        this.quantity++
        if (this.quantity === 0) {
          this.quantity++
        }
      } else {
        alert('no stock')
      }
    },
    quantityMinus(item) {
      const lowLimit = this.getCartQuantity(item) * -1
      if (lowLimit >= this.quantity) {
        alert('low lomit')
      } else {
        this.quantity--
        if (this.quantity === 0) {
          this.quantity--
        }
      }
    },
    selectItemBike(item) {
      this.selectedBikeType = item
      this.selectedBike = item.type
      this.isOpenBike = false
    },
    selectItemZone(item) {
      this.selectedTimeZone = item
      this.selectedZone = item.zone
      this.isOpenZone = false
    },
    selectItemDate(item) {
      this.selectedTourDate = item
      this.selectedDate = item.date
      this.isOpenDate = false
    },
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
$section-color: #fff;
$menu-height: 6rem;
// * {
//   border: 1px dotted grey;
// }

.solution-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: $buycolor;
}
.prod-img-wrape {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg-image {
  width: 100%;
  height: 100%;
  max-width: 1280px;
  max-height: 800px;
}
.black-filter {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: $black;
  opacity: 0.3;
}
.products-contents {
  position: relative;
  width: 100%;
  height: calc(100vh - #{$header-height});
}
// .prod-img {
//   position: absolute;
//   width: 100%;
//   height: calc(100vh - #{$header-height});
// }
.prod-img-box {
  position: absolute;
  width: 100%;
  height: calc(100vh - #{$header-height});
  // background-color: cadetblue;
  display: flex;
  justify-content: center;
  align-items: center;
  // display: block;
  // @media (min-width: 768px) {
  //   display: none;
  // }
}
.prod-img-inner {
  position: relative;
  width: 100%;
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
  // background-color: $buycolor;
  background-color: transparent;
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
  // border: 5px solid black;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  color: $white;
  @media (min-width: 768px) {
    height: calc(100vh - #{$header-height});
  }

  flex-direction: row;
}
.prod-buy {
  position: relative;
  // border: 1px solid white;
  width: 100%;
  height: calc(100vh - #{$header-height} - #{$menu-height});
  padding: 0.5rem;
  @media (min-width: 768px) {
    max-width: 380px;
    height: calc(100vh - #{$header-height} - #{$menu-height} - 2rem);
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
.prod-select-grp {
  display: none;
  width: 100%;
  @media (min-width: 768px) {
    display: block;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
.prod-select-inner {
  width: 50%;
  padding-bottom: 0.5rem;
}
.prod-type {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  div.h7 {
    margin-bottom: 1rem;
  }
  @media (min-width: 768px) {
    display: block;
    position: relative;
  }
}
.prod-menu {
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  padding: 0 1rem;
  @media (min-width: 768px) {
    // width: 380px;
    width: calc(100vw - 380px - 10px);
  }
  // border: 2px solid blue;
}
.prod-menu-option {
  display: block;
  position: absolute;
  width: 100%;
  top: 0;
  right: 0;
  // padding: 1rem;
  width: 100%;
  height: calc(100vh - #{$header-height} - #{$menu-height} + 1rem);
  background-color: $white;
  // background-color: transparent;
  color: $black-ter;
  overflow-y: auto;
  @media (min-width: 768px) {
    display: none;
  }
}
.prod-menu-option-action {
  position: fixed;
  width: 100%;
  height: 2rem;
  padding: 0 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
}
.prod-menu-option-content {
  position: relative;
  width: 100%;
  margin-top: 2rem;
}
.prod-menu-option-select {
  display: block;
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
.select-box-wrape {
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
}
.quantity-box-wrape {
  position: relative;
  width: 100%;
  margin-bottom: 0.5rem;
}
.option-select-box {
  width: 100%;
  height: 3rem;
  border: 1px solid $black;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  @media (min-width: 768px) {
    border: 1px solid $white;
    // background-color: $buycolor;
    background-color: transparent;
  }
}
.radiusOn {
  border-radius: 2rem;
}
.radiusOff {
  border-radius: 0rem;
}
.select-box-arrow {
  margin-right: 1rem;
  cursor: pointer;
  i {
    font-size: $size-5;
    color: $grey;
    @media (min-width: 768px) {
      color: $white;
    }
  }
}
.option-select-items {
  width: 100%;
  border: 1px solid $black;
  padding: 0.5rem;
  h6 {
    margin-bottom: 0.5rem;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    border: 1px solid $white;
    // background-color: $buycolor;
    background-color: transparent;
  }
}

.option-quantity-box {
  width: 100%;
  // max-width: 30rem;
  height: 3rem;
  border: 1px solid $black;
  border-radius: 2rem;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  i {
    margin-right: 0.8rem;
    font-size: $size-5;
    color: $grey;
  }
  h6 {
    margin-right: 0.8rem;
  }
}
// .entoryErrorColor {
//   color: $red;
// }
.option-quantity-count {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
}
.prod-buy .option-quantity-box {
  border: 1px solid $white;
  i {
    color: $white;
  }
}
.prod-menu-option .option-quantity-box {
  border: 1px solid $black;
  i {
    color: $grey;
  }
}
// .option-select-item {
//   width: 100%;
//   height: 3rem;
//   padding: 0.5rem;
// }

// .selectWrap {
//   width: 12rem;
//   position: relative;
//   display: inline-block;
//   &::after {
//     content: '';
//     width: 1rem;
//     height: 1rem;
//     border-bottom: solid 2px #b4b3b3;
//     border-right: solid 2px #b4b3b3;
//     transform: rotate(45deg) translateY(-50%);
//     position: absolute;
//     top: 50%;
//     right: 0;
//     margin-top: -0.6rem;
//     margin-right: 1rem;
//     pointer-events: none;
//   }
// }
// .selectWrap {
//   &::after {
//     content: '';
//     transform: rotate(-135deg) translateY(-50%);
//   }
// }
// .selectWrap-down {
//   &::after {
//     content: '';
//     transform: rotate(45deg) translateY(-50%);
//   }
// }

// select {
//   margin-bottom: 0.5rem;
//   border: 1px solid $black;
//   appearance: none;
//   padding-right: 2rem;
//   &:active,
//   &:focus {
//     border-color: $black;
//     border-style: solid;
//     border-color: $black;
//     border-width: 1px;
//     box-shadow: 1px $black;
//     border-radius: 0;
//   }
// }
.prod-menu-option-icons {
  display: block;
  width: 100%;
  height: 7rem;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
}
.prod-menu-option-discription {
  display: block;
  width: 100%;
  padding: 1rem;
}
.prod-menu-laptop {
  display: none;
  width: 100%;
  height: 7rem;
  @media (min-width: 768px) {
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
}
.prod-menu-laptop-inner {
  width: 380px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
}
.prod-menu-mobile {
  display: block;
  width: 100%;
  height: 7rem;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  @media (min-width: 768px) {
    display: none;
  }
}

.icon-circle {
  position: relative;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid $white;
  border-radius: 100%;
  margin-right: 0.5rem;
  i {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: $size-5;
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
.prod-menu-option-icons {
  .icon-circle {
    border: 1px solid $black;
  }
  i,
  .icon-subscribe {
    color: $black;
  }
}
.prod-cart {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem;
  // border: 1px solid purple;
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
.cart-detail-items-date {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  div.h7 {
    margin-right: 0.5rem;
  }
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
