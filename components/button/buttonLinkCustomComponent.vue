<template lang="pug">
    div.btn-wrape(:style="{background:bgColor, width:btnWidth,borderRadius:btnRadius}")
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
.btn-wrape {
  padding: 0.6rem;
  margin: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
// a {
//   color: #fff;
// }
</style>
