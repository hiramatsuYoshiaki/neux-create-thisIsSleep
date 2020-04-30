<template lang="pug">
    div.main-wrape
        div.container-fluid
            div.row
                canvas(id="canvas" ref="refs_canvas")
                div.sol-content
                    div.sol-content-wrape
                        div.title
                          div
                            transition(name="fadeInFromRight")
                              h1(v-if="isShowTitle1 && isShowSolution1") Three Steps
                          div
                            transition(name="fadeInFromRight")
                              h1(v-if="isShowTitle2  && isShowSolution1") for your
                          div
                            transition(name="fadeInFromRight")
                              h1(v-if="isShowTitle3  && isShowSolution1") gole
                        div.title
                          div
                            transition(name="fadeInFromRight")
                              h4(v-if="isShowEndTitle ") Let's take a look at
                          div
                            transition(name="fadeInFromRight")
                              h4(v-if="isShowEndTitle ") you overall sleep
                          div
                            transition(name="fadeInFromRight")
                              h4(v-if="isShowEndTitle ") health
                        div.sub-title
                          div
                            transition(name="fadeInFromRight")
                              h5(v-if="isShowTitle4 && isShowSolution2") We help you build yuer travel plans solution, suited to your specific needs.
                        div.link-button
                          div
                            transition(name="fadeInFromRight")
                              button(v-if="isShowTitle5 && isShowSolution3").component--btn.create-button.your-solution
                                  //- nuxt-link(:to="'/thisIsSleep/solution/question/' + question")
                                  span(@click="clinkQuestion('solution')") Your Solution
                          div
                            transition(name="fadeInFromRight")
                              button(v-if="isShowTitle5 && isShowSolution3").component--btn.create-button.solution-create
                                  //- nuxt-link(:to="'/thisIsSleep/solution/question/' + question")
                                  span(@click="clinkQuestion('question')") Solution Create
