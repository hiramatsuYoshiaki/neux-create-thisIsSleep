<template lang="pug">
    div.main-wrape
        div.container-fluid
            div.row
                canvas(id="canvas" ref="refs_canvas")
                div.sol-content
                    div.sol-content-wrape
                        div.title
                            h1 Three Steps
                            h1 for your
                            h1 gole
                        div.sub-title
                            h5 We help you build yuer travel plans solution, suited to your specific needs.
                        //- div.link-button
                        //-     buttonLinkCustomComponent(link="/" name="new create" bgColor="#212121" textColor="white" btnWidth="10rem" btnRadius="28px")
                        //-     buttonLinkCustomComponent(link="/" name="your create" bgColor="lightcoral" textColor="white" btnWidth="10rem" btnRadius="28px")
                        div.link-button
                          button.component--btn.create-button.your-solution
                            nuxt-link(:to="'/thisIsSleep/solution/question/' + question")
                              span Your Solution
                          button.component--btn.create-button.solution-create
                            nuxt-link(:to="'/thisIsSleep/solution/question/' + question")
                              span Solution Create

</template>
<script>
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
      question: 1
    }
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
      this.context.translate(this.width / 2, this.height / 2)
      this.context.rotate(((Math.PI / 180) * this.circleRotetion) / 4)
      this.context.translate(-this.width / 2, -this.height / 2)
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
    },
    maskWave() {
      this.context.clearRect(0, 0, this.width, this.height)
      if (this.canvas.width > 976) {
        this.context.drawImage(this.loadImg, 0, 0, this.width, this.height)
      }

      // mask
      this.context.save()
      // draw wave

      this.context.rotate((Math.PI / 180) * 8)
      this.context.globalCompositeOperation = 'destination-in'
      if (this.canvas.width > 976) {
        this.drawWaveVer('#c5ced3', 1, 3, 0)
      }

      this.context.rotate((Math.PI / 180) * -16)
      this.context.globalCompositeOperation = 'destination-over'
      this.drawWaveVer('#c5ced3', 1, -3, 0)
      this.context.rotate((Math.PI / 180) * 8)

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
        this.width / 2,
        this.height / 2,
        10,
        10,
        36,
        2,
        '#444',
        '#0d2636'
      )

      this.context.restore()
    },

    init() {
      this.canvas.width = this.innerWidth
      this.canvas.height = this.innerHeight
      this.width = this.canvas.width
      this.height = this.canvas.height
      // cricle
      this.circleRectX = 20
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
  width: 100%;
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
