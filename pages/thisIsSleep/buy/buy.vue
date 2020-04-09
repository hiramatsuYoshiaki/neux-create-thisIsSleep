<template lang="pug">
  div.main-wrape
    div.container-fluid
      div.row
        alternation
            template(v-slot:alternation)
              div.sort-wrape.left-group
                h4 {{title2 | capitalize}}
                //- h4 {{title2}}
        alternation
            template(v-slot:alternation)
              div.sort-wrape.right-group
                span.select-title Sort by
                div.select-box
                  select.select(v-model="selected" @change="onChange()")
                    option(disabled selected value="" placeholder="Please select one") Please select one
                    option Featured
                    option Date New to Old
                    option Date Old to New
                    option Price Height to Low
                    option Price Low to height
                    option Best Selling
                    option Alphbetically, A-Z
                    option Alphbetically, Z-A
        alternation
            template(v-slot:alternation)
              div.filter-wrape
                  div.h7 Filter
                    span(@click="isFilterOpen=!isFilterOpen")
                      i.fas.fa-caret-right(v-if="!isFilterOpen")
                    span(@click="isFilterOpen=!isFilterOpen")
                      i.fas.fa-caret-left(v-if="isFilterOpen")
                    span.filter-type(v-if="isFilterOpen") Items
                      span(@click="onFilterItems()")
                        i.fas.fa-chevron-down(v-if="!isFilterItems")
                        i.fas.fa-chevron-up(v-if="isFilterItems")
                    span.filter-type(v-if="isFilterOpen") Price
                      span(@click="onFilterPrice()")
                        i.fas.fa-chevron-down(v-if="!isFilterPrice")
                        i.fas.fa-chevron-up(v-if="isFilterPrice")

                  div.filter-select-group(v-if="isFilterItems")
                    div(v-for="(item, index) in filterItemList")
                      div.filter-select(@click="onFilter(index,'items')") {{item.name}}

                  div.filter-select-group(v-if="isFilterPrice")
                     div(v-for="(item, index) in filterPriceList")
                      div.filter-select(@click="onFilter(index,'price')") {{item.name}}

    div.container
      div.row
        alternation(v-for="(item, index) in filterData.slice(this.filterStart,this.filterEnd) " :key="item.id")
            template(v-slot:alternation)
              div.alternation-wrape(:class="{altright: ( index % 2 ) != 0 }")
                //- div {{item.imgName}}
                //- div {{productsImg[index].img}}
                //- div {{ productsImgUrl[index].img}}
                //- div {{ productsImgUrl[index] }}
                //- div {{ getUrl(item.id) }}
                div
                  //-forebase strage
                  img(:src="getUrl(item.id)" alt="product image")
                div imgPass
                //- div
                  //-静的ローカルファイルの場合
                  //- img(:src="require(`~/assets/img/img3614.jpg`)" alt="product image")
                  //-データオブジェクトでやるローカルファイルの場合
                  //- img(:src="productsImg[index].img" alt="product image")
                  //-動的ローカルファイルの場合
                  //img(:src="imgPass(item.imgName)" alt="product image")

                div {{item.id}}
                div {{item.title}}
                div {{item.subTitle}}
                div {{yen}}{{item.price}}
                //- div date:{{item.date}}
                //- div featuerd:{{item.featured}}
                //- div sellin:{{item.selling}}
                //- div inventory:{{item.inventory}}
                //- button(@click="addProductToCart(item)") addProductToCart
                nuxt-link(:to="'/thisIsSleep/buy/puroducts/' + item.id")
                  p(style="color:black")   Tour Detail
    //- div.container
    //-   div.row
        //- button(@click="createTestData()" style="color: red" ) CreateTestData
        //- div(v-for="test in tests" :key="test.id")
        //-   div {{test}}
        div {{items}}

