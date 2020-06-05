<template lang="pug">
    div.main-wrape
        div.container-fluid
            div.row
                div.container
                    div.row
                        div.products-contents
                            div.prod-left
                                div.prod-left-img-warpe
                                img(:src="getUrl(selectedId)" alt="product image")
                                //- h6 inventory : {{getCartInventry(selectProduct)}}
                                h6 inventory : {{getCartInventry(selectedId,selectedInventory)}}
                                div test display -----------------------------------
                                div store selectId:{{selectedId}}
                                div $route.params.slug:{{ $route.params.slug}}
                                div uid: {{ uid }}
                                div paramId:{{paramId}} //selectId
                                div selectedProductBuy:{{selectedProductBuy}}
                                div selectedProductBuy:{{selectedProductBuy.title}}

                            div.prod-right
                                div.prod-right-warpe
                                    div.p-title {{ selectedProductBuy.title }}
                                    div.p-subtitle {{ selectedProductBuy.subTitle }}
                                    div.p-subtitle ¥{{ selectedProductBuy.price }}
                                    div.prod-type
                                        div.h7
                                          span(:class="{entoryErrorColor:bikeTypeError}") Bike Type
                                          span.h6.prod-type-element {{selectedBikeType.type}}
                                        div.prod-type-button
                                            div.button-wrape(v-for="(bike, bIdx) in selectedProductBuy.bikeType" :key="bike.code")
                                                button.component--btn.btn-type(@click="selectBikeType(bike)") {{bike.type}}

                                    div.prod-firmless
                                        div.h7 Tour Date:
                                        select.component--select(v-model="selectedTourDateOption" @change="onChangeTourDate(selectedProductBuy.tourDate)")
                                            option(v-for="(tourDate, tourIdx) in selectedProductBuy.tourDate" selected) {{tourDate.date}}
                                    div.prod-firmless
                                        div.h7 Time Zone
                                        select.component--select(v-model="selectedTimeZoneOption" @change="onChangeTimeZone(selectedProductBuy.timeZone)")
                                            option(v-for="(timeZone, timeIdx) in selectedProductBuy.timeZone") {{timeZone.zone}}
                                    div.prod-quantity
                                        div.h7(:class="{entoryErrorColor:quantityError}")  Number of people
                                        input.component--input( v-model.number="quantity" type="number")
                                    message
                                    div.prod-error-msg
                                        div.h7(v-show="bikeTypeError") Please bike Type select
                                        div.h7(v-show="quantityError") Quantity is 1 or more
                                    div.prod-addcart(v-if="getCartInventry(selectedId,selectedInventory) >= 0")
                                        button.component--btn(@click="addProductToCart(selectedProductBuy)")  add cart
                                    div.prod-addcart(v-else)
                                        button.component--btn.disabl-btn.disabled  out of stock
                                    div.prud-subscrive
                                      div.h7
                                      span {{loginUser}} - {{loginUid}}

                                    //- div.prud-subscrive
                                    //-     div.h7 Our AllergyFree Pillow is the perfect solution for allergy sufferers looking for a good night’s sleep.
                                    //-     div.h7 The Amicor® and microfibre filling, with 100% cotton cover, not only prevents dust mites but is luxuriously fluffy, too. It all adds up to you feeling more refreshed, rested and recuperated after every use.
                                    //-     ul
                                    //-         li Amicor® and microfibre active anti-allergy filling
                                    //-         li Recycled materials used throughout
                                    //-         li Made with ballfibre clusters for a loftier, comfier feel
                                    //-         li 100% cotton cover
                                    //-         li 106% pillow-fight superior
        div.container-fluid
            div.row
                div.customer-reviews-new
                    div.cus-rev-rating
                        h5 Coustomar Review
                        h5
                          span(v-for="(star, starIndex ) in stars" :key="star.id")
                            span(v-if="star.id > reviewAveRait ")
                              i.far.fa-star
                            span(v-else)
                              i.fas.fa-star
                          span.base based on {{reviewBase}}  review {{reviewAveRait}}
                    div.cus-new-open
                        span(@click="isWrite=!isWrite") Write a review
        div.container-fluid.product-main(v-if="isWrite")
            div.row
                div.container
                    div.row
                        div.customer-new-write
                            div.h7.new-write-title Write a review
                            form(@submit.prevent="mailCheck" novalidate)
                                div.cus-new-error(v-if="reviewErrors.length")
                                    p.error-title 入力項目を確認してください。
                                        ul
                                            li(v-for="(reviewError) in reviewErrors" :key="reviewError.id")
                                                p.error-msg {{ reviewError.error}}
                                div.cus-new-name
                                    label
                                        div.h7 Name
                                    input.component--input(v-model="name" type="text" placeholder="Enter your name"
                                    :style="{ background: bgColorName }" required)
                                div.cus-new-mail
                                    label
                                        div.h7 Mail
                                    input.component--input(v-model="email" type="email" placeholder="john.smith@example.com"
                                    :style="{ background: bgColorMail }" required)
                                div.cus-new-rating
                                    div.h7 Rating
                                    div.rating-stars
                                      span(v-for="(star, starIndex ) in mailStars" :key="star.id")
                                        i.fa-star(:class="{fas: star.isMark, far: !star.isMark}" @click="starMark(starIndex)")
                                div.cus-new-title
                                    label
                                        div.h7 Title
                                    input.component--input(v-model="title" type="text" placeholder="Give your review a title"
                                    :style="{ background: bgColorTitle }" required)
                                div.cus-new-review
                                        label.label
                                            div.h7 Review(1500)
                                        textarea.component--textarea(v-model="review" name="textarea" rows="10" cols="42" maxlength="1500" placeholder="Write your comments here"
                                         :style="{ background: bgColorRewiew}" required )
                                div.cus-new-submit
                                  button.component--btn(type="submit")
                                      div.h7 submit review
                            div.appMessege
                                ul
                                  li(v-for="(msg, index) in message" :key="index")
                                      p.guid-msg {{ msg }}

        div.container-fluid
            div.row
                div.customer-reviews
                    div.cus-rev-post(v-for="customerRreview in selectProductId(customerRreviews)" :key="customerRreview.id")
                          div.cus-rev-lating
                              span(v-for="(star, starIndex ) in stars" :key="star.id")
                                span(v-if="star.id > customerRreview.rait ")
                                  i.far.fa-star
                                span(v-else)
                                  i.fas.fa-star
                          div.cus-rev-title
                              h5 {{customerRreview.title}}
                          div.cus-rev-name-date
                              h6
                                  span.date-name {{customerRreview.name}}
                                  span.date-separater on
                                  span {{customerRreview.date}}
                          div.cus-rev-body
                              div.h7 {{customerRreview.review}}