</template>
<script>
import { mapState } from 'vuex'
import buttonLinkCustomComponent from '~/components/button/buttonLinkCustomComponent.vue'
export default {
  layout: 'layout2Parts',
  components: {
    buttonLinkCustomComponent
  },
  data() {
    return {
      canvas: null,
      context: null,
      unit: 100,
      height: 0,
      width: 0,
      xAxis: 0,
      yAxis: 0,
      xAxisVer: 0,
      yAxisVer: 0,
      drawHor: {
        seconds: 0,
        t: 0
      },
      drawVer: {
        seconds: 0,
        t: 0
      },
      reqAnimation: null,
      innerWidth: 0,
      innerHeight: 0,
      bgImg: require('~/assets/img/img3809.jpg'), // fuji tv
      // bgImg: require('~/assets/img/img2722.jpg'), // fcv
      // bgImg: require('~/assets/img/img2731.jpg'), // safty
      loadImag: null,
      circleRectX: 20,
      circleRotetion: 0,
      question: 1,
      circleCenterX: 0,
      circleCenterY: 0,
      // transition
      isShowSolutionVer1: true,
      isShowSolutionVer2: true,
      isShowSolution1: true,
      isShowSolution2: true,
      isShowSolution3: true,
      isShowSolution4: true,
      isShowSolution5: true,
      isShowCanvasVer1: false,
      isShowCanvasVer2: false,
      isShowTitle1: false,
      isShowTitle2: false,
      isShowTitle3: false,
      isShowTitle4: false,
      isShowTitle5: false,
      alpha1: 0,
      alpha2: 0,
      loopCnt: 0,
      isShowEndTitle: false,
      isShowMoveStart: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    const img = new Image()
    img.src = this.bgImg
    img.onload = () => {
      this.loadImg = img
      this.canvas = this.$refs.refs_canvas
      this.context = this.canvas.getContext('2d')
      this.handleResize()
      this.init()
      this.loop()
    }
  },
  destroyed() {
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    clinkQuestion(param) {
      setTimeout(() => {
        this.isShowSolution5 = false
      }, 250)
      setTimeout(() => {
        this.isShowSolution4 = false
      }, 500)
      setTimeout(() => {
        this.isShowSolution3 = false
      }, 750)
      setTimeout(() => {
        this.isShowSolution2 = false
      }, 1000)
      setTimeout(() => {
        this.isShowSolution1 = false
      }, 1250)
      setTimeout(() => {
        this.isShowSolutionVer2 = false // canvas ｓ字ウェーブ
      }, 1300)
      setTimeout(() => {
        this.isShowSolutionVer1 = false // canvas ｓ字ウェーブ
      }, 2300)
      // if (param === !'solution') {
      //   setTimeout(() => {
      //     this.isShowEndTitle = true
      //   }, 2300)
      // }
      // if (param === !'solution') {
      setTimeout(() => {
        this.isShowEndTitle = true
      }, 2300)
      // }
      setTimeout(() => {
        this.isShowMoveStart = true
      }, 4800)
      // if (param === !'solution') {
      setTimeout(() => {
        this.isShowEndTitle = false
      }, 8800)
      // }
      // - nuxt-link(:to="'/thisIsSleep/solution/question/' + question")
      // this.isShowCanvasVer1 = this.isShowCanvasVer2 = this.isShowTitle1 = this.isShowTitle2 = this.isShowTitle3 = this.isShowTitle4 = this.isShowTitle5 = false
      setTimeout(() => {
        if (!this.user.email) {
          this.$router.push({
            path: '/account/login'
          })
        } else if (param === 'solution') {
          this.$router.push({
            path: '/thisIsSleep/solution/userSolution'
          })
        } else {
          // store new solution create
          this.$router.push({
            path: `/thisIsSleep/solution/question/${this.question}`
          })
        }
      }, 9000)
    },
    handleResize() {
      this.canvas.width = this.width = this.innerWidth = window.innerWidth
      this.canvas.height = this.height = this.innerHeight = window.innerHeight
      this.init()
    },

    drawWaveHor(color, alpha, zoom, delay) {
      this.context.fillStyle = color
      this.context.globalAlpha = alpha
      // パスの太さ
      this.context.lineWidth = 2
      this.context.strokeStyle = color
      // パスの開始
      this.context.beginPath()
      // 波のパスを描く
      // this.drawSineHor(this.drawHor.t / 3, zoom, delay)
      this.drawSineHor(this.drawHor.t / 2, zoom, delay)
      // パスをCanvasの右下へ
      // this.context.lineTo(this.width + 10, this.height)
      // パスをCanvasの左下へ
      // this.context.lineTo(0, this.height)
      // パスを閉じる
      // this.context.closePath()
      // 塗りつぶす
      // this.context.fill()
      // 線を描画
      this.context.stroke()
      // this.context.rotate((Math.PI / 180) * -3)
      // this.context.clip()
    },
    drawWaveVer(color, alpha, zoom, delay) {
      this.context.fillStyle = color
      this.context.globalAlpha = alpha
      // パスの太さ
      this.context.lineWidth = 150
      // this.context.lineWidth = 10
      this.context.strokeStyle = color
      // パスの開始
      this.context.beginPath()
      // 波のパスを描く
      this.drawSineVer(this.drawVer.t / 0.5, zoom, delay)

      // パスをCanvasの右下へ
      // this.context.lineTo(this.width + 10, this.height)
      // パスをCanvasの左下へ
      // this.context.lineTo(0, this.height)
      // パスを閉じる
      // this.context.closePath()
      // 塗りつぶす
      // this.context.fill()
      // 線を描画
      this.context.stroke()
      // this.context.rotate((Math.PI / 180) * -3)
      // this.context.clip()
    },
    drawSineHor(t, zoom, delay) {
      // 横の位置(時間)
      // const x = t
      // 縦の位置 zoom:3
      // const y = Math.sin(x) / zoom
      // スタート位置にパスを置く moveTo(x,y)
      // unit:100 this.xAxis: Math.floor(this.height / 2)  this.yAxis: 0
      // this.context.moveTo(this.yAxis - 50, this.unit * y + this.xAxis)
      this.context.moveTo(this.yAxis, this.xAxis)
      // 波のパスをパスをCanvas描く
      for (let i = this.yAxis; i <= this.width + 50; i += 10) {
        // 波の長さ
        const x = t + (-this.yAxis + i) / this.unit / zoom
        // 波の高さ
        const y = Math.sin(x - delay) / 50
        this.context.lineTo(i, this.unit * y + this.xAxis)
      }
    },

    drawSineVer(t, zoom, delay) {
      // 横の位置(時間)
      const x = t // 0.009
      // 縦の位置 zoom:3
      const y = Math.sin(x) / zoom
      // スタート位置にパスを置く moveTo(x,y)
      this.context.moveTo(
        this.unit * y + this.xAxisVer + 0,
        this.yAxisVer - 500
      )
      // 波のパスをパスをCanvas描く
      for (let i = this.yAxisVer - 500; i <= this.height + 500; i += 10) {
        // 波の長さ
        const x = t + (-this.yAxisVer + i) / this.unit / zoom
        // 波の高さ カーブ
        // const y = Math.sin(x - delay) / 3 //カーブ小さい
        const y = Math.sin(x - delay) / 0.3 // カーブ大きい
        // パスをCanvas描く
        this.context.lineTo(this.unit * y + this.xAxisVer, i)
      }
    },
    drawRectYellowBlack(
      positionX, // 100
      positionY, // 100
      radiusStep, // 30
      translateXSpet, // 10
      numberOfRect, // 20
      rectXStep, // 2
      colorStringOne, // #f7bf3d
      colorStringTwo // #0d2636
    ) {
      this.circleRotetion++
      let radius = 0
      const rectSize = 2
      const rectX = this.circleRectX
      this.context.translate(positionX, this.height / 2)
      this.context.rotate(((Math.PI / 180) * this.circleRotetion) / 4)
      this.context.translate(-positionX, -this.height / 2)
      for (let i = 0; i <= numberOfRect; i++) {
        // setTimeout(() => {
        this.context.beginPath()
        this.context.save()
        this.context.translate(positionX, positionY)
        this.context.rotate((Math.PI / 180) * radius)
        //   if (i % 2 === 0) {
        this.context.fillStyle = colorStringOne
        //   }else {
        //       this.context.fillStyle = colorStringTwo
        //   }
        //   if (i % 2 === 0) {
        //     this.context.fillStyle = colorStringOne
        //   }
        // ctx.fillStyle = "rgba("+20+i*20+","+20+i*10+",100,1)";
        //   this.context.fillRect(rectX, 0, rectSize, rectSize)
        this.context.arc(rectX, 0, rectSize / 2, 0, 2 * Math.PI)
        // this.context.arc(20, 0, rectSize / 2, 0, 2 * Math.PI)
        this.context.fill()
        //   this.context.stroke()
        this.context.restore()

        radius += radiusStep
        // rectSize += 1.8;
        // positionX += translateXSpet;
        // rectX += rectXStep;
        // }, 200 * i)
      }
    },

    loop() {
      this.maskWave()
      this.reqAnimation = requestAnimationFrame(this.loop)
      setTimeout(() => {
        cancelAnimationFrame(this.reqAnimation)
      }, 50000)
      setTimeout(() => {
        this.isShowCanvasVer1 = true
      }, 1000)
      setTimeout(() => {
        this.isShowCanvasVer2 = true
      }, 2000)
      setTimeout(() => {
        this.isShowTitle1 = true
      }, 2250)
      setTimeout(() => {
        this.isShowTitle2 = true
      }, 2500)
      setTimeout(() => {
        this.isShowTitle3 = true
      }, 2750)
      setTimeout(() => {
        this.isShowTitle4 = true
      }, 3000)
      setTimeout(() => {
        this.isShowTitle5 = true
      }, 3250)
    },
    maskWave() {
      this.loopCnt++
      this.context.clearRect(0, 0, this.width, this.height)
      if (this.canvas.width > 976) {
        this.context.drawImage(this.loadImg, 0, 0, this.width, this.height)
      }

      // mask
      this.context.save()
      // draw wave
      // ｓ字ウェーブ
      this.context.rotate((Math.PI / 180) * 8)
      this.context.globalCompositeOperation = 'destination-in'
      if (this.canvas.width > 976) {
        if (this.isShowCanvasVer1 && this.isShowSolutionVer1) {
          this.drawWaveVer('#c5ced3', 0.5, 3, 0)
        } else if (!this.isShowCanvasVer1 && this.isShowSolutionVer1) {
          if (this.alpha1 >= 0.5) {
            this.drawWaveVer('#c5ced3', 0.5, 3, 0)
          } else {
            this.alpha1 = this.alpha1 + 0.008
            this.drawWaveVer('#c5ced3', this.alpha1, 3, 0)
          }
        } else if (this.isShowCanvasVer1 && !this.isShowSolutionVer1) {
          if (this.alpha1 <= 0) {
            this.drawWaveVer('#c5ced3', 0, 3, 0)
          } else {
            this.alpha1 = this.alpha1 - 0.008
            this.drawWaveVer('#c5ced3', this.alpha1, 3, 0)
          }
        } else {
          this.drawWaveVer('#c5ced3', 0, 3, 0)
        }
      }

      // ｓ字ウェーブ
      this.context.rotate((Math.PI / 180) * -16)
      this.context.globalCompositeOperation = 'destination-over'
      if (this.isShowCanvasVer2 && this.isShowSolutionVer2) {
        this.drawWaveVer('#c5ced3', 1, -3, 0)
      } else if (this.isShowCanvasVer1 && this.isShowSolutionVer2) {
        if (this.alpha2 >= 1) {
          this.drawWaveVer('#c5ced3', 1, -3, 0)
        } else {
          this.alpha2 = this.alpha2 + 0.016
          this.drawWaveVer('#c5ced3', this.alpha2, -3, 0)
        }
      } else if (this.isShowCanvasVer2 && !this.isShowSolutionVer2) {
        if (this.alpha2 <= 0) {
          this.drawWaveVer('#c5ced3', 0, -3, 0)
        } else {
          this.alpha2 = this.alpha2 - 0.016
          this.drawWaveVer('#c5ced3', this.alpha2, -3, 0)
        }
      } else {
        this.drawWaveVer('#c5ced3', 0, -3, 0)
      }

      this.context.rotate((Math.PI / 180) * 8)

      // 水平ウェーブ
      this.context.globalCompositeOperation = 'source-over'
      this.drawWaveHor('#b2b6bb', 1, 1, 0)

      this.drawVer.seconds = this.drawVer.seconds + 0.0003 // 遅い
      // this.draw.seconds = this.draw.seconds + 0.001 // 速い
      this.drawVer.t = this.drawVer.seconds * Math.PI

      // this.drawHor.seconds = this.draw.seconds + 0.0003 // 遅い

      this.drawHor.seconds = this.drawHor.seconds + 0.09 // 速い
      this.drawHor.t = this.drawHor.seconds * Math.PI
      // center circle
      this.context.globalCompositeOperation = 'source-over'
      this.drawRectYellowBlack(
        // this.width / 2,
        // this.height / 2,
        this.circleCenterX,
        this.circleCenterY,
        10,
        10,
        36,
        2,
        '#444',
        '#0d2636'
      )
      // wave mome left
      if (this.yAxis > 0 && this.isShowMoveStart) {
        this.yAxis = this.yAxis - 20
        this.circleCenterX = this.circleCenterX - 20
      }
      this.context.restore()
    },

    init() {
      this.canvas.width = this.innerWidth
      this.canvas.height = this.innerHeight
      this.width = this.canvas.width
      this.height = this.canvas.height
      // cricle
      this.circleRectX = 20
      this.circleCenterX = this.width / 2
      this.circleCenterY = this.height / 2
      // horizon
      this.xAxis = Math.floor(this.height / 2)
      // this.yAxis = 0
      this.yAxis = this.width / 2 + this.circleRectX
      // verticle
      this.xAxisVer = Math.floor(this.width / 1.5)
      this.yAxisVer = 0
      // this.draws()
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
// .container,
// .container-fluid {
//   width: 100%;
//   margin-right: auto;
//   margin-left: auto;
//   padding-left: 15px;
//   padding-right: 15px;
//   border: 1px solid green;
// }
// .row {
//   margin-left: -15px;
//   margin-right: -15px;
//   display: flex;
//   justify-content: flex-start;
//   flex-direction: row;
//   flex-wrap: wrap;
//   border: 1px solid blue;
// }
#canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgb(205, 211, 216);
  overflow: hidden;
}
.mainLayout {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: 992px) {
    flex-direction: row;
  }
}
.sol-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  z-index: 10;
  overflow: hidden;
}

.sol-content-wrape {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 60%;
  margin: 0 2.5rem;
  @media (min-width: 976px) {
    margin: 0 15rem;
    width: 30%;
  }
}
.title {
  h1 {
    font-size: 5rem;
    line-height: 1;
  }
  margin-bottom: 3rem;
}
.sub-title {
  margin-bottom: 1rem;
}
.link-button {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-direction: column;
  @media (min-width: 976px) {
    flex-direction: row;
  }
}
.create-button {
  color: $white;
  width: 10rem;
}
.solution-create {
  background-color: $black-ter;
  margin-bottom: 1rem;
  margin-right: 1rem;
}
.your-solution {
  background-color: $your-solution;
  margin-bottom: 1rem;
  margin-right: 1rem;
}
</style>
