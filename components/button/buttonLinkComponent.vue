<template lang="pug">
    div.button-wrape
        nuxt-link(:to="link") craete your soluton

</template>
<script>
export default {
  props: {
    link: String
  }
}
</script>
<style lang="scss" scoped>
.button-wrape {
  width: auto;
  padding: 1rem;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 28px;
}
a {
  color: #fff;
}
</style>
