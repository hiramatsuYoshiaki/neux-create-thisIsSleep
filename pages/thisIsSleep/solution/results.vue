<template lang="pug">
    div.main-wrape
        div.container-fluid
            div.row
                canvas(id="canvas" ref="refs_canvas")
                div.result-content
                  div(@mouseenter="mouseEnter()" @mouseleave="mouseLeaf()")
                    div.resluts-title
                      h5 that's is ...
                      h6 Now that we know, we're pulling together
                      h6 sleep solution tailored to you.
                      div(v-for="msg in msgs")
                        p {{ msg }}
                      //- p {{message}}
                      br
                      br
                      button(@click="mySolution()") i see ...
                      br
                      br

                      p {{user}}
                      p {{solutions}}
                      p sleepSolutions firebase data
                      p {{sleepSolutions}}
</template>
<script>
import { mapState } from 'vuex'
import { SLEEP_ADD_SOLUTION, SLEEP_GET_SOLUTION } from '~/store/actionTypes'
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
      message: 'leaf mouse'
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState({ msgs: ['message'] }),
    ...mapState(['sleepSolutions']),
    ...mapState('solutions', ['solutions'])
  },
  async mounted() {
    // window size
    window.addEventListener('resize', this.handleResize)
    this.$store.commit('clearMessage')
    console.log('mount sleep add solution')
    console.log(this.user)
    if (this.user && this.user.email === this.solutions.user) {
      console.log('user.email: ' + this.user.email)
      console.log('solution.user: ' + this.solutions.user)
      await this.$store.dispatch(SLEEP_ADD_SOLUTION, this.solutions)
      this.message = 'ソリューションを作成しています。'
    } else {
      this.message = 'ログインしてください。'
      this.$router.push('/thisIsSleep/account/logout')
    }
    await this.$store.dispatch(SLEEP_GET_SOLUTION, this.user.uid)
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
    mySolution() {
      this.$router.push('/thisIsSleep/solution/solution')
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
      //   this.color = 'rgba(0,115,99,0.5)'
      this.color = 'rgba(0,50,99,0.5)'
      // this.numberPoint = 8
      this.numberPoint = 72
      this.rate = 25
    },

    waveCircle() {
      this.context.clearRect(0, 0, this.width, this.height)
      this.context.save()

      const degree = 360 / this.numberPoint
      for (let i = 0; i < this.numberPoint; i++) {
        // const radian = (Math.PI / 180) * degree * i
        // this.pXArr.push(this.radius * Math.cos(radian) + this.posX)
        // this.pYArr.push(this.radius * Math.sin(radian) + this.posY)
        const radian = (Math.PI / 180) * degree * i
        this.pXArr.push(this.radius * Math.cos(radian) + this.posX)
        this.pYArr.push(this.radius * Math.sin(radian) + this.posY)
        this.pXUpArr.push(
          (this.radius + this.rate) * Math.cos(radian) + this.posX
        )
        this.pYUpArr.push(
          (this.radius + this.rate) * Math.sin(radian) + this.posY
        )
        this.pXDwArr.push(
          (this.radius - this.rate) * Math.cos(radian) + this.posX
        )
        this.pYDwArr.push(
          (this.radius - this.rate) * Math.sin(radian) + this.posY
        )
      }
      this.pArr = []
      this.rand = this.radius / this.numberPoint
      this.createPoint()
    },
    createPoint() {
      for (let i = 0; i < this.numberPoint; i++) {
        if (i % 2 === 0) {
          //   this.wavePoint.x = this.pXArr[i] - this.rand
          //   this.wavePoint.y = this.pYArr[i] - this.rand
          //   this.wavePoint.x = this.pXArr[i]
          //   this.wavePoint.y = this.pYArr[i]
          this.wavePoint.x = this.pXDwArr[i]
          this.wavePoint.y = this.pYDwArr[i]
        } else {
          //   this.wavePoint.x = this.pXArr[i] + this.rand
          //   this.wavePoint.y = this.pYArr[i] + this.rand
          //   this.wavePoint.x = this.pXArr[i]
          //   this.wavePoint.y = this.pYArr[i]
          this.wavePoint.x = this.pXUpArr[i]
          this.wavePoint.y = this.pYUpArr[i]
        }
        this.wavePoint.tx = this.pXArr[i]
        this.wavePoint.ty = this.pYArr[i]
        // this.wavePoint.spring = Math.random() * 0.03
        this.pArr.push({
          x: this.wavePoint.x,
          y: this.wavePoint.y,
          ax: this.wavePoint.ax,
          ay: this.wavePoint.ay,
          vx: this.wavePoint.vx,
          vy: this.wavePoint.vx,
          tx: this.wavePoint.tx,
          ty: this.wavePoint.ty,
          maxx: this.pXDwArr[i],
          maxy: this.pXDwArr[i],
          minx: this.pXDwArr[i],
          miny: this.pXDwArr[i],
          spring: 0.01
        })
      }
    },
    loop() {
      this.drawCircle()

      this.timer = setInterval(() => {
        this.context.clearRect(0, 0, this.width, this.height)

        this.drawCircle()
      }, 10000 / 40)

      // this.drawCircle()
      // this.reqAnimation = requestAnimationFrame(this.loop)
      // setTimeout(() => {
      //   cancelAnimationFrame(this.reqAnimation)
      // }, 5000)
    },
    drawCircle() {
      this.context.clearRect(0, 0, this.width, this.height)
      // this.context.save()

      this.drawGraphics()
      this.movePoint()

      // this.context.restore()
    },
    drawGraphics() {
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
      // this.context.fillStyle = this.color
      // this.context.fill()
      this.context.strokeStyle = 'hsl(0, 0%, 48%) '
      this.context.stroke()
    },
    movePoint() {
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
<style lang="scss" scoped>
/* * {
  border: 1px dotted grey;
} */
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
.resluts-title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
