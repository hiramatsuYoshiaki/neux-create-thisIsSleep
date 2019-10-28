<template lang="pug">
  div.container-fluid
    div.row
      div.carousel-wrape
        carousel(:autoplay="true" :per-page="1" :loop="true" :autoplay-timeout="6000" :pagination-enabled="true")
          slide.slide-item
              h1 Slide1
              p vue-craousel
          slide.slide-item
              h1 Slide2
              p vue-craousel
          slide.slide-item
              h1 Slide3
              p vue-craousel
          slide.slide-item
              h1 Slide4
              p vue-craousel
</template>
<script>
import Carousel from 'vue-carousel/src/Carousel.vue'
import Slide from 'vue-carousel/src/Slide.vue'
export default {
  components: {
    Carousel,
    Slide
  }
}
</script>
<style scoped lang="scss">
$carousel-padding-top: calc(#{$section-padding-top} * -1);
$carousel-padding-bottom: calc(#{$section-padding-bottom} * -1);
// .container-fluid {
//   position: relative;
//   margin-left: auto;
//   margin-right: auto;
//   padding-right: 15px;
//   padding-left: 15px;
// }
// .row {
//   margin-left: -15px;
//   margin-right: -15px;
//   display: flex;
//   justify-content: center;
//   flex-direction: row;
//   flex-wrap: wrap;
// }
.carousel-wrape {
  position: relative;
  width: 100%;
  $section-padding-topheight: 100%;
  margin-top: $carousel-padding-top;
  margin-bottom: $carousel-padding-bottom;
  padding: 0;
  overflow: hidden;
  border: 1px solid green;
}
.slide-item {
  position: relative;
  background-color: white;
  color: black;
  width: 100%;
  height: 20vh;
  @media (min-width: 976px) {
    width: 100%;
    height: 30vh;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid red;
}
</style>
