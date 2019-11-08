<template>
  <div class="wrape">
    <nuxt-link to="/">
      <div @click="closeMobileMenu()">
        <img src="~assets/img/logo/h-logo.svg" alt="h-works" height="28" />
        <img
          class="logo-img"
          src="~/assets/img/logo/h-works1200x600white.svg"
          alt="h-works logo"
          height="28"
        />
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('headerBar', ['isOpenMobileMenu'])
  },
  methods: {
    ...mapMutations({ close: 'headerBar/closeMobileMenu' }),
    closeMobileMenu() {
      this.close()
    }
  }
}
</script>
<style scoped lang="scss">
.wrape {
  width: 100%;
  height: 100%;
}
</style>
