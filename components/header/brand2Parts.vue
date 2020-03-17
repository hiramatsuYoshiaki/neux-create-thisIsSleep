<template>
  <div class="wrape">
    <nuxt-link to="/">
      <div @click="closeMobileMenu()">
        <img
          @click="closeMobileMenu()"
          src="~assets/img/logo/h-logo.svg"
          alt="h-works"
          class="brandLogo"
        />
      </div>
    </nuxt-link>
    <nuxt-link to="/">
      <div @click="closeMobileMenu()">
        <img
          class="brandText"
          src="~/assets/img/logo/h-works1200x600white.svg"
          alt="h-works logo"
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
  display: flex;
  .brandLogo {
    width: auto;
    height: 2rem;
  }
  .brandText {
    width: auto;
    height: 2rem;
    margin-left: 0.5rem;
  }
}
</style>
