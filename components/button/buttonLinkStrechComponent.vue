<template lang="pug">
  div.btn-component
    div.btn-wrape(:style="{background:bgColor, borderRadius:btnRadius}")
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
    btnRadius: {
      type: String,
      default: '0px'
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-component {
  width: 18rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-wrape {
  width: 15rem;
  padding: 0.6rem;
  margin: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in;
  cursor: pointer;
}
div {
  &:hover {
    width: 18rem;
    transition: all 0.2s ease-in;
  }
}
</style>
