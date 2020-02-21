<template lang="pug">
    div.svg-block
        svg(
            id="svg-line"
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
                path(class="line1" d="M0 50 H500 " )
                path(class="line2" d="M0 120 H500 " )
                path(class="line3" d="M0 190 H500 " )
                path(class="line4" d="M0 260 H500 " )
                path(class="line5" d="M0 330 H500 " )
                path(class="line6" d="M0 400 H500 " )
        div.absolute-title
            div
                div.title In the city
                div.sub-title Explore popular shooting spots in the city
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

#svg-line {
  .box {
    stroke: none;
    fill: #504b4b;
  }
  .line1 {
    stroke: rgb(128, 127, 127);
    stroke-width: 2px;
  }
  .line2 {
    stroke: rgb(196, 195, 195);
    stroke-width: 2px;
  }
  .line3 {
    stroke: rgb(196, 195, 195);
    stroke-width: 3px;
  }
  .line4 {
    stroke: rgb(196, 195, 195);
    stroke-width: 4px;
  }
  .line5 {
    stroke: rgb(196, 195, 195);
    stroke-width: 5px;
  }
  .line6 {
    stroke: rgb(196, 195, 195);
    stroke-width: 6px;
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
  // align-items: right;
  padding-right: 1rem;

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
