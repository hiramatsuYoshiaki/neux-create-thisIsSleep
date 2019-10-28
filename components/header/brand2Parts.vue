<template>
  <div class="wrape">
    <nuxt-link to="/">
      <img src="~assets/img/logo/h-logo.svg" alt="h-works" class="brandLogo" />
    </nuxt-link>
    <nuxt-link to="/">
      <img
        class="brandText"
        src="~/assets/img/logo/h-works1200x600white.svg"
        alt="h-works logo"
      />
    </nuxt-link>
  </div>
</template>
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
