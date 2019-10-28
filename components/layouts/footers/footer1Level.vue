<template lang="pug">
  div.footerBarWrape
    div.footerBar
        div.elementWrape
            brand2Parts
        div.elementWrape
            mobileMenu
        div.elementWrape
            loginMenu
</template>
<script>
import mobileMenu from '~/components/header/mobileMenu.vue'
import loginMenu from '~/components/header/loginMenu.vue'
import brand2Parts from '~/components/header/brand2Parts.vue'

export default {
  components: {
    loginMenu,
    mobileMenu,
    brand2Parts
  }
}
</script>
<style lang="scss" scoped>
.footerBarWrape {
  position: relative;
  width: 100%;
  background-color: #333;
}
.footerBar {
  width: 100%;
  height: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: $body-text;
}
.elementWrape {
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
