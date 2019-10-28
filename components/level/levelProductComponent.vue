<template lang="pug">
    div.container-fluid
      div.row
        div.section-header(v-scroll="handleScroll")
          transition(name="fadeInFromUnder")
            div(v-if="isShow")
              div.h7 {{title[0].title}}
              h5 {{title[1].title}}
              h5  {{title[2].title}}
        div.levelCard
            div
                figureLine
            div
                figureWave
            div
                figureDotted
</template>
<script>
// import cardProductComponent from '~/components/cards/cardProductComponent.vue'
import figureLine from '~/components/figure/figureLine.vue'
import figureWave from '~/components/figure/figureWave.vue'
import figureDotted from '~/components/figure/figureDotted.vue'
export default {
  components: {
    //     cardProductComponent
    figureLine,
    figureWave,
    figureDotted
  },
  props: {
    title: Array,
    items: Array
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    handleScroll(evt, el) {
      const top = el.getBoundingClientRect().top
      // console.log('product top: ' + top)
      // console.log('product top: ' + window.scrollY)
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        // el.setAttribute(
        //   'style',
        //   'opacity: 1; transform: translate3d(0, -10px, 0) '
        // )
        // console.log('product fad-in >>>>>: ' + this.isShow)
        this.isShow = true
      } else {
        // el.removeAttribute(
        //   'style',
        //   'opacity: 0; transform: translate3d(0, 0, 0)'
        // )
        this.isShow = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// .container,
// .container-fluid {
//   width: 100%;
//   margin-right: auto;
//   margin-left: auto;
//   padding-left: 15px;
//   padding-right: 15px;
// }
// .row {
//   margin-left: -15px;
//   margin-right: -15px;
//   display: flex;
//   justify-content: flex-start;
//   flex-direction: row;
//   flex-wrap: wrap;
// }
.section-header {
  width: 100%;
  //   height: 50rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div.h7 {
    margin-bottom: 2rem;
  }
  h5 {
    font-weight: 600;
  }
  h6 {
    font-weight: 600;
    margin-bottom: 5rem;
  }
  @media (min-width: 976px) {
    padding: 0 5rem;
    // height: 10rem;
  }
  //   border: 1px solid red;
}
.levelCard {
  width: 100%;
  padding: 0 1.5rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 976px) {
    padding: 0 20rem;
    flex-direction: row;
  }
}
.img {
  width: 100%;
  height: auto;
}
</style>
