<template lang="pug">
    div.button-wrape(:style="{background:bgColor, width:btnWidth,borderRadius:btnRadius}")
        nuxt-link(:to="link", :style="{color:textColor}") {{name}}

</template>
<script>
export default {
  props: {
    link: {
      type: String,
      default: '/'
    },
    name: {
      type: String,
      default: 'home'
    },
    bgColor: {
      type: String,
      default: '#000'
    },
    textColor: {
      type: String,
      default: '#fff'
    },
    btnWidth: {
      type: String,
      default: 'auto'
    },
    btnRadius: {
      type: String,
      default: '0px'
    }
  }
}
</script>
<style lang="scss" scoped>
.button-wrape {
  // width: 15rem;
  padding: 0.6rem;
  margin: 0.5rem 1rem;
  // background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  // border-radius: 28px;
}
// a {
//   color: #fff;
// }
</style>
