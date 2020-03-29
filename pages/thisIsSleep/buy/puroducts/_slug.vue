<template lang="pug">
    div.main-wrape
        div.container-fluid.product-main
            div.row
                div.container
                    div.row
                        div.products-contents
                            div.prod-left
                                img(:src="selectProduct.img" alt="selectProduct.title" )
                                h5 route.params.slug: {{ $route.params.slug }}
                                h5 store is : {{ selectedId }}
                                h5 select product : {{ selectProduct.img }}
                                h5 select product : {{ selectProduct.id }}
                                h5 select product : {{ selectProduct.title }}
                                h5 select product : {{ selectProduct.subTitle }}
                                h5 select product : {{ selectProduct.price }}
                                h5 select product : {{ selectProduct.date }}
                                h5 select product : {{ selectProduct.inventory }}

                            div.prod-right
                                h5 {{ selectProduct.title }}
                                div.h6 {{ selectProduct.subTitle }}
                                h6 ¥{{ selectProduct.price }}
                                div.prod-type
                                    div.h7 type
                                    div.prod-type-button
                                        button.component--btn(autoFocus)  original eco
                                        button.component--btn  allegray free
                                        button.component--btn  brether flower
                                div.prod-firmless
                                    div.h7 firmless
                                    select.component--select(v-model="selected" @change="onChange()")
                                        //- option(disabled selected value="" placeholder="Please select one") Please select one
                                        option soft
                                        option medium
                                        option firm
                                div.prod-quantity
                                    div.h7 quantity
                                    input.component--input( v-model.number="quantity" type="number")
                                div.prod-addcart
                                    button.component--btn  add cart
                                div.prud-subscrive
                                    div.h7 Our AllergyFree Pillow is the perfect solution for allergy sufferers looking for a good night’s sleep.
                                    div.h7 The Amicor® and microfibre filling, with 100% cotton cover, not only prevents dust mites but is luxuriously fluffy, too. It all adds up to you feeling more refreshed, rested and recuperated after every use.
                                    ul
                                        li Amicor® and microfibre active anti-allergy filling
                                        li Recycled materials used throughout
                                        li p Made with ballfibre clusters for a loftier, comfier feel
                                        li p 100% cotton cover
                                        li p 106% pillow-fight superior
        div.container-fluid.product-main
            div.row
                div.customer-reviews Customer Reviews
        div.container-fluid.product-main
            div.row
                div.products-Order Order
        div.container-fluid.product-main
            div.row
                div.products-footer footer
</template>
<script>
import { mapState, mapGetters } from 'vuex'
// import { mapState } from 'vuex'
export default {
  layout: 'layout3Parts',

  data() {
    return {
      paramId: this.$route.params.slug,
      quantity: 1,
      selected: ''
    }
  },
  computed: {
    ...mapState('buy', ['selectedId']),
    //     //     // ...mapState('products', {
    //     //     //   items: 'all'
    //     //     // }),
    ...mapGetters('buy', {
      selectProduct: 'selectProduct'
    })
  },
  created() {
    this.$store.commit('buy/setSelectedId', this.paramId)
    // this.$store.dispatch('buy/selectProduct', this.paramId)
  },
  //   mounted() {
  //     this.$store.commit('buy/setSelectedId', this.paramId)
  //     // this.$store.dispatch('buy/selectProduct', this.paramId)
  //   }
  methods: {
    onChange() {
      console.log('onChenge')
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  border: 1px solid gray;
}
.main-wrape {
  margin-top: $header-height;
  overflow: hidden;
  width: 100%;
}
.product-main {
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
  @media (min-width: 768px) {
    width: 50%;
  }
}
img {
  width: 100%;
  height: auto;
  display: block;
}
.prod-type-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  button {
    margin: 0 1rem;
    background-color: $buycolor;
    &:hover,
    &:active,
    &:focus {
      background-color: $black-ter;
    }
  }
}
.prod-firmless {
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  input {
    margin: 0 1rem;
    background-color: $buycolor;
  }
}
.prod-addcart {
  button {
    width: 10rem;
    margin: 0 1rem;
    &:hover,
    &:active,
    &:focus {
      width: 11rem;
      border-color: none;
    }
  }
}
.prud-subscrive {
  ul {
    list-style: inside;
    margin-left: 1rem;
  }
}
.customer-reviews {
  width: 100%;
}
</style>
