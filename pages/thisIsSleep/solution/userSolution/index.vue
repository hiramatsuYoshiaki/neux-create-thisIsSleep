<template lang="pug">
    div.main-wrape
        div.container-fluid
            div.row
                div.solution-content
                    //- div(@click="buyItem(images[0].id)") {{ this.images[0]}}
                    //- img(:src="images[0].bgimg")
                    //- div.img(:style="{ background: `center / cover no-repeat  url(${this.images[0].bgimg})` }" @click="buyItem(images[0].id)")
                    //- div {{this.images[0].id}}
                    //- div imageUrl {{getUrl(this.images[0].id)}}
                    //- div {{sleepProductsImgUrl}}
                    //- div.img(:style="{ background: `center / cover no-repeat  url(${getUrl(this.images[0].id)})` }" @click="buyItem(images[0].id)")

                    //- br
                    //- div {{sleepSolutions}}
                    //- br
                    //- div user Solution
                    //- div {{userSolution}}
                    //- br
                    //- div {{items}}
                    div.solutionFigure
                        div.figureItem-base
                            div.base-title
                                h5.title Your Solution
                                h5.title Destination
                                div.h7.sub-title Recomend Tour
                                div.h7.sub-title for {{ loginUser }}

                        div.solutionFigure-deg
                            div.figure-element.figure-element-deg0
                                div.figure-inner
                                    div.div.figureItem.deg0(:style="{ background: `center / cover no-repeat  url(${getUrl(this.images[0].id)})` }" @click="buyItem(images[0].id)" )
                            div.figure-element.figure-element-deg120
                                div.figure-inner
                                    div.div.figureItem.deg240(:style="{ background: `center / cover no-repeat  url(${getUrl(this.images[1].id)})` }" @click="buyItem(images[1].id)")
                            div.figure-element.figure-element-deg240
                                div.figure-inner
                                    div.div.figureItem.deg120(:style="{ background: `center / cover no-repeat  url(${getUrl(this.images[2].id)})` }" @click="buyItem(images[2].id)")

        div.container-fluid(v-show="isShowLoading")
            div.row
                div.solution-content
                    div.solutionFigure
                      div.figureItem-loading
                          <div class="svg-wrapper">
                            <svg height="84" width="84" xmlns="http://www.w3.org/2000/svg">
                              <circle class="shape" cx="42" cy="42" r="40"/>
                            </svg>
                          </div>
                          <h4>LOADING....</h4>

