<template lang="pug">
    div
        div.solutionFigure
            div.figureItem-base
                div.base-title
                    h4.title 3Steps
                    h6.sub-title Questions
            div.solutionFigure-deg.deg0
                div.figureItem.item0(:style="{ background: `center / cover no-repeat  url(${images[0].bgimg})` }")
            div.solutionFigure-deg.deg120
                div.figureItem.item120(:style="{ background: `center / cover no-repeat  url(${images[1].bgimg})` }")
            div.solutionFigure-deg.deg240
                div.figureItem.item240(:style="{ background: `center / cover no-repeat  url(${images[2].bgimg})` }")
</template>
<script>
export default {
  props: {
    images: {
      type: Array,
      require: false,
      default: null
    }
  }
}
</script>
<style scoped lang="scss">
//45set items8
$deg0: 0deg;
$deg45: 45deg;
$deg90: 90deg;
$deg135: 135deg;
$deg180: 180deg;
$deg225: 225deg;
$deg270: 270deg;
$deg315: 315deg;
//120set 3items
$deg120: 120deg;
$deg240: 240deg;

.solutionFigure {
  position: relative;
  width: 22rem;
  height: 22rem;
  @media (min-width: 425px) {
    width: 32rem;
    height: 32rem;
  }
  @media (min-width: 768px) {
    width: 50rem;
    height: 50rem;
  }
  @media (min-width: 976px) {
    width: 34rem;
    height: 34rem;
  }
  @media (min-width: 1200px) {
    width: 42rem;
    height: 42rem;
  }
  overflow: hidden;
}
.solutionFigure-deg {
  position: absolute;
  width: 100%;
  height: 100%;
}
.figureItem-base {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  background-color: whitesmoke;
  border: 4px solid lightgray;
  border-radius: 100%;
}
.base-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.figureItem {
  width: 25%;
  height: 25%;
  border-radius: 100%;
  position: absolute;
  margin-top: -25%;
  box-shadow: 0 20px 12px rgba(0, 0, 0, 0.2);
}

.deg0 {
  transform: rotate($deg0);
}
.item0 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-$deg0);
}
.deg120 {
  transform: rotate($deg120);
}
.item120 {
  background-color: lightskyblue;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-$deg120);
}
.deg240 {
  transform: rotate($deg240);
}
.item240 {
  background-color: limegreen;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-$deg240);
}
</style>