</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { GET_SLEEP_DATA, SET_SLEEP_IMG_URL } from '~/store/actionTypes'
import alternation from '~/components/layouts/alternationSlots/alternationSlot.vue'
export default {
  layout: 'layout3Parts',
  components: {
    alternation
  },
  data() {
    return {
      title1: 'all- ',
      title2: 'product ',
      yen: '¥',
      selected: '',
      sortType: 'Date New to Old',
      filterType: 'All',
      isFilterOpen: false,
      isFilterItems: false,
      filterItemList: [
        { id: 1, name: 'All', value: 999999999 },
        { id: 2, name: '2', value: 2 },
        { id: 3, name: '4', value: 4 },
        { id: 4, name: '8', value: 5 }
      ],
      isFilterPrice: false,
      filterPriceList: [
        { id: 1, name: 'All', value: 999999999 },
        { id: 2, name: 'Free', value: 0 },
        { id: 3, name: '~999', value: 999 },
        { id: 4, name: '~1999', value: 1999 },
        { id: 5, name: '2000~', value: 2000 }
      ],
      filterStart: 0,
      filterEnd: 999999999,
      productsImg: [
        { id: 1001, img: require('~/assets/img/img3614.jpg') },
        { id: 1002, img: require('~/assets/img/img2731.jpg') },
        { id: 1003, img: require('~/assets/img/img3668.jpg') },
        { id: 1004, img: require('~/assets/img/img3809.jpg') }
      ]

      // items: [
      //   {
      //     id: 1001,
      //     img: require('~/assets/img/img3614.jpg'),
      //     title: 'Bay Cruse  ',
      //     subTitle: 'Discover the most amazing spot around the japan',
      //     price: 800,
      //     link: 'explore Now',
      //     to: '/account/registration',
      //     date: '2019-01-01',
      //     featured: 100,
      //     selling: 100,
      //     inventory: 10
      //   },
      //   {
      //     id: 1002,
      //     img: require('~/assets/img/img2731.jpg'),
      //     title: 'safety simulator',
      //     subTitle: 'Get inspired by the buzz of the Amusement ',
      //     price: 0,
      //     link: 'explore Now',
      //     to: '/contact/countactUs',
      //     date: '2019-01-02',
      //     featured: 20,
      //     selling: 70,
      //     inventory: 10
      //   },
      //   {
      //     id: 1003,
      //     img: require('~/assets/img/img3668.jpg'),
      //     title: 'hotalna',
      //     subTitle: 'River cruise on a futuristic design ship',
      //     price: 2000,
      //     link: 'return to home ',
      //     to: '/account/registration',
      //     date: '2019-01-03',
      //     featured: 90,
      //     selling: 20,
      //     inventory: 10
      //   },
      //   {
      //     id: 1004,
      //     img: require('~/assets/img/img3809.jpg'),
      //     title: 'fuji tv',
      //     subTitle: 'Amazing view from the observation deck',
      //     price: 1200,
      //     link: 'return to home ',
      //     to: '/account/registration',
      //     date: '2019-01-04',
      //     featured: 50,
      //     selling: 50,
      //     inventory: 10
      //   }
      // ]
    }
  },
  computed: {
    // ...mapState('products', {
    //   items: 'all'
    // }),
    ...mapState({ items: 'sleepProducts' }),
    ...mapState({ productsImgUrl: 'sleepProductsImgUrl' }),
    ...mapGetters({ getUrl: 'getProductsImgUrl' }),
    // sort
    sortedData() {
      if (this.sortType === 'Featured') {
        return this.items.slice(0).sort((a, b) => {
          return a.featured < b.featured ? 1 : a.featured > b.featured ? -1 : 0
        })
      }
      if (this.sortType === 'Best Selling') {
        return this.items.slice(0).sort((a, b) => {
          return a.selling < b.selling ? 1 : a.selling > b.selling ? -1 : 0
        })
      }
      if (this.selected === 'Date New to Old') {
        return this.items.slice(0).sort((a, b) => {
          return a.date < b.date ? -1 : a.date > b.date ? 1 : 0
        })
      }
      if (this.selected === 'Date Old to New') {
        return this.items.slice(0).sort((a, b) => {
          return a.date < b.date ? 1 : a.date > b.date ? -1 : 0
        })
      }
      if (this.selected === 'Price Height to Low') {
        return this.items.slice(0).sort((a, b) => {
          return a.price < b.price ? -1 : a.price > b.price ? 1 : 0
        })
      }
      if (this.selected === 'Price Low to height') {
        return this.items.slice(0).sort((a, b) => {
          return a.price < b.price ? 1 : a.price > b.price ? -1 : 0
        })
      }
      if (this.selected === 'Alphbetically, A-Z') {
        return this.items.slice(0).sort((a, b) => {
          const textA = a.title.toUpperCase()
          const textB = b.title.toUpperCase()
          return textA < textB ? -1 : textA > textB ? 1 : 0
        })
      }
      if (this.selected === 'Alphbetically, Z-A') {
        return this.items.slice(0).sort((a, b) => {
          const textA = a.title.toUpperCase()
          const textB = b.title.toUpperCase()
          return textA < textB ? 1 : textA > textB ? -1 : 0
        })
      }
      return this.items.slice(0).sort((a, b) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0
      })
    },
    // filter
    filterData() {
      if (this.filterType === this.filterPriceList[0].name) {
        return this.sortedData.slice(0).filter((data) => {
          return data.price >= 0
        })
      }
      if (this.filterType === this.filterPriceList[1].name) {
        return this.sortedData.slice(0).filter((data) => {
          return data.price === 0
        })
      }
      if (this.filterType === this.filterPriceList[2].name) {
        return this.sortedData.slice(0).filter((data) => {
          return data.price < 1000
        })
      }
      if (this.filterType === this.filterPriceList[3].name) {
        return this.sortedData.slice(0).filter((data) => {
          return data.price < 2000
        })
      }
      if (this.filterType === this.filterPriceList[4].name) {
        return this.sortedData.slice(0).filter((data) => {
          return data.price >= 2000
        })
      }
      return this.sortedData.slice(0).filter((data) => {
        return data.price >= 0
      })
    }
  },
  // created() {
  //   this.$store.dispach(GET_SLEEP_DATA)
  // },
  async mounted() {
    await this.$store.dispatch(GET_SLEEP_DATA)
    await this.$store.dispatch(SET_SLEEP_IMG_URL)
  },
  methods: {
    ...mapActions('cart', ['addProductToCartAction']),
    imgPass(imgName) {
      return require('~/assets/img/' + imgName)
    },
    // ~/assets/img/img3614.jpg

    // addProductToCart(item) {
    //   const product = {
    //     id: item.id,
    //     title: item.title,
    //     price: item.price,
    //     inventory: item.inventory
    //   }
    //   this.addProductToCartAction(product)
    // },
    // createTestData() {
    // alert('create test data')
    // this.$store.dispatch(SLEEP_DATA_CREATE, this.tests)
    // },

    onChange() {
      this.sortType = this.selected
      if (this.selected === 'Featured') {
        this.selectedItems = this.sortedItems = this.sortedItemsByFeaturedDown
      }
      if (this.selected === 'Best Selling') {
        this.selectedItems = this.sortedItems = this.sortedItemsBySallingDown
      }
      if (this.selected === 'Date New to Old') {
        this.selectedItems = this.sortedItems = this.sortedItemsByDateUP
      }
      if (this.selected === 'Date Old to New') {
        this.selectedItems = this.sortedItems = this.sortedItemsByDateDown
      }
      if (this.selected === 'Price Height to Low') {
        this.selectedItems = this.sortedItems = this.sortedItemsByPriceDown
      }
      if (this.selected === 'Price Low to height') {
        this.selectedItems = this.sortedItems = this.sortedItemsByPriceUP
      }
      if (this.selected === 'Alphbetically, A-Z') {
        this.selectedItems = this.sortedItems = this.sortedItemsByTitleAZ
      }
      if (this.selected === 'Alphbetically, Z-A') {
        this.selectedItems = this.sortedItems = this.sortedItemsByTitleZA
      }
    },
    onFilterItems() {
      this.isFilterItems = !this.isFilterItems
      this.isFilterPrice = false
    },
    onFilterPrice() {
      this.isFilterPrice = !this.isFilterPrice
      this.isFilterItems = false
    },
    onFilter(index, type) {
      if (type === 'items') {
        this.filterEnd = this.filterItemList[index].value
        this.filterType = 'All'
      }

      if (type === 'price') {
        this.filterType = this.filterPriceList[index].name
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-wrape {
  margin-top: $header-height;
  overflow: hidden;
  width: 100%;
}
img {
  width: 100%;
  height: auto;
}
.alternation-wrape {
  padding: 2rem;
}
//sort
.sort-wrape {
  width: 100%;
  height: 6rem;
  padding: 0 1.5rem;
  h4 {
    font-weight: 600;
  }
}
.left-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.right-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 992px) {
    justify-content: flex-end;
  }
}

.select-title {
  display: inline-block;
  margin-right: 0.5rem;
  font-weight: 300;
}
.select,
option {
  font-weight: 300;
}
.select-box {
  display: inline-block;
}
.select {
  display: block;
  color: $grey;
  font-size: $size-6;
  font-weight: $weight-normal;
  background-color: $white;
  border-radius: 3.2rem;
  max-width: 100%;
  width: 15rem;
  height: 2.6rem;
  padding-left: 0.5rem;
  border-style: solid;
  border-color: $grey;
  border-width: 1px;
  box-shadow: 1px $grey;
  outline: 0;
  &:hover,
  &:active,
  &:focus {
    border-color: $grey;
    border-style: solid;
    border-color: $grey-darker;
    border-width: 1px;
    box-shadow: 1px $black;
  }
}
//filter
.filter-wrape {
  position: relative;
  width: 100%;
  padding: 2rem 1.5rem;
  div.h7 {
    font-weight: 300;
  }
}
i {
  margin-left: 0.2rem;
  color: $grey;
  cursor: pointer;
}
.filter-type {
  margin-left: 1rem;
}
.filter-select-group {
  position: relative;
  margin-top: 0.5rem;
  @media (min-width: 992px) {
    position: absolute;
    margin-top: 0;
    top: 8rem;
    left: 1.5rem;
  }
}
.filter-select {
  cursor: pointer;
  text-decoration: underline;
  color: $grey;
}
//items
.altright {
  margin-top: 2rem;
  @media (min-width: 992px) {
    margin-top: 10rem;
  }
}
</style>
