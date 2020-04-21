<template lang="pug">
    div.main-wrap
        div.container-fluid
            div.row
                canvas(id="canvas" ref="refsCanvas")
                //- canvas(id="canvas2" ref="refsCanvas2")
                div.ques-content(v-for="question in selectedPage()" :key="question.id")
                  div.container-question
                    div.row
                      div.ques-wrape
                          div.question
                            div.pageId
                              transition(name="fadeInFromRight")
                                div(v-show="isShowTitle1 && isShowQuestion1")
                                  span.h7 {{quesId}}
                                  span.h7 /
                                  span.h7 {{totalQ}}

                            h4.quesTitle
                                transition(name="fadeInFromRight")
                                  div(v-show="isShowTitle2 && isShowQuestion2") {{question.ques}}

                            div.doYouKnow
                                transition(name="fadeInFromRight")
                                  div(v-show="isShowTitle3 && isShowQuestion3")
                                    div.doYouKnowWrap
                                      div.doYouKnowCatchWrap
                                          div.doYouKnowCatch
                                          div.doYouKnowMark.h6 ?
                                      div.doYouKnowText Do you know?

                      div.ques-wrape
                          div.anser

                              div.anser-element(v-for="ans in question.ansr" )
                                  //- div(@mouseenter="mouseEnter(ans)" @mouseleave="mouseLeaf(ans)")
                                  transition(name="fadeInFromRight")
                                    div(v-show="isShowTitle4 && isShowQuestion4").anser-title-wrap
                                      div.anser-title-wrap(@click="nextPage()")
                                          div.anser-title-mark.h6 {{ans.mark}}
                                          div.anser-title
                                          div.canvas2-wrap
                                            canvas(id="canvas2" ref="refsCanvas2")
                                          //- canvas(id="canvas2" ref="refsCanvas2" )

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
      canvas2: [],
      context2: [],
      reqAnimation: null,
      height: 0,
      width: 0,
      innerWidth: 0,
      innerHeight: 0,
      pageQuestion: [],
      // canvas wave ----------------------------------------------
      // code pen url:https://codepen.io/waidhoferj/details/QWWjxgW
      colors: {
        accent: '#4dbaed',
        base: '#5c8abd',
        dark: '#504e4e'
      },
      // buildFrame: null,
      pointDx: 0,
      speed: 0,
      noise: null,
      iteration: 0,
      amplitude: 0,
      strands: [],
      //
      // option: []
      waveHeight: 100, // 波の高さ
      // -----------------------------------------------------------
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

      // circle
      // cordpen 波打つ円----------------------------------------------
      // https://codepen.io/sebavien/details/jAjKVE
      radius: 0,
      posX: 0,
      posY: 0,
      color: '#000',
      numberPoint: 0,
      rate: 0,
      pXArr: [],
      pYArr: [],
      pXUpArr: [],
      pYUpArr: [],
      pXDwArr: [],
      pYDwArr: [],
      pArr: [],
      rand: [],
      wavePoint: {
        x: 0,
        y: 0,
        ax: 0,
        ay: 0,
        vx: 0,
        vy: 0,
        tx: 0,
        ty: 0,
        spring: 0
      },
      timer: 0,

      // transition-------------------------------------------------
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
    this.canvas = this.$refs.refsCanvas
    this.context = this.canvas.getContext('2d')

    // cordpen 波打つ円
    // https://codepen.io/sebavien/details/jAjKVE
    for (const i in this.questions) {
      if (this.questions[i].id === Number(this.$route.params.slug)) {
        for (const idx in this.questions[i].ansr) {
          this.canvas2[idx] = this.$refs.refsCanvas2[idx]
          this.context2[idx] = this.canvas2[idx].getContext('2d')
          this.canvas2[idx].width = 80
          this.canvas2[idx].height = 80
        }
      }
    }

    // for (const i in this.pageQuestion.ansr) {
    //   console.log('for')
    //   console.log(i, this.pageQuestion.ansr[i].ansText)
    // }
    // for(let i = 0, i < this.question, i++){

    // }
    // this.question.forEach((value, index) => {
    //   console.log(index, value.ans)
    //   this.canvas2[index] = this.$refs.refsCanvas2[index]
    //   this.context2[index] = this.canvas2[index].getContext('2d')
    // })

    // canvas wave ----------------------------------------------
    // code pen url:https://codepen.io/waidhoferj/details/QWWjxgW
    // this.buildFrame = this.buildFrame.bind(this);
    this.pointDx = 3
    this.waveHeight = 40
    this.speed = 0.001
    // this.noise = new SimplexNoise();
    const SimplexNoise = require('simplex-noise')
    this.noise = new SimplexNoise()
    this.iteration = 0
    this.amplitude = 0
    this.strands = []

    this.handleResize()
    this.init()
    // canvas wave ----------------------------------------------
    // code pen url:https://codepen.io/waidhoferj/details/QWWjxgW
    this.optionSet()
    // this.loop()
    this.animate()
    // }
  },
  destroyed() {
    window.addEventListener('resize', this.handleResize)
  },
  methods: {
    mouseEnter(i) {
      // alert(this.isOnMarks[i].isOnMark)
      this.isOnMarks[i].isOnMark = true
    },
    mouseLeaf(i) {
      // alert(i)
      // alert(this.isOnMarks[i].isOnMark)
      this.isOnMarks[i].isOnMark = false
    },
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
      this.numberPoint = 9
      this.radius = 24
      this.posX = 40
      this.posY = 40
    },
    optionSet() {
      // console.log('option set')
      // const options = [
      // { offset: 1, color: '#4dbaed' },
      // { offset: 5, color: '#4dbaed' },
      // { offset: 10, color: '#4dbaed' },
      // { offset: 50, color: '#4dbaed' },
      // { offset: 60, color: '#4dbaed' },
      // { offset: 600, color: '#4dbaed' }
      // ]
      const options = [{ offset: 1, color: 'hsl(0, 0%, 48%) ' }]

      //   addStrand(strand = new Strand()) {
      //   this.strands.push(strand);
      // }
      options.forEach((option) => {
        // console.log('option set')
        // console.log(option)
        // this.addStrand(this.Strand(option))
        // this.amplitudeScalar = 1;
        // this.inverted = false;
        // this.offset = 0;
        // this.color = "blue";
        // Object.assign(this, options);
        //  let { inverted, offset, amplitudeScalar, color } = options;

        this.strands.push({
          inverted: false,
          offset: option.offset,
          amplitudeScalar: 1,
          color: option.color
        })
      })
    },
    animate() {
      // console.log('animate')
      this.amplitude += 1
      if (this.amplitude === 1) {
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
        this.waveCircle()
        this.waveCircleLoop()
        this.timer = setInterval(() => {
          this.context.clearRect(0, 0, 80, 80)
          this.waveCircleLoop()
        }, 3000 / 40)

        this.buildFrame()
      }
      this.isActive = true
      // this.animateTransition()
      //   this.canvas.addEventListener("mouseover",function(e){
      //     this.timer = setInterval(function(){
      //         oThis.ctx.clearRect(0, 0, oThis.canvas.width, oThis.canvas.height);
      //         oThis.circle.init();
      //     }, 1000/40);
      // },false);
      // this.canvas.addEventListener("mouseleave",function(e){
      //     clearInterval(this.timer);
      // },false);
    },
    buildFrame(t) {
      if (this.amplitude > 0) requestAnimationFrame(this.buildFrame)
      this.context.clearRect(0, 0, this.width, this.height)
      for (let i = 0; i < this.strands.length; i++) {
        this.drawWave(t, this.strands[i])
      }

      this.iteration++
    },
    waveCircle() {
      // this.question.forEach((value, index) => {
      // this.canvas2[index] = this.$refs.refsCanvas2[index]
      // this.context2[index] = this.canvas2[index].getContext('2d')
      // console.log('drawMark')
      // this.context2.clearRect(0, 0, this.width, this.height)
      // this.context2.save()
      // circle
      // this.context2[index].fillStyle = 'rgba(0,115,99,0.5)'
      // this.context2[index].beginPath()
      // this.context2[index].arc(50, 50, 50, 0, Math.PI * 2, true)
      // this.context2[index].closePath()
      // this.context2[index].fill()
      // this.context2.restore()
      // })
      for (const i in this.questions) {
        if (this.questions[i].id === Number(this.$route.params.slug)) {
          for (const idx in this.questions[i].ansr) {
            // this.context2[idx].fillStyle = 'hsl(0, 0%, 48%) '
            // this.context2[idx].beginPath()
            // this.context2[idx].arc(40, 40, 40, 0, Math.PI * 2, true)
            // this.context2[idx].closePath()
            // this.context2.lineWidth = 2
            // // this.context2[idx].fill()
            // this.context2[idx].stroke()

            // cordpen 波打つ円----------------------------------------------
            // https://codepen.io/sebavien/details/jAjKVE
            this.context2[idx].clearRect(0, 0, this.width, this.height)
            this.context2[idx].save()
            const degree = 360 / this.numberPoint
            for (let i = 0; i < this.numberPoint; i++) {
              const radian = (Math.PI / 180) * degree * i
              this.pXArr.push(this.radius * Math.cos(radian) + this.posX)
              this.pYArr.push(this.radius * Math.sin(radian) + this.posY)
              // this.pXUpArr.push(
              //   (this.radius + this.rate) * Math.cos(radian) + this.posX
              // )
              // this.pYUpArr.push(
              //   (this.radius + this.rate) * Math.sin(radian) + this.posY
              // )
              // this.pXDwArr.push(
              //   (this.radius - this.rate) * Math.cos(radian) + this.posX
              // )
              // this.pYDwArr.push(
              //   (this.radius - this.rate) * Math.sin(radian) + this.posY
              // )
            }
            this.pArr = []
            this.rand = this.radius / this.numberPoint
            this.createPoint()

            // this.context2[idx].fillStyle = 'hsl(0, 0%, 48%) '
            // this.context2[idx].beginPath()
            // this.context2[idx].arc(40, 40, 40, 0, Math.PI * 2, true)
            // this.context2[idx].closePath()
            // this.context2.lineWidth = 2
            // // this.context2[idx].fill()
            // this.context2[idx].stroke()
          }
        }
      }
    },
    createPoint() {
      for (let i = 0; i < this.numberPoint; i++) {
        if (i % 2 === 0) {
          this.wavePoint.x = this.pXArr[i] - this.rand
          this.wavePoint.y = this.pYArr[i] - this.rand
        } else {
          this.wavePoint.x = this.pXArr[i] + this.rand
          this.wavePoint.y = this.pYArr[i] + this.rand
        }
        this.wavePoint.tx = this.pXArr[i]
        this.wavePoint.ty = this.pYArr[i]
        this.wavePoint.spring = Math.random() * 0.3
        this.pArr.push({
          x: this.wavePoint.x,
          y: this.wavePoint.y,
          ax: this.wavePoint.ax,
          ay: this.wavePoint.ay,
          vx: this.wavePoint.vx,
          vy: this.wavePoint.vx,
          tx: this.wavePoint.tx,
          ty: this.wavePoint.ty,
          // maxx: this.pXDwArr[i],
          // maxy: this.pXDwArr[i],
          // minx: this.pXDwArr[i],
          // miny: this.pXDwArr[i],
          spring: 0.01
        })
      }
    },
    waveCircleLoop() {
      for (const i in this.questions) {
        if (this.questions[i].id === Number(this.$route.params.slug)) {
          for (const idx in this.questions[i].ansr) {
            this.context2[idx].clearRect(0, 0, 80, 80)
            // this.drawGraphics()-------------------
            this.context2[idx].beginPath()
            const xc1 = (this.pArr[0].x + this.pArr[this.numberPoint - 1].x) / 2
            const yc1 = (this.pArr[0].y + this.pArr[this.numberPoint - 1].y) / 2
            this.context2[idx].moveTo(xc1, yc1)
            for (let i = 0; i < this.pArr.length - 1; i++) {
              const xc = (this.pArr[i].x + this.pArr[i + 1].x) / 2
              const yc = (this.pArr[i].y + this.pArr[i + 1].y) / 2
              this.context2[idx].quadraticCurveTo(
                this.pArr[i].x,
                this.pArr[i].y,
                xc,
                yc
              )
            }
            this.context2[idx].quadraticCurveTo(
              this.pArr[this.pArr.length - 1].x,
              this.pArr[this.pArr.length - 1].y,
              xc1,
              yc1
            )
            // this.context[idx].fillStyle = this.color
            // this.context[idx].fill()
            this.context2[idx].strokeStyle = 'hsl(0, 0%, 21%)'
            this.context2[idx].lineWidth = 2
            this.context2[idx].stroke()
            // this.movePoint()----------------------
            for (let i = 0; i < this.pArr.length; i++) {
              const dx = this.pArr[i].tx - this.pArr[i].x // 円状態からの差
              const dy = this.pArr[i].ty - this.pArr[i].y // 円状態からの差
              this.pArr[i].ax = dx * this.pArr[i].spring // 増減値
              this.pArr[i].ay = dy * this.pArr[i].spring // 増減値
              this.pArr[i].vx += this.pArr[i].ax // 増減値の合計
              this.pArr[i].vy += this.pArr[i].ay // 増減値の合計
              this.pArr[i].x += this.pArr[i].vx
              this.pArr[i].y += this.pArr[i].vy
            }

            // this.context2[idx].fillStyle = 'hsl(0, 0%, 48%) '
            // this.context2[idx].beginPath()
            // this.context2[idx].arc(
            //   this.posX,
            //   this.posY,
            //   40,
            //   0,
            //   Math.PI * 2,
            //   true
            // )
            // this.context2[idx].closePath()
            // this.context2.lineWidth = 2
            // this.context2[idx].stroke()
          }
        }
      }
    },
    drawWave(t, options = {}) {
      const { inverted, offset, amplitudeScalar, color } = options
      const sign = inverted ? -1 : 1
      const points = this.canvas.width / this.pointDx // pointDx:10
      this.context.beginPath()
      this.context.moveTo(0, this.canvas.height / 2)
      for (let i = 0; i < points; i++) {
        const x = i * this.pointDx // pointDx:10
        const noise = this.noise.noise2D(
          (i + this.iteration) / 100,
          (this.iteration + offset) / 100
        )
        const y =
          this.canvas.height / 2 -
          sign *
            this.envelopeScalar(x, amplitudeScalar) *
            noise *
            this.waveHeight // 波の高さ

        this.context.lineTo(x, y)
      }
      this.context.strokeStyle = color
      this.context.stroke()

      // const { inverted, offset, amplitudeScalar, color } = {
      //   offset: 1,
      //   color: colors.accent
      // }

      // let sign = inverted ? -1 : 1;
      // const points = this.width / this.pointDx
      // console.log(points)
      // this.context.beginPath()
      // this.context.moveTo(0, this.height / 2)
      // for (let i = 0; i < points; i++) {
      //   const x = i * this.pointDx
      //   const Y = (i * this.canvas.height) / 2
      //   // let y = this.canvas.height / 2 - sign * this.envelopeScalar(x, amplitudeScalar) * noise;
      //   this.context.lineTo(x, Y)
      //   console.log('x: ' + x + ' Y: ' + Y)
      // }

      // this.context.lineTo(100, 100)
      // this.context.strokeStyle = '#000000'
      // this.context.stroke()
    },
    envelopeScalar(x, amplitudeScalar = 1) {
      return (
        this.amplitude *
        Math.cos((3 * Math.PI) / 2 + Math.PI * (x / this.canvas.width)) *
        amplitudeScalar
      )
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
      for (const i in this.questions) {
        if (this.questions[i].id === Number(this.$route.params.slug)) {
          selectedQues.push(this.questions[i])
        }
        cnt++
      }
      this.totalQ = cnt
      this.pageQuestion = selectedQues
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
#canvas2 {
  position: absolute;
  top: 0;
  left: 0;
  // width: 3rem;
  // height: 3rem;
  width: 80px;
  height: 80px;
  z-index: 0;
  overflow: hidden;
  // border: 1px solid red;
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
  // border: 1px solid orange;
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
    height: 2rem;
    width: 100%;
  }
  .quesTitle {
    margin-bottom: 1rem;
    height: 20rem;
    width: 100%;
  }
  .doYouKnow {
    width: 100%;
    height: 2rem;
    margin-bottom: 1rem;
  }
  .doYouKnowWrap {
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
  // justify-content: flex-start;
  // align-items: center;
  // flex-direction: row;
  cursor: pointer;
  margin-bottom: 1rem;
  width: 100%;
  // border: 1px solid green;

  .anser-title-wrap {
    position: relative;
    width: 80px;
    height: 80px;
    // border: 1px solid blue;
  }
  .anser-items {
    position: relative;
    // border: 1px solid green;
    margin-left: 1rem;
  }
  .anser-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    // margin: 1rem;
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
    margin-top: -0.1rem;
    transition: all 0.15s;
  }
  .canvas2-wrap {
    opacity: 0;
    transition: all 0.15s;
  }
  &:hover {
    color: $grey-darker;
    .anser-title {
      border: none;
      transition: all 0.15;
    }
    .canvas2-wrap {
      opacity: 1;
      transition: all 0.15s;
    }
  }
}
</style>