</template>
<script>
import firebase from '@/plugins/firebase'
import { mapState, mapGetters } from 'vuex'
import {
  SLEEP_GET_SOLUTION,
  GET_SLEEP_DATA,
  SET_SLEEP_IMG_URL
} from '~/store/actionTypes'
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
          no: 1,
          // bgimg: require('~/assets/img/img1578.jpg'),
          id: 0
        },
        {
          no: 2,
          // bgimg: require('~/assets/img/img2722.jpg'),
          id: 0
        },
        {
          no: 3,
          // bgimg: require('~/assets/img/img3809.jpg'),
          id: 0
        }
      ],
      solProducts: [],
      isShowLoading: true,
      loginUid: null,
      loginUser: null,
      logoutUid: 'guestUid',
      isAnser: false,
      userSolution: null
    }
  },
  computed: {
    // ...mapState(['user']),
    ...mapState(['sleepSolutions']),
    ...mapState({ items: 'sleepProducts' }),
    ...mapGetters({ getUrl: 'getProductsImgUrl' }),

    // ...mapState('solutions', ['solutions'])
    ...mapState(['sleepProductsImgUrl'])
  },
  async mounted() {
    // console.log('mounted chek user----------------')
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loginUid = user.uid
        this.loginUser = user.displayName
      } else {
        this.loginUid = this.logoutUid
        this.loginUser = 'Guest User'
      }
    })
    await this.$store.dispatch(SET_SLEEP_IMG_URL)
    await this.$store.dispatch(SLEEP_GET_SOLUTION)
    await this.$store.dispatch(GET_SLEEP_DATA)
    // console.log('loginUid: ' + this.loginUid)
    // if (this.loginUid === this.logoutUid) {
    //   this.$router.push('/thisIsSleep/solution/question/1')

    // } else {
    this.isAnser = false
    this.sleepSolutions.forEach((solution) => {
      if (solution.uid === this.loginUid) {
        this.isAnser = true
        this.userSolution = solution
        // console.log(solution)
      }
    })
    if (this.isAnser) {
      this.setAnser()
    } else {
      this.$router.push('/thisIsSleep/solution/question/1')
    }
    // }
    this.init()
  },
  methods: {
    init() {
      setTimeout(() => {
        this.isShowLoading = false
      }, 3000)
    },
    setAnser() {
      if (this.userSolution.answers[0].mark === 'A') {
        this.images[0].id = 1002
        this.solProducts.push({ pid: 1002 })
      } else {
        this.images[0].id = 1001
        this.solProducts.push({ pid: 1001 })
      }
      if (this.userSolution.answers[1].mark === 'A') {
        this.images[1].id = 1003
        this.solProducts.push({ pid: 1003 })
      } else {
        this.images[1].id = 1004
        this.solProducts.push({ pid: 1004 })
      }
      if (this.userSolution.answers[1].mark === 'A') {
        this.images[2].id = 1004
        this.solProducts.push({ pid: 1004 })
      } else if (this.userSolution.answers[1].mark === 'B') {
        this.images[2].id = 1004
        this.solProducts.push({ pid: 1004 })
      } else {
        this.images[2].id = 1004
        this.solProducts.push({ pid: 1004 })
      }
      this.$store.commit('solutions/setSolProducts', this.solProducts)
    },
    // setSolProducts() {
    //   this.solProducts = []
    //   if (this.sleepSolutions.answers[0].mark === 'A') {
    //     // alert(this.sleepSolutions.answers[0].mark)
    //     this.images[0].id = 1002
    //     this.solProducts.push({ pid: 1002 })
    //   } else {
    //     // alert(this.sleepSolutions.answers[0].mark)
    //     this.images[0].id = 1001
    //     this.solProducts.push({ pid: 1001 })
    //   }

    //   if (this.sleepSolutions.answers[1].mark === 'A') {
    //     // alert(this.sleepSolutions.answers[1].mark)
    //     this.images[1].id = 1003
    //     this.solProducts.push({ pid: 1003 })
    //   } else {
    //     // alert(this.sleepSolutions.answers[1].mark)
    //     this.images[1].id = 1004
    //     this.solProducts.push({ pid: 1004 })
    //   }

    //   if (this.sleepSolutions.answers[1].mark === 'A') {
    //     // alert(this.sleepSolutions.answers[1].mark)
    //     this.images[2].id = 1004
    //     this.solProducts.push({ pid: 1004 })
    //   } else if (this.sleepSolutions.answers[1].mark === 'B') {
    //     // alert(this.sleepSolutions.answers[1].mark)
    //     this.images[2].id = 1004
    //     this.solProducts.push({ pid: 1004 })
    //   } else {
    //     // alert(this.sleepSolutions.answers[1].mark)
    //     this.images[2].id = 1004
    //     this.solProducts.push({ pid: 1004 })
    //   }
    //   //   if (this.sleepSolutions.answers[1].mark === 'A') {
    //   //     // alert(this.sleepSolutions.answers[1].mark)
    //   //     this.images[3].id = 1004
    //   //   } else if (this.sleepSolutions.answers[1].mark === 'B') {
    //   //     // alert(this.sleepSolutions.answers[1].mark)
    //   //     this.images[3].id = 1004
    //   //   } else if (this.sleepSolutions.answers[1].mark === 'C') {
    //   //     // alert(this.sleepSolutions.answers[1].mark)
    //   //     this.images[3].id = 1004
    //   //   } else {
    //   //     // alert(this.sleepSolutions.answers[1].mark)
    //   //     this.images[3].id = 1004
    //   //   }
    //   this.$store.commit('solutions/setSolProducts', this.solProducts)
    // },
    buyItem(itemIndex) {
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
.img {
  width: 640px;
  height: 400px;
}
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
// loading animation
.figureItem-loading {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // border: 1px solid green;
}

.svg-wrapper {
  animation: spin 2.5s linear infinite;
  height: 84px;
  width: 84px;
}

.shape {
  animation: spinner 2.25s linear infinite;
  fill: transparent;
  // stroke: #4e52c3;
  stroke: $grey;
  stroke-dasharray: 100 260;
  stroke-dashoffset: 0;
  stroke-width: 3px;
}

h4 {
  // color: #333;
  color: $grey;
  font-size: 1.5rem;
  font-family: monospace;
  margin-top: 2rem;
  text-transform: uppercase;
}

@keyframes spinner {
  0% {
    stroke-dasharray: 0 260;
  }

  50% {
    stroke-dasharray: 260 260;
    stroke-dashoffset: 0;
  }

  100% {
    stroke-dasharray: 0 260;
    stroke-dashoffset: -250;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(720deg);
  }
}
</style>
