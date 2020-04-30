<template lang="pug">
    div.main-wrape
        div.container-fluid
            div.row
                canvas(id="canvas" ref="refs_canvas")
                div.question-content
                  div
                    div.resluts-title
                      h5 Canvas Wave Demo

</template>
<script>
export default {
  layout: 'layout2Parts',
  data() {
    return {
      canvas: null,
      context: null,
      reqAnimation: null,
      height: 0,
      width: 0,
      innerWidth: 0,
      innerHeight: 0,
      // canvas wave
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
      waveHeight: 100 // 波の高さ
    }
  },

  mounted() {
    // window size
    window.addEventListener('resize', this.handleResize)

    // canvas
    // const img = new Image()
    // img.src = this.bgImg
    // img.onload = () => {
    // this.loadImg = img
    this.canvas = this.$refs.refs_canvas
    this.context = this.canvas.getContext('2d')

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
    this.optionSet()
    this.animate()
    // this.loop()

    // }
  },
  destroyed() {
    window.addEventListener('resize', this.handleResize)
  },

  methods: {
    strans() {},
    addStrand() {},
    handleResize() {
      this.canvas.width = this.width = this.innerWidth = window.innerWidth
      this.canvas.height = this.height = this.innerHeight = window.innerHeight
      this.init()
    },
    init() {
      this.canvas.width = this.innerWidth
      this.canvas.height = this.innerHeight
      this.width = this.canvas.width
      this.height = this.canvas.height
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
        this.buildFrame()
      }
      this.isActive = true
      // this.animateTransition()
    },
    buildFrame(t) {
      // console.log('buildFrame')
      if (this.amplitude > 0) requestAnimationFrame(this.buildFrame)
      this.context.clearRect(0, 0, this.width, this.height)
      for (let i = 0; i < this.strands.length; i++) {
        this.drawWave(t, this.strands[i])
      }
      this.iteration++
      // this.drawWave()
      // this.reqAnimation = requestAnimationFrame(this.buildFrame)
      // setTimeout(() => {
      //   cancelAnimationFrame(this.reqAnimation)
      // }, 500)
    },
    // animateTransition() {
    //   console.log('animateTransition')
    // },
    // drawWave(t, options = {}) {
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
      console.log('loop')
      // this.timer = setInterval(() => {
      //   this.context.clearRect(0, 0, this.width, this.height)
      //   draw()
      // }, 10000 / 40)

      this.draw()
      this.reqAnimation = requestAnimationFrame(this.loop)
      setTimeout(() => {
        cancelAnimationFrame(this.reqAnimation)
      }, 5000)
    },
    draw() {
      this.context.clearRect(0, 0, this.width, this.height)
      this.context.save()
      // circle
      this.context.fillStyle = 'rgba(0,115,99,0.5)'
      this.context.beginPath()
      this.context.arc(
        this.width / 2,
        this.height / 2,
        this.width / 6,
        0,
        Math.PI * 2,
        true
      )
      this.context.closePath()
      this.context.fill()

      this.context.restore()
    }
  }
}
</script>
<style lang="scss" scoped>
// * {
//   border: 1px dotted grey;
// }
/* .main-wrape {
  margin-top: $header-height;
  overflow: hidden;
  width: 100%;
} */
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
.question-content {
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
}
.resluts-title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
