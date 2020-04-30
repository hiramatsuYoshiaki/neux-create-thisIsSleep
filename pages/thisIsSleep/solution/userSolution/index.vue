<template lang="pug">
    div.main-wrape
        div.container-fluid
            div.row
                div.solution-content
                    //- div {{sleepSolutions}}
                    //- div {{items}}
                    //- div(v-for="(item, itemsIndex) in items" :key="item.id")
                    //-     div
                    //-         span  {{item.id}}
                    //-         span  {{item.imgName}}
                    //-         span  {{item.title}}
                    //-     div.test
                    //-         img(:src="getUrl(item.id)" alt="product image" )

                    div.solutionFigure
                        div.figureItem-base
                            div.base-title
                                h5.title Your Solution
                                h5.title Destination
                                div.h7.sub-title Recomend Tour
                        div.solutionFigure-deg
                            div.figure-element.figure-element-deg0
                                div.figure-inner
                                    div.div.figureItem.deg0(:style="{ background: `center / cover no-repeat  url(${getUrl(this.images[0].id)})` }" @click="buyItem(images[0].id)")
                            div.figure-element.figure-element-deg120
                                div.figure-inner
                                    div.div.figureItem.deg240(:style="{ background: `center / cover no-repeat  url(${getUrl(this.images[1].id)})` }" @click="buyItem(images[0].id)")
                            div.figure-element.figure-element-deg240
                                div.figure-inner
                                    div.div.figureItem.deg120(:style="{ background: `center / cover no-repeat  url(${getUrl(this.images[2].id)})` }" @click="buyItem(images[0].id)")
                            //- div.figure-element.figure-element-deg240
                            //-     div.figure-inner
                            //-         div.div.figureItem.deg120(:style="{ background: `center / cover no-repeat  url(${images[2].bgimg})` }" @click="buyItem('3')")

