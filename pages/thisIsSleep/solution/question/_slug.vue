<template lang="pug">
    div.main-wrap
        div.container-fluid
            div.row
                canvas(id="canvas" ref="refs_canvas")

                div.ques-content(v-for="question in selectedPage()" :key="question.id")
                  div.container-question
                    div.row
                      div.ques-wrape
                          div.question
                              transition(name="fadeInFromRight")
                                div(v-if="isShowTitle1 && isShowQuestion1").pageId
                                    span.h7 {{quesId}}
                                    span.h7 /
                                    span.h7 {{totalQ}}
                              transition(name="fadeInFromRight")
                                h4(v-if="isShowTitle2 && isShowQuestion2").quesTitle {{question.ques}}
                              transition(name="fadeInFromRight")
                                div(v-if="isShowTitle3 && isShowQuestion3").doYouKnow
                                    div.doYouKnowCatchWrap
                                        div.doYouKnowCatch
                                        div.doYouKnowMark.h6 ?
                                    div.doYouKnowText Do you know?

                      div.ques-wrape
                          div.anser
                              div.anser-element(v-for="ans in question.ansr" )
                                transition(name="fadeInFromRight")
                                  div(v-if="isShowTitle4 && isShowQuestion4").anser-title-wrap(@click="nextPage()")
                                      div.anser-title
                                      div.anser-title-mark.h6 {{ans.mark}}
                                      //- <canvas width="90" height="90" style="position: absolute; top: 0px; left: 0px; width: 45px; height: 45px;"></canvas>
                                transition(name="fadeInFromRight")
                                  div(v-if="isShowTitle5 && isShowQuestion5").anser-items(@click="nextPage()")
                                      div.h6 {{ans.ans}}
                                      div.h7 {{ans.ansText}}

                  //- div.create
                      div(v-for="question in selectedPage()" :key="question.id")
                          h3 {{question.id}}
                          p {{question.ques}}
                          //- p {{question.ansr}}
                          div(v-for="(ans , ansIndex) in question.ansr" :key="ansIndex")
                                  p {{ans.mark}}
                                  p {{ans.ans}}
                                  p {{ans.ansText}}
                      //- p {{questions}}
                  //- div.create
                      //- button(@click="createQuestions()")
                      //-     h3  create questions