</template>
<script>
import firebase from '@/plugins/firebase'
import { mapState, mapGetters, mapActions } from 'vuex'
import {
  SENDGRID,
  SLEEP_ADD_REVIEW,
  SLEEP_GET_REVIEW
} from '~/store/actionTypes'
export default {
  layout: 'layout3Parts',

  data() {
    return {
      paramId: this.$route.params.slug,
      quantity: 1,
      selected: '2020-09-05(sat)',
      isWrite: false,
      name: null,
      email: null,
      rait: 1,
      title: null,
      review: null,
      // cusRating: 3,
      // cusBase: 1,
      stars: [
        { id: 1, isMark: true },
        { id: 2, isMark: true },
        { id: 3, isMark: true },
        { id: 4, isMark: true },
        { id: 5, isMark: true }
      ],
      mailStars: [
        { id: 1, isMark: false },
        { id: 2, isMark: false },
        { id: 3, isMark: false },
        { id: 4, isMark: false },
        { id: 5, isMark: false }
      ],
      reviewBase: 0,
      reviewAveRait: 0,
      selectedBikeType: { code: 9999, type: 'Select Bike Type' },
      selectedTimeZone: null,
      selectedTourDate: null,
      selectedTimeZoneOption: null,
      selectedTourDateOption: null,
      // bikeTypeError: false
      // quantityError: false,
      loginUid: null,
      loginUser: null,
      logoutUid: 'guestUid'
    }
  },
  computed: {
    // ...mapState({ items: 'sleepProducts' }),
    ...mapState(['uid']),
    ...mapState('buy', ['selectedId']),
    ...mapState('buy', ['selectedInventory']),
    ...mapState('buy', ['selectedProductBuy']),
    ...mapState({ customerRreviews: 'sleepreviews' }),
    ...mapGetters('buy', {
      selectProduct: 'selectProduct'
    }),
    ...mapGetters({ getUrl: 'getProductsImgUrl' }),
    ...mapGetters('cart', {
      cartItems: 'cartProducts', // cartItems
      total: 'cartTotalPrice'
    }),
    ...mapState('buy', ['reviewErrors']),
    ...mapGetters('buy', {
      bgColorName: 'getErrorBgColorName'
    }),
    ...mapGetters('buy', {
      bgColorMail: 'getErrorBgColorMail'
    }),
    ...mapGetters('buy', {
      bgColorTitle: 'getErrorBgColorTitle'
    }),
    ...mapGetters('buy', {
      bgColorRewiew: 'getErrorBgColorReview'
    }),

    ...mapState(['message']),
    quantityError() {
      if (this.quantity <= 0) {
        return true
      } else {
        return false
      }
    },
    bikeTypeError() {
      if (this.selectedBikeType.code === 9999) {
        // isValidation = false
        return true
      } else {
        return false
      }
    }

    // quantityError: function() {
    //   if (this.quantity <= 0) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  },
  // async asyncData({ payload, store, params, error }) {
  //   const category =
  //     payload ||
  //     (await store.state.categories.find(
  //       (cat) => cat.fields.slug === params.slug
  //     ))
  //   if (category) {
  //     return { category }
  //   } else {
  //     return error({ statusCode: 400 })
  //   }
  // },

  async created() {
    await this.$store.dispatch(SLEEP_GET_REVIEW)
  },
  async mounted() {
    // console.log('mounted buy slug')
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginUid = user.uid
        this.loginUser = user.displayName
      } else {
        this.loginUid = this.logoutUid
        this.loginUser = 'Guest User'
      }
      this.$store.commit('setLoginUid', this.loginUid)
    })
    // console.log(this.$route.params.slug)
    this.paramId = this.$route.params.slug
    await this.$store.commit('buy/setSelectedId', this.$route.params.slug)
    await this.$store.commit(
      'buy/setSelectedInventory',
      this.selectProduct.inventory
    )
    await this.$store.commit('buy/setSelectedProduct', this.selectProduct)

    this.selectedTimeZone = this.selectProduct.timeZone[0]
    this.selectedTourDate = this.selectProduct.tourDate[0]
    this.selectedTimeZoneOption = this.selectProduct.timeZone[0].zone
    this.selectedTourDateOption = this.selectProduct.tourDate[0].date
    this.$store.commit('buy/clearRevueError')
    this.$store.commit('clearMessage')
  },
  methods: {
    ...mapActions('cart', ['addProductToCartAction']),
    // use item.id,item.inventory
    getCartInventry(id, inventory) {
      console.log('id: ' + id)
      console.log('inventory: ' + inventory)
      let cnt = 0
      // if (this.total && this.total > 0) {
      // const cartValue = this.cartItems.find((cartItem) => {
      //   return Number(id) === cartItem.id
      // })
      // if (cartValue) {
      //   quantity = cartValue.quantity
      // } else {
      //   quantity = 0
      // }

      // } else {
      //   quantity = 0
      // }
      // this.cartItems.forEach((cart => {
      //   if(Number(id) === cart.id){
      //     quantity = quantity + cart.quantity
      //   }
      // })
      this.cartItems.forEach((cart) => {
        if (Number(id) === cart.id) {
          cnt = cnt + cart.quantity
        }
      })
      return inventory - cnt - this.quantity
    },
    // getCartInventry(item) {
    //   let quantity = 0
    //   if (this.total && this.total > 0) {
    //     const cartValue = this.products.find((product) => {
    //       return item.id === product.id
    //     })
    //     if (cartValue) {
    //       quantity = cartValue.quantity
    //     } else {
    //       quantity = 0
    //     }
    //   } else {
    //     quantity = 0
    //   }
    //   return item.inventory - quantity
    // },
    selectProductId(reviews) {
      const selectedReview = []
      let cnt = 0
      let rait = 0
      for (const review in reviews) {
        if (reviews[review].productId === this.paramId) {
          selectedReview.push(reviews[review])
          cnt++
          rait += parseInt(reviews[review].rait)
        }
      }
      this.reviewBase = cnt
      this.reviewAveRait = rait / cnt
      return selectedReview
    },

    addProductToCart(item) {
      // set value

      const product = {
        id: item.id,
        // title: item.title,
        // subTitle: item.subTitle,
        // price: item.price,
        inventory: item.inventory,
        // img: item.img,
        quantity: this.quantity,
        bikeType: this.selectedBikeType,
        tourDate: this.selectedTourDate,
        timeZone: this.selectedTimeZone,
        loginUid: this.loginUid
      }

      // store Actio cart/addProductToCartAction'
      // カート（state cartItems）に新規追加、あれば数量加算する
      if (this.bikeTypeError || this.quantityError) {
        alert('validation error')
      } else {
        this.addProductToCartAction(product)
        // alert('add to cart')
      }
    },
    starMark(starIndex) {
      this.rait = starIndex + 1
      this.mailStars.forEach((element) => {
        if (element.id > starIndex + 1) {
          element.isMark = false
        } else {
          element.isMark = true
        }
      })
    },
    sendMail() {
      const sendMsg = {
        to: 'hiramatsu3300@gmail.com',
        from: this.email,
        subject: this.title,
        text: this.review,
        name: this.name,
        phone: this.paramId
      }
      // sendgrid api からメール送信
      this.$store.dispatch(SENDGRID, sendMsg)
      // google cloud function からメール送信
      // this.$store.dispatch(CLOUD_FUNCTION, sendMsg)
    },
    reviewSend() {
      const dd = new Date()
      const year = dd.getFullYear()
      let month = dd.getMonth() + 1
      let date = dd.getDate()

      month = String(month).padStart(2, '0')
      date = String(date).padStart(2, '0')
      const reviewDate = year + '-' + month + '-' + date

      const msg = {
        productId: this.paramId,
        name: this.name,
        email: this.email,
        rait: this.rait,
        title: this.title,
        review: this.review,
        date: reviewDate,
        id: null
      }
      this.$store.dispatch(SLEEP_ADD_REVIEW, msg)
    },
    validEmail: (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    mailCheck(e) {
      //   alert('mailCheck')
      this.$store.commit('buy/clearRevueError')
      this.$store.commit('clearMessage')

      if (!this.name) {
        this.$store.commit('buy/setRevueError', {
          id: 1,
          check: 'name',
          error: '氏名は必須です。',
          bg: '#f8bbd0'
        })
      } else if (this.name.length > 16) {
        this.$store.commit('buy/setRevueError', {
          id: 2,
          check: 'name',
          error: '氏名は１６文字以下です。',
          bg: '#f8bbd0'
        })
      }
      if (!this.email) {
        this.$store.commit('buy/setRevueError', {
          id: 3,
          check: 'mail',
          error: 'メールは必須です。',
          bg: '#f8bbd0'
        })
      } else if (!this.validEmail(this.email)) {
        this.$store.commit('buy/setRevueError', {
          id: 4,
          check: 'mail',
          error: '無効なメール形式です。',
          bg: '#f8bbd0'
        })
      }
      if (!this.title) {
        this.$store.commit('buy/setRevueError', {
          id: 5,
          check: 'title',
          error: 'タイトルは必須です。',
          bg: '#f8bbd0'
        })
      } else if (this.title.length > 32) {
        this.$store.commit('buy/setRevueError', {
          id: 6,
          check: 'title',
          error: 'タイトルは３２文字以下です。',
          bg: '#f8bbd0'
        })
      }

      if (!this.review) {
        this.$store.commit('buy/setRevueError', {
          id: 7,
          check: 'review',
          error: 'レビューは必須です。',
          bg: '#f8bbd0'
        })
      } else if (this.title.length > 1500) {
        this.$store.commit('buy/setRevueError', {
          id: 8,
          check: 'review',
          error: 'タイトルは１５００文字以下です。',
          bg: '#f8bbd0'
        })
      }

      if (!this.reviewErrors.length) {
        this.$store.commit('clearMessage')
        this.reviewSend()
        this.sendMail()
      }
      e.preventDefault()
    },
    selectBikeType(bike) {
      // { code: 9999, type: 'Select Bike Type' },
      this.selectedBikeType = bike
    },
    onChangeTourDate(tourDate) {
      const selectedTourDate = tourDate.find((value) => {
        return value.date === this.selectedTourDateOption
      })
      if (selectedTourDate) {
        this.selectedTourDate = selectedTourDate
      } else {
        console.log('option eror')
      }
    },
    onChangeTimeZone(timeZone) {
      const selectedTimeZone = timeZone.find((value) => {
        return value.zone === this.selectedTimeZoneOption
      })
      if (selectedTimeZone) {
        this.selectedTimeZone = selectedTimeZone
      } else {
        console.log('option eror')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// * {
//   border: 1px dotted red;
// }
.main-wrape {
  margin-top: $header-height;
  overflow: hidden;
  width: 100%;
  background-color: $buycolor;
}

.products-contents {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    margin-top: 6rem;
  }
}
.prod-left,
.prod-right {
  width: 100%;
  padding: 1rem 1rem;
  @media (min-width: 768px) {
    padding: 1rem 1.5rem;
    width: 50%;
  }
  .p-title {
    font-size: $size-3;
    font-weight: 700;
    line-height: 1.5;
  }
  .p-subtitle {
    font-size: $size-5;
    font-weight: 7400;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
}

.prod-left-img-warpe {
  width: 100%;
  padding: 0 2rem;
}
.prod-right-warpe {
  max-width: 512px;
}
img {
  width: 100%;
  height: auto;
  display: block;
}
.prod-type {
  margin-top: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid $grey-lighter;
  div {
    margin-bottom: 1rem;
  }
  .prod-type-element {
    margin-left: 0.5rem;
    font-weight: 600;
  }
}
.entoryErrorColor {
  color: $red;
}
.prod-error-msg {
  color: $red;
  margin-bottom: 0.5rem;
}
.prod-type-button {
  display: flex;
  // justify-content: space-between;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  .button-wrape {
    width: 33.333%;
    padding: 0 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    button.btn-type {
      display: inline-block;
      width: 95%;
      background-color: $buycolor;
      transition: all 0.4s;
      color: $black;
      &:hover,
      &:active,
      &:focus {
        color: $white;
        background-color: $black-ter;
        width: 100%;
        transition: all 0.4s;
      }
    }
    button.btn-time {
      display: inline-block;
      width: 95%;
      background-color: $buycolor;
      color: $black;
      &:hover,
      &:active,
      &:focus {
        color: $white;
        background-color: $black-ter;
        width: 100%;
        transition: all 0.4s;
      }
    }
  }
}
.prod-firmless {
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  select {
    margin: 0 1rem;
    background-color: $buycolor;
  }
}
.prod-quantity {
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  input {
    max-width: 6rem;
    margin: 0 1rem;
    background-color: $buycolor;
  }
}
.prod-addcart {
  margin-bottom: 5rem;
  button {
    width: 10rem;
    margin: 0 1rem;
    transition: all 0.4s;
    &:hover,
    &:active,
    &:focus {
      width: 11rem;
      border-color: none;
      transition: all 0.4s;
    }
  }
  .disabl-btn {
    background-color: $red;
    color: $white;
  }
}
.prud-subscrive {
  margin-bottom: 5rem;
  .h7 {
    line-height: 1.8rem;
    font-weight: $weight-light;
    margin-bottom: 1rem;
  }
  ul {
    list-style: inside;
    margin-left: 1.5rem;
    list-style-position: inside;
    li {
      padding-left: 1rem;
      text-indent: -1.5rem;
      line-height: 1.8rem;
      font-weight: $weight-light;
    }
  }
}
.customer-reviews-new {
  width: 100%;
  padding: 1rem;
  border-top: 2px solid $grey-lighter;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }

  .cus-rev-rating {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (min-width: 768px) {
      width: 70%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .base {
      margin-right: 0.5rem;
      font-size: $size-6;
      font-weight: 300;
      line-height: 1.5;
      margin-bottom: 1rem;
      margin-left: 0.5rem;
    }
    h5 {
      font-size: $size-5;
      font-weight: 700;
      line-height: 1.5;
      margin-bottom: 1rem;
    }
  }
  .cus-new-open {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (min-width: 768px) {
      width: 30%;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
    }

    span {
      font-size: $size-6;
      font-weight: 400;
      line-height: 1.5;
      margin-bottom: 1rem;
      cursor: pointer;
    }
  }
}
.customer-new-write {
  width: 100%;
  margin: 0 0.5rem;
  padding: 1rem;
  border: 2px solid $grey-lighter;

  textarea {
    width: 100%;
    margin-top: 0.4rem;
  }
  input {
    width: 100%;
    margin-top: 0.4rem;
  }
  .new-write-title {
    margin-bottom: 1rem;
  }
  .cus-new-error {
    margin-bottom: 1rem;
  }
  .cus-new-name {
    margin-bottom: 1rem;
  }
  .cus-new-mail {
    margin-bottom: 1rem;
  }
  .cus-new-rating {
    margin-bottom: 1rem;
    .rating-stars {
      margin-top: 0.4rem;
    }
  }
  .cus-new-title {
    margin-bottom: 1rem;
  }
  .cus-new-review {
    margin-bottom: 1rem;
  }
  .cus-new-submit {
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    button {
      width: 10rem;
    }
  }
}
.customer-reviews {
  width: 100%;
  margin-bottom: 2rem;
  padding: 1rem;

  border-bottom: 2px solid $grey-lighter;
  .cus-rev-post {
    padding: 1rem 0;
    border-top: 2px solid $grey-lighter;

    .cus-rev-lating {
      margin-bottom: 1rem;
    }
    .cus-rev-title {
      margin-bottom: 0.5rem;
    }
    .cus-rev-name-date {
      margin-bottom: 1rem;
      color: $grey-darker;
      // .date-name {
      //   font-weight: 300;
      // }
      .date-separater {
        margin: 0 0.3rem;
        color: $grey;
      }
    }
    .cus-rev-body {
      margin-bottom: 1rem;
    }
  }
}

.error-title {
  color: $red;
}
.error-msg {
  background-color: $red;
  padding: 0.5rem;
  color: $white;
}
</style>