</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { SLEEP_GET_SOLUTION, GET_SLEEP_DATA } from '~/store/actionTypes'
// import figureSolutionComponent from '~/components/figure/figureSolutionComponent.vue'
// import levelSolutionComponent from '~/components/level/levelSolutionComponent.vue'
export default {
  layout: 'layout2Parts',
  components: {
    //   levelSolutionComponent
    // figureSolutionComponent
  },
  data() {
    return {
      images: [
        {
          bgimg: require('~/assets/img/img1578.jpg'),
          id: 0
        },
        {
          bgimg: require('~/assets/img/img2722.jpg'),
          id: 0
        },
        {
          bgimg: require('~/assets/img/img3809.jpg'),
          id: 0
        }
      ],
      solProducts: []
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['sleepSolutions']),
    ...mapState({ items: 'sleepProducts' }),
    ...mapGetters({ getUrl: 'getProductsImgUrl' })
    // ...mapState('solutions', ['solutions'])
  },
  async mounted() {
    if (this.user) {
      await this.$store.dispatch(SLEEP_GET_SOLUTION, this.user.uid)
      await this.$store.dispatch(GET_SLEEP_DATA)
      this.setSolProducts()
    } else {
      this.$router.push('/thisIsSleep/account/logout')
    }
  },
  //   async mounted() {
  //     // window size
  //     window.addEventListener('resize', this.handleResize)
  //     this.$store.commit('clearMessage')
  //     console.log('mount sleep add solution')
  //     console.log(this.user)
  //     if (this.user && this.user.email === this.solutions.user) {
  //       console.log('user.email: ' + this.user.email)
  //       console.log('solution.user: ' + this.solutions.user)
  //       await this.$store.dispatch(SLEEP_ADD_SOLUTION, this.solutions)
  //       this.message = 'ソリューションを作成しています。'
  //     } else {
  //       this.message = 'ログインしてください。'
  //       this.$router.push('/thisIsSleep/account/logout')
  //     }
  //     await this.$store.dispatch(SLEEP_GET_SOLUTION, this.user.uid)
  //     // canvas
  //     // const img = new Image()
  //     // img.src = this.bgImg
  //     // img.onload = () => {
  //     // this.loadImg = img
  //     this.canvas = this.$refs.refs_canvas
  //     this.context = this.canvas.getContext('2d')
  //     this.handleResize()
  //     this.init()
  //     this.waveCircle()
  //     this.loop()

  //     // }
  //   },

  methods: {
    setSolProducts() {
      this.solProducts = []
      if (this.sleepSolutions.answers[0].mark === 'A') {
        // alert(this.sleepSolutions.answers[0].mark)
        this.images[0].id = 1002
        this.solProducts.push({ pid: 1002 })
      } else {
        // alert(this.sleepSolutions.answers[0].mark)
        this.images[0].id = 1001
        this.solProducts.push({ pid: 1001 })
      }
      if (this.sleepSolutions.answers[1].mark === 'A') {
        // alert(this.sleepSolutions.answers[1].mark)
        this.images[1].id = 1003
        this.solProducts.push({ pid: 1003 })
      } else {
        // alert(this.sleepSolutions.answers[1].mark)
        this.images[1].id = 1004
        this.solProducts.push({ pid: 1004 })
      }
      if (this.sleepSolutions.answers[1].mark === 'A') {
        // alert(this.sleepSolutions.answers[1].mark)
        this.images[2].id = 1004
        this.solProducts.push({ pid: 1004 })
      } else if (this.sleepSolutions.answers[1].mark === 'B') {
        // alert(this.sleepSolutions.answers[1].mark)
        this.images[2].id = 1004
        this.solProducts.push({ pid: 1004 })
      } else {
        // alert(this.sleepSolutions.answers[1].mark)
        this.images[2].id = 1004
        this.solProducts.push({ pid: 1004 })
      }
      //   if (this.sleepSolutions.answers[1].mark === 'A') {
      //     // alert(this.sleepSolutions.answers[1].mark)
      //     this.images[3].id = 1004
      //   } else if (this.sleepSolutions.answers[1].mark === 'B') {
      //     // alert(this.sleepSolutions.answers[1].mark)
      //     this.images[3].id = 1004
      //   } else if (this.sleepSolutions.answers[1].mark === 'C') {
      //     // alert(this.sleepSolutions.answers[1].mark)
      //     this.images[3].id = 1004
      //   } else {
      //     // alert(this.sleepSolutions.answers[1].mark)
      //     this.images[3].id = 1004
      //   }
      this.$store.commit('solutions/setSolProducts', this.solProducts)
    },
    buyItem(itemIndex) {
      console.log(itemIndex)
      alert(itemIndex)
      this.$router.push(`/thisIsSleep/solution/userSolution/${itemIndex}`)
    }
  }
}
</script>
<style lang="scss" scoped>
//45set items8
$deg0: 0deg;
$deg45: 45deg;
$deg90: 90deg;
$deg135: 135deg;
$deg180: 180deg;
$deg225: 225deg;
$deg270: 270deg;
$deg315: 315deg;
//120set 3items
$deg120: 120deg;
$deg240: 240deg;

// * {
//   border: 1px dotted grey;
// }

.solution-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: $header-height;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  overflow: hidden;
  background-color: rgb(205, 211, 216);
}

.solutionFigure {
  position: relative;
  width: 22rem;
  height: 22rem;
  @media (min-width: 425px) {
    width: 32rem;
    height: 32rem;
  }
  @media (min-width: 768px) {
    width: 50rem;
    height: 50rem;
  }
  @media (min-width: 976px) {
    width: 50rem;
    height: 50rem;
  }
  @media (min-width: 1200px) {
    width: 50rem;
    height: 50rem;
  }
  overflow: hidden;
}
.solutionFigure-deg {
  position: absolute;
  width: 100%;
  height: 100%;
}
.figureItem-base {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  height: 75%;
  //   background-color: whitesmoke;
  background-color: rgb(205, 211, 216);
  border: 4px solid $white;
  border-radius: 100%;
}
.base-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.figure-element {
  width: 30%;
  height: 30%;
  border-radius: 100%;
}
.figure-element-deg0 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.figure-element-deg120 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%) rotate($deg120);
}
.figure-element-deg240 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%) rotate($deg240);
}

.figure-inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.figureItem {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  position: absolute;
  margin-top: -110%;
  box-shadow: 0 20px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.deg0 {
  transform: rotate($deg0);
}
.item0 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-$deg0);
}
.deg120 {
  transform: rotate($deg120);
}
.item120 {
  //   background-color: lightskyblue;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-$deg120);
}
.deg240 {
  transform: rotate($deg240);
}
.item240 {
  //   background-color: limegreen;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-$deg240);
}
.test {
  img {
    width: 5rem;
    height: 3rem;
  }
}
</style>
