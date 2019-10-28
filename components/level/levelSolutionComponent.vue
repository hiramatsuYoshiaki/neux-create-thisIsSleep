<template lang="pug">
    div.container-fluid
      div.row
        //- div.section-header
        //-   h5 solution
        div.levelSection
            div.solutionCircle(v-scroll="handleScroll")
              transition(name="fadeInFromUnder")
                figureSolutionComponent(:images="items" v-if="isShow")
            div.solutionCreate
                div.solutionCreate-wrape
                    div(v-scroll="handleScrollTitle")
                      transition(name="fadeInFromUnder")
                        h4(v-if="isShowTitle") 3 Steps for your gole
                    div(v-scroll="handleScrollSubTitle")
                      transition(name="fadeInFromUnder")
                        h6(v-if="isShowSubTitle") We help you build yuer travel plans solution, suited to your specific needs.
                    div.button-wrape(v-scroll="handleScrollLink")
                      transition(name="fadeInFromUnder")
                        buttonLinkComponent(link="/solution" v-if="isShowSubTitle")
</template>
<script>
// import cardComponent from '~/components/cards/cardComponent.vue'
import figureSolutionComponent from '~/components/figure/figureSolutionComponent.vue'
import buttonLinkComponent from '~/components/button/buttonLinkComponent.vue'
export default {
  components: {
    //   cardComponent
    figureSolutionComponent,
    buttonLinkComponent
  },
  props: {
    items: Array
  },
  data() {
    return {
      isShow: false,
      isShowTitle: false,
      isShowSubTitle: false,
      isShowLink: false
    }
  },
  methods: {
    handleScroll(evt, el) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    handleScrollTitle(evt, el) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        this.isShowTitle = true
      } else {
        this.isShowTitle = false
      }
    },
    handleScrollSubTitle(evt, el) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        this.isShowSubTitle = true
      } else {
        this.isShowSubTitle = false
      }
    },
    handleScrollLink(evt, el) {
      const top = el.getBoundingClientRect().top
      if (window.scrollY > top + window.scrollY - window.innerHeight + 200) {
        this.isShowLink = true
      } else {
        this.isShowLink = false
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
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  h5 {
    font-weight: 600;
  }
  @media (min-width: 976px) {
    padding: 0 5rem;
    height: 10rem;
  }
}
.levelSection {
  width: 100%;
  height: 100%;
  padding: 0 1.5rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 976px) {
    flex-direction: row;
  }
}
.solutionCircle {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 976px) {
    justify-content: flex-start;
    align-items: flex-end;
  }
}
.solutionCreate {
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 976px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
  .solutionCreate-wrape {
    width: 100%;
    @media (min-width: 976px) {
      width: 40%;
      h4 {
        margin-bottom: 2rem;
        font-weight: 600;
        letter-spacing: 0rem;
      }
      h6 {
        margin-bottom: 1rem;
        font-weight: 300;
      }
      .button-wrape {
        margin-bottom: 1rem;
      }
    }
    h4 {
      margin-bottom: 1rem;
      font-weight: 600;
      letter-spacing: 0rem;
    }
    h6 {
      margin-bottom: 3rem;
      font-weight: 300;
    }
    .button-wrape {
      margin-bottom: 2rem;
    }
  }
}
</style>
