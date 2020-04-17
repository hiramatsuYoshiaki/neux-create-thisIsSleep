<template lang="pug">
    div.main-wrape
        div.container-fluid
            div.row
                canvas(id="canvas" ref="refs_canvas")
                div.result-content
                  div(@mouseenter="mouseEnter()" @mouseleave="mouseLeaf()")
                    h3 that's is ...
                    h5 Now that we know, we're pulling together
                    h5 a sleep solution tailored to you.
                    h1 {{message}}
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
      // circle
      radius: 0,
      posX: 0,
      posY: 0,
      color: '#000',
      numberPoint: 0,
      pXArr: [],
      pYArr: [],

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
      message: 'leaf mouse'
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
    this.handleResize()
    this.init()
    this.waveCircle()
    this.loop()

    // }
  },
  destroyed() {
    window.addEventListener('resize', this.handleResize)
  },

  methods: {
    mouseEnter() {
      this.message = 'On mouse'
    },
    mouseLeaf() {
      this.message = 'leaf mouse'
    },
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
      if (this.width > this.height) {
        this.radius = this.height / 3
      } else {
        this.radius = this.width / 3
      }

      this.posX = this.width / 2
      this.posY = this.height / 2
      this.color = 'rgba(0,115,99,0.5)'
      this.numberPoint = 8
    },

    waveCircle() {
      console.log('waveCircle')
      this.context.clearRect(0, 0, this.width, this.height)
      this.context.save()

      const degree = 360 / this.numberPoint
      for (let i = 0; i < this.numberPoint; i++) {
        const radian = (Math.PI / 180) * degree * i
        this.pXArr.push(this.radius * Math.cos(radian) + this.posX)
        this.pYArr.push(this.radius * Math.sin(radian) + this.posY)
        // console.log(this.radius * Math.cos(radian) + this.posX)
        // console.log(this.radius * Math.cos(radian) + this.posY)
      }
      this.pArr = []
      this.rand = this.radius / 8
      this.createPoint()
    },
    createPoint() {
      console.log('createPoint')

      for (let i = 0; i < this.numberPoint; i++) {
        console.log('numberPoint loop')
        console.log(i)
        if (i % 2 === 0) {
          this.wavePoint.x = this.pXArr[i] - Math.random() * this.rand
          this.wavePoint.y = this.pYArr[i] - Math.random() * this.rand
          //   this.setWavePoint(
          //     this.pXArr[i] - Math.random() * this.rand,
          //     this.pYArr[i] - Math.random() * this.rand
          //   )
          //   // console.log(this.wavePoint)
        } else {
          this.wavePoint.x = this.pXArr[i] + Math.random() * this.rand
          this.wavePoint.y = this.pYArr[i] + Math.random() * this.rand
          //   this.setWavePoint(
          //     this.pXArr[i] + Math.random() * this.rand,
          //     this.pVArr[i] + Math.random() * this.rand
          //   )
          //   // console.log(this.wavePoint)
        }
        this.wavePoint.tx = this.pXArr[i]
        this.wavePoint.ty = this.pYArr[i]
        this.wavePoint.spring = Math.random() * 0.03
        // this.wavePoint.spring = 2 * 0.03
        console.log('spring: ' + this.wavePoint.spring)
        this.pArr.push({
          x: this.wavePoint.x,
          y: this.wavePoint.y,
          ax: this.wavePoint.ax,
          ay: this.wavePoint.ay,
          vx: this.wavePoint.vx,
          vy: this.wavePoint.vx,
          tx: this.wavePoint.tx,
          ty: this.wavePoint.ty,
          spring: this.wavePoint.spring
        })
        console.log('pArr')
      }
    },
    loop() {
      console.log('loop')
      this.drawCircle()

      this.timer = setInterval(() => {
        this.context.clearRect(0, 0, this.width, this.height)
        this.drawCircle()
      }, 1000 / 40)

      // this.drawCircle()
      // this.reqAnimation = requestAnimationFrame(this.loop)
      // setTimeout(() => {
      //   cancelAnimationFrame(this.reqAnimation)
      // }, 5000)
    },
    drawCircle() {
      this.context.clearRect(0, 0, this.width, this.height)
      // this.context.save()
      console.log('drawCircle')

      this.drawGraphics()
      this.movePoint()

      // this.context.restore()
    },
    drawGraphics() {
      console.log('drawGraphics')
      this.context.beginPath()
      const xc1 = (this.pArr[0].x + this.pArr[this.numberPoint - 1].x) / 2
      const yc1 = (this.pArr[0].y + this.pArr[this.numberPoint - 1].y) / 2
      this.context.moveTo(xc1, yc1)
      for (let i = 0; i < this.pArr.length - 1; i++) {
        const xc = (this.pArr[i].x + this.pArr[i + 1].x) / 2
        const yc = (this.pArr[i].y + this.pArr[i + 1].y) / 2
        this.context.quadraticCurveTo(this.pArr[i].x, this.pArr[i].y, xc, yc)
      }
      this.context.quadraticCurveTo(
        this.pArr[this.pArr.length - 1].x,
        this.pArr[this.pArr.length - 1].y,
        xc1,
        yc1
      )
      this.context.fillStyle = this.color
      this.context.fill()
    },
    movePoint() {
      console.log('movePoint')
      for (let i = 0; i < this.pArr.length; i++) {
        console.log(i)
        const dx = this.pArr[i].tx - this.pArr[i].x
        const dy = this.pArr[i].ty - this.pArr[i].y
        this.pArr[i].ax = dx * this.pArr[i].spring
        this.pArr[i].ay = dy * this.pArr[i].spring
        this.pArr[i].vx += this.pArr[i].ax

        this.pArr[i].vy += this.pArr[i].ay //
        this.pArr[i].x += this.pArr[i].vx

        this.pArr[i].y += this.pArr[i].vy //
        console.log(dx)
        console.log(dy)
        console.log(this.pArr[i].ax)
        console.log(this.pArr[i].ay)
        console.log(this.pArr[i].vx)
        console.log(this.pArr[i].vy) // nan
        console.log(this.pArr[i].x)
        console.log(this.pArr[i].y) // nan
        console.log(this.pArr[i].spring)

        // const dx = 10
        // const dy = 20
        // this.pArr[i].ax = dx * this.pArr[i].spring
        // this.pArr[i].ay = dy * this.pArr[i].spring
        // this.pArr[i].vx += 2
        // this.pArr[i].vy += 4
        // this.pArr[i].x += 3
        // this.pArr[i].y += 6
        // console.log(this.pArr[i].x)
      }
    }
    // draw() {
    //   this.context.clearRect(0, 0, this.width, this.height)
    //   this.context.save()
    //   // circle
    //   this.context.fillStyle = 'rgba(0,115,99,0.5)'
    //   this.context.beginPath()
    //   this.context.arc(
    //     this.width / 2,
    //     this.height / 2,
    //     this.width / 4,
    //     0,
    //     Math.PI * 2,
    //     true
    //   )
    //   this.context.closePath()
    //   this.context.fill()

    //   this.context.restore()
    // }
  }
}
</script>
<style lans="scss" scoped>
* {
  border: 1px dotted grey;
}
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
.result-content {
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
</style>
