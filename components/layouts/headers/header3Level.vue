<template lang="pug">
div.headerbarWrap
    nav.navbar(:style="{background:bgColor, position:position}")
        div.burger
            burger
        div.brand
            brand2Parts
        div.glovalMenu
            glovalMenu
        div.loginMenu
            loginMenu

    nav.modalMenu(v-if="isOpenMobileMenu")
        div.brand
            brand2Parts
        div.mobileMenu
            mobileMenu
        div.loginMenu
            loginMenu
        div.burger
            burger
</template>
<script>
import { mapState } from 'vuex'
import burger from '~/components/header/burger.vue'
import brand2Parts from '~/components/header/brand2Parts.vue'
import glovalMenu from '~/components/header/glovalMenu.vue'
import mobileMenu from '~/components/header/mobileMenu.vue'
import loginMenu from '~/components/header/loginMenu.vue'
export default {
  components: {
    loginMenu,
    glovalMenu,
    mobileMenu,
    brand2Parts,
    burger
  },
  props: {
    bgColor: {
      type: String,
      default: '#000'
    },
    position: {
      type: String,
      default: 'relative'
    }
  },
  computed: {
    ...mapState('headerBar', ['isOpenMobileMenu'])
  }
  // mounted() {
  //   console.log('mounted header layout 3level')
  // }
}
</script>
<style lang="scss" scoped>
.headerbarWrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
}
.navbar {
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 4rem;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 1);
  color: $body-text;
  @media (min-width: 992px) {
    justify-content: space-around;
  }
}
.modalMenu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: calc(100vh + 4rem);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 1);
  color: $body-text;
  padding-bottom: 4rem;
}
.burger {
  display: block;
  @media (min-width: 976px) {
    display: none;
  }
}
.glovalMenu {
  display: none;
  @media (min-width: 976px) {
    display: block;
  }
}
</style>