</template>
<script>
import { mapState } from 'vuex'
// import { SLEEP_QUESTIONS_CREATE, GET_QUESTION_DATA } from '~/store/actionTypes'
import { GET_QUESTION_DATA } from '~/store/actionTypes'
export default {
  layout: 'layout2Parts',
  data() {
    return {
      //   questions: [
      //     {
      //       id: 1,
      //       ques: 'Do you notice that you move around a lot when you sleep?',
      //       ansr: [
      //         { mark: 'A', ans: 'YES', ansText: 'I tend to move around a lot' },
      //         {
      //           mark: 'B',
      //           ans: 'NO',
      //           ansText: 'I useually waik to simmiler position'
      //         }
      //       ]
      //     },
      //     {
      //       id: 2,
      //       ques: 'Do you often get to hot during the night?',
      //       ansr: [
      //         {
      //           mark: 'A',
      //           ans: 'YES',
      //           ansText: 'I regulaly straggle to stay cool'
      //         },
      //         { mark: 'B', ans: 'NO', ansText: 'I never had issuse in heat' }
      //       ]
      //     }
      //   ]
      quesId: this.$route.params.slug,
      totalQ: 1,
      canvas: null,
      context: null,
      height: 0,
      width: 0,
      innerWidth: 0,
      innerHeight: 0,
      reqAnimation: null,
      drawHor: {
        seconds: 0,
        t: 0
      },
      xAxis: 0,
      yAxis: 0,
      unit: 100,
      circleRectX: 20,
      circleRotetion: 0,
      circleCenterX: 0,
      circleCenterY: 0,
      // transition

      isShowQuestion1: true,
      isShowQuestion2: true,
      isShowQuestion3: true,
      isShowQuestion4: true,
      isShowQuestion5: true,
      isShowTitle1: false,
      isShowTitle2: false,
      isShowTitle3: false,
      isShowTitle4: false,
      isShowTitle5: false
    }
  },
  computed: {
    ...mapState({ questions: 'sleepQuestions' }) // products
    // ...mapState('questions', { questions: 'questionsTest' }) // develop
  },
  async mounted() {
    // firebase
    await this.$store.dispatch(GET_QUESTION_DATA)
    // window size
    window.addEventListener('resize', this.handleResize)
    // canvas
    // const img = new Image()
    // img.src = this.bgImg
    // img.onload = () => {
    // this.loadImg = img
    this.canvas = this.$refs.refs_canvas
    this.context = this.canvas.getContext('2d')
    this.handleResize()
    this.init()
    this.loop()
    // }
  },
  destroyed() {
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    init() {
      this.canvas.width = this.innerWidth
      this.canvas.height = this.innerHeight
      this.width = this.canvas.width
      this.height = this.canvas.height
      // dot cricle----------------------
      this.circleRectX = 20
      // dot circle position
      // if (this.$route.params.slug === '1') {
      //   this.circleCenterX = this.width / 2
      //   this.circleCenterY = this.height / 2
      // } else {
      this.circleCenterX = -this.width
      this.circleCenterY = -this.height
      // }

      // horizon wave--------------------

      this.xAxis = Math.floor(this.height / 2)
      // this.xAxis = Math.floor(this.height / 2) + 20
      // if (this.$route.params.slug === '1') {
      //   this.yAxis = this.width / 2 + this.circleRectX // 水平ウェイブ開始位置
      // } else {
      this.yAxis = this.circleRectX - 100 // 水平ウェイブ開始位置
      // }
    },
    loop() {
      this.maskWave()
      this.reqAnimation = requestAnimationFrame(this.loop)
      setTimeout(() => {
        cancelAnimationFrame(this.reqAnimation)
      }, 50000)
      setTimeout(() => {
        this.isShowTitle1 = true
      }, 250)
      setTimeout(() => {
        this.isShowTitle2 = true
      }, 500)
      setTimeout(() => {
        this.isShowTitle3 = true
      }, 750)
      setTimeout(() => {
        this.isShowTitle4 = true
      }, 1000)
      setTimeout(() => {
        this.isShowTitle5 = true
      }, 1250)
    },
    maskWave() {
      this.context.clearRect(0, 0, this.width, this.height)
      this.context.save()

      // this.context.beginPath()
      // this.context.moveTo(50, 50)
      // this.context.lineTo(550, 400)
      // this.context.lineWidth = 10
      // this.context.strokeStyle = 'red'
      // this.context.stroke()

      // 水平ウェーブ
      this.context.globalCompositeOperation = 'source-over'
      // this.drawWaveHor('#b2b6bb', 1, 1, 0)
      this.drawWaveHor('#b2b6bb', 1, 1, 0)
      this.drawHor.seconds = this.drawHor.seconds + 0.05 // 速い
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
      // if (this.yAxis > 0 && this.$route.params.slug === '1') {
      //   this.yAxis = this.yAxis - 4
      //   this.circleCenterX = this.circleCenterX - 4
      // }

      this.context.restore()
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
        // const noiseNum = noise(i * 0.2, this._time + timeOffset) - 0.5;
        const y = Math.sin(x - delay) / 10
        this.context.lineTo(i, this.unit * y + this.xAxis)
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
    selectedPage() {
      const selectedQues = []
      let cnt = 0
      for (const ques in this.questions) {
        if (this.questions[ques].id === Number(this.$route.params.slug)) {
          selectedQues.push(this.questions[ques])
        }
        cnt++
      }
      this.totalQ = cnt
      return selectedQues
    },
    nextPage() {
      const addPage = Number(this.$route.params.slug) + 1
      setTimeout(() => {
        this.isShowQuestion5 = false
      }, 250)
      setTimeout(() => {
        this.isShowQuestion4 = false
      }, 500)
      setTimeout(() => {
        this.isShowQuestion3 = false
      }, 750)
      setTimeout(() => {
        this.isShowQuestion2 = false
      }, 1000)
      setTimeout(() => {
        this.isShowQuestion1 = false
      }, 1250)
      setTimeout(() => {
        if (addPage > this.totalQ) {
          this.$router.push('/thisIsSleep/solution/results')
        } else {
          this.$router.push(`/thisIsSleep/solution/question/${addPage}`)
        }
      }, 2000)
    }
    // initial data create firebase
    // createQuestions() {
    //   alert('create test data')
    //   this.$store.dispatch(SLEEP_QUESTIONS_CREATE, this.questions)
    // }
  }
}
</script>
<style lang="scss" scoped>
// * {
//   border: 1px dotted purple;
// }
.main-wrape {
  margin-top: $header-height;
  overflow: hidden;
  width: 100%;
}
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
.ques-content {
  // border: 5px solid purple;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: $header-height;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 10;
  overflow: hidden;
  //   @media (min-width: 992px) {
  //     justify-content: center;
  //     align-items: center;
  //     flex-direction: row;
  //   }
}
.container-question {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
}
// @media (min-width: 576px) {
//   .container-question {
//     max-width: 540px;
//     max-width: 100%;
//   }
// }
// @media (min-width: 768px) {
//   .container-question {
//     width: 720px;
//     max-width: 100%;
//   }
// }

@media (min-width: 992px) {
  .container-question {
    // width: 960px;
    width: 880px;
    max-width: 100%;
  }
}
@media (min-width: 1200px) {
  .container-question {
    // width: 1140px;
    width: 1100px;
    max-width: 100%;
  }
}
@media (min-width: 1400px) {
  .container-question {
    // width: 1140px;
    width: 1300px;
    max-width: 100%;
  }
}

.ques-wrape {
  // border: 1px solid green;
  width: 50%;
  // height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.anser {
  // border: 1px solid red;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 1rem 0 0;
  @media (min-width: 992px) {
    padding: 0;
  }
}
.question {
  // border: 1px solid blue;
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 1rem 0 1rem;
  @media (min-width: 992px) {
    padding: 0 10rem 0 0;
  }
  @media (min-width: 1200px) {
    padding: 0 13rem 0 0;
  }
  @media (min-width: 1400px) {
    padding: 0 16rem 0 0;
  }
  color: $grey-darker;
  h4 {
    font-weight: $weight-semibold;
    line-height: 1.2;
    margin-bottom: 1rem;
    padding-bottom: 2rem;
  }
  h6 {
    font-weight: $weight-light;
    margin-bottom: 1rem;
  }
  .h7 {
    font-weight: $weight-light;
    margin-right: 0.2rem;
  }
  .pageId {
    margin-bottom: 1rem;
  }
  .doYouKnow {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }
  .doYouKnowCatchWrap {
    position: relative;
  }
  .doYouKnowCatch {
    display: block;
    width: 2rem;
    height: 2rem;
    margin-right: 0.8rem;
    border: 1px solid $grey-darker;
    border-radius: 50%;
    background: $grey-darker;
    color: $white;
  }
  .doYouKnowMark {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-100%, -55%);
    color: $white;
  }
  .doYouKnowText {
    display: inline-block;
    width: 100%;
  }
}
.anser-element {
  color: $white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  margin-bottom: 1rem;

  .anser-title-wrap {
    position: relative;
    // border: 1px solid blue;
  }
  .anser-items {
    position: relative;
    // border: 1px solid green;
  }
  .anser-title {
    margin: 1rem;
    display: block;
    width: 3rem;
    height: 3rem;
    border: 2px solid $white;
    border-radius: 50%;
  }
  .anser-title-mark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
  }
  &:hover {
    color: $grey-darker;
    .anser-title {
      border: 2px solid $grey-darker;
    }
  }
}
</style>
