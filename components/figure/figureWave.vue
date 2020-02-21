<template lang="pug">
    div.svg-block
        svg(
            id="svg-wave"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 500 700"
            xml:space="preserve"
        )
            g
              rect(class="box" x="0" y="0" width="500" height="700")
              path(
                d="M0,50  q50,30 100,0 t100,0 t100,0  t100,0 t100,0"
                stroke="white"
                stroke-width="3"
                fill="transparent"
              )
              path(
                d="M0,120  q50,30 100,0 t100,0 t100,0  t100,0 t100,0"
                stroke="white"
                stroke-width="3"
                fill="transparent"
              )
              path(
                d="M0,190  q50,30 100,0 t100,0 t100,0  t100,0 t100,0"
                stroke="white"
                stroke-width="3"
                fill="transparent"
              )
              path(
                d="M0,260  q50,30 100,0 t100,0 t100,0  t100,0 t100,0"
                stroke="white"
                stroke-width="3"
                fill="transparent"
              )
              path(
                d="M0,330  q50,30 100,0 t100,0 t100,0  t100,0 t100,0"
                stroke="white"
                stroke-width="3"
                fill="transparent"
              )
              path(
                d="M0,400  q50,30 100,0 t100,0 t100,0  t100,0 t100,0"
                stroke="white"
                stroke-width="3"
                fill="transparent"
              )
        div.absolute-title
                div.title Nature
                div.sub-title Let's cut out your own landscape
</template>
<style scoped lang="scss">
$text-color: $white;
$text-size-5: $size-5;
$text-size-6: $size-6;
$text-size-7: $size-7;
.svg-block {
  position: relative;
  //   width: 100%;
  width: 20rem;
  height: 100%;
  background-color: whitesmoke;
  margin: 1rem 1rem 3rem 1rem;
  padding: 0;
  box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.5);
}
//svg
svg {
  padding: 0;
  margin: 0 0 -0.5rem 0;
  background-color: #fff;
}

#svg-wave {
  .box {
    stroke: none;
    fill: #7abcd6;
  }
}
.absolute-title {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 70%;
  height: 35%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding-right: 1rem;
  // align-items: right;

  .title,
  .sub-title {
    color: $text-color;
    // display: inline-block;
  }
  .title {
    font-size: $text-size-5;
    margin-bottom: 1.2rem;
  }
  .sub-title {
    font-size: $text-size-7;
    margin-bottom: 1.6rem;
    font-weight: 300;
    margin-right: 1rem;
  }
  @media (min-width: 976px) {
    .title {
      font-size: $text-size-5;
      margin-bottom: 1.2rem;
    }
    .sub-title {
      font-size: $text-size-7;
      font-weight: 300;
    }
  }
}
</style>
